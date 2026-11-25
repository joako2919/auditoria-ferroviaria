# 25/11/2026 — Mejora prioritaria para revisar el 26/11: ubicación automática de novedades

## Problema detectado en auditoría real
Al cargar una anomalía o novedad, el inspector debe buscar el punto kilométrico en una lista extensa de referencias (desde PK 0/000 hasta Tortuguitas o más), con desplazamiento incómodo en el centro de la pantalla del celular. Esto distrae de la observación de la circulación.

## Requisito de experiencia de usuario
- Desde "3. Novedades de recorrido", al iniciar el dictado o una anotación, capturar la última posición GPS **válida y reciente**; hora, precisión, coordenadas, sentido, servicio y auditoría.
- Consultar la tabla georreferenciada de estaciones/PK y **proponer** estación, PK o referencia más cercana, indicando precisión y estado de validación. No inventar PK exacto si solo hay coordenadas o referencias no calibradas.
- El inspector puede confirmar la referencia sugerida o cambiarla con búsqueda por estación, nombre o PK y resultados filtrados **verticales**, de desplazamiento corto. No obligar a recorrer una lista horizontal ni desde PK 0.
- Botón "🎙 Dictar novedad" → transcripción editable → "Guardar". La observación se vincula al servicio, hora y posición registrada. El reconocimiento de voz depende de disponibilidad del navegador/dispositivo; conservar teclado y micrófono del teclado como respaldo, sin prometer transcripción offline.
- Cuando falte GPS, sea antiguo o impreciso, indicarlo claramente, mantener el texto de la novedad y usar selección/manual sin completar datos falsos.
- No crear movimientos de estación ni eventos de velocidad a partir de una aproximación geográfica no validada.
- Priorizar interfaz de mínima intervención, cómoda en celular, sin párrafos largos.

## Estado real verificado en la copia experimental 0.7.60
- Existe "3. Novedades de recorrido", campo libre `novLugar` vinculado a la lista `puntos`, campo `novedad`, botón "Dictar observación" (`dictate074`) y "Registrar novedad" (`addNovedad`).
- La función `addNovedad` registra hora, texto, lugar elegido y auditId, pero **no propone automáticamente una ubicación GPS verificada** en ese formulario.
- El dictado usa la API SpeechRecognition/ webkitSpeechRecognition cuando está disponible y, si no, orienta a usar el micrófono del teclado. No hay garantía de dictado sin conexión.
- Esto **no está implementado ni validado** aún. Se deja asentado para revisión, implementación experimental y pruebas el jueves 26/11/2026.

## Protección
No tocar la versión 0.7.54 que el inspector utilizará en la auditoría del 25/11. Android Studio/APK siguen en pausa. No reemplazar historiales ni usar coordenadas sin validación para control de seguridad operativa.
