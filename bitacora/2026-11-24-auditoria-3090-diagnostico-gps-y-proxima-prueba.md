# Diagnóstico de campo — servicio 3090 — 24/11/2026

**Proyecto:** Auditoría de Circulación Ferroviaria, Línea Belgrano Norte.
**Versión de interfaz comprobada por capturas:** experimental 0.7.54.
**Material examinado (privado, no subido al repositorio):** capturas de pantalla y dos respaldos JSON entregados por el auditor, uno por servicio y uno integral. **No publicar JSON privados**: contienen dotación, datos personales y coordenadas GPS.
**Estado:** diagnóstico técnico parcial; no implica validación ferroviaria operativa ni aprobación de medidas de seguridad.

## Registro del recorrido
- Servicio **3090**, fecha **24/11/2026**, sentido descendente, trayecto efectivamente auditado **Carapachay → Retiro**.
- ID de auditoría en los datos: `BN-2026-11-24-3090-mwv1vi7o`.
- El historial de la versión 0.7.54 contiene correctamente las tres fichas independientes: **3102 (21/11), 3105 (21/11), 3090 (24/11)**.
- Capturas parciales a las 16:00 y 16:14 mostraban contadores evolutivos; el cierre completo debe evaluarse con el respaldo posterior, no con una captura parcial.

## 1. Movimientos GPS registrados (sujetos a cotejo manual)
| Estación | Tipo | H-21 | Hora GPS estimada | Desvío |
|---|---|---|---|---|
| Carapachay | partida | 15:51:00 | 15:51:26 | +26 s |
| Munro | partida | 15:54:00 | 15:54:38 | +38 s |
| M. M. Padilla | partida | 16:00:00 | 16:00:08 | +8 s |
| Aristóbulo del Valle | partida | 16:04:00 | 16:04:29 | +29 s |
| Ciudad Universitaria | partida | 16:09:00 | 16:09:03 | +3 s |
| Saldías | partida | 16:15:00 | 16:15:11 | +11 s |
| Retiro | llegada | 16:22:00 | 16:22:57 | +57 s |

- **Total** 7 movimientos: 6 partidas y 1 llegada. **Florida, partida teórica 15:57**, está programada pero no presenta marca GPS automática.
- El sistema **no cuenta con arribos intermedios**; por ello **no puede calcular permanencias reales verificadas** en andén. La igualdad de tiempos teóricos y GPS en algunos eventos no significa validación operativa.
- GPS en Aristóbulo del Valle registró partida estimada con precisión alrededor de ±49 m; en el recorrido aparecieron **avisos de lecturas imprecisas hasta ±535 m**, no asignadas a marcas automáticas.

## 2. Continuidad de geolocalización
- El registro de continuidad del servicio 3090 contiene **4 eventos GPS_LOST** con posterior **GPS_RESTORED**.
- Duraciones registradas: **164 s, 45 s, 11 s y 45 s** (total de tramos sin lectura reciente, **265 s**); no presumir continuidad absoluta durante el viaje.
- La ausencia de marca automática en **Florida** coincide temporalmente con la interrupción de **164 s** (aprox. 15:57:24 a 16:00:08).
- Los avisos de GPS recuperado reflejan el retorno de lecturas, **no un regreso a cero ni un cambio de tren**.

## 3. Detención experimental
- Se archiva **1 detención GPS experimental de 27 s** cerca de **PK estimado 1/639**. **No constituye por sí sola una irregularidad ferroviaria**; verificar detención real, progresiva, estación o fuera de estación, hora y causa.
- Otros eventos de pruebas previas permanecen con sus identificadores propios. No mezclarlos con el 3090.

