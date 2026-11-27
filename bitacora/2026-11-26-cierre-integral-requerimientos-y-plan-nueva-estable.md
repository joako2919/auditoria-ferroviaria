# Auditoría Ferroviaria — Cierre integral y hoja de ruta
**Fecha:** 26 de noviembre de 2026 (actualizado con pruebas de la tarde)
**Proyecto:** Auditoría de Circulación Ferroviaria — Línea Belgrano Norte
**Origen de información:** conversaciones y capturas del auditor del 24, 25 y 26/11; comprobaciones de la 0.7.62 en Samsung S22; respaldo JSON integral recibido el 26/11; bitácoras precedentes y issues #4 y #5.
**Estado:** requerimientos acordados y diagnóstico. No supone que todos los cambios estén implementados ni validados. Este commit documental no altera la aplicación ni los datos.

## A. Decisión principal: nuevo piso estable
1. La 0.7.22, aun etiquetada como «estable», tiene problemas persistentes al importar bases y está obsoleta para el trabajo actual. **No recomendarla como versión operativa**. Preservar su código y referencias como antecedente histórico; NO sobrescribir el original.
2. **Usar la 0.7.62 experimental como base de consolidación**, recuperando únicamente mejoras verificadas de 0.7.54–0.7.61 y anteriores; no reintroducir defectos previos.
3. Crear una **nueva candidata estable con número distinto y superior** (nombre sugerido, pendiente de acuerdo: **0.7.63-RC1**). Publicar «0.7.63 estable» —o el número que resulte— solo después de pruebas de importación, integridad, auditoría básica y respaldo/restauración en el Samsung. **No basta cambiar el rótulo de la 0.7.62**.
4. La nueva estable puede habilitar los módulos confiables y dejar marcadas, aisladas o deshabilitadas las funciones aún experimentales (por ejemplo, alertas de carteles GPS). Así se obtiene pronto una base mejor que la 0.7.22 sin simular validación de funciones pendientes.
5. Antes de modificar el acceso principal de GitHub Pages: copia/versionado del HTML actual, respaldo JSON del dispositivo, validación en URL separada, checklist de integridad, confirmación del auditor y posibilidad inmediata de revertir. Cuidado: versiones del mismo origen web pueden compartir almacenamiento local.
6. Congelar mejoras de módulos ya validados (con pruebas de regresión) y continuar nuevas funcionalidades en rama/copia experimental separada. Dejar changelog de qué se cambió, qué se probó, resultado y cómo revertir.

## B. Hechos comprobados hoy — diferenciar de pendientes
- 0.7.62 abrió mediante enlace directo GitHub Pages en el Samsung S22, sin descarga manual de GitHub.
- Bases en pantalla: **390 personal**, **177 señales P**, **6 precauciones del boletín 26/11/2026**. Velocidades también mostró **6** y el mismo boletín: consistencia visible. No equivalen por sí solas a validación documental de vigencia, PK, vía y restricciones.
- Velocidades: **29 reglas permanentes H21** consultables. El panel de tres carteles fue trasladado a **Velocidades**; continúa con controles asistidos/manuales.
- GPS servicio **3084**: aviso rojo por más de 2.000 segundos sin lecturas; el botón rojo «Reanudar GPS» inicialmente quedó bloqueado; el inspector recuperó el seguimiento mediante «Iniciar seguimiento GPS». Más tarde el botón rojo respondió mejor, pero esto **no acredita resolución definitiva de la falla**.
- En «3. Novedades de recorrido», selección de PK mediante sugerencias horizontales obligó a desplazarse de 0/000 a aproximadamente 14/500. El campo permite escribir PK directamente; urge buscador mejor.
- Se observaron avisos experimentales a aproximadamente **1.181 m y 786 m** del inicio PK 21/300 (60 km/h), y a **295 m** del PK 32/200 (40 km/h). El inspector informó **selección manual previa de precaución/PK**: no está demostrada automatización autónoma PDF + GPS.
- La proximidad GPS puede tener incertidumbre de cientos de metros (capturas: ±171 m y ±138 m). El GPS puede dar coordenadas frescas sin PK determinado. **No declarar presencia/ausencia de carteles ni infracciones** a partir de ello.
- Servicio **3095**: gráfico en marcha mostró al menos 454 muestras y 3 interrupciones >25 s a las 17:10. El respaldo final contiene registros adicionales: **17 movimientos** desde Retiro a Grand Bourg y una evolución de demoras útil para pruebas; no mezclar conteos intermedios con cierre.
- El respaldo integral JSON del 26/11 contiene servicios anteriores, eventos de GPS, novedades e información privada de personal; **no subirlo al repositorio público ni usar datos personales en ejemplos**.
- En el Samsung se configuró rutina **martes a sábado, 14:00–22:00, tiempo de espera de pantalla 10 minutos**. El inspector observó mejoría transitoria de continuidad GPS y recuperación. No mantiene Chrome garantizado con pantalla bloqueada.
- No consta prueba íntegra satisfactoria de restauración del respaldo o de todos los formatos de importación. No se han aplicado hoy nuevas correcciones de código para los problemas detectados en la tarde: hay diagnóstico y trazabilidad.

