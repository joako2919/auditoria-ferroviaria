# Revisión de continuidad y corrección mínima — Auditoría Ferroviaria 0.7.46

**Fecha:** martes 24/11/2026, mañana (Buenos Aires).  
**Estado:** experimental; NO reemplaza versión operativa, pendiente de pruebas reales.  
**Origen protegido:** rama `respaldo-cierre-0745-20261123`, aplicación `pruebas/gps-0745-avisos-android-ios-experimental.html` (SHA `e5eaa426b92bf89a3c194ef555f581f29422eb1f`).  
**Nuevo trabajo:** rama `revision-avisos-0746-20261124`, aplicación `pruebas/gps-0746-avisos-perfiles-revisados-experimental.html` (SHA de contenido verificado `0f7c24f52fe38fd78bb74f4ad0d621321bb9b3eb`).

## Base protegida y memoria del proyecto
- Leída integralmente la bitácora de cierre del 23/11.
- `main/index.html` conserva SHA `e7608a6070eaef7d2a4739f7ffd388fccc36a6b2`: estable 0.7.22 intacta.
- 0.7.45 de la rama de respaldo conserva su SHA original: intacta.
- Se conservaron código e importadores Excel/PDF/JSON, lógica de respaldo/restauración, itinerario H21/H22, control manual, historial, GPS y Dashboard sin modificarlos en esta etapa.
- La lista de GPS incluye exactamente **23 estaciones** (Retiro–Villa Rosa), incluida Aristóbulo del Valle y Cecilia Grierson; no contiene Scalabrini Ortiz. La lista auxiliar de **referencias PK heredadas** sí menciona «Estación Raúl Scalabrini Ortiz» como referencia documental: **revisar su función**, no eliminar sin comprobar que no sea útil como PK de infraestructura.

## Hallazgo y cambio de 0.7.46
En 0.7.45, seleccionar manualmente el perfil «iPhone/iPad» sobre un Android con API de vibración permitía seguir vibrando: el selector cambiaba la leyenda pero no el control efectivo. También decía «Sin sonido: solo visual» aunque podía continuar una vibración habilitada. Se corrige **solo el script `alertsDeviceJs0745`**: `vibrationPossible` respeta la elección iOS además de detectar el iOS real; «Sin sonido» se describe como aviso visual y eventual vibración. Se actualiza etiqueta de versión a 0.7.46 y comentario. Se conserva la clave local `audit_bn_device_alerts_0745` para no perder preferencias guardadas.

## Pruebas ejecutadas en esta sesión (sintéticas / estáticas)
- **38 de 38 scripts JS compilan sintácticamente**; no hay diferencias en los otros 37 scripts respecto de 0.7.45; el importador `importadores0729` permanece literalmente igual.
- Simulaciones aisladas del aviso «detención»: iPhone con API de vibración ficticia (0 solicitudes), Android con API (1), Android sin API (0), Android con perfil manual iOS (0), iPhone con perfil manual Android (0). Los cinco casos exponen estado visual en el DOM simulado. **No acreditan salida física de sonido/vibración**.
- Relectura por GitHub: SHA nuevo confirmado, títulos y 38 scripts presentes, tanto la 0.7.45 como la 0.7.22 mantienen los SHA anteriores.
- No se han probado importaciones físicas de PDF/Excel/JSON, almacenamiento/restauración en un teléfono, navegación en pantalla real, sonido real ni GPS.

## Pendientes priorizados (sin repetir reparaciones ya realizadas)
1. Prueba aislada de extremo a extremo: distintos días/servicios (incluido mismo número de tren en fechas distintas); verificar separación por `auditId` en movimientos, gráficos, Dashboard, informes A4, novedades y respaldos; corroborar persistencia tras recarga.
2. Validación funcional de GPS en Android con pantalla activa, errores de señal, detención >10 segundos y reconocimiento de las 23 estaciones, particularmente Aristóbulo del Valle. No inventar posición durante huecos de GPS.
3. iOS Safari real: permiso GPS, audio activado con gesto, modalidades de aviso, recarga, bloqueo de pantalla, dictado, selección de archivos y respaldo. Sin prometer vibración en iPhone.
4. Importación real de Excel/PDF/JSON y restauración en almacenamiento aislado; las bibliotecas para XLSX/PDF pueden requerir Internet en instalación nueva. No tocar los motores aprobados.
5. Cerrar Dashboard documental vs observado (señales P, velocidades, precauciones, carteles y PAN); cinco franjas cuantitativas vigentes y violeta **no cuantificado**, no inferir cumplimiento sin control.
6. Revisar cuidadosamente referencias PK antiguas y simplificar pantallas **sin eliminar funciones ni datos**; mantener accesibles los controles de auditoría y el Dashboard.

## Limitación y próximo criterio de aprobación
Una prueba de sintaxis o simulación NO equivale a validación operacional ni a garantía de funcionamiento sin errores. Antes de sustituir la 0.7.22 se exige prueba funcional en navegador y teléfonos con respaldo JSON privado previamente exportado. **No subir datos privados de personal o servicios al repositorio público.**
