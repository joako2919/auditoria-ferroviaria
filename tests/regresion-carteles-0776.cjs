#!/usr/bin/env node
/* Pruebas sintéticas de precauciones provisorias, sin datos de personas ni auditorías reales.
   Ejecutar: node tests/regresion-carteles-0776.cjs [archivo-0776.html] */
"use strict";
const fs=require("node:fs"), assert=require("node:assert/strict"),path=require("node:path");
const input=process.argv[2]||"pruebas/gps-0776-carteles-doble-ventana-experimental.html";
const html=fs.readFileSync(path.resolve(input),"utf8");
const script=html.match(/<script id="alertasCarteles0776Js">([\s\S]*?)<\/script>/)?.[1];
if(!script)throw Error("Falta módulo de alertas 0776 dentro del HTML.");
function fixture({dir="asc",verified=true,rows}={}){
 const dom={},css=new Set(),store={},records=[],buttons=[];
 const mk=id=>{
  const n={id,hidden:false,value:"",textContent:"",children:[],
   classList:{contains:x=>css.has(x),toggle:(x,on)=>on?css.add(x):css.delete(x)},
   appendChild(ch){this.children.push(ch);if(ch.id)dom[ch.id]=ch;return ch},
   setAttribute(){},addEventListener(k,cb){this["on"+k]=cb},closest(){return null},
   querySelectorAll:q=>q==="[data-v]"?buttons:[],
   set innerHTML(s){this._html=s;
    for(const m of s.matchAll(/id="([^"]+)"/g))if(!dom[m[1]])dom[m[1]]=mk(m[1]);
    if(s.includes("data-v="))for(const v of ["visto","no_visto","no_controlado"]){const b=mk("b-"+v);b.dataset={v};buttons.push(b)}
   },get innerHTML(){return this._html||""}
  };return n;
 };
 for(const id of ["verifyBulletin0730","direction076","herramientasPanel0742"])dom[id]=mk(id);
 dom.verifyBulletin0730.checked=verified;dom.direction076.value=dir;
 const document={readyState:"complete",getElementById:id=>dom[id]||null,
  createElement:()=>mk(""),head:mk("head"),body:mk("body")};
 let audit={id:"FICTICIO-A",tren:"PRUEBA",state:"en_curso",direction:dir,fecha:"2026-11-28"};
 const window={AuditoriaGPS0728:{getActive:()=>audit},AuditoriaAvisos0745:{emit:()=>{}}};
 const localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>store[k]=v};
 const restrictions=rows||[{inicio:"33/180",fin:"34/380",via:"asc",velocidad:30,_fuente:"PDF FICTICIO"}];
 let persists=0;
 new Function("document","window","localStorage","restrictionList076","records076","persist076","setInterval",script)(
  document,window,localStorage,()=>restrictions,records,()=>{persists++},()=>0);
 return {
  tick(pk,extra={}){store["auditoria_bn_0732_speed_history_"+audit.id]=JSON.stringify([{
   pk,t:extra.t??Date.now(),gpsAccuracy:extra.gpsAccuracy??5,pkAccuracy:extra.pkAccuracy??10}]);
   window.AuditoriaCarteles0776.tick()},
  reply(v){const b=buttons.find(x=>x.dataset.v===v);assert.ok(b?.onclick);
   b.onclick();dom.alertaGuardar0776.onclick()},
  get view(){return {open:!dom.alertaCartel0776.hidden,big:css.has("grande0776"),
   title:dom.alertaTitulo0776.textContent}},
  get records(){return records},get persists(){return persists},
  changeAudit(id){audit={...audit,id}}
 };
}
const tests=[];
function test(label,fn){try{fn();tests.push([label,true]);process.stdout.write("✓ "+label+"\n")}
 catch(e){tests.push([label,false]);process.stderr.write("✗ "+label+": "+e.message+"\n")}}
