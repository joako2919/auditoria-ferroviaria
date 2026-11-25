# Bitácora · cierre de sesión del 25/11/2026 (mañana)
Proyecto: Auditoría de Circulación Ferroviaria · Línea Belgrano Norte.
Estado: cierre documental solicitado por el auditor, sin publicar ni instalar una nueva versión operativa.

## 1. Base verificada en GitHub
- Versión estable protegida: **0.7.22**. Se conserva el historial y los respaldos anteriores.
- Base utilizada en pruebas recientes: **0.7.54** (según bitácora de 0.7.56). No confundir con la copia experimental.
- Experimental **0.7.56**: `pruebas/gps-0756-dashboard-alertas-carteles-experimental.html`, prototipo con gráficos ampliados, diferencias ±min:ss, huecos de GPS, aviso rojo tras >20 s sin lectura en auditoría activa y acceso manual a tres carteles asociado a auditoría/precaución. Sintaxis comprobada, sin prueba de campo Android concluyente.
- Experimental **0.7.57**: `pruebas/gps-0757-validacion-documental-experimental.html`. Consta implementación de aviso amarillo durante importación, archivo de anomalías documentales y exclusión de rangos incoherentes en el motor de control. Se probaron escenarios sintéticos; no se completó cotejo de PDF oficial real, respaldo/restauración ni prueba móvil.
- Bitácoras de referencia: `bitacora/2026-11-24-mejoras-0756-graficos-alertas-carteles.md` y `bitacora/2026-11-25-validacion-inconsistencias-0757.md`.
- GitHub conserva los archivos y cambios mencionados. La desaparición de partes del chat en celular y PC no prueba pérdida de los commits; sigue pendiente diagnosticar la sincronización de la conversación.
- Rama experimental **`android-gps-piloto-01`**: existen código Android, README y flujo GitHub Actions para APK debug. Prototipo separado que registra GPS y exporta CSV; todavía no integra estaciones, H21, precauciones ni Dashboard. **No consta aquí APK instalada o continuidad validada en teléfono**.

## 2. Acuerdos funcionales y de interfaz de hoy
1. **Pantalla limpia y operativa:** retirar párrafos redundantes y explicaciones de pruebas anteriores; controles mínimos, botones claros, inspector concentrado en circulación, señales, personal, carteles y velocidades.
2. **Velocidades/boletines:** separar seis registros del boletín y dos clausuras vehiculares de PAN Paillete; cotejar vigencia con fuente oficial. Detectar al importar progresivas incompatibles, avisar en **amarillo**, requerir cotejo, conservar el dato original como **anomalía pendiente de denuncia**, sin disparar alertas de velocidad/carteles. Cuando llegue archivo oficial corregido, reimportar, cotejar y habilitar solo lo validado. Caso informado: ascendente PK 31/480 a 00/088, 30 km/h.
3. **Cartelería:** simplificar control de aviso/inicio/fin con resultado Presente, Ausente, Anomalía y, cuando corresponda, No observado. Prioridad de automatización por GPS, pero disparo automático geográfico **pendiente de validación**; no registrar ausencia por falta de lectura.
4. **Dashboard integral:** mostrar todos los registros: carteles presentes/ausentes/anómalos/no observados, velocidades provisorias y permanentes y sus novedades, horarios H21 y reales, diferencias y permanencia en estaciones, detenciones fuera de estación, cantidad de adelantados/atrasados, incidencias y continuidad GPS. Separar medido, no medido y dato pendiente, sin inventar indicadores.
5. **Gráficos:** grandes y legibles; preservar categorías **celeste, verde, amarillo, naranja, rojo, violeta**, incluidos ceros. Quitar o identificar inequívocamente líneas rojas/punteadas que lleven a confusión; los límites documentales no son evidencia automática de infracción. Huecos GPS sombreados crema/amarillo y sin interpolación ficticia.
6. **GPS:** mensaje rojo inequívoco si se pierde seguimiento, recuperación sobre misma auditoría, y registro visible de cortes. En Chrome Android no puede garantizarse seguimiento GPS cuando está en segundo plano. Objetivo principal: versión Android con servicio de ubicación en primer plano y notificación, que siga capturando al atender llamadas o usar WhatsApp, sujeta a permisos, batería y prueba real.
7. **Historial y fuentes:** no borrar ni mezclar servicios/fechas, preservar H21, 23 estaciones y estación Aristóbulo del Valle, dotaciones, señales y precauciones. Mantener importación Excel, PDF y JSON donde corresponda y controles manuales hasta validar GPS.