## C. Prioridades para la próxima sesión
### P0 — Consolidación y nueva candidata estable mejorada (PRIMERO)
C1. Partir del archivo existente de 0.7.62 y crear copia de candidata, no reemplazar ni la 0.7.22 ni los registros actuales.
C2. **Importadores Excel / PDF / JSON** para personal, señales P, precauciones y actualización H21/H22: seleccionar archivo desde dispositivo/Drive, leer, mostrar vista previa, validar, guardar, confirmar persistencia tras cerrar/abrir página, reabrir/consultar versión cargada, exportar/restaurar. Diferenciar inequívocamente «leído», «pendiente de guardar» y «guardado». Prevenir duplicados, errores silenciosos y sobrescritura indebida. Probar sin red o indicar dependencia clara de bibliotecas CDN; no afirmar offline si no lo es.
C3. Historial por fecha/servicio y dotación: inicio, cierre, informe y recuperación de auditoría, sin mezcla de IDs ni reseteo de novedades; numerar novedades por auditoría desde 1; conservar datos existentes. Respaldos JSON antes/después y verificación de integridad. Corregir inconsistencia en identificación visible de versión (título del navegador 0.7.61 vs encabezado 0.7.62) y etiqueta de versión del formato de respaldo 0.7.48 sin modificar compatibilidad automáticamente.
C4. Smoke test móvil sobre una auditoría de prueba aislada: servicio/dotación, H21 y cabeceras, GPS con coordenadas, registro manual de estación/novedad, consulta de bases, informe, cierre, exportación, reingreso y restauración. Sin cambios en el historial real. Lo que no pase queda señalizado experimental, no se declara estable.
C5. Definir ubicación y URL definitiva de la nueva estable, ruta de rollback y acta de aprobación del auditor; solo entonces plantear cambio de enlace principal.

### P1 — GPS, estaciones y recuperación
G1. Corregir el botón rojo «Reanudar GPS» para usar la misma rutina real que «Iniciar seguimiento GPS» **sin reiniciar ni duplicar auditoría**, ni borrar datos. Estado explícito: reanudando / esperando lectura / recuperado / error. Aviso rojo desaparece tras lectura nueva válida y no tapa la pantalla indebidamente.
G2. Registrar automáticamente cortes, duración y recuperación; no interpolar tramos perdidos ni inventar llegada/partida. Distinguir coordenadas GPS obtenidas de PK/vía no validados. Mantener corrección de PK manual.
G3. Reconocer geográficamente las **23 estaciones H21**, con especial consideración de la plataforma extensa y túnel de **Aristóbulo del Valle**. Conservar **Cecilia Grierson** y no reintroducir **Scalabrini Ortiz** como parada H21. Registrar arribo, partida/paso según corresponda; comparar plan y real en minutos y segundos; evitar partida ficticia en terminal Villa Rosa, estaciones omitidas y horas aparentes producidas por pérdida GPS.
G4. Detenciones fuera de estación solo por **parada real >10 s**, no simple reducción de velocidad; aviso para observación y causa, PK/estación y horas de inicio/fin; revisión humana obligatoria.
G5. Límite web reconocido: Chrome Android puede suspender GPS al bloquear la pantalla, cambiar a llamadas/WhatsApp o entrar en segundo plano. Rutina S22 de 10 min ayuda, pero NO equivale a seguimiento continuo ni reemplaza solución nativa. Android en etapa posterior: servicio de ubicación apto para primer plano/segundo plano con permisos, notificación y pruebas reales, preferentemente reutilizando la web y sus datos.

