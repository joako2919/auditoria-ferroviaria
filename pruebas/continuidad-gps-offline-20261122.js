/* Auditoría Ferroviaria — continuidad de captura, v0.1 experimental.
   Complemento aislado: NO activa GPS, NO reemplaza el registrador existente.
   Integración prevista: llamar start(auditId), gpsFix(fix), tick(), recordManual(data),
   y leer getLog()/summary(); invocar stop() al cerrar la auditoría.
   Los registros son SOLO locales; NO existe sincronización con servidor.
*/
(function (root) {
  'use strict';
  const PREFIX = 'af-continuidad-v1:';
  const THRESHOLD_MS = 20000;
  let auditId = null, state = null, interval = null, onNotice = null;
  const now = () => new Date().toISOString();
  const safeCopy = value => JSON.parse(JSON.stringify(value));
  const key = id => PREFIX + id;
  function save() {
    if (!state || !auditId) return;
    try { localStorage.setItem(key(auditId), JSON.stringify(state)); }
    catch (e) { state.storageError = 'No se pudo almacenar el registro local: ' + String(e); notice('STORAGE_ERROR'); }
  }
  function notice(type) { if (typeof onNotice === 'function') onNotice(type, safeCopy(state)); }
  function add(type, detail) {
    const e = { id: (globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now())+'-'+state.entries.length,
      type, at: now(), ...safeCopy(detail || {}) };
    state.entries.push(e); save(); notice(type); return e;
  }
  function start(id, options = {}) {
    if (!id || typeof id !== 'string') throw Error('Se requiere identificador de auditoría por fecha y servicio.');
    stop();
    auditId = id;
    onNotice = options.onNotice || null;
    try { state = JSON.parse(localStorage.getItem(key(id)) || 'null'); } catch (_) { state = null; }
    if (!state || !Array.isArray(state.entries)) state = { auditId:id, startedAt:now(), entries:[], gpsStatus:'WAITING', internetStatus:'UNKNOWN', lastFix:null, lastFixAt:null, storageError:null };
    if (state.auditId !== id) throw Error('Identificador de registro inconsistente.');
    // La recuperación de pantalla no debe inventar una ubicación ni cerrar brechas GPS.
    state.internetStatus = navigator.onLine ? 'ONLINE' : 'OFFLINE';
    save();
    if (!navigator.onLine) add('NETWORK_LOST', {source:'browser',note:'Sin conexión de red; la captura local continúa'});
    interval = setInterval(tick, 5000);
    return safeCopy(state);
  }
  function gpsFix(fix) {
    if (!state) return;
    if (!fix || !Number.isFinite(fix.latitude) || !Number.isFinite(fix.longitude)) return;
    const t = Number.isFinite(fix.timestamp) ? fix.timestamp : Date.now();
    const previous = state.lastFixAt;
    if (previous && t < previous) return; // Evitar muestras atrasadas.
    const recovered = state.gpsStatus === 'LOST';
    state.lastFixAt = t;
    state.lastFix = {latitude:fix.latitude, longitude:fix.longitude,
      accuracyMeters:Number.isFinite(fix.accuracyMeters) ? fix.accuracyMeters:null,
      // PK debe provenir del georreferenciador existente; nunca inferirlo de la última posición.
      pk:typeof fix.pk === 'string' ? fix.pk:null,
      reference:typeof fix.reference === 'string' ? fix.reference:null, at:new Date(t).toISOString()};
    state.gpsStatus = 'AVAILABLE';
    save();
    if (recovered) {
      const loss = [...state.entries].reverse().find(e => e.type === 'GPS_LOST' && !e.closedAt);
      if (loss) {loss.closedAt = new Date(t).toISOString(); loss.durationSeconds = Math.max(0,Math.round((t-new Date(loss.at).getTime())/1000)); save();}
      add('GPS_RESTORED',{gpsAt:new Date(t).toISOString(),location:state.lastFix,
        note:'Ubicación recuperada. Registros manuales del intervalo pendientes de revisión.'});
    }
  }
  function tick() {
    if (!state || state.gpsStatus !== 'AVAILABLE' || !state.lastFixAt) return;
    if (Date.now() - state.lastFixAt >= THRESHOLD_MS) {
      state.gpsStatus = 'LOST'; save();
      add('GPS_LOST',{lastKnownFix:state.lastFix,
        note:'Sin nuevas lecturas GPS. Última posición conocida, no posición actual.'});
    }
  }
  function setNetwork(connected) {
    if (!state) return;
    const next = connected ? 'ONLINE' : 'OFFLINE';
    if (state.internetStatus === next) return;
    state.internetStatus = next; save();
    add(connected ? 'NETWORK_RESTORED' : 'NETWORK_LOST',
      {note:connected ? 'Red disponible; ningún envío remoto se ha efectuado.' : 'Sin red; continúa almacenamiento local.'});
  }
  function recordManual(data = {}) {
    if (!state) throw Error('No hay auditoría activa');
    return add('MANUAL_RECORD',{data:safeCopy(data),gpsStatus:state.gpsStatus,
      lastKnownFix:state.gpsStatus === 'LOST' ? state.lastFix : null,
      provenance:'MANUAL',confirmedLocation:!!data.confirmedLocation});
  }
  function getLog() {return state ? safeCopy(state.entries) : [];}
  function summary() {
    const records = getLog(), gaps = records.filter(e=>e.type==='GPS_LOST');
    return { auditId, gpsStatus:state?.gpsStatus || 'NOT_STARTED',
      internetStatus:state?.internetStatus || 'UNKNOWN',
      gpsOutages:gaps.length, completedGpsOutages:gaps.filter(e=>e.closedAt).length,
      recordedGapSeconds:gaps.reduce((sum,e)=>sum+(e.durationSeconds||0),0),
      manualRecords:records.filter(e=>e.type==='MANUAL_RECORD').length,
      storageError:state?.storageError || null };
  }
  function stop(){if(interval) clearInterval(interval);interval=null;onNotice=null;auditId=null;state=null;}
  window.addEventListener('online',()=>setNetwork(true));
  window.addEventListener('offline',()=>setNetwork(false));
  root.AuditoriaContinuidad = Object.freeze({start,gpsFix,tick,setNetwork,recordManual,getLog,summary,stop});
})(window);
