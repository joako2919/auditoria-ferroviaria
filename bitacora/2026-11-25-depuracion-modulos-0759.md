# 25/11/2026 — Depuración módulo por módulo · experimental 0.7.59

## Pedido y criterio
El auditor recuerda que las pantallas ya se revisaron módulo por módulo en días anteriores. La limpieza inicial de 0.7.58 (11 ajustes) no alcanzó: permanecían explicaciones repetidas, párrafos heredados de pruebas y textos con tono de descargo legal. Se requiere una interfaz sintética que permita observar la circulación, la traza, las velocidades, los carteles y la actuación del personal. No tapar información operativa importante.

Android Studio / APK siguen en pausa. No distribuir la experimental hasta que el historial de ChatGPT se muestre correctamente en el teléfono y se realicen pruebas.

## Archivo nuevo
- Rama aislada: `depuracion-modulos-0759-20261125`.
- Archivo: `pruebas/gps-0759-depuracion-modulos-experimental.html`.
- Copia derivada de 0.7.58, sin alterar estable ni experimentales anteriores.
- 22 ajustes de texto/interfaz, entre ellos: encabezados, instrucciones de inicio, aviso sobre Aristóbulo heredado, texto legal de tapa de informe, ayudas de PK, aviso redundante del gráfico, estados iniciales de Velocidades y detenciones, respaldo, selector H21, feriados, trenes auxiliares, bases, PDF, importación H21/H22, cartelería, gráfico de marcha, tendencia e informe.
- El texto técnico extenso del formato JSON/PDF/Excel pasó a una ayuda desplegable para evitar saturar la pantalla. No se eliminó su información de consulta.

## Advertencias y datos importantes conservados
- Se conserva una sola advertencia visible y corta de que la auditoría es de ensayo y no un sistema de seguridad.
- Se mantienen la confirmación de boletín, la observación de inconsistencias documentales, el control manual de PK cuando no hay georreferencia validada y el respaldo JSON.
- Las funciones Javascript y sus 40 pares de etiquetas `script` permanecen idénticas byte a byte respecto de la 0.7.58.
- El archivo completo se recuperó en GitHub, conservando marcadores GPS y de respaldo. No hubo cambios en la lógica de auditar ni importadores.

## Verificaciones realizadas
- Archivo de origen 486.019 caracteres; copia 0.7.59 483.218 caracteres.
- 40 scripts originales / 40 scripts en la copia y 40 cierres; cuerpo de scripts sin modificaciones.
- Verificadas las referencias de GPS, observadas 0.7.57, boletín, advertencia breve y exportación JSON.
- Sin ejecución aún en Android/Chrome, sin prueba funcional de interfaz ni restauración de historial.

## Pendiente (no declarar completo)
1. Revisar mensajes creados dinámicamente por JavaScript dentro de cada módulo para suprimir redundancias sin ocultar anomalías operativas.
2. Prueba visual y funcional de la interfaz, responsive en móvil.
3. Validación completa de velocidades (seis restricciones del boletín; dos clausuras PAN separadas), carteles y dashboard de seis colores.
4. Mejorar recuperación GPS web y medir interrupciones; Chrome web no garantiza continuidad en segundo plano.
5. Probar importación PDF/Excel/JSON, backup/restauración y auditorías aisladas por servicio antes de uso en traza.

## Protección
No tocar ni reemplazar la versión del teléfono, 0.7.22, 0.7.56, 0.7.57 o 0.7.58 con esta copia experimental.