### P1 — Carteles, precauciones y velocidades GPS (integración prioritaria)
V1. El motor debe **tomar automáticamente la última base de boletín oficial validado del día** (PDF importado localmente), identificar el tramo, vía y sentido del servicio, usar GPS/PK con incertidumbre visible y **proponer controles sin que el auditor seleccione a mano la precaución ni ingrese PK**. Si no hay certeza suficiente, indicar «requiere verificación» y mantener respaldo manual.
V2. Los controles de cartel **Aviso / Inicio / Fin** deben surgir en la secuencia de aproximación correspondiente y requerir constatación física por el auditor: **Presente, Ausente, Anomalía, No observado**. «Marcar leído» reconoce la notificación, **no** verifica el cartel. Registrar hora, tipo, PK/ubicación, precisión, observación y auditoría en informe/dashboard.
V3. Distancias: se probaron bandas experimentales de **1.200 m / 800 m**; hoy también se mencionó una referencia de **600 m**. **Cotejar contra reglamentación/boletín y criterio operativo antes de fijar distancias**. No inventar ubicación de carteles; permitir parámetros validados para cada caso.
V4. Control de velocidad del tren en relación con **H21 permanente y precaución provisoria del PDF**: comparar únicamente con condiciones verificadas de sentido/vía/tramo/vigencia; no usar línea H21 como sustituto de restricción provisoria. Si hay restricciones coincidentes, exponer todas y la aplicabilidad validada; nunca calificar automáticamente una infracción.
V5. **Gráfico de velocidades con tres curvas/techos:** (a) velocidad GPS, línea continua turquesa/azul; (b) **techo permanente H21, línea punteada negra** a lo largo del trazado aplicable; (c) **techo provisorio boletín, línea punteada marrón/beige oscuro** *solo dentro de los tramos vigentes validados*, con inicio/fin resaltados. Fuera de restricción, conservar la referencia permanente. Eje vertical numérico km/h, eje temporal y, donde corresponda, PK; leyenda visible incluso en celular y trazos suficientemente contrastados. Huecos GPS marcados sin unir ficticiamente puntos.
V6. Caso de prueba del 26/11: aviso al inicio **32/200 (40 km/h)** mientras había una restricción documental previa señalada **31/480–32/200 (30 km/h)**. Revisar y validar documentalmente el tramo vigente en cada instante y el comienzo del siguiente; no omitir la precaución actual al anunciar una futura. PK aproximadamente 31/987 ±138 m: margen insuficiente para certeza de cartel físico.
V7. **Sonido del aviso débil:** diseñar patrón auditivo claramente reconocible, tono más perceptible y/o repetición corta, conservar vibración y aviso visual. Probar en Samsung con volumen multimedia configurado por usuario y permisos/limitaciones de Chrome; el sitio no puede forzar volumen del sistema ni asegurar sonido con pantalla bloqueada. No emitir alertas genéricas falsas ni saturar al inspector.
V8. Precauciones importadas incoherentes: mantener documento original, aviso **amarillo**, archivo de anomalías separado (pendiente de denuncia/cotejo), bloquear alertas automáticas con esos PK hasta boletín oficial corregido. Antecedente del 25/11: **ascendente 31/480 → 00/088, 30 km/h** incoherente; no reparar automáticamente inventando 32/200. Separar cierres PAN de las restricciones de velocidad. Confirmar vigencia local del boletín.

