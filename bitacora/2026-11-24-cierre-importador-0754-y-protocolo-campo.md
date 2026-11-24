# Bitácora de continuidad — 24/11/2026 — Cierre de importación PDF y pruebas de campo

**Proyecto:** Auditoría de Circulación Ferroviaria, Línea Belgrano Norte.
**Jornada:** martes 24 de noviembre de 2026, mañana/mediodía.
**Alcance:** documentación técnica del módulo de precauciones y preparación de pruebas de auditoría; sin datos privados de personal ni de trenes reales.
**Estado:** cierre funcional del **importador y guardado local del PDF**. Resto de la aplicación, en **validación experimental**.

## 1. Punto de continuidad y versiones
- Versión estable de referencia **0.7.22**, no modificada en esta sesión.
- Se continuó desde **0.7.52** (rama de pruebas), pasando por **0.7.53** y **0.7.54**.
- Versión experimental de referencia al cierre: **0.7.54**, archivo en `main`: `pruebas/gps-0754-guardado-precauciones-verificable-experimental.html`.
- Enlace directo de prueba móvil: https://joako2919.github.io/auditoria-ferroviaria/pruebas/gps-0754-guardado-precauciones-verificable-experimental.html
- No actualizar ni sobrescribir el `index.html` principal de producción ni convertir el experimento en versión estable sin pruebas independientes.
- Las vistas previas del celular, el PDF oficial real y la bitácora maestra privada permanecen en ámbito privado; **no subirlos al repositorio público**.

## 2. Documento de prueba y hallazgo documental
- PDF oficial recibido: *Boletín diario de precauciones provisorias y Boletín diario de servicio*, **24/11/2026**. Se examinó su segunda página, sección de precauciones.
- Tabla de precauciones/avisos: **8 filas**, **5 ascendente** y **3 descendente**.
- Clasificación: **6 restricciones de velocidad** + **2 avisos P.A.N. Paillete de clausura al paso vehicular**. Las clausuras vehiculares no son cierres ferroviarios ni velocidades.
- Observación documental importante: la fila ascendente nº 3 consigna **31/480 → 00/088, 30 km/h**. La progresiva final no es coherente con el sentido ascendente; no corregirla por aproximación ni sustituirla por la de boletines anteriores. **Solicitar aclaración documental al emisor**.
- Fecha efectiva del encabezado **24/11/2026** prevalece sobre fechas antiguas de plantilla contenidas en el mismo PDF.
- El lector de precauciones NO importa automáticamente trabajos de cuadrillas, ATS, señalamiento, disposiciones ni otros avisos que no integren las ocho filas de la tabla; el documento oficial completo debe consultarse por separado.

## 3. Errores resueltos durante el día
1. **0.7.52:** había validaciones de cantidad ligadas a un boletín histórico, menús duplicados y dificultades de vista previa. Se recuperó la rama experimental exacta en GitHub.
2. **0.7.53:** lector por filas y sentidos. Evita contaminación entre filas, como el texto P.A.N. mezclado con la velocidad ascendente nº 4 de 40 km/h. Reconoce 8 filas con 6 velocidades y 2 clausuras.
3. **0.7.53:** separa la fila 31/480 → 00/088 como observada, fuera del selector automático de restricciones.
4. **0.7.53:** completa el motivo de la clausura P.A.N. descendente, incluido «ACTO DE VANDALISMO». Se corrigió además la etiqueta visible que seguía indicando 0.7.52.
5. **0.7.54:** el guardado fallaba por una referencia de variable inconsistente y por depender de un diálogo adicional de `confirm()`, que podía bloquearse o cancelarse en el navegador móvil.
6. **0.7.54:** guardado directo desde la vista previa, verificación de escritura y lectura en `localStorage`, indicador «GUARDADO COMPROBADO», historial preservado y detección de reimportación idéntica para evitar duplicados.
7. Se mantiene la base documental de boletines en almacenamiento local del navegador, **sin sincronización con un servidor remoto**.

## 4. Evidencia y alcance real del éxito
**Comprobado en celular mediante capturas del usuario (24/11 a las 12:30):**
- Pantalla indica **EXPERIMENTAL 0.7.54**.
- Boletín más reciente por fecha identificada: **24/11/2026**.
- **5 restricciones de velocidad** guardadas, **2 avisos P.A.N.** guardados, **1 fila observada aparte**.
- Pantalla principal: **390 registros de personal**, **177 señales P**, **5 precauciones PDF** (este último indicador cuenta velocidades y por eso no indica ocho).
- El estado local informa «guardado local 24/11/2026, 12:30:28» y «Historial anterior conservado».
- Boletín previo del **22/11/2026** visible antes de la carga. La pantalla posterior dice que se conservó el historial. **No se ha efectuado aquí una restauración independiente a partir de respaldo externo**.
- El importador 0.7.54 se ensayó adicionalmente con datos simulados: guardado, preservación de un boletín anterior y no duplicación al importar el mismo documento. La captura del teléfono confirma el estado final local, **no constituye validación técnica integral** del resto de la app.

**Límites:** no hay evidencia suficiente aún para declarar automática y correctamente reconocidas todas las 23 estaciones, ni para dar por medidos los cumplimientos de velocidades, señales, carteles o alertas GPS. La app es auxiliar de registro/auditoría y no sustituye reglamentación, instrucciones vigentes ni procedimientos ferroviarios.

## 5. Datos que no se deben perder ni limpiar
- **0.7.22** estable y respaldos anteriores; **0.7.54** experimental de prueba independiente.
- Boletín del 24/11 y su fila observada; boletín histórico del 22/11.
- Personal 390 y señales P 177, H-21 conservado.
- Historias y registros de auditorías previas; preservar separación por **fecha + servicio + ID de auditoría** y novedades consecutivas por cada servicio.
- No cambiar de dominio/origen, borrar datos de Chrome, limpiar almacenamiento ni reinstalar a ciegas; los registros viven en el navegador.
- No publicar legajos, nombres, dotaciones ni boletines internos en GitHub público.

## 6. Plan de pruebas para la tarde (1 o 2 auditorías, distintas cabeceras si la operación lo permite)
**Antes de subir al tren:**
- Abrir **0.7.54** desde la URL de pruebas; confirmar H-21 y conteos (390 personal / 177 señales P / 5 velocidades PDF, 2 avisos P.A.N. y 1 observado).
- Registrar la fecha y elegir **servicio real H-21**, **cabecera de inicio**, destino y **dotación**; no predeterminar números de tren sin confirmarlos en la app.
- Comprobar batería, permisos de ubicación, precisión GPS disponible, controles manuales y exportación de respaldo JSON. **No modificar los datos existentes**.

**Auditoría A (cabecera 1):**
1. Iniciar nueva auditoría con ID/fecha/servicio propios; comprobar que no reutilice ni borre auditorías previas.
2. Iniciar captura GPS y anotar estación de origen mediante selección manual si la sugerencia GPS es imprecisa.
3. Contrastar **arribo, partida y permanencia** de las primeras estaciones con horarios H-21, distinguiendo *real / teórico / inferido / manual / no verificado*.
4. Registrar novedades y paradas fuera de estación solo si la inmovilización supera **10 s**; no confundir reducción de velocidad con detención.
5. Revisar PK, precauciones provisorias y permanentes, avisos, señales y carteles solo como datos documentales/observaciones verificadas. **El PK observado no se usa automáticamente**.
6. Probar observación por voz o manual cuando sea seguro hacerlo; documentar estado GPS/red y recuperación sin inventar valores.
7. Al terminar, cerrar auditoría, abrir **Estadísticas, Gráfico/Informe y Dashboard**, y exportar respaldo **JSON**; PDF A4 solo si la función se comprueba.

**Auditoría B (si hay oportunidad, desde la otra cabecera):**
1. Crear una auditoría nueva con **servicio, sentido y cabecera diferentes**, sin limpiar la primera.
2. Confirmar que H-21, historial, dotación, novedades y conteos queden separados.
3. Repetir control de estaciones, GPS/manual, paradas >10 s, diferencias horarias y evidencias.
4. Verificar que el cambio de cabecera no invierta progresivas incorrectamente; no asumir equivalencias entre vías.
5. Comprobar que pueden consultarse ambas auditorías y sus informes al finalizar, conservando respaldo de cada una.

**Pruebas pendientes obligatorias antes de considerar una versión validada:**
- Reconocimiento GPS progresivo de **23 estaciones**, incluida **Aristóbulo del Valle**, túnel/plataforma extensa; llegada y partida reales vs H-21.
- Cambios de calidad GPS / pérdida temporal de Internet, continuidad offline y recuperación; no dar por hecho respaldo remoto.
- Correlación del Dashboard con eventos reales: retrasos/adelantos y colores celeste, verde, amarillo, naranja, rojo, violeta; conteos cero únicamente con cobertura suficiente; separador «sin verificar».
- Integridad de señales/carteles controlados, velocidades permanentes/provisorias y evidencias para estadísticas.
- Guardado/restauración de archivos y generación de informe individual por auditoría; registrar fallas sin limpiar bases.

## 7. Qué enviar para continuar la validación
Por cada recorrido: hora aproximada de inicio/cierre, **número de servicio**, cabecera y destino, versión visible, capturas de estación/GPS, novedades, Estadísticas y pantalla de Informes; resultado de respaldo JSON (preferentemente sin datos personales al compartirlo).
**Punto de reanudación:** «Retomemos desde la Bitácora 24/11/2026 y la experimental 0.7.54, PDF importado y guardado; iniciemos la prueba de circulación del primer servicio. No repetir importador ni borrar las bases».

**No se hizo:** auditoría de campo en esta conversación, validación integral GPS ni corrección del dato oficial PK 31/480 → 00/088. **No declarar listo para decisiones de seguridad operativa.**
