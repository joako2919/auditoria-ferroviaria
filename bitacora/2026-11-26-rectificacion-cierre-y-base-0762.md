# Rectificación de cierre — 26/11/2026 · 11:35 (ART)

## Decisión del auditor
- El auditor rechaza la recomendación anterior de usar la versión **0.7.22** para la salida: está desactualizada y mantiene dificultades con carga/importación de archivos.
- **No realizará auditoría en campo hoy con la 0.7.22 ni se considera autorizada una auditoría real con la 0.7.62 sin validación.**
- El objetivo es consolidar la **0.7.62** con los módulos que ya venían funcionando, no retroceder a una base antigua ni empezar otra aplicación desde cero.
- Esta nota corrige, sin borrar el registro histórico, la recomendación del archivo `2026-11-26-cierre-previo-prueba-campo-0762.md`.

## Verificación de código realizada en GitHub
- Archivo: `pruebas/gps-0762-carteles-velocidades-gps-asistido-experimental.html`, rama `main` (copia separada del `index.html` estable).
- El HTML incluye selección de servicio/H21, dotación, auditoría e historial/respaldo JSON, GPS, bases/importadores Excel/PDF/JSON, velocidad, carteles y dashboard/gráficos. **Presencia de componentes en el código no equivale a pruebas satisfactorias en teléfono.**
- Existe control asistido de carteles en Velocidades: lectura GPS/PK con controles de precisión, propuesta de tramo y cartel, y confirmación manual de lo observado; no acredita señalización ni infracciones.
- Punto a corregir: las bibliotecas necesarias para lectura PDF y Excel se cargan desde CDN externos; sin conexión o con fallas de descarga el importador puede quedar inaccesible.
- Punto a corregir: el dashboard contiene seis colores, pero el bloque violeta aparece como "No cuantificado" en lugar de reportar 0 u otro conteo validado; requiere especificación y prueba.
- El HTML conserva el título de navegador "0.7.61", aunque el encabezado interior dice "0.7.62"; unificar la identificación visible.
- No consta comprobación en Samsung S22, control GPS continuo en segundo plano, ni prueba integral de importación/guardado/restauración con datos reales.
- No se ha incrustado el boletín operativo oficial en el repositorio público.

## Prioridades antes de nueva salida
1. Consolidar módulos de 0.7.62 sin sustituir datos ni limpiar el almacenamiento; validar carga, vista previa y guardado de Excel/PDF/JSON, incluido funcionamiento sin conexión o aviso inequívoco de dependencia.
2. Verificar arribo/partida H21, datos en mm:ss, historial y respaldo/restauración con una auditoría de prueba aislada.
3. Verificar sentido, PK, precisión, selección de tramo, aviso/inicio/fin, confirmación visual de carteles y comparación de velocidad GPS contra límites documentales; indicar claramente desconocido/no observado cuando falte evidencia.
4. Completar el dashboard con gráficos legibles y categorías celeste/verde/amarillo/naranja/rojo/violeta, diferenciando cero de ausencia de datos.
5. Recién después proponer prueba limitada de campo y decidir una versión operativa; conservar `main/index.html` intacto hasta validación.

## Estado
Rectificación documental. **No confirma correcciones de código, despliegue web ni funcionamiento de la 0.7.62 en campo.** No pedir al auditor que regrese a 0.7.22 ni que repita autorizaciones GitHub.