### P1 — Dashboard, gráficos y criterios visuales
D1. Dashboard completo: horarios programados/reales H21, diferencias y permanencias por estación (±m:ss), estación actual/destino, adelantos, atrasos, recuperación de demora, detenciones extraordinarias, GPS continuo/interrumpido, velocidades H21 y provisorias, carteles observados/faltantes/anómalos/no vistos, auditorías por servicio/día y novedades. Diferenciar **0**, **sin registros** y **sin validación**.
D2. Preservar y asignar con reglas comprobables los seis colores: **celeste, verde, amarillo, naranja, rojo, violeta**. Escala confirmada parcialmente por auditor: verde demoras **<3:00**, naranja **3:00 a 5:00** (fronteras a confirmar), rojo **>5:00**; **definir significado y umbrales de celeste/amarillo/violeta con el auditor antes de programarlos**. Mostrar contadores de cada color, incluido cero si el cálculo es válido; no colocar «No cuantificado» como sustituto de cero.
D3. El «gráfico de hilo» / marcha H21 vs real debe colorear puntos y tramos por magnitud y **evolución** de la diferencia, con escalas temporales y estaciones. Distinguir demoras crecientes, recuperadas y adelantamientos; recuperar tiempo no equivale a llegar puntual; no completar estaciones sin marca.
D4. Caso real servicio **3095**: los primeros tramos con demora <3 min, cambio intermedio en Montes/Don Torcuato, naranja en tramo medio, rojo en Los Polvorines y Pablo Nogués, mejora final hacia Grand Bourg. Según revisión del respaldo: **11 verde, 4 naranja, 2 rojo** en 17 movimientos. Contrastar con datos reales para pruebas, sin degradar historial. El violeta no debe inventarse por superar 5 min sin umbral acordado.
D5. Gráficos ampliados y compactos: ejes con regla numérica, líneas guía, unidades (min:ss, km/h, tiempo, estación/PK), etiquetas completas, controles «Actualizar/Cerrar» funcionales, tamaño adecuado Samsung S22, evitar duplicados, blancos enormes, textos cortados y mensaje «sin suficientes datos» cuando hay series reales. Ver gráficas sin depender del desplazamiento horizontal para conocer escalas; ampliar detalle si necesario.
D6. Mostrar diferencias de velocidad solo con calidad GPS/PK verificada; no atribuir incumplimientos a conductor a partir de incertidumbre o huecos.

### P2 — Uso en terreno y documento del boletín
U1. «3. Novedades de recorrido»: reemplazar sugerencias horizontales interminables de PK por **buscador vertical filtrable** por número de PK, estación o referencia; permitir escribir directamente «14/520», referenciar alcantarilla, usar GPS sugerido cuando confiable, y registrar por voz/manual sin perder texto. Prueba: llegar al PK deseado en ≤3 acciones.
U2. Operación móvil rápida: simplificar textos y secciones, reducir pasos y alertas de ensayo visibles, priorizar Servicio, Dotación, GPS, Velocidades, Bases, Estadísticas e Informe; no esconder los tres carteles en GPS ni exigir navegación excesiva.
U3. Del PDF diario: mostrar **resumen breve y consultable de cada precaución** y de los dos apartados de instrucciones de Transporte; mantener fuente completa disponible. Se pidió reducir párrafos extensos a 3–4 palabras por aviso cuando sea viable **sin perder condición crítica, ubicación, sentido, vigencia ni seguridad**. Esto es menor prioridad que automatización y confiabilidad.
U4. Base de señales P por vía principal (177 registros cargados en prueba): para control GPS automático futuro hacen falta **PK y vía validados**, no dar por georreferenciados registros solo por estar cargados.
U5. Modo sin conexión: la auditoría y lectura de bases ya cargadas deben persistir localmente; importadores y voz sin conexión requieren prueba real y solución específica, no afirmar capacidad offline si depende de CDN o APIs disponibles solo online.

## D. Menú exacto de trabajo para esta noche o mañana
**Fase 1 — respaldo y base:** comprobar archivo de respaldo del 26/11; preservar historial y original 0.7.22; crear candidata de estable desde 0.7.62, sin publicar en producción.
**Fase 2 — estabilidad mínima verificable:** revisar importadores (PDF/Excel/JSON) y guardado; auditoría/H21, dotación, novedades, historial, exportación y restauración; corregir identificación de versión. Probar en celular con copia aislada.
**Fase 3 — publicar nuevo piso estable si pasa pruebas:** exigir conformidad del auditor; asignar número y URL separados; conservar capacidad de revertir. Los módulos avanzados no probados permanecen con etiqueta experimental.
**Fase 4 — avanzar experimental en paralelo:** GPS reanudar, buscador PK, carteles automáticos por boletín y GPS, doble techo H21/provisorio en velocidades, avisos sonoros y dashboard/gráficos de seis colores.
**Fase 5 — trazabilidad:** por cada corrección anotar problema, fuente, archivo/commit, prueba, resultado y pendientes; jamás eliminar registros históricos para corregir interfaz.

## E. Referencias y estado de GitHub
- Base de código probada visualmente: pruebas/gps-0762-carteles-velocidades-gps-asistido-experimental.html en rama main.
- 24/11: bitacora/2026-11-24-mejoras-0756-graficos-alertas-carteles.md
- 25/11: bitacora/2026-11-25-validacion-inconsistencias-0757.md
- 25/11: bitacora/2026-11-25-cierre-sesion-y-plan-26-11.md
- 26/11 mañana: bitacora/2026-11-26-rectificacion-cierre-y-base-0762.md
- Issues de campo: #4 (GPS rojo y selector PK) y #5 (gráficos/límites/demoras).
- No subir al repositorio el **respaldo JSON con información privada** ni fotos/documentos internos sin autorización.
- **Este documento es especificación y cierre de trabajo, no certificación operativa.** Hasta nueva prueba y aprobación, la 0.7.62 sigue siendo experimental y la 0.7.22 histórica sigue sin sustituirse en GitHub Pages.

**Punto de continuidad:** abrir ESTE documento y comenzar por candidata estable + importadores, no rehacer H21 ni volver a probar tareas ya cerradas.

## F. Complemento nocturno del 26/11 — Tendencia PCZ, diferencia mm:ss y seguridad de acceso
**Evidencias:** tres capturas de Estadísticas, servicio 3095, tomadas entre las 20:10 y 20:11; comprobación directa del HTML experimental 0.7.62 en GitHub. **Ningún cambio del código de la aplicación se confirma con esta nota**.

### Incidencia P1 — Tendencia hacia destino no es comprensible ni útil para PCZ
- Captura muestra sección «Tendencia hacia destino» casi vacía, únicamente línea horizontal punteada con marca 0, y texto: destino Grand Bourg, H21 17:33:00, llegada estimada 17:37, desviación proyectada +4,6 min, basada en cinco observaciones. Pese a existir diferencias reales por estación, el trazado real y el proyectado no se distinguen en móvil.
- Código revisado: función `updateTrend0720()` de la experimental 0.7.62 toma hasta cinco últimas estaciones con `diff`, estima pendiente mediante regresión lineal entre índice de estación y demora expresada en minutos, extrapola hasta destino y dibuja polilínea roja real y tramo violeta discontinuo supuesto. **No incorpora causas, detenciones no previstas, acciones PCZ, tramos sin datos ni una evaluación confiable de continuidad de tendencia.**
- El color **violeta** de este módulo no aparece si la **proyección a destino** es ≤5 min, aunque la **demora real actual** haya sido >5 min. Por ejemplo, servicio 3095 tuvo +5:59 en Los Polvorines y +5:06 en Pablo Nogués, pero al final la demora registrada fue +4:36, por lo que no hay alerta violeta en la proyección de +4,6 min. No cambiar el umbral violeta arbitrariamente: acordar semántica de los seis colores y separar «demora real» de «alerta de deterioro de tendencia».
- **Requerimiento:** sustituir gráfica vacía por vista legible de **demora real H21 por estación**, con ejes, valores `±m:ss` y seis colores según reglas acordadas; indicar si entre estaciones se ganó/perdió tiempo; añadir proyección gráfica hacia próximas estaciones y destino solamente si hay cantidad/calidad suficiente de marcas y siempre etiquetada como **estimación no validada**. Mostrar fecha/hora de corte, estación actual, destino, tiempo/estaciones restantes, porcentaje de traza con marcas, calidad GPS, intervalo de incertidumbre y aviso si no hay suficientes datos; no interpolar huecos.
- **Orientación PCZ:** habilitar un aviso breve y explicable para que **el inspector evalúe comunicar** deterioro persistente y proyección de demora al Puesto de Control Zonal, sin recomendar automáticamente suspensión/corte de servicios, asignación de vía o decisiones de seguridad. La gestión de circulación corresponde al PCZ con fuentes operativas corroboradas; evitar falsa precisión predictiva.
- **Cuando ya haya llegada real a destino**, mostrar resultado observado (por ejemplo, Grand Bourg 17:37:36 frente a 17:33:00 = +4:36) en vez de titularlo «estimado» o proyectarlo retrospectivamente; la curva de tendencia pasa a evolución histórica.
- **Prueba de aceptación:** en el respaldo 3095, ver progresión Montes +2:51, Don Torcuato +3:15, A. Sourdeaux +3:44, Villa de Mayo +4:52, Los Polvorines +5:59, Pablo Nogués +5:06, Grand Bourg llegada +4:36; destacar recuperación de 1:23 desde Polvorines, sin inventar una demora violeta. Cuando las estaciones carezcan de marcas, debe informarse ausencia de cálculo; cuando el servicio esté cerrado, debe informarse resultado real.

### Regresión P0 — Diferencias H21 siguen en segundos pese a requerimiento antiguo mm:ss
- Capturas: tabla de Horarios y permanencias muestra la columna «Dif. H21» como `+58 s`, `+70 s`, `+100 s`, `+141 s`, `+195 s`, `+292 s`, `+359 s`, `+306 s`, `+276 s`.
- **Causa concreta en código:** en el script `integralH21GPS0730`, la función `const mark=x=>x==null?'—':(x>0?'+':'')+Math.round(x)+' s';` se usa en la tabla `#dwellRows0730`. En el MISMO código existe `mmss0756(v)` que devuelve diferencias `±m:ss`. Se debe reusar una única función de presentación sin reescribir datos persistidos: `+58 s→+0:58`, `+100 s→+1:40`, `+141 s→+2:21`, `+359 s→+5:59`; adelantos con signo negativo; `0:00` si hay dato cero y raya cuando falta.
- **Diseño móvil:** nombres de estación y columnas se cortan por ancho; render responsivo legible en pantalla Samsung (fila por estación, o tarjetas con etiquetas) y opción tabla ampliada/exportable sin scroll forzado de cabeceras.
- **Prueba de regresión obligatoria** en versión estable candidata: TODOS los paneles, tablas, informes, gráficos, exportaciones y vistas A4 deben mostrar al usuario las diferencias en m:ss sin convertirlas otra vez en segundos. Mantener datos internos en segundos para precisión aritmética.

### Nota de credenciales privadas (NO reproducir contenido)
- El auditor aclaró una contraseña de acceso por chat. **NO registrar su texto ni forma exacta en repositorio, bitácora, issue o código cliente HTML/JavaScript**; cualquier clave embebida en cliente público puede ser vista por terceros. Si existe autenticación real, definir acceso mediante backend/servicio adecuado y almacenamiento seguro, o revisar el mecanismo. Este cierre solo anota el requisito de tratarla como **credencial privada**.

### Próxima sesión
1. Comprobar respaldo JSON anterior a cualquier migración. En copia de 0.7.62 destinada a nueva estable, corregir `mark()` → formato común de `m:ss` y tabla responsive; conservar historicidad.
2. Rediseñar tendencia / PCZ con valores de servicio 3095 y criterios de alerta explícitos; distinguir atraso real de proyección y serie sin datos.
3. Probar en Samsung S22 y documentar resultado. No declarar resuelto sin evidencia; no publicar como versión estable hasta completar checklist de integridad e importadores.

**Referencias de incidencias previas:** #4 (pérdida GPS y PK), #5 (gráficos, colores, límites). Este apéndice extiende #5.


## G. Rectificación del color violeta — criterio ratificado por el auditor la noche del 26/11
**Esta sección prevalece sobre cualquier frase anterior de esta bitácora que limite el violeta únicamente a una proyección a destino o que indique no definir aún su disparador básico.**

- **REQUISITO OBLIGATORIO:** durante una auditoría en curso, **en cualquier estación intermedia o cabecera** donde una marca real utilizable y cotejada con el H21 registre una **demora superior a +5:00 minutos**, generar de inmediato una **alerta violeta**, visible en Estadísticas/dashboard, gráfico de hilo y tendencia, sin esperar a la llegada ni al cálculo final.
- El disparador es la **demora observada de la estación**, no la extrapolación matemática de `updateTrend0720()`. Esa proyección puede ser una información adicional, nunca un filtro que impida alertar un exceso ya ocurrido.
- **Retener el historial de alertas** con estación, servicio, fecha/hora, demora `+m:ss`, origen/calidad del registro y estado de atención, aunque el servicio recupere posteriormente la demora. No quitar ni reescribir la alerta cuando el destino marque menos de cinco minutos.
- **Servicio 3095 como prueba de aceptación:** Los Polvorines `+5:59` ⇒ alerta violeta; Pablo Nogués `+5:06` ⇒ alerta violeta; Grand Bourg `+4:36` ⇒ recuperación y sin nueva alerta por ese dato, **conservando las dos previas**. Mostrar el descenso de demora en la tendencia y la recuperación acumulada desde el máximo. En una estación con GPS o marca horaria insuficiente, informar «sin dato verificable», no producir falsos positivos.
- **Paleta transversal obligatoria:** celeste, verde, amarillo, naranja, rojo, violeta en el dashboard y TODOS los gráficos a los que apliquen las categorías operativas, con su leyenda y contadores incluso en cero. Conservar los colores de magnitud de demora y superponer un **marcador/borde/banda/ícono violeta de alarma** cuando corresponda, evitando que dos codificaciones se confundan. La clasificación visual y los umbrales específicos que aún no estén cerrados no deben inventarse: este acuerdo **sí fija** el umbral de disparo violeta como `demora real > +5:00`.
- **Orientación PCZ:** la alerta violeta solicita atención del inspector y puede motivar información al Puesto de Control Zonal, con datos cotejados, evolución, tendencia y estación actual. **No** ejecuta ni recomienda automáticamente cortar un servicio; las decisiones operativas corresponden al PCZ y a los responsables habilitados.
- **Corrección de código pendiente (no implementada por esta edición):** desacoplar alerta violeta de `critical=projected>5` en `updateTrend0720()`; agregar evaluación de marcas reales por estación y persistencia de alertas por auditoría, sin confundir «proyección de demora» con «demora observada». Probar que la alarma emerge cuando la estación cruza el umbral en tiempo real.
- **Compatibilidad:** no afectar el respaldo JSON, los horarios, la identificación de servicio, la importación de bases ni la versión estable en producción.