## 4. Muestreo de velocidad y calidad PK
- En `audit...speed_history_BN-2026-11-24-3090...` se conservan **267 muestras**, desde aprox. 15:50:50 hasta 16:23:00.
- Hay **3 muestras** de velocidad de **42,7 / 41,9 / 41,5 km/h** contra un límite calculado de **40 km/h** cerca de PK estimados 0/594, 0/547 y 0/476; **incertidumbre PK 266–275 m**. **No atribuir infracciones ni cumplimiento** sin georreferenciación, limitación oficial y verificación documental. No generar conclusiones jurídicas ni de seguridad basadas en esas muestras.
- Problema de asociación: **70 muestras** de 24/11 entre 15:12 y 15:18 aparecen almacenadas bajo la clave del servicio **3105 del 21/11**. Es un error de atribución temporal/identificador y debe tratarse como **incidencia de integridad**. No borrar ni reasignar automáticamente sin una fuente fiable.

## 5. Discrepancia de ficha de dotación
- En un respaldo, el **formulario general** muestra un valor de locomotora **diferente** del que guarda la **ficha activa/archivada GPS** del servicio 3090. Hay también datos de dotación actualizados solo en el formulario y no en la ficha.
- **No incluir nombres, legajos ni números internos del personal en este repositorio público.**
- Hipótesis validada por lectura del código 0.7.54: `launch()` copia dotación al inicio y `Guardar datos` actualiza únicamente `state.fields`; faltan sincronización, metadatos de modificación y consistencia de encabezado/informe.

## 6. Priorización técnica
1. Aislamiento estricto por **auditId + fecha + tren**, también para muestras de velocidad, eventos y Dashboard.
2. Confirmar y trazar **hora estimada / GPS / manual**, descartes por baja precisión y cortes de GPS.
3. Diferenciar **arribo / partida / paso sin parada**: la actual vista solo trae partidas intermedias; registrar permanencia únicamente con ambas marcas verificadas.
4. Mejorar recuperación de GPS cerca de **Florida y Aristóbulo del Valle**, sin inventar movimientos durante interrupciones.
5. Permitir **dotación diferida** sin detener el GPS: guardar y sincronizar en `active`, historial y encabezado, sin cambiar servicio, fecha ni registros.
6. Reducir repetición de avisos de baja precisión y distinguir claramente avisos de prueba de novedades reales.
7. No alterar el módulo de importación del boletín 24/11 ya validado como guardado en 0.7.54.

## 7. Próxima prueba sugerida
- Para ensayar **sentido ascendente**, preferir **Retiro → Boulogne Sur Mer** si el servicio H21 seleccionado **tiene término programado Boulogne**. El validador de 0.7.54 exige que destino sea el terminal real del itinerario del tren; si el servicio concluye **Grand Bourg**, seleccionar Grand Bourg en vez de falsificar destino parcial.
- Antes de partida: confirmar H-21, fecha, sentido, tren, origen y destino; asegurarse de que GPS muestre **nueva auditoría en curso** y contador de movimientos propio.
- No usar botones de limpiar/borrar. Mantener la pantalla en primer plano cuando sea seguro.
- En cada estación de prueba: verificar visualmente si registró *arribo, partida o ninguna*, conservar capturas seguras y observaciones manuales.
- Al cierre: `Cerrar y archivar auditoría`, exportar JSON **integral y por servicio** y constatar continuidad e independencia de las auditorías.
- **No cambiar de versión mientras se prueba en campo** ni dar por confirmado el GPS como instrumento operativo de seguridad.

**Conclusión:** el 3090 confirma progreso significativo en GPS automático, pero arribo/permanencia, discontinuidades GPS, correspondencia de muestras y dotación aún requieren corrección y validación. Mantener 0.7.54 experimental hasta nuevo ciclo de desarrollo.

