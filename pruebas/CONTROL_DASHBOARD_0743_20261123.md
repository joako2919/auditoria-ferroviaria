# Control técnico incremental — Dashboard 0.7.43
**Fecha:** 23/11/2026  
**Estado:** experimental, no aprobado para campo  
**Base:** 0.7.42 en rama `modernizacion-herramientas-0742-20261123`  
**Rama nueva:** `dashboard-porcentajes-0743-20261123`  
**Archivo:** `pruebas/gps-0743-dashboard-porcentajes-experimental.html`

## Cambios construidos
- Dashboard complementario por identificador de auditoría: cuenta movimientos registrados, movimientos con diferencia numérica H21, sin comparación, estaciones únicas sobre 23.
- Cantidades y porcentajes de **cinco** franjas verificables: CELESTE adelanto; VERDE puntual/hasta +3 minutos; AMARILLO >3–4; NARANJA >4–5; ROJO >5. VIOLETA queda `No cuantificado` por falta de escala operacional aprobada.
- Controles documentados de carteles: correctos, anomalías, faltantes y sin clasificación; avisos automáticos GPS como **pendientes de verificación**, no infracciones.
- Mensajes explícitos para señales P, precauciones y velocidades sin seguimiento medido válido. No se atribuye cumplimiento por ausencia de alertas.
- Resumen equivalente en informe A4, agregado sin reemplazar impresión anterior ni gráficos.

## Pruebas completadas
- Código guardado y recobrado desde GitHub, SHA blob `bdf538921c74317aa461dc36f1be4b5a6e761ac3`.
- 36 bloques JavaScript, **36 sin errores de sintaxis**; 35 scripts originales conservados literalmente, uno añadido al final.
- `importadores0729` idéntico a 0.7.42. Lógica integral `getBackup` / restauración idéntica a 0.7.42.
- Ensayo sintético de franjas: valores -1, 0, +180, +181, +240, +241, +300, +301 y uno nulo. Ocho comparables: celeste 1 (12,5 %), verde 2 (25 %), amarillo 2 (25 %), naranja 2 (25 %), rojo 1 (12,5 %). Ningún valor doblemente clasificado.
- Separación ficticia comprobada entre dos auditorías distintas del mismo tren 3102 en días diferentes y el tren 3103.
- Sin guardar en GitHub auditorías de campo, legajos ni documentos privados.

## Pendientes para no confundir "código" con "funcional"
- Probar visualización efectiva en navegador y celular, actualización en el transcurso de una auditoría, impresión física/PDF y persistencia tras recarga.
- Asegurar que Dashboard integral sea visualmente independiente del módulo Gráficos, de acuerdo con bitácora.
- Completar señales de vía principal P, controles de velocidades permanentes/provisorias por PK/sentido/calidad GPS, carteles previstos y contrastados, restricciones PAN/avisos y sexta categoría violeta solo con estado validado.
- Probar importaciones reales Excel/PDF/JSON en ambiente aislado, GPS, auditoría por fecha/servicio, respaldo y restauración integral en teléfono.
- `0.7.22` estable y `0.7.38`, `0.7.40`, `0.7.41`, `0.7.42` se conservan, ninguna sustitución del índice principal.
