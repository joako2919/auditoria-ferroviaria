/* Auditoría BN 0.7.76 · ensayo DOBLE ALERTA; requiere candidata 0.7.75.
   No interpreta carteles no vistos como ausentes. No sustituye verificación humana. */
(function(){
'use strict';
const cfg={aviso:1200,siguientes:800,grande:130,cierre:35,accuracy:25,pkAccuracy:100,ageMs:12000};
const el=id=>document.getElementById(id);
const meters=s=>{const m=/(\d{1,3})\s*[/+]\s*(\d{3})/.exec(String(s||''));return m?Number(m[1])*1000+Number(m[2]):NaN};
const fmt=n=>Number.isFinite(n)?Math.floor(n/1000)+'/'+String(Math.round(n)%1000).padStart(3,'0'):'—';
const direction=x=>/asc|impar/i.test(String(x||''))?'asc':/desc|par/i.test(String(x||''))?'desc':null;
const key=(a,r,t)=>[a.id,r._fuente,r.inicio||r.pk,r.fin,r.velocidad,t].join('|');
const inStore=(a,k)=>typeof records076!=='undefined'&&records076.some(x=>x.kind==='cartel076'&&x.auditId===a.id&&x.controlKey0776===k);
let shown='',selected='',lastAudit='',lastPk=NaN;
function ui(){
 if(el('alertaCartel0776'))return;
 const css=document.createElement('style');css.id='alertaCartel0776Css';css.textContent=
 '#alertaCartel0776[hidden]{display:none!important}#alertaCartel0776{position:fixed;z-index:99980;left:10px;right:10px;bottom:12px;max-width:560px;margin:auto;box-shadow:0 9px 32px #0005;border-radius:14px;border:2px solid #177489;background:white;padding:12px;font:15px system-ui;max-height:85dvh;overflow:auto}'+
 '#alertaCartel0776.grande0776{bottom:auto;top:50%;transform:translateY(-50%);border:3px solid #b51220;padding:18px}#alertaCartel0776 h2{font:800 19px system-ui;margin:0 0 8px;color:#222}#alertaCartel0776 .info0776{line-height:1.45;margin-bottom:10px}#alertaCartel0776 .acciones0776{display:flex;gap:8px;flex-wrap:wrap}#alertaCartel0776 button{flex:1;min-width:120px}#alertaCartel0776 button[data-v="visto"]{background:#197a40}#alertaCartel0776 button[data-v="no_visto"]{background:#a61b2a}#alertaCartel0776 button[data-v="no_controlado"]{background:#374151}';
 document.head.appendChild(css);
 const node=document.createElement('aside');node.id='alertaCartel0776';node.hidden=true;node.setAttribute('role','status');
 node.innerHTML='<h2 id="alertaTitulo0776">Próximo cartel</h2><div id="alertaTexto0776" class="info0776"></div><div class="acciones0776" id="alertaAcciones0776" hidden><button type="button" data-v="visto">✓ Lo vi</button><button type="button" data-v="no_visto">✕ No lo vi</button><button type="button" data-v="no_controlado">No pude controlarlo</button></div><div id="alertaConfirm0776" hidden><p id="alertaSeleccion0776"></p><div class="acciones0776"><button type="button" id="alertaGuardar0776">Confirmar</button><button type="button" class="light" id="alertaCambiar0776">Cambiar</button></div></div>';
 document.body.appendChild(node);
 node.querySelectorAll('[data-v]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.v;el('alertaAcciones0776').hidden=true;el('alertaConfirm0776').hidden=false;el('alertaSeleccion0776').textContent={'visto':'Cartel observado: presente','no_visto':'Cartel no observado: requiere cotejo','no_controlado':'No fue posible controlar el cartel'}[selected];}));
 el('alertaCambiar0776').onclick=()=>{selected='';el('alertaAcciones0776').hidden=false;el('alertaConfirm0776').hidden=true;};
 el('alertaGuardar0776').onclick=()=>{if(window.__cartelActual0776&&selected)save(window.__cartelActual0776,selected);};
}
function save(c,result){
 const a=window.AuditoriaGPS0728?.getActive?.();
 if(!a||a.id!==c.audit.id||a.state!=='en_curso'||inStore(a,c.key))return;
 const label={visto:'correcto',no_visto:'no_observado',no_controlado:'no_controlado',sin_verificar:'sin_verificar'}[result];
 if(!label)return;
 const rec={kind:'cartel076',train:a.tren,auditId:a.id,fechaAuditoriaH21:a.fecha,sentido:a.direction,
  boletinOrigen:c.r._fuente||'PDF',velocidadDocumental:Number(c.r.velocidad),sign:c.type,
  result:label,note:result==='no_controlado'?'Inspector no pudo efectuar control visual':result==='no_visto'?'Cartel no observado; no acredita ausencia física':result==='sin_verificar'?'Cerrado automáticamente sin respuesta':'Inspector confirmó presencia visual',
  start:c.r.inicio||c.r.pk,end:c.r.fin,current:fmt(c.actual),pkTeorico:fmt(c.target),
  time:Date.now(),gps:{...c.fix},source:'gps_asistido_inspector_0776',
  status:result==='visto'?'observado_inspector_pendiente_cotejo':'sin_confirmacion_de_presencia',
  controlKey0776:c.key,pkAccuracyMeters:c.fix.pkAccuracy,resultadoVisual0776:result};
 try{records076.push(rec);persist076();shown='';selected='';hide();}catch(e){
  try{records076.pop()}catch(_){}
  el('alertaTexto0776').textContent='No se pudo guardar el control. Usá el control manual. '+String(e?.message||e);
 }
}
function hide(){const node=el('alertaCartel0776');if(node)node.hidden=true;window.__cartelActual0776=null;}
function nextCandidate(a,fix,actual){
 const dir=el('direction076')?.value==='desc'?'desc':'asc',sgn=dir==='asc'?1:-1,source=typeof restrictionList076==='function'?restrictionList076():[],choices=[];
 for(const r of source){
  const begin=meters(r.inicio||r.pk),end=meters(r.fin),velocity=Number(r.velocidad);
  if(!String(r._fuente||'').startsWith('PDF ')||r.revisionDocumental==='observado'||r.controlAutomatico===false||
   direction(r.via||r.sentido||r.direccion)!==dir||!Number.isFinite(begin)||!Number.isFinite(end)||
   !(velocity>0)||(end-begin)*sgn<=0)continue;
  for(const [type,target] of [['aviso',begin-800*sgn],['inicio',begin],['fin',end]]){
   const dist=(target-actual)*sgn,k=key(a,r,type),warning=type==='aviso'?cfg.aviso:cfg.siguientes;
   if(inStore(a,k)||dist>warning||dist< -cfg.cierre)continue;
   choices.push({audit:a,fix,actual,r,type,target,dist,key:k,warning});
  }
 }
 choices.sort((x,y)=>x.dist-y.dist);
 return choices[0]||null;
}
function tick(){
 ui();const a=window.AuditoriaGPS0728?.getActive?.();
 if(!a||a.state!=='en_curso'){hide();shown='';return}
 if(a.id!==lastAudit){shown='';lastAudit=a.id;lastPk=NaN;hide();}
 if(!el('verifyBulletin0730')?.checked){hide();return;}
 let series=[];try{series=JSON.parse(localStorage.getItem('auditoria_bn_0732_speed_history_'+a.id)||'[]')}catch(_){}
 const fix=Array.isArray(series)?series.at(-1):null,actual=meters(fix?.pk);
 if(!fix||!Number.isFinite(fix.t)||Date.now()-fix.t>cfg.ageMs||!Number.isFinite(actual)||
    !Number.isFinite(fix.gpsAccuracy)||fix.gpsAccuracy>cfg.accuracy||
    !Number.isFinite(fix.pkAccuracy)||fix.pkAccuracy>cfg.pkAccuracy){hide();return;}
 // Descartar retrocesos pequeños: tolerancia de cierre GPS; no reabrir controles ya guardados.
 const c=nextCandidate(a,fix,actual);
 if(!c){hide();lastPk=actual;return;}
 const grand=c.dist<=cfg.grande;
 const was=window.__cartelActual0776;
 if(was&&was.key!==c.key&&!inStore(a,was.key)&&was.dist<=cfg.grande&&was.dist>=-cfg.cierre&&grand){
  // Prioridad: un único control grande; los otros se mantienen en cola.
 }
 if(was&&!inStore(a,was.key)){
  const d=(was.target-actual)*(el('direction076')?.value==='desc'?-1:1);
  if(d< -cfg.cierre){save({...was,actual,fix},'sin_verificar');}
 }
 const chosen=nextCandidate(a,fix,actual);if(!chosen){hide();return;}
 const node=el('alertaCartel0776');
 if(shown!==chosen.key){selected='';el('alertaConfirm0776').hidden=true;}
 shown=chosen.key;window.__cartelActual0776=chosen;
 node.hidden=false;node.classList.toggle('grande0776',chosen.dist<=cfg.grande);
 const label={aviso:'AVISO',inicio:'INICIO',fin:'FIN'}[chosen.type];
 el('alertaTitulo0776').textContent=chosen.dist<=cfg.grande?'CONTROLAR CARTEL DE '+label:'Próximo cartel: '+label;
 el('alertaTexto0776').textContent=(chosen.dist>=0?'Faltan '+Math.round(chosen.dist)+' m.':'PK teórico superado '+Math.round(-chosen.dist)+' m.')+
 ' · Cartel PK '+fmt(chosen.target)+' · precaución '+fmt(meters(chosen.r.inicio||chosen.r.pk))+' a '+fmt(meters(chosen.r.fin))+
 ' · '+chosen.r.velocidad+' km/h. GPS estimado ±'+Math.round(fix.pkAccuracy)+' m.';
 el('alertaAcciones0776').hidden=chosen.dist>cfg.grande||!!selected;
 el('alertaConfirm0776').hidden=chosen.dist>cfg.grande||!selected;
 lastPk=actual;
}
window.AuditoriaCarteles0776={config:cfg,meters,fmt,direction,key,nextCandidate,tick};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{ui();tick();setInterval(tick,1200)},{once:true});
else{ui();tick();setInterval(tick,1200);}
})();