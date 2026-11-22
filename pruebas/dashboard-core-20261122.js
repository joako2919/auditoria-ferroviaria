/* Indicadores de auditoría — experimental, sin valores ficticios.
   Entrada explícita desde el modelo de datos de la app (no lee otras auditorías).
   Adaptador pendiente: vincular campos reales H21/movimientos/precauciones a esta interfaz.
*/
(function(root){
  'use strict';
  const valid = v => typeof v === 'number' && Number.isFinite(v);
  function build(input){
    if (!input || !input.auditId) throw Error('Se requiere una auditoría identificada.');
    const movements = Array.isArray(input.movements) ? input.movements : [];
    const stops = Array.isArray(input.stops) ? input.stops : [];
    const events = Array.isArray(input.events) ? input.events : [];
    const series = movements.filter(m => valid(m.delayMinutes)).map(m => ({
      station: String(m.station || 'Sin identificar'),
      movement: String(m.kind || 'movimiento'),
      delayMinutes:m.delayMinutes, verified:m.verified === true
    }));
    const last = series.length ? series[series.length-1] : null;
    const technical = events.filter(e => /^GPS_|^NETWORK_/.test(String(e.type || '')));
    return {
      auditId:String(input.auditId),
      movements:movements.length,
      comparedMovements:series.length,
      lastDifferenceMinutes:last ? last.delayMinutes : null,
      lastDifferenceVerified:last ? last.verified : false,
      early:series.filter(s=>s.delayMinutes<0).length,
      onTime:series.filter(s=>s.delayMinutes===0).length,
      delayed:series.filter(s=>s.delayMinutes>0).length,
      extraordinaryStops:stops.filter(s=>s.unplanned === true).length,
      stopDurationSeconds:stops.reduce((v,s)=>v+(valid(s.durationSeconds)?Math.max(0,s.durationSeconds):0),0),
      gpsInterruptions:technical.filter(e=>e.type==='GPS_LOST').length,
      gpsInterruptionSeconds:technical.filter(e=>e.type==='GPS_LOST').reduce((v,e)=>v+(valid(e.durationSeconds)?e.durationSeconds:0),0),
      gpsOpenInterruptions:technical.filter(e=>e.type==='GPS_LOST'&&!e.closedAt).length,
      networkInterruptions:technical.filter(e=>e.type==='NETWORK_LOST').length,
      inspectionNotes:events.filter(e=>e.type==='NOVELTY').length,
      series
    };
  }
  root.AuditoriaDashboardCore=Object.freeze({build});
})(window);