**Criterio inequívoco para seguir:** **violeta en el momento y lugar donde la demora verificada supera 5 minutos**, no solo en destino, manteniendo los demás colores y las evidencias históricas.


## H. Política permanente: pruebas de regresión obligatorias
**Decisión confirmada por el auditor:** en cada mejora del software, aplicar **siempre** pruebas de regresión antes de dar el cambio por terminado o ascender una versión a estable. No basta que el módulo modificado funcione: también deben seguir funcionando los módulos relacionados y los que ya habían sido validados.

### Procedimiento obligatorio de cada cambio
1. **Antes:** revisar bitácora, incidencias, código actual y resultados de pruebas previas; preparar respaldo JSON y copia/versionado del código sin tocar el historial real.
2. **Cambio pequeño y trazable:** crear o corregir un componente aislado; anotar archivo, versión/commit, motivo y conducta esperada.
3. **Prueba específica:** verificar con datos de ejemplo o copia aislada que la nueva corrección funcione.
4. **Pruebas de regresión:** repetir los casos importantes ya superados y los que pueden verse afectados. Mantener una lista de controles permanentes para evitar olvidos.
5. **Validación en Samsung S22:** cuando el cambio afecta interfaz, GPS, archivos o circulación, realizar las pruebas móviles pertinentes; separar prueba técnica de verificación de campo.
6. **Cierre:** registrar resultado **aprobado / fallido / no ejecutado**, evidencia, incidencia y acciones pendientes. Si falla, no etiquetar estable ni sustituir la versión operativa; conservar ruta de reversión.

### Lista base mínima de regresión
- Importadores personal, señales, boletín e itinerarios: **PDF, Excel, JSON** según módulo; lectura, vista previa, validación, guardado, persistencia tras recarga, exportación y restauración (notar dependencia CDN/offline).
- H21 y estaciones: 23 estaciones; **Aristóbulo del Valle y Cecilia Grierson conservadas**, Scalabrini Ortiz ausente según H21; selección de servicio/dotación/cabeceras.
- Horarios: arribo, partida, paso, permanencia, diferencia y reportes **en ±m:ss** en todas las vistas; datos faltantes no inventados.
- Historial: cada servicio/fecha aislado, novedades numeradas, sin pérdida ni duplicación de registros al abrir/cerrar/reanudar; JSON de respaldo íntegro.
- GPS: pérdidas, reanudación del botón rojo sin crear auditoría, distinción entre coordenadas y PK validado, cortes sin falsas marcas.
- Carteles y velocidades: boletín vigente, sentido/vía/PK y precisión, aviso/inicio/fin observados manualmente, precauciones provisoria y permanente diferenciadas, avisos sonoros/vibratorios.
- Dashboard y gráficos: seis colores (incluido **violeta por demora real >5:00 en cualquier estación**), escalas y unidades, atraso/recuperación, tendencia, cero vs sin datos, sin duplicados ni recortes en Samsung.
- Seguridad: no publicar bases privadas, datos personales o claves en repositorio; no borrar información productiva para resolver fallos.

**Criterio de aprobación:** un cambio solo pasa a "corregido y verificado" con evidencias de pruebas correspondientes. Hasta entonces es "implementado, pendiente de pruebas". Una versión nueva solo se declara estable tras superar la lista de regresión y obtener aprobación de su uso.