test("Preaviso pequeño del primer cartel a 1200 m",()=>{
 const f=fixture();f.tick("31/180");assert.equal(f.view.open,true);assert.equal(f.view.big,false);assert.match(f.view.title,/AVISO/)});
test("Ventana grande de Aviso en proximidad",()=>{
 const f=fixture();f.tick("32/270");assert.equal(f.view.big,true)});
test("Lo vi registra confirmación visual",()=>{
 const f=fixture();f.tick("32/270");f.reply("visto");assert.equal(f.records[0].resultadoVisual0776,"visto")});
test("Inicio se muestra primero pequeño",()=>{
 const f=fixture();f.tick("32/270");f.reply("visto");f.tick("32/381");assert.match(f.view.title,/INICIO/);assert.equal(f.view.big,false)});
test("Inicio abre ventana grande",()=>{
 const f=fixture();f.tick("33/060");assert.equal(f.view.big,true)});
test("No lo vi no implica faltante",()=>{
 const f=fixture();f.tick("33/060");f.reply("no_visto");assert.equal(f.records[0].resultadoVisual0776,"no_visto");assert.notEqual(f.records[0].result,"faltante")});
test("No pude controlarlo no equivale a No lo vi",()=>{
 const f=fixture();f.tick("33/060");f.reply("no_controlado");assert.equal(f.records[0].resultadoVisual0776,"no_controlado")});
test("Fin muestra aviso pequeño a 800 m",()=>{
 const f=fixture();f.tick("33/580");assert.equal(f.view.big,false);assert.match(f.view.title,/FIN/)});
test("Fin abre ventana grande",()=>{
 const f=fixture();f.tick("34/260");assert.equal(f.view.big,true)});
test("Superación del PK cierra sin respuesta",()=>{
 const f=fixture();f.tick("34/260");f.tick("34/416");assert.equal(f.records.length,1);assert.equal(f.records[0].resultadoVisual0776,"sin_verificar")});
test("No duplica cartel cerrado",()=>{
 const f=fixture();f.tick("34/260");f.tick("34/416");f.tick("34/500");assert.equal(f.records.length,1)});
test("Boletín no cotejado impide alertas",()=>{
 const f=fixture({verified:false});f.tick("32/270");assert.equal(f.view.open,false)});
test("GPS con error alto impide alerta",()=>{
 const f=fixture();f.tick("32/270",{gpsAccuracy:60});assert.equal(f.view.open,false)});
test("PK impreciso impide alerta",()=>{
 const f=fixture();f.tick("32/270",{pkAccuracy:125});assert.equal(f.view.open,false)});
test("Lectura GPS vencida impide alerta",()=>{
 const f=fixture();f.tick("32/270",{t:Date.now()-60000});assert.equal(f.view.open,false)});
test("Dirección descendente: aviso pequeño y grande",()=>{
 const f=fixture({dir:"desc",rows:[{inicio:"34/380",fin:"33/180",via:"desc",velocidad:30,_fuente:"PDF FICTICIO"}]});
 f.tick("36/380");assert.equal(f.view.big,false);assert.match(f.view.title,/AVISO/);
 f.tick("35/290");assert.equal(f.view.big,true)});
test("Auditorías separadas no mezclan resultados",()=>{
 const f=fixture();f.tick("32/270");f.reply("visto");f.changeAudit("FICTICIO-B");f.tick("32/270");
 assert.equal(f.view.open,true);assert.equal(f.records[0].auditId,"FICTICIO-A")});
test("Funciones de detenciones 0775 preservadas",()=>{
 assert.match(html,/ventanaDetencion0775/);assert.match(html,/function targetStop\(\)/)});
test("Diagrama multicolor preservado",()=>{
 assert.match(html,/function renderFocus0755\(\)/);assert.match(html,/dMarchSvg0733/)});
const bad=tests.filter(x=>!x[1]).length;
process.stdout.write("\nRegresión 0776: "+(tests.length-bad)+"/"+tests.length+" aprobadas\n");
if(bad)process.exitCode=1;
