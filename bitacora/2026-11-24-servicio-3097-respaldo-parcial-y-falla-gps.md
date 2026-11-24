# Servicio 3097 — Diagnóstico del respaldo parcial y Dashboard (24/11/2026, 17:22 ART)

Proyecto: Auditoría de Circulación Ferroviaria, Línea Belgrano Norte.
Origen declarado Retiro; destino declarado Villa Rosa; sentido ascendente.
Aplicación visible: EXPERIMENTAL 0.7.54. Archivo privado analizado: respaldo integral exportado 24/11/2026 a las 17:22:25 ART. Metadatos internos del exportador todavía indican versión 0.7.48: es etiqueta heredada, no prueba que se usara esa versión.
Privacidad: este informe omite nombres de dotación, legajos, coordenadas puntuales y contenido crudo del JSON. NO subir el respaldo privado al repositorio público.
Estado en el respaldo: auditoría en curso, no cerrada.

## Hallazgos comprobados
- Pantalla 17:22: 3/23 estaciones con registros, última diferencia −3 s, tres movimientos comparados, cero permanencias, cero detenciones extraordinarias registradas, cinco interrupciones GPS y 00:27:21 de GPS sin datos en intervalos cerrados; 98 muestras de velocidad.
- El auditor informó haber transitado físicamente siete estaciones, pero la aplicación solo marcó tres. No atribuir horarios no registrados a las otras cuatro.
- El respaldo conserva tres movimientos automáticos GPS en el 3097: Retiro partida 16:42:57 vs H21 16:42:00 (+57 s); Saldías partida 16:48:36 vs 16:48:00 (+36 s); Aristóbulo del Valle partida 16:58:57 vs 16:59:00 (−3 s, precisión reportada ±73 m, estación con túnel/plataforma extensa).
- Ciudad Universitaria no tiene marca; tampoco existen movimientos posteriores a Aristóbulo del Valle. Sin arribos intermedios no puede calcularse permanencia real en cada estación.
- Muestras de velocidad 3097: 98 entre 16:42:25 y 17:00:01 ART; última posición GPS persistida aproximadamente 17:00:03. Quinta pérdida GPS abierta desde 17:00:23, sin recuperación registrada hasta la exportación de las 17:22:25. El paso de la web a segundo plano es una hipótesis plausible, no una causa exclusiva demostrada.
- Muestras nominales 0 de 98: ninguna cumple simultáneamente los criterios básicos de precisión de GPS ≤25 m y PK estimado ≤100 m. No indica ausencia de lecturas ni demuestra infracción o cumplimiento ferroviario.
- Cero carteles registrados significa sin controles asentados, NO carteles existentes o faltantes. Cero detenciones extraordinarias registradas NO demuestra ausencia física.

## Error del acumulado de interrupciones GPS del 3097
- 16:23:22 a 16:42:24 — 1142 s = 19 min 02 s; comenzó antes de crear 3097 a las 16:42:20, usando una referencia GPS de la prueba anterior. No debería contarse íntegramente como pérdida del 3097.
- 16:43:22 a 16:44:24 — 62 s.
- 16:48:57 a 16:49:12 — 15 s.
- 16:51:16 a 16:58:18 — 422 s.
- Desde 17:00:23 — quinta pérdida ABIERTA, sin duración cerrada en el respaldo.
- El Dashboard suma cuatro pérdidas cerradas: 1142+62+15+422=1641 s=27 min 21 s, incluyendo erróneamente el intervalo externo al 3097.
- Las tres pérdidas cerradas posteriores al inicio totalizan 499 s=8 min 19 s; este subtotal no incluye la quinta pérdida abierta. No tratarlo como duración total definitiva de la auditoría.
- Pendiente: anclar medición de continuidad al ID, hora de inicio y hora de cierre de cada auditoría; no arrastrar un último GPS del servicio anterior.

## Correcciones priorizadas
1. Etiquetas de Dashboard: estaciones con marca GPS/horaria, ruta programada y avance físico comunicado por inspector en indicadores distintos; faltantes sin inventar horarios.
2. Aislar continuidad GPS por ID; registrar explícitamente intervalos abiertos.
3. Registrar cambio de visibilidad y pausas de geolocalización (segundo plano Android), sin inventar coordenadas ni horas.
4. Escala ampliada y etiquetas de gráficos para móvil; una experimental 0.7.55 existe en pruebas/gps-0755-dashboard-graficos-legibles-experimental.html, compilada y ensayada con datos simulados, sin validación en Android. No sustituye 0.7.54 a bordo.
5. Corregir etiqueta de exportación JSON 0.7.48 heredada, conservando formato y datos.
6. Reconocer arribos y partidas reales por separado; no calcular permanencias cuando faltan eventos.
7. Diferenciar carteles efectivamente observados, no observados y pendientes; identificar el motivo verdadero de cada aviso sonoro.

## Próximo paso de campo
- Mantener la versión 0.7.54 durante el servicio en curso. No limpiar registros, no iniciar un segundo servicio mientras 3097 está activo ni migrar a 0.7.55 durante el viaje.
- Cuando sea seguro, mantener Chrome con aplicación en primer plano y pantalla encendida; registrar datos manuales solo si efectivamente se observan, sin reconstruir las horas no medidas.
- Al finalizar el recorrido, usar Cerrar y archivar auditoría; exportar respaldo integral JSON y, si está disponible, respaldo por servicio. Conservar datos personales y archivos privados fuera de GitHub público.
- Comparar el respaldo final con esta foto de datos de las 17:22 para saber si GPS se recuperó y si el historial archivó correctamente el 3097.

Conclusión: tres marcaciones automáticas y 98 muestras confirmadas, continuidad GPS deficiente, contador de estaciones incompleto por diseño y acumulado de interrupciones contaminado por 19m02s anteriores a la nueva auditoría. No usar indicadores experimentales para dictámenes ferroviarios operativos.