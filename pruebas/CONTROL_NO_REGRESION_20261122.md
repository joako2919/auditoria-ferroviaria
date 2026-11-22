# Control de no regresión — Auditoría Ferroviaria
Fecha: 2026-11-22 · Línea Belgrano Norte · Documento de trabajo, sin datos personales

## Propósito
Ninguna mejora GPS, de continuidad, Dashboard, Novedades o Herramientas debe eliminar capacidades que ya se desarrollaron. Se documenta el control de calidad previo a integrar o publicar una nueva versión. Este documento no declara que las pruebas estén aprobadas ni modifica la aplicación.

## Bases preservadas
- Versión estable de resguardo: 0.7.22. No modificarla ni reemplazarla.
- Candidatos experimentales posteriores en `main/pruebas/`, incluyendo `gps-0738-bases-limpias.html`; **no combinar ramas a ciegas**.
- Rama aislada de continuidad y Dashboard: `mejoras-continuidad-dashboard-20261122`.
- Antes de editar, comparar los archivos vigentes, registrar SHA de origen y destino, y crear una nueva copia experimental identificada. No sobrescribir versiones anteriores.
- No publicar registros privados, nóminas de dotación, respaldos JSON de campo ni datos personales en GitHub.

## Requisitos de aceptación antes de liberar
1. **Importadores (regresión crítica):** comprobar que permite seleccionar, leer, validar, informar errores y conservar correctamente **Excel (.xls/.xlsx), PDF y JSON** para **itinerarios H21/H22, señales de vía general y precauciones**; mantener también la importación de dotación. La presencia del selector no demuestra que la lectura funcione. Ensayar un archivo real de cada formato y comparar contra el original. H22 debe quedar pendiente/no vigente hasta una validación expresa.
2. **Boletines y sentido:** no fusionar registros de igual PK para diferentes vías. Caso de regresión: boletín del 22/11/2026, PAN Paillete PK 42/228 en vía ascendente y descendente, ambas clausuras **al tránsito vehicular** (no clausura ferroviaria); verificar cantidad, dirección y texto original. Conservar por separado restricciones de velocidad y avisos de señalamiento.
3. **Estaciones:** 23 estaciones; incluir Ciudad Universitaria, Cecilia Grierson y Aristóbulo del Valle (plataforma extensa/túnel). No reintroducir estaciones eliminadas. Comparar movimientos reales con horarios vigentes del H21.
4. **Auditorías separadas:** fecha + servicio + identificador único. No mezclar 3102, 3103 u otros; novedades reinician desde 1 por auditoría y el historial persiste.
5. **Continuidad GPS/Internet:** son interrupciones distintas. Registrar momento, última posición **conocida** (nunca afirmar ubicación actual sin datos), duración, recuperación, precisión, captura manual y su procedencia. Pérdida de Internet no implica pérdida de GPS. La recuperación no inventa posiciones de intervalos sin señal ni implica sincronización a servidor.
6. **Novedades:** detención extraestación >10 s -> alerta asistida, ubicación estimada/confirmada, dictado corregible y alternativa manual. Conservar registros sin obligar a mirar la pantalla al instante; no duplicar novedades por alertas repetidas.
7. **Velocidades, señales y carteles:** respetar sentido, PK, fuente y vigencia de las bases. Distinguir “cumple”, “anomalía”, “ausente” y “sin verificar”. No declarar cumplimiento por ausencia de novedad.
8. **Dashboard integral:** sumar por auditoría todos los parámetros: estaciones, horarios, permanencias, demoras y seis colores vigentes (celeste, verde, amarillo, naranja, rojo, violeta), señales/carteles presentes/ausentes/anómalos, velocidades permanentes/provisorias, detenciones, novedades, GPS y datos sin verificar. Sin cifras simuladas en informes reales.
9. **Informe y respaldo:** PDF A4 legible, datos solamente de la auditoría seleccionada, JSON exportable/restaurable, sin sobrescribir ni eliminar datos locales de manera silenciosa. Ensayar restauración en un entorno separado.
10. **Interfaz móvil:** retirar solo los controles de ensayo obsoletos; guardar su código como referencia; conservar corrección manual de contingencia y actualización permanente de H21/H22.
11. **Prueba transversal de persistencia:** crear auditoría ficticia aislada, registrar eventos, recargar pantalla, simular GPS caído y regreso, importar base, exportar, restaurar en entorno separado, comprobar diferencias y ausencia de pérdidas. Nunca usar datos de campo para ensayos destructivos.
12. **Publicación:** no actualizar el enlace utilizado en campo ni la versión estable hasta completar matriz de regresión, pruebas de funcionamiento en celular y aceptación explícita.

## Estado inicial 22/11/2026
- Verificado por inspección del código de `pruebas/gps-0738-bases-limpias.html`: existen selectores de archivos con extensiones Excel, PDF y JSON para dotación, velocidades, señales e itinerarios; la correcta interpretación de cada formato **no está probada en esta revisión**.
- Confirmados archivos **aislados** de continuidad y motor inicial de indicadores en la rama experimental. Su integración con la interfaz y su ensayo end-to-end **están pendientes**.
- Ninguna versión queda aprobada para prueba operativa solo por esta nota.

## Registro de resultados futuros
Anotar por cada ensayo: versión, SHA, escenario, resultado (OK/FALLA/PENDIENTE), evidencia, diferencia frente a versión anterior y corrección aplicada. No modificar `main` ni la rama de la estable para documentar resultados experimentales.