## Incidencia 16:48 — Aviso genérico espontáneo y diseño de tres carteles
**Reporte de campo:** En una auditoría posterior a la 3090 (pantalla Servicio 3097, sentido ascendente, destino mostrado Villa Rosa), aparece espontáneamente un recuadro destacado «AVISO DE CONTROL: verificá documentación y posición. Aviso de prueba.»; el auditor confirmó que NO pulsó «Probar aviso elegido».
**Causa encontrada en código de la 0.7.54:** el módulo `avisosDispositivo0745` sustituye `window.beep076` por `emit('beep')`. La función `visual('beep')` SIEMPRE muestra el texto genérico «AVISO DE CONTROL... Aviso de prueba». Pero `beep076()` se llama también desde otras funciones como `startTracking076()` (recordatorio de posible detención), `checkApproach076()` (PK manual de proximidad documental), registros de horarios y pruebas de audio. Por ello **el mensaje no identifica la causa del sonido** y no demuestra que se haya pulsado una prueba. La fuente precisa de aquel aviso puntual no puede reconstruirse solo por la captura: falta un campo de tipo/causa asociado a cada emisión. No declarar que fue proximidad real a un cartel.
**Requisito nuevo:**
- Separar claramente `ALERTA_PRUEBA`, `GPS_PERDIDO`, `GPS_RECUPERADO`, `POSIBLE_DETENCION`, `HORARIO`, `CARTEL_AVISO`, `CARTEL_INICIO`, `CARTEL_FIN`; mostrar motivo, servicio/auditId, fecha/hora, precisión GPS, PK confirmado/estimado y fuente documental.
- Usar el modal grande visual para recordatorios de control **solo cuando el hecho registrado sea trazable**, no para cualquier `beep076()`; no interrumpir ni ocultar la información fundamental de la pantalla; evitar repetición por la misma incidencia.
- **Tres carteles físicos de una precaución provisoria:** aviso anticipado, inicio de restricción y final de restricción. Son tres *controles*, no tres distancias obligatorias; la versión 0.7.54 ya dice que el aviso está 800 m antes del inicio y que la preparación es a 1200 m (400 m antes del aviso), pero **el cálculo actual se basa en PK manual, NO en traza GPS validada**.
- Propuesta pendiente de validación: mostrar recordatorio de preparación a **1200 m antes del PK de inicio**, control del **cartel aviso 800 m antes**, luego controles en **PK inicio** y **PK final**, según la fuente oficial cotejada, el sentido real, y la cartelería identificada y georreferenciada. No emitir alerta automática si no hay PK/ubicación suficientemente verificados, precisión suficiente, señal sin continuidad o restricciones documentalmente observadas.
- Las precauciones del boletín **24/11/2026** se almacenaron como 5 restricciones de velocidad y 2 avisos PAN, con 1 tramo de 30 km/h de progresivas incoherentes **excluido de controles automáticos**. Las 177 señales P importadas no cuentan aún con PK verificados y no pueden detonar avisos de proximidad automáticos fiables.
- Controles del inspector propuestos: `Correcto`, `Faltante`, `Con anomalía`, `No observado`, `Dictar/anotar`. Registrar resultado de cada cartel como evento distinto, con marca temporal, origen GPS/manual y grado de confianza. No transformar falta de GPS en cartel ausente.
- En la próxima auditoría actual, **no modificar la 0.7.54 ni reimportar bases mientras está en marcha**. Proseguir pruebas sin considerar estas alertas como operativas ni de seguridad. Cerrar/archivar y exportar respaldo privado al finalizar; mantener el respaldo fuera de repositorio público.
**Estado:** nueva mejora priorizada para una rama experimental posterior, no implementada aún.

