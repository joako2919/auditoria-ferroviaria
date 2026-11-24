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

## Actualización: respaldo definitivo exportado 17:29 ART
- El auditor remitió un SEGUNDO respaldo integral exportado **24/11/2026 17:29:20 ART** y se comparó con el exportado a las 17:22:25 ART.
- **Cierre confirmado**: la ficha de servicio **3097** pasa de estado **en_curso** a **cerrada**, con hora de cierre **17:28:00 ART**, conservando fecha, servicio, origen y destino declarados.
- El 3097 fue incorporado al **historial** (antes había 3 entradas: 3102, 3105 y 3090; ahora hay **4**). Permanecen las otras tres entradas intactas.
- Se preservan los **3 movimientos GPS** originales (Retiro, Saldías, Aristóbulo del Valle), las **98 muestras de velocidad** y los registros de continuidad GPS **sin cambios**.
- **No hubo recuperación de GPS** documentada después de aproximadamente **17:00:03**. El quinto evento GPS_LOST sigue **abierto** en el respaldo aunque se haya cerrado la auditoría a las 17:28; se requiere mejorar el cierre técnico de un intervalo inconcluso sin fingir GPS_RESTORED.
- La comparación automática identificó exactamente **dos entradas modificadas** dentro de la sección de datos: la ficha de sesión activa y el historial. El resto, incluidas bases documentales y recorridos anteriores, quedó idéntico en estos dos archivos.
- La versión visible continúa siendo experimental **0.7.54**; el campo `version` del exportador dice **0.7.48**. Es un pendiente de metadatos/rotulación.
- **Se valida el procedimiento de archivado y separación histórica**, no el recorrido completo, la posición kilométrica ni la exactitud de velocidades. No dar por cubiertos los 23 puntos por el solo hecho de cerrar el 3097.
- El primer respaldo sigue siendo evidencia intermedia; el segundo, evidencia de cierre. Ambos contienen datos privados: **no subirlos a GitHub público**.

**Próxima prioridad:** aislar GPS por auditoría y registrar correctamente inicio/cierre de intervalos, mantener registros manuales y corregir el conteo/representación visual, sin modificar ni depurar las bases existentes.

## Preparación para prueba de campo 3107 y corrección de terminología ferroviaria
- El auditor prepara servicio **3107**, tramo efectivamente auditado **Boulogne Sur Mer → Villa Rosa**, fecha 24/11/2026, **sentido ascendente**.
- Para aislar la hipótesis de suspensión por Android, durante el recorrido mantendrá la aplicación **0.7.54 en primer plano**, sin cambiar a ChatGPT ni otras aplicaciones. Al terminar: cerrar, archivar y exportar respaldo privado JSON; conservar los anteriores.
- Requisito terminológico del auditor: sustituir las leyendas visibles de «Sentido de circulación» *Retiro → Villa Rosa* y *Villa Rosa → Retiro* por **«Sentido ascendente»** y **«Sentido descendente»**, respectivamente. Mostrar las cabeceras como aclaración secundaria opcional, no como nombre del sentido.
- **Ascendente** comprende desplazamiento en dirección Retiro → Villa Rosa, incluyendo servicios parciales Retiro → Grand Bourg y Boulogne → Villa Rosa; **descendente** comprende dirección Villa Rosa → Retiro, incluyendo Grand Bourg → Retiro o Villa Rosa → Boulogne.
- Mantener sin cambio los identificadores internos de sentido (asc/desc), la selección efectiva de servicio H21, el origen y destino reales y los historiales; **no alterar 0.7.54 durante el viaje**. Implementar solo en próxima experimental probada por separado.
- Punto de verificación: para 3107, el selector debe seguir filtrando el H21 por fecha, estación inicial Boulogne, destino Villa Rosa y sentido ascendente, sin reinterpretar un servicio parcial como cambio de sentido.
