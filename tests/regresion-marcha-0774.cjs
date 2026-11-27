#!/usr/bin/env node
/* Regresión funcional para gráficas de marcha H21.
   Datos 100% sintéticos de estaciones; no incorporar respaldos ni nóminas.
   Uso: node tests/regresion-marcha-0774.cjs [ruta-nueva.html]
*/
"use strict";

function runRegresionMarcha0774(html, previo) {
 const pruebas=[];
 const check=(nombre, cumple)=>{pruebas.push({nombre, ok:!!cumple});};
 const estaciones=[
  "Vicealmirante Montes","Don Torcuato","A. Sourdeaux","Villa de Mayo",
  "Los Polvorines","Pablo Nogués","Grand Bourg","Tierras Altas",
  "Tortuguitas","Manuel Alberti","Del Viso","Cecilia Grierson","Villa Rosa"
 ];
 const horarios=[
  "13:39:00","13:43:00","13:47:00","13:49:00","13:52:00","13:56:00",
  "14:00:00","14:04:00","14:08:00","14:11:00","14:15:00","14:19:00","14:25:00"
 ];
 const desfaces=[6,59,47,106,127,55,49,23,20,7,8,25,71];
 const segundos=v=>{
  if(!v)return null;
  const m=String(v).match(/^(\d\d):(\d\d):(\d\d)$/);
  return m?+m[1]*3600+ +m[2]*60+ +m[3]:null;
 };
 const hora=n=>{
  n=(n%86400+86400)%86400;
  return [Math.floor(n/3600),Math.floor((n%3600)/60),n%60].map(v=>String(v).padStart(2,"0")).join(":");
 };
 const porcion=(src,ini,fin)=>{
  const start=src.indexOf(ini),end=src.indexOf(fin,start+ini.length);
  if(start<0||end<0)throw Error("No se encontró "+ini+" / "+fin);
  return src.slice(start,end);
 };
 const render=(src,mutacion)=>{
  const id="PRUEBA-SINTETICA-3069";
  const plan=estaciones.map((s,i)=>({estacion:s,partida:horarios[i]}));
  const registros=estaciones.map((s,i)=>({
   kind:"movimiento076",train:"3069",auditId:id,station:s,
   move:i===12?"llegada":"partida",planned:horarios[i],
   actual:hora(segundos(horarios[i])+desfaces[i]),diff:desfaces[i]
  }));
  const guardado={};
  const audit={id,tren:"3069",origen:estaciones[0],destino:estaciones[12]};
  if(mutacion)mutacion({registros,plan,guardado,audit,estaciones,horarios,segundos,hora});
  const elems={};
  for(const key of ["dMarchSvg0733","dMarchNote0733","dRecorrido0755","tren"])
   elems[key]={
    id:key,innerHTML:"",textContent:"",value:key==="tren"?"3069":"",
    attrs:{},setAttribute(k,v){this.attrs[k]=v},getAttribute(k){return this.attrs[k]}
   };
  const doc={getElementById:id=>elems[id]||null};
  const win={AuditoriaGPS0728:{getActive:()=>audit}};
  const store={getItem:key=>guardado[key]||null};
  const body=porcion(src,"function renderFocus0755(){","  function boardUpdate(){");
  const fn=new Function("document","window","records076","ordered076",
    "schedules076","secs076","localStorage",body+"\nreturn renderFocus0755;");
  fn(doc,win,registros,()=>estaciones,{"3069":plan},segundos,store)();
  return {
   svg:elems.dMarchSvg0733.innerHTML,note:elems.dMarchNote0733.textContent,
   info:elems.dRecorrido0755.textContent,elems
  };
 };
 const actual=render(html);
 const anterior=render(previo);
 check("La versión anterior tenía marcha roja fija",anterior.svg.includes('stroke="#b51220"'));
 check("La nueva versión no pinta rojo fijo",!actual.svg.includes('stroke="#b51220"'));
 check("Servicio 3069: siete tramos verdes",(actual.svg.match(/stroke="#21864a"/g)||[]).length===7);
 check("Servicio 3069: ocho estaciones visibles verdes",(actual.svg.match(/fill="#21864a"/g)||[]).length===8);
 check("H21 se mantiene gris punteado",actual.svg.includes('stroke="#607b8a"')&&actual.svg.includes('stroke-dasharray="7 5"'));
 check("Leyenda explica celeste y violeta",actual.note.includes("celeste")&&actual.note.includes("violeta"));
 check("Leyenda no menciona amarillo",!actual.note.toLowerCase().includes("amarillo"));
 const diversidad=render(html,({registros,plan,guardado,estaciones,horarios,segundos,hora})=>{
  const diferencias=[-20,0,180,181,300,301,360,null];
  for(let j=0;j<diferencias.length;j++){
   const i=5+j,d=diferencias[j];
   registros[i].diff=d;registros[i].planned=d===null?null:horarios[i];
   registros[i].actual=hora(segundos(horarios[i])+(d===null?0:d));
   if(d===null)plan.splice(plan.findIndex(x=>x.estacion===estaciones[i]),1);
  }
  const v=registros[11];
  guardado["audit_bn_violet_alerts_0763_PRUEBA-SINTETICA-3069"]=JSON.stringify([
   {ident:[v.station,v.move,v.actual,v.diff].join("|"),station:v.station}
  ]);
 });
 for(const [nombre,color] of [
  ["celeste","#159ad1"],["verde","#21864a"],["naranja","#e87922"],
  ["rojo","#d32626"],["violeta","#7e22ce"],["sin H21 gris","#64748b"]
 ])check("Se pinta "+nombre,diversidad.svg.includes('fill="'+color+'"'));
 check("No hay amarillo en los SVG",!/amarill[oa]|#fff1b7|#d7ac00/i.test(actual.svg+diversidad.svg));
 check("No hay amarillo en el programa",!/amarill[oa]|#fff1b7|#d7ac00/i.test(html));
 const mezcla=render(html,({registros})=>registros.push({
  kind:"movimiento076",train:"3069",auditId:"OTRO-SERVICIO",
  station:"Villa Rosa",move:"partida",actual:"18:05:00",
  planned:"14:25:00",diff:13200
 }));
 check("Registro ajeno no altera la marcha",mezcla.svg===actual.svg);
 const sinEstacion=render(html,({registros})=>registros.splice(8,1));
 check("Un salto sin marca se dibuja discontinuo",sinEstacion.svg.includes('stroke-dasharray="5 7"'));
 const compacta=actual.elems.dMarchSvg0733;
 const grande={innerHTML:"",attrs:{},setAttribute(k,v){this.attrs[k]=v},getAttribute(k){return this.attrs[k]}};
 const notaGrande={textContent:""};
 const buscar=id=>({
  dMarchSvg0733:compacta,marchWide0756:grande,marchText0756:notaGrande,
  dMarchNote0733:actual.elems.dMarchNote0733
 })[id]||null;
 const ampliada=porcion(html,"function plotMarch(){","function plotTable(){");
 new Function("q",ampliada+"\nreturn plotMarch;")(buscar)();
 check("Vista ampliada copia el mismo gráfico",grande.innerHTML===compacta.innerHTML);
 check("La vista ampliada conserva la leyenda",notaGrande.textContent===actual.note);
 const bloques=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
 let validos=0;
 for(const b of bloques){try{new Function(b[1]);validos++}catch(_){/* fallo de sintaxis */}}
 check("Todos los bloques de JavaScript compilan",validos===bloques.length);
 for(const identificador of [
  "audit_bn_bulletins_079","auditoria_bn_0728_records","auditoria_bn_0728_sesion",
  "auditoria_bn_0732_speed_history_","renderFocus0755","plotMarch",
  "verifyBulletin0730","dMarchSvg0733","marchWide0756"
 ])check("Conserva funcionalidad: "+identificador,html.includes(identificador));
 check("Los tres formatos de importación siguen en código",
  html.includes(".xlsx,.xls,.pdf,.json"));
 check("No se incrustaron registros sintéticos en aplicación",
  !html.includes("PRUEBA-SINTETICA-3069"));
 return {total:pruebas.length,aprobadas:pruebas.filter(x=>x.ok).length,
  fallidas:pruebas.filter(x=>!x.ok).map(x=>x.nombre),detalle:pruebas};
}

if(typeof module!=="undefined"&&require.main===module){
 const fs=require("node:fs");
 const path=require("node:path");
 const nuevo=process.argv[2]||path.join(__dirname,"../pruebas/gps-0774-marcha-multicolor-experimental.html");
 const anterior=path.join(__dirname,"../pruebas/gps-0773-grafico-pdf-colores-experimental.html");
 const resultado=runRegresionMarcha0774(fs.readFileSync(nuevo,"utf8"),fs.readFileSync(anterior,"utf8"));
 process.stdout.write(JSON.stringify({candidato:nuevo,total:resultado.total,
  aprobadas:resultado.aprobadas,fallidas:resultado.fallidas},null,2)+"\n");
 if(resultado.fallidas.length)process.exitCode=1;
}
