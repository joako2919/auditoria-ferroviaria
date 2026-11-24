# Control de cierre seguro sin GPS — versión experimental 0.7.47

**Fecha:** 24 de noviembre de 2026.  
**Repositorio:** joako2919/auditoria-ferroviaria  
**Rama:** `control-gps-manual-0747-20261124`  
**HTML:** `pruebas/gps-0747-cierre-sin-gps-experimental.html`  
**SHA HTML releído en GitHub:** `2e6fc98571a08c20fb7f61c3b3c45c07ff5633b1`

## Defecto reproducido en 0.7.46

En la rama de prueba, al iniciar una auditoría válida cuando `startTracking076()` no consigue crear un seguimiento GPS (`watch076 === null`), la sesión quedaba `en_curso` con el botón **Cerrar y archivar** deshabilitado, aunque la captura manual seguía disponible. Una auditoría podía quedar abierta sin posibilidad de cierre normal desde la interfaz.

## Corrección aislada en 0.7.47

Exclusivamente en `gpsExperiment0728`, después de intentar iniciar seguimiento GPS, si `watch076 === null`:
- Se permite **reintentar** el GPS sin cambiar fecha, servicio o auditoría.
- Se habilita **Cerrar y archivar auditoría**.
- Se informa que la auditoría puede continuar con registro manual y se actualiza la vista de eventos.
- Se conserva el archivado original con `auditId`. Ningún movimiento o novedad se borra.

Con GPS iniciado normalmente, el botón de inicio permanece inactivo durante el seguimiento y el de cierre habilitado, como antes.

## Pruebas realmente ejecutadas

1. **Reproducción 0.7.46 sin GPS:** auditoría `en_curso`, cierre deshabilitado, intento de cierre deja historial vacío — **fallo confirmado** en entorno JavaScript aislado.
2. **0.7.47 sin GPS:** auditoría `en_curso`, cierre habilitado, reintento habilitado, movimiento manual asociado al `auditId`, cierre `cerrada` e historial archivado — **OK simulado**.
3. **0.7.47 con GPS:** seguimiento simulado iniciado, cierre habilitado, inicio temporalmente deshabilitado, registro manual asociado y archivado correcto — **OK simulado**.
4. **Lectura posterior desde GitHub:** 38/38 scripts sin errores de sintaxis; exactamente un script alterado, `gpsExperiment0728` (índice 21); `importadores0729`, script de respaldo/restauración y script de porcentajes del Dashboard **idénticos** a la 0.7.46.
5. **Integridad:** 23 estaciones GPS conservadas. `main/index.html` 0.7.22 conserva SHA `e7608a6070eaef7d2a4739f7ffd388fccc36a6b2`. La 0.7.46 original conserva SHA `0f7c24f52fe38fd78bb74f4ad0d621321bb9b3eb`.
6. **Herencia de pruebas 0.7.46:** comprobar en `pruebas/CONTROL_INTEGRAL_SINTETICO_0746_20261124.md` los 23 movimientos, filtros por auditoría, Dashboard, JSON y avisos. En 0.7.47 las implementaciones correspondientes no cambiaron.

**Importante:** no se ejecutó prueba funcional en Chrome Android, Safari iPhone ni en un tren real durante esta revisión; tampoco se importaron físicamente archivos Excel/PDF/JSON.

## Preflight Android exigido antes de una auditoría experimental de campo

1. Desde la versión que tenga **datos reales**, exportar respaldo integral JSON y confirmar que el archivo existe y no está vacío. No hacer restauraciones sobre datos reales para probar.
2. Abrir una instancia de prueba de 0.7.47 desde un origen seguro HTTPS con acceso a geolocalización. Un enlace de código GitHub (`blob/`) no ejecuta directamente la aplicación; evitar confundirlo con una URL desplegada.
3. En una auditoría **ficticia** de servicio y fecha conocidos, probar inicio GPS con permisos, anotación manual, Dashboard e informe. También ensayar GPS apagado/permiso denegado para confirmar que se pueda **cerrar y archivar**.
4. Cerrar auditoría ficticia, reabrir, verificar historial y exportación JSON; no confirmar registros ficticios como hechos de circulación.
5. Solo después de pasar los controles en Android considerar una **auditoría real supervisada de prueba**, con pantalla activa y alternativa manual. Si el GPS deja de dar lecturas no adjudicar pasos ni horarios ficticios. El prototipo no reemplaza RITO ni controles de seguridad operativa.

## Pendientes

Prueba de navegador/Android real, descarga y restauración segura de JSON en almacenamiento aislado, importación de PDF/XLSX/JSON con archivos de prueba, GPS con túnel/estaciones reales, revisión de impresión A4, audio en hardware e iPhone Safari. La versión 0.7.47 sigue siendo **experimental**.

**Regla de protección:** mantener la 0.7.22 y todas las ramas previas intactas. Nunca subir registros o nóminas privadas al GitHub público.
