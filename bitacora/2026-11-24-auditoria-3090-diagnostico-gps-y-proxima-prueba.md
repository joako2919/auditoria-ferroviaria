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
