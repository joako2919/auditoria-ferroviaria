/* Auditoría Ferroviaria 0.7.29 — importadores privados. No publica contenidos a GitHub. */
function readH21Overrides0729(){
 try{
  const x=JSON.parse(localStorage.getItem('audit_bn_h21_overrides_0729')||'{}');
  return x && !Array.isArray(x) && typeof x==='object' ? x : {};
 }catch(e){return {}}
}
(function(){
 'use strict';
 const MAX_BYTES=12*1024*1024;
 const extOK=['xlsx','xls','pdf','json'];
 const roleNames=['conductor','ayudante','guarda'];
 let pending=null;
 function norm(s){return String(s==null?'':s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'')}
 function clean(s){return String(s==null?'':s).replace(/\s+/g,' ').trim()}
 function field(obj,names){
  if(!obj||typeof obj!=='object')return '';
  const entries=Object.entries(obj);
  for(const name of names){const found=entries.find(([k])=>norm(k)===norm(name));if(found&&clean(found[1])!=='')return clean(found[1]);}
  return '';
 }
 function role(s){
  const n=norm(s);
  if(n.includes('ayudant'))return 'ayudante';
  if(n.includes('conduct')||n.includes('motorman'))return 'conductor';
  if(n.includes('guardatren')||n==='guarda'||n.includes('guardas'))return 'guarda';
  return null;
 }
 function pk(s){
  const n=clean(s).replace(/^p(?:unto)?\.?\s*k(?:ilometrico)?\.?\s*[:\s]*/i,'').replace(/^km\.?\s*/i,'');
  const m=/^(\d{1,3})\s*[/+]\s*(\d{1,3})$/.exec(n);
  if(m&&Number(m[2])<1000)return Number(m[1])+'/'+m[2].padStart(3,'0');
  const p=/^(\d{1,3})[.,](\d{3})$/.exec(n);
  if(p)return Number(p[1])+'/'+p[2];
  if(/^\d{4,6}$/.test(n))return Math.floor(Number(n)/1000)+'/'+String(Number(n)%1000).padStart(3,'0');
  return '';
 }
 function time(s){
  const t=clean(s);
  const a=/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(t);
  if(!a||Number(a[1])>23||Number(a[2])>59||Number(a[3]||0)>59)return '';
  return a[1].padStart(2,'0')+':'+a[2]+':'+(a[3]||'00');
 }
 async function loadLibrary(globalName, urls){
  if(window[globalName])return;
  let lastError;
  for(const url of urls){
   try{
    await new Promise((res,rej)=>{
     const s=document.createElement('script');s.src=url;s.async=true;
     s.onload=()=>window[globalName]?res():rej(Error('Lector no disponible'));
     s.onerror=()=>rej(Error('No se pudo descargar la biblioteca'));
     document.head.appendChild(s);
    });
    if(window[globalName])return;
   }catch(e){lastError=e}
  }
  throw Error('No se pudo cargar el lector '+globalName+'. Conectate a internet e intentá nuevamente. '+(lastError&&lastError.message||''));
 }
 function matrixObjects(matrix,kind,tab){
  const entries=matrix.filter(row=>Array.isArray(row)&&row.some(x=>clean(x)));
  if(!entries.length)return [];
  const patterns={
   senales:[['senal','señal','senial','id','codigo','identificacion'],['pk','punto kilometrico','punto kilométrico','km','progresiva','ubicacion']],
   velocidades:[['velocidad','vel','kmh','km/h','velocidad maxima','velocidad máxima'],['pk','inicio','desde','progresiva','punto kilometrico','punto kilométrico']],
   horarios:[['estacion','estación','parada','station'],['tren','servicio','nrotren','nro tren','numero tren','llegada','partida','paso','hora salida','hora llegada']]
  };
  function headerMatch(row){
   const cols=row.map(x=>norm(x));
   if(kind==='personal'){
    const hasLeg=cols.some(x=>x==='leg'||x.includes('legajo')||x.includes('legaj'));
    const combined=cols.some(x=>x==='name'||x.includes('apellidoynombr')||x.includes('nombreyapellid')||x==='personal'||x==='agente');
    const separate=cols.some(x=>x==='apellido'||x==='apellidos')&&cols.some(x=>x==='nombre'||x==='nombres');
    return hasLeg&&(combined||separate);
   }
   return (patterns[kind]||[]).every(group=>cols.some(x=>group.some(word=>x===norm(word))));
  }
  // Algunas planillas oficiales tienen títulos y celdas combinadas antes del encabezado.
  const idx=entries.findIndex((r,i)=>i<120&&headerMatch(r));
  if(idx<0)return [];
  const header=entries[idx].map((x,i)=>clean(x)||'columna_'+i);
  return entries.slice(idx+1).map(r=>Object.fromEntries(header.map((h,i)=>[h,r[i]==null?'':r[i]]))).filter(r=>Object.values(r).some(x=>clean(x)));
 }
 function personName(row){
  const joined=field(row,['name','apellido y nombre','apellido y nombres','apellidos y nombre','apellidos y nombres','nombre y apellido','nombre y apellidos','apellido_nombre','personal','agente']);
  if(joined)return joined;
  const lastname=field(row,['apellido','apellidos']);
  const firstname=field(row,['nombre','nombres']);
  return [lastname,firstname].filter(Boolean).join(' ').trim();
 }
 function personLeg(row){
  const exact=field(row,['leg','legajo','nro legajo','nrolegajo','numero de legajo','número de legajo','legajo n','n legajo','n de legajo']);
  if(exact)return exact;
  const candidate=Object.entries(row||{}).find(([key,val])=>(norm(key).includes('legajo')||norm(key).includes('legaj'))&&clean(val));
  return candidate?clean(candidate[1]):'';
 }
 function sheetRole(sheet){
  const n=norm(sheet);
  // Una hoja genérica de conducción NO equivale a la función Conductor.
  if(n.includes('personaldeconduccion')||n.includes('personalconduccion')||n.includes('dotacion')||n.includes('listado')||n.includes('legajos'))return null;
  return role(sheet);
 }
 async function readFile(file,kind){
  const ext=file.name.toLowerCase().split('.').pop();
  if(!extOK.includes(ext))throw Error('Formato no admitido. Elegí .xlsx, .xls, .pdf o .json.');
  if(file.size>MAX_BYTES)throw Error('El archivo supera el límite de 12 MB.');
  if(ext==='json'){
   const parsed=JSON.parse(await file.text());
   return {format:'json',data:parsed,rows:[]};
  }
  if(ext==='xlsx'||ext==='xls'){
   await loadLibrary('XLSX',[
    'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js',
    'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
   ]);
   const wb=XLSX.read(await file.arrayBuffer(),{type:'array',cellDates:false});
   const tabs=wb.SheetNames.map(name=>{
    const matrix=XLSX.utils.sheet_to_json(wb.Sheets[name],{header:1,defval:'',raw:false});
    return {sheet:name,rows:matrixObjects(matrix,kind,name)};
   });
   const rows=tabs.flatMap(t=>t.rows.map(row=>({sheet:t.sheet,row})));
   if(!rows.length)throw Error('No se reconocieron tablas de '+kind+' en ninguna hoja. Podés enviar una foto de los encabezados para adaptar el importador.');
   return {format:'excel',data:null,rows,skipped:tabs.filter(t=>!t.rows.length).map(t=>t.sheet)};
  }
  await loadLibrary('pdfjsLib',['https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js']);
  pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const doc=await pdfjsLib.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;
  const lines=[];
  for(let i=1;i<=doc.numPages;i++){
   const page=await doc.getPage(i),text=await page.getTextContent(),map=new Map();
   for(const item of text.items){
    if(!clean(item.str))continue;
    const y=Math.round(item.transform[5]/3)*3;
    if(!map.has(y))map.set(y,[]);
    map.get(y).push({x:item.transform[4],s:item.str});
   }
   for(const [,v] of [...map.entries()].sort((a,b)=>b[0]-a[0])){
    const line=clean(v.sort((a,b)=>a.x-b.x).map(x=>x.s).join(' '));
    if(line)lines.push({sheet:'Página '+i,line});
   }
  }
  if(!lines.length)throw Error('El PDF no contiene texto extraíble. No se admiten páginas escaneadas sin OCR.');
  return {format:'pdf',data:null,rows:lines};
 }
 function parsePersonal(src){
  const result={conductor:[],ayudante:[],guarda:[]},unassigned={};
  let rejected=0;
  function add(r,n,l,sheet){
   if(!clean(n)||!clean(l)){rejected++;return}
   if(r)result[r].push({name:clean(n),leg:clean(l)});
   else if(sheet)(unassigned[sheet]||(unassigned[sheet]=[])).push({name:clean(n),leg:clean(l)});
   else rejected++;
  }
  if(src.format==='json'){
   const data=src.data;
   if(data && !Array.isArray(data) && roleNames.every(k=>Array.isArray(data[k]))){
    for(const r of roleNames)for(const p of data[r])add(r,personName(p),personLeg(p));
   }else if(Array.isArray(data)){
    for(const p of data)add(role(field(p,['rol','cargo','funcion','puesto'])),personName(p),personLeg(p));
   }else throw Error('JSON de personal: se requieren conductor, ayudante y guarda, o una lista con rol, nombre y legajo.');
  }else if(src.format==='excel'){
   for(const {sheet,row} of src.rows){
    const r=role(field(row,['rol','cargo','funcion','puesto','categoria','función']))||sheetRole(sheet);
    add(r,personName(row),personLeg(row),sheet);
   }
  }else{
   for(const {line} of src.rows){
    const m=/\b(conductor(?:es)?|ayudante(?:s)?|guarda(?:tr[eé]n)?(?:s)?)\b\s*[:\-]?\s+(.+?)\s+(?:leg(?:ajo)?\s*[:#\-]?\s*)?(\d{3,10})\s*$/i.exec(line);
    if(m)add(role(m[1]),m[2],m[3]);
   }
  }
  for(const r of roleNames){
   const seen=new Set();
   result[r]=result[r].filter(x=>{const k=norm(x.leg)+'|'+norm(x.name);if(seen.has(k))return false;seen.add(k);return true});
  }
  const classified=roleNames.reduce((n,r)=>n+result[r].length,0);
  const undecided=Object.values(unassigned).reduce((n,a)=>n+a.length,0);
  if(!classified&&!undecided)throw Error('No se reconoció personal con nombre y legajo. No se guardó ningún cambio.');
  return {kind:'personal',data:result,unassigned,roleMapping:{},total:classified+undecided,rejected,details:roleNames.map(r=>r+': '+result[r].length).join(' · ')+' · sin función: '+undecided,
   sample:[...roleNames.flatMap(r=>result[r].slice(0,2).map(x=>r+' · '+x.name+' · leg. '+x.leg)),...Object.entries(unassigned).flatMap(([sheet,rs])=>rs.slice(0,2).map(x=>'Sin clasificar ('+sheet+'): '+x.name+' · leg. '+x.leg))].slice(0,12),
   warning:'Antes de guardar hay que asignar la función de las hojas genéricas. Nunca se presume que «Personal de conducción» significa solo Conductor. Si una hoja mezcla conductores y ayudantes sin columna de función, no la asignes completa: se debe separar o indicar la función por fila.'};
 }
 function parseSignals(src){
  const data=[],notes=[],rows=src.format==='json'?(Array.isArray(src.data)?src.data:(src.data&&src.data.senales)||[]):src.rows;
  if(!Array.isArray(rows))throw Error('El archivo no tiene una lista de señales.');
  let omitted=0;
  for(const item of rows){
   let id='',p='',via='',name='';
   if(src.format==='pdf'){
    const line=item.line;
    const mi=/\bP\s*[-.]?\s*\d+[A-Za-z]?\b/i.exec(line);
    const mp=/\b(?:PK|KM)?\s*(\d{1,3}\s*[/+]\s*\d{3})\b/i.exec(line);
    if(mi&&mp){id=clean(mi[0]).replace(/\s+/g,'').toUpperCase();p=pk(mp[1]);via='P';name=line;}
   }else{
    const x=src.format==='excel'?item.row:item;
    id=field(x,['id','senal','señal','codigo','identificacion','numero de señal']);
    p=pk(field(x,['pk','punto kilometrico','punto kilométrico','km','progresiva','ubicacion']));
    via=field(x,['via','vía','tipo via','tipo de via','tipo','via principal','principal']);
    name=field(x,['detalle','observacion','descripcion']);
    if(!via&&/^P[\s-]?\d/i.test(id))via='P';
   }
   if(!id||!p||!(/^(p|principal|viaprincipal)$/i.test(norm(via)))){omitted++;continue}
   data.push({id,pk:p,via:'P',detalle:name});
  }
  const unique=[...new Map(data.map(x=>[norm(x.id)+'|'+x.pk,x])).values()];
  if(!unique.length)throw Error('No se reconocieron señales de vía principal P con código y PK. No se sustituyó la base.');
  return {kind:'senales',data:unique,total:unique.length,rejected:omitted,details:unique.length+' señales de vía principal (P), '+omitted+' filas omitidas',
    sample:unique.slice(0,12).map(x=>x.id+' · PK '+x.pk),
    warning:'Solo se importan señales identificadas expresamente como vía principal (P). Verificá cada PK contra la planilla original.'};
 }
 function parseSpeeds(src){
  const rows=src.format==='json'?(Array.isArray(src.data)?src.data:(src.data&&src.data.velocidades)||[]):src.rows;
  if(!Array.isArray(rows))throw Error('Se requiere una lista de precauciones.');
  let omitted=0;const data=[];
  for(const item of rows){
   const x=src.format==='excel'?item.row:item;
   const start=pk(field(x,['pk','inicio','desde','pk inicio','punto kilometrico','punto kilométrico']));
   const end=pk(field(x,['fin','hasta','pk fin']));
   const raw=field(x,['velocidad','vel','velocidad maxima','velocidad máxima','kmh','km/h']);
   const speed=Number(raw.replace(',','.').replace(/\s*km\s*\/?\s*h/i,''));
   if(!start||!Number.isFinite(speed)||speed<=0){omitted++;continue}
   data.push({pk:start,inicio:start,fin:end||'',velocidad:speed,detalle:field(x,['detalle','motivo','observacion','descripcion']),via:field(x,['via','vía','sentido'])});
  }
  if(!data.length)throw Error('No se encontraron precauciones con PK inicial y velocidad positiva. No se guardaron datos.');
  return {kind:'velocidades',data,total:data.length,rejected:omitted,details:data.length+' precauciones, '+omitted+' filas omitidas',
   sample:data.slice(0,12).map(x=>(x.inicio||x.pk)+' → '+(x.fin||'sin fin')+' · '+x.velocidad+' km/h'),
   warning:'Controlá inicio, fin, sentido y vigencia. Esta base NO reemplaza los boletines oficiales ni las clausuras y avisos. Los PDF de boletines siguen usando su importador específico.'};
 }
 function currentGroup(){
  const sel=document.getElementById('h21Regime0721'),dt=document.getElementById('h21Date0721'),dir=document.getElementById('direction076');
  let r=sel&&sel.value||'auto';
  if(r==='auto'){
   const a=(dt&&dt.value||'').split('-').map(Number);
   if(a.length!==3||!a[0])throw Error('Elegí antes la fecha y el régimen del itinerario.');
   const d=new Date(a[0],a[1]-1,a[2]).getDay();r=d===0?'domingo':d===6?'sabado':'habil';
  }
  const v=r+'_'+(dir&&dir.value||'asc');
  if(!/^(habil|sabado|domingo)_(asc|desc)$/.test(v))throw Error('No se pudo identificar el día y sentido para importar horarios.');
  return v;
 }
 function parseTimetable(src){
  const def=currentGroup(),groups={},issues=[];
  const add=(g,train,station,moves)=>{
   if(!/^(habil|sabado|domingo)_(asc|desc)$/.test(g))return;
   if(!/^\d{3,5}$/.test(clean(train)))return;
   const idx=ST076.findIndex(s=>canonStation0714(s)===canonStation0714(station));
   if(idx<0){issues.push('Estación no reconocida: '+station);return}
   const arr=['partida','paso','llegada'];
   const gobj=groups[g]||(groups[g]={}),tobj=gobj[clean(train)]||(gobj[clean(train)]=[]);
   for(let k=0;k<arr.length;k++){const tm=time(moves[arr[k]]);if(tm)tobj.push([idx,tm,k]);}
  };
  if(src.format==='json'){
   const data=src.data;
   if(!data||Array.isArray(data)||typeof data!=='object')throw Error('JSON de horarios: se requiere un objeto por número de tren.');
   const work=Object.entries(data).some(([k])=>/^(habil|sabado|domingo)_(asc|desc)$/.test(k))?data:{[def]:data};
   for(const [g,trains] of Object.entries(work)){
    if(!trains||typeof trains!=='object')continue;
    for(const [train,st] of Object.entries(trains)){
     if(!Array.isArray(st))continue;
     for(const row of st){
      if(row&&typeof row==='object')add(g,train,field(row,['estacion','estación','station']),{
       partida:field(row,['partida','salida']),paso:field(row,['paso']),llegada:field(row,['llegada','arribo'])
      });
     }
    }
   }
  }else if(src.format==='excel'){
   for(const {sheet,row} of src.rows){
    const g=/^(habil|sabado|domingo)_(asc|desc)$/.test(norm(sheet).replace(/(habil|sabado|domingo)(asc|desc)/,'$1_$2'))?norm(sheet).replace(/(habil|sabado|domingo)(asc|desc)/,'$1_$2'):def;
    const train=field(row,['tren','servicio','nro tren','numero tren','nrotren'])||(/^\d{3,5}$/.test(clean(sheet))?sheet:'');
    const station=field(row,['estacion','estación','parada','station']);
    add(g,train,station,{
     partida:field(row,['partida','salida','hora salida']),paso:field(row,['paso','hora de paso']),llegada:field(row,['llegada','arribo','hora llegada'])
    });
   }
  }else{
   for(const {line} of src.rows){
    const m=/^\s*(\d{3,5})\s+(.+?)\s+(partida|salida|paso|llegada|arribo)\s+(\d{1,2}:\d{2}(?::\d{2})?)\s*$/i.exec(line);
    if(!m)continue;
    const k=/partida|salida/i.test(m[3])?'partida':/paso/i.test(m[3])?'paso':'llegada';
    add(def,m[1],m[2],{[k]:m[4]});
   }
  }
  if(issues.length)throw Error(issues.slice(0,3).join('; ')+'. Corregí las estaciones antes de importar.');
  const final={};let count=0,services=0;const samples=[];
  for(const [group,trains] of Object.entries(groups)){
   const store=final[group]={};
   for(const [n,st] of Object.entries(trains)){
    if(!st.length)continue;
    st.sort((a,b)=>a[0]-b[0]||a[2]-b[2]);
    if(typeof H21_DB_0721!=='undefined'&&H21_DB_0721[group]&&H21_DB_0721[group][n]&&H21_DB_0721[group][n][0]!=='P')throw Error('El tren '+n+' está definido como circulación NO auditable en el H21: no puede sobrescribirse como tren de pasajeros.');
    store[n]=['P',0,st];
    count+=st.length;services++;
    samples.push(group+' · '+n+' · '+st.length+' horarios');
   }
  }
  if(!count)throw Error('No se reconocieron horarios con número de tren, estación y tipo de movimiento. No se guardó nada. En PDF solo se aceptan filas explícitas con partida, paso o llegada.');
  return {kind:'horarios',data:final,total:count,rejected:0,details:services+' trenes · '+count+' movimientos · '+Object.keys(final).join(', '),sample:samples.slice(0,12),
    warning:'Estos horarios quedarán como sustitución local SOLO para los trenes y regímenes importados. El H21 incorporado y las demás bases permanecen intactos. Verificá régimen, sentido y tren antes de aprobar.'};
 }
 function present(p,file){
  pending={p,file};
  let target=document.getElementById('importPreview0729');
  if(!target){
   target=document.createElement('section');target.id='importPreview0729';target.className='panel no-print';
   target.style.cssText='border:2px solid #b51220;margin:16px 0;padding:14px;border-radius:12px;background:#fff';
   const node=document.getElementById('bases0722');
   (node&&node.parentNode||document.body).insertBefore(target,node?node.nextSibling:null);
  }
  target.replaceChildren();
  const title=document.createElement('h2');title.textContent='Verificar antes de guardar · 0.7.29';target.appendChild(title);
  const info=document.createElement('p');info.textContent=file.name+' · '+p.details;target.appendChild(info);
  if(p.rejected){const reject=document.createElement('p');reject.textContent='Atención: '+p.rejected+' filas no pudieron incorporarse.';target.appendChild(reject)}
  const warning=document.createElement('p');warning.textContent=p.warning;target.appendChild(warning);
  if(p.kind==='personal'&&Object.keys(p.unassigned||{}).length){
   const box=document.createElement('div');box.className='status';box.style.borderLeftColor='#ab6300';
   const h=document.createElement('p');h.textContent='Asignación de función pendiente. Solo elegí una función para una hoja si TODOS sus registros pertenecen a la misma función.';box.appendChild(h);
   for(const [sheet,rows] of Object.entries(p.unassigned)){
    const label=document.createElement('label');label.textContent='Hoja «'+sheet+'» · '+rows.length+' personas';box.appendChild(label);
    const select=document.createElement('select');select.style.maxWidth='100%';
    for(const [value,name] of [['','Sin definir (no guardar)'],['conductor','Todos son CONDUCTORES'],['ayudante','Todos son AYUDANTES'],['guarda','Todos son GUARDATRENES']])select.add(new Option(name,value));
    select.onchange=()=>{p.roleMapping[sheet]=select.value};
    box.appendChild(select);
   }
   target.appendChild(box);
  }
  const sample=document.createElement('div');sample.className='small';sample.style.cssText='max-height:250px;overflow:auto;border:1px solid #ddd;padding:8px';
  p.sample.forEach(x=>{const line=document.createElement('div');line.textContent='• '+x;sample.appendChild(line)});target.appendChild(sample);
  const buttons=document.createElement('div');buttons.className='buttons';
  const accept=document.createElement('button');accept.type='button';accept.textContent='Guardar base verificada ('+p.total+')';
  accept.onclick=()=>commit();
  const cancel=document.createElement('button');cancel.type='button';cancel.className='light';cancel.textContent='Cancelar, conservar datos anteriores';cancel.onclick=()=>{pending=null;target.remove()};
  buttons.append(accept,cancel);target.appendChild(buttons);
  target.scrollIntoView({behavior:'smooth',block:'center'});
 }
 function commit(){
  if(!pending)return;
  const {p,file}=pending;
  let peopleToSave=null;
  if(p.kind==='personal'){
   peopleToSave=Object.fromEntries(roleNames.map(r=>[r,p.data[r].slice()]));
   for(const [sheet,rows] of Object.entries(p.unassigned||{})){
    const selected=p.roleMapping[sheet];
    if(!selected){alert('La hoja «'+sheet+'» tiene '+rows.length+' personas sin función asignada. No se guardó nada. Elegí una función SOLO si la hoja es uniforme.');return}
    peopleToSave[selected].push(...rows);
   }
  }
  if(!confirm('¿Verificaste '+p.total+' registros de "'+file.name+'" contra la fuente original y querés guardar los datos reconocidos en este dispositivo?'))return;
  try{
   if(p.kind==='horarios'){
    const old=readH21Overrides0729(),merged={...old};
    for(const [group,trains] of Object.entries(p.data))merged[group]={...(old[group]||{}),...trains};
    localStorage.setItem('audit_bn_h21_overrides_0729',JSON.stringify(merged));
    if(typeof h21Reload0721==='function')h21Reload0721();
    const status=document.getElementById('scheduleStatus076');if(status)status.textContent='Horarios locales verificados: '+p.details+'. Revisar tren y régimen.';
   }else{
    const old=readBases075(),newBase={...old};
    if(p.kind==='personal'){
     const people={...(old.personal||{})};
     for(const r of roleNames)if(peopleToSave[r].length)people[r]=[...new Map(peopleToSave[r].map(x=>[norm(x.leg)+'|'+norm(x.name),x])).values()];
     newBase.personal=people;
    }else newBase[p.kind]=p.data;
    localStorage.setItem(BASE075,JSON.stringify(newBase));
    if(p.kind==='personal'){
     for(const r of roleNames)ROLES[r]=newBase.personal[r]||[];
    }
    showBases075();
    if(p.kind==='velocidades'&&typeof loadRestrictions076==='function')loadRestrictions076();
   }
   const target=document.getElementById('importPreview0729');if(target)target.remove();
   pending=null;
   alert('Importación confirmada y guardada solo en este navegador. Conservá también el archivo original y tu respaldo JSON.');
  }catch(e){alert('No se pudo guardar: '+e.message+'. Revisá el espacio disponible y tu respaldo.')}
 }
 window.importUniversal0729=async function(ev,kind){
  const f=ev&&ev.target&&ev.target.files&&ev.target.files[0];
  if(!f)return;
  try{
   if(kind==='velocidades'&&/\.pdf$/i.test(f.name)){
    await importPrecautions079(ev);
    return;
   }
   const parsed=await readFile(f,kind);
   let p;
   if(kind==='personal')p=parsePersonal(parsed);
   else if(kind==='senales')p=parseSignals(parsed);
   else if(kind==='velocidades')p=parseSpeeds(parsed);
   else if(kind==='horarios')p=parseTimetable(parsed);
   else throw Error('Importador desconocido.');
   present(p,f);
  }catch(e){
   alert('No se importó '+f.name+': '+e.message+'. No se modificaron las bases.');
  }finally{if(ev&&ev.target)ev.target.value=''}
 };
})();