## 3. Pruebas y evidencias previas que no deben repetirse sin motivo
- Servicio 3107 del 24/11 (Boulogne → Villa Rosa): bitácora 0.7.56 informa 13 de 14 estaciones GPS, 618 muestras de velocidad y cuatro interrupciones recuperadas; atribuciones de causa no comprobadas. No atribuir permanencias o incumplimientos sin registros.
- Revisar antecedentes 3097 y gráficas antes de modificar contadores; no confundir marcas GPS con estaciones físicas.
- No repetir la revisión completa del itinerario H21 ni las limpiezas de pruebas ya documentadas.

## 4. Menú para la próxima sesión (esta noche 25/11 o jueves 26/11)
**P0 · Recuperación y seguridad de trabajo**
- Abrir repositorio GitHub y confirmar acceso a 0.7.56, 0.7.57 y bitácora en ambos dispositivos; explicar/encontrar chat faltante sin usarlo como única fuente.
- Verificar respaldo JSON actual antes de pruebas. No borrar caché/datos locales ni reemplazar versión de campo.

**P1 · Android y segundo plano**
- Revisar `android-gps-piloto-01`, estado de compilación de GitHub Actions y disponibilidad de APK debug; si se confirma, planificar instalación experimental separada.
- Probar continuar posición con pantalla bloqueada, llamada, WhatsApp y regreso; exportar CSV y medir cortes/tiempos, sin asumir continuidad antes de la prueba.
- Evaluar integración gradual del GPS persistente con la web existente, no duplicar lógica ni pérdida de datos.

**P2 · Precauciones y carteles**
- Verificar 0.7.57 en navegador/celular: aviso amarillo, cotejo del PDF original, seis precauciones con una observada y dos clausuras separadas; probar Excel/JSON y restauración.
- Confirmar que registro anómalo no dispara control GPS y que un boletín corregido restaura el control solo tras validación.
- Simplificar controles de tres carteles; no atribuir GPS automático todavía.

**P3 · Interfaz y Dashboard**
- Quitar textos extensos, ordenar los módulos prioritarios y quitar acciones duplicadas.
- Revisar Dashboard completo y gráficos con seis categorías de colores, líneas con leyendas, huecos GPS y ceros explícitos. Contrastar con respaldos reales del 3107/3097.

**P4 · Validación en campo**
- Solo con versión experimental claramente identificada: verificar estaciones/H21, interrupción/reanudación GPS sin crear nuevo servicio, horarios, carteles y reporte final; anotar incidencias.
- Conservar el funcionamiento actual ante cualquier error. No promocionar copia a estable hasta pruebas satisfactorias.

## 5. Punto exacto de reanudación
1. Abrir `bitacora/2026-11-25-cierre-sesion-y-plan-26-11.md`.
2. Verificar la rama `android-gps-piloto-01` y su compilación, en paralelo con prueba de lectura de 0.7.57.
3. Elegir el siguiente cambio pequeño, probarlo en copia y escribir resultado concreto en bitácora; nunca sustituir la versión de campo por una copia no validada.

**Cierre:** documentación y compromisos preservados. No constan instalación, aprobación operativa, continuidad GPS Android demostrada ni prueba de campo de 0.7.57 al momento de este cierre.
