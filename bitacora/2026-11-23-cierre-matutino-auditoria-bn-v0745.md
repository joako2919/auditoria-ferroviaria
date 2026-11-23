# Bitácora de cierre matutino — Auditoría de Circulación Ferroviaria (Belgrano Norte)

**Fecha:** lunes 23/11/2026, mañana (Argentina).  
**Objetivo del cierre:** dejar el estado de trabajo respaldado y un punto inequívoco de reinicio para la tarde/noche del 23/11 o mañana del 24/11/2026.  
**Estado general:** desarrollo **experimental**. **No se autoriza todavía reemplazar la versión de campo** sin prueba funcional real.

## 1. Identificación y preservación de versiones
- **Estable y de resguardo:** 0.7.22 en `main/index.html`. Comprobado por lectura de GitHub: `index.html` en `main` y en la rama 0.7.45 tienen exactamente el mismo SHA de contenido `e7608a6070eaef7d2a4739f7ffd388fccc36a6b2`. Su título identifica `Piloto 0.7.22`. **No modificar.**
- **Última candidata experimental:** 0.7.45, rama `avisos-android-ios-0745-20261123`, archivo `pruebas/gps-0745-avisos-android-ios-experimental.html`; SHA del archivo `e5eaa426b92bf89a3c194ef555f581f29422eb1f`.
- Las candidatas `0.7.38` a `0.7.44` permanecen como archivos independientes en `pruebas/`; no deben sobrescribirse ni descartarse.
- **Respaldo de cierre del código:** se crea una rama Git independiente derivada de esta candidata, `respaldo-cierre-0745-20261123`, que conserva el árbol de archivos y esta bitácora. **Importante:** es un respaldo del código y documentación en GitHub, no de los registros privados guardados en el teléfono.
- **Datos de campo:** deben continuar protegidos localmente y respaldarse mediante la función privada de exportación integral JSON de la aplicación. No subir legajos, nombres, dotación, registros reales ni respaldos privados al repositorio público.

## 2. Avances preservados y grado de verificación
1. **Importadores Excel/PDF/JSON (protección prioritaria):** el usuario informó pruebas satisfactorias de carga en 0.7.38. En las revisiones 0.7.40, 0.7.41, 0.7.42, 0.7.43 y 0.7.45 se documentó comparación literal del importador `importadores0729` con su versión preexistente, sin reescritura. **No tocar el motor de importación, los selectores, las bases ni la restauración mientras se simplifica la interfaz.** Una prueba breve de no regresión no equivale a rehacer módulos ya aprobados.
2. **Continuidad y Dashboard:** 0.7.40 añadió seguimiento de interrupciones GPS/red, estadísticas por auditoría y anexo imprimible A4, sin crear una sincronización remota. La 0.7.41 corrigió por inspección y simulación cruces entre auditorías diferentes, filtrando por `auditId` y actualizando vistas después de anotaciones.
3. **Interfaz de navegación (0.7.42):** pestaña **Herramientas**, accesos a Bases, informe A4, respaldo/restauración mediante controles originales, historial de consulta y diagnóstico plegable. Se mantuvieron controles manuales de contingencia y ayuda GPS compactada.
4. **Dashboard (0.7.43 y candidato 0.7.44):** el control documentado de 0.7.43 cuenta movimientos y estaciones, con **cinco** franjas cuantificables de puntualidad/demora: celeste, verde, amarillo, naranja y rojo; la **sexta violeta no está cuantificada**. Señales P, velocidades, precauciones y algunos carteles requieren medición y validación real; jamás inferir cumplimiento solo por ausencia de avisos. El HTML 0.7.44 se conserva, pero este cierre no acredita nuevas pruebas físicas de 0.7.44.
5. **Avisos Android/iPhone (0.7.45):** panel GPS y acceso desde Herramientas para elegir perfil automático/iPhone/Android, sonido normal/reforzado/silencio y botón de prueba. Aviso visual; vibración solo si Android y API disponible. iPhone/iPad Safari **no admite `navigator.vibrate`**, por lo que se presenta alternativa visual/sonora, sin prometer vibración. En iOS, sonido puede necesitar pulsación del usuario y puede no funcionar con pantalla bloqueada o en segundo plano. Preferencia local `audit_bn_device_alerts_0745`, incluida en el respaldo integral por el prefijo existente.
6. **Comprobaciones técnicas, no de campo:** en 0.7.45 constan 38/38 scripts JavaScript sintácticamente válidos, comprobación de importador y funciones de backup/restauración idénticas, y simulaciones de perfiles Android/iOS. **No hubo ensayo físico de audio/vibración, GPS ni Safari en teléfono real**. Las validaciones anteriores de coherencia y Dashboard fueron mayormente estáticas y con datos sintéticos.
7. **Boletín de precauciones:** 0.7.40 reconoció en una simulación 8 filas reconstruidas del boletín del 22/11 (6 restricciones de velocidad y 2 clausuras de PAN). **No quedó probado el procesamiento completo del PDF real**; el importador declarado cubre precauciones y clausuras, no todas las disposiciones del boletín. Excel y PDF pueden requerir Internet para cargar bibliotecas externas en una instalación nueva.