## Rectificación de trazabilidad — 24/11, consulta de carteles ya desarrollados
- La investigación de fechas anteriores (06/11, 12/11 y 13/11) recupera las pruebas **manuales** de preparación a 1.200 m, aviso a 800 m, inicio y fin de precaución. En 0.7.20 y 0.7.21 se registraron mejoras y pruebas del texto «FIN DE PRECAUCIÓN» y del registro de carteles, con una incidencia de reflejo en Informe. **No rehacer este módulo desde cero.**
- Revisión del código efectivo **0.7.54**: hay dos funciones distintas:
  1. `checkApproach076` en **Herramientas → Cartelería provisoria**, calcula y muestra preparación / aviso / inicio / fin a partir de un **PK ingresado manualmente**, con controles Aviso/Inicio/Fin y resultados Correcto/Faltante/Anomalía. El evaluador sobrescrito **no emite sonido** solo por evaluar manualmente.
  2. En **Velocidades**, `evaluate()` consulta `vigente080()` para el boletín PDF y activa recordatorios GPS **experimentales** a 1.200 m y dentro de 800 m antes del **inicio**, siempre que la casilla de **cotejo manual del boletín** esté marcada y la estimación PK sea admisible (manual vigente o incertidumbre estimada ≤260 m). La indicación concreta va al elemento `notice0730`, mientras `sound()` invoca `AuditoriaAvisos0745.emit('alerta')` y abre un recuadro genérico que **no incluye identidad del cartel**. Para emitir sonido/ventana también debe estar activado «Avisos de ENSAYO»; sin eso se conserva el mensaje escrito.
- El código **NO permite afirmar** que los recordatorios de inicio y fin de los tres carteles se estén generando automáticamente por GPS, ni que se compruebe presencia física. La presencia/ausencia requiere observación del auditor; `faltante` solo para ausencia confirmada visualmente, nunca para imposibilidad de ver el cartel.
- Ejemplo tomado del boletín del **24/11**: precaución ascendente 06/863→06/914 (60 km/h); preparación teórica PK 05/663, cartel de aviso teórico PK 06/063, inicio 06/863 y fin 06/914. **Todo sujeto a validación de progresivas y emplazamiento real del cartel**, no es referencia para seguridad operativa.
- Acción de campo: en pestaña **Velocidades**, comprobar el estado de «Avisos de ENSAYO», casilla de cotejo solo si realmente cotejado y revisar `notice0730`; para constancia de cartel usar **Herramientas → Cartelería provisoria: control manual aprobado** sin detener GPS. No cambiar de versión ni bases durante recorrido.
- Mejoras posteriores (sin alterar 0.7.54 a bordo): conectar cada aviso visual al evento (servicio, tipo de cartel, PK, fuente y calidad), guardar evidencia por cada uno de los tres carteles, distinguir «no observado», eliminar confusión con avisos sonoros de prueba y verificar continuidad de informe/historial.

## Hipótesis de interrupciones al cambiar de aplicación — auditoría 3097
- El auditor informó que durante la circulación alternó entre la aplicación web en Chrome y ChatGPT para intercambiar mensajes y capturas. Esto puede provocar **suspensión o limitación de geolocalización en segundo plano y temporizadores web por Android**; se considera una **hipótesis de causa contribuyente**, no una causa confirmada.
- Efectos compatibles con los síntomas observados: intervalos sin muestras GPS, avisos de GPS perdido/restaurado, estaciones sin marcas, gráficos de velocidad discontinuos y contador de estaciones con registros menor que las estaciones físicamente recorridas.
- **Prueba de aislamiento recomendada**: en un próximo servicio H21 de prueba, dejar la versión 0.7.54 en primer plano, con pantalla encendida y permisos de ubicación concedidos, sin alternar a ChatGPT/WhatsApp. Registrar si hay pérdidas GPS; repetir posteriormente una prueba controlada con alternancia para comparar los intervalos, siempre que no afecte las obligaciones ferroviarias.
- **No prometer geolocalización continua en segundo plano** en una web: una PWA o acceso directo de GitHub Pages no aporta por sí solo un servicio Android de ubicación en primer plano. Para uso de fondo más fiable a futuro, evaluar una envoltura/app Android nativa con foreground location service, permisos y comunicación de privacidad apropiados.
- No alterar ni limpiar datos archivados 3090 y 3097. Cerrar y respaldar cada prueba por auditId. No publicar en GitHub datos reales de tripulación ni coordenadas completas.