## 3. Reglas innegociables para el siguiente desarrollo
- **Prohibido sobrescribir `main/index.html` (0.7.22), otras versiones aprobadas o respaldos del usuario.** Crear nuevas candidatas y conservar archivo + rama + registro de cambios.
- **Excel/PDF/JSON son funciones protegidas:** al limpiar textos, pruebas, módulos y paneles, no eliminar controles de entrada, dependencias ni lógica de lectura/guardado. Mantener itinerarios H21/H22, señales de vía principal P, boletines/precauciones, dotación y demás bases. No volver a solucionar errores ya corregidos por rutina.
- **Coherencia cruzada:** cada auditoría debe tener ID único, fecha y servicio; controlar que GPS, estaciones, itinerario, movimientos/carteles, observaciones, gráficos, Dashboard, informes y exportación utilicen la misma auditoría activa y se actualicen entre sí. Mantener historial separado, novedades numeradas desde 1 y controles manuales de respaldo.
- **Limpieza visual incremental:** retirar u ocultar *solo la presentación* de controles de prueba, párrafos auxiliares, sugerencias y detalles técnicos innecesarios; desplegar bajo botones lo útil para el auditor a bordo. Mantener visible operación principal, datos relevantes, alertas y Dashboard. No borrar funciones, información ni registros detrás de una limpieza de pantalla.
- **Dashboard durante y después del viaje:** debe mostrar magnitudes verificables, diferencias reales H21, estados y cobertura; separar datos observados, no medidos y pendientes. No proclamar controles de señales, velocidad o precauciones sin evidencia.
- **GPS y traza:** mantener las 23 estaciones, incluso Aristóbulo del Valle con su singularidad de plataforma/túnel; comparar H21; detectar detenciones extraordinarias solo tras >10 s de parada, no por desaceleración; prever observación manual/voz según soporte y uso offline sin inventar posiciones durante pérdidas de GPS.
- **Privacidad y seguridad:** el repositorio es público; nunca subir información de personal o auditorías reales. El sistema es herramienta de auditoría, **no dispositivo certificado ni reemplazo de normativa de circulación**.

## 4. Inicio concreto de la próxima sesión (23 por la tarde/noche o 24 por la mañana)
1. **Abrir el proyecto y esta bitácora.** Base de continuación: `pruebas/gps-0745-avisos-android-ios-experimental.html` en `avisos-android-ios-0745-20261123`; rama de regreso `respaldo-cierre-0745-20261123`. No partir de `main/index.html` para desarrollar las mejoras.
2. **Verificar sin modificar código** la integridad de 0.7.45 y que el HTML 0.7.22 sigue igual. Conservar los SHA indicados como referencia de esta sesión.
3. **Hacer pruebas de no regresión en ambiente aislado (sin datos privados):** 3 formatos (Excel, PDF, JSON) y los módulos de Bases; luego crear auditorías sintéticas distintas/repetidas por servicio y verificar actualización de GPS, registros, Dashboard, historial e informe A4. No dar pruebas por aprobadas sin ejecutarlas.
4. **Probar visualmente 0.7.45 en Android real; iPhone Safari cuando se disponga del equipo:** 3 tonos, sonido/silencio, persistencia tras recarga, aviso visual, vibración Android si es compatible, ausencia de opción de vibración iOS, integración con aviso de detención >10 s. En iPhone controlar comportamiento con interacción de usuario, permisos y restricciones de segundo plano.
5. **Revisar la lista de limpieza acordada el 22/11:** compactar paneles de prueba y textos heredados en pequeños cambios aislados, sin tocar importadores, GPS, H21 ni backup. Priorizar acceso rápido al Dashboard y accesibilidad móvil.
6. **Después de cada ajuste:** comparar scripts protegidos, comprobar importadores, respaldo/restauración en almacenamiento aislado y separación de auditorías; generar versión nueva e informe GitHub. Si algo falla, volver a la rama de respaldo sin arriesgar 0.7.22.
7. **Antes de cualquier prueba de campo el martes 24/11:** pedir conformidad del usuario, respaldar el almacenamiento real desde el propio dispositivo y diferenciar claramente el prototipo experimental de la versión estable.

## 5. Estado del cierre
**Código de aplicación:** sin cambios en esta tarea de cierre.  
**Documentación:** esta bitácora agrega una referencia de continuidad y respaldo versionado.  
**Pendiente:** verificación integral en teléfono y de importaciones/restauración reales con archivos de prueba; ajustes visuales finales y validación del Dashboard.  
**Punto de retorno:** 0.7.45 experimental; respaldo de código `respaldo-cierre-0745-20261123`; versión estable 0.7.22 intacta.

### Regla de oro
**Lo aprobado se conserva. Lo experimental se prueba en copia. Ninguna mejora estética puede romper importadores, datos, GPS, historial, Dashboard o respaldos.**
