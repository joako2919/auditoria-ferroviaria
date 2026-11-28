# Bitácora de continuidad — Auditoría de Circulación Ferroviaria
**Fecha:** sábado 28/11/2026, 11:32 (Argentina).  
**Propósito:** punto de reanudación para la revisión de esta noche o mañana. Este documento es una hoja de ruta, **no** una declaración de funcionalidades implementadas.

## Bases y alcance protegidos
- **0.7.22 estable:** conservar el `index.html` de `main`, sin reemplazarlo ni alterar sus datos.
- **0.7.76 experimental:** `pruebas/gps-0776-carteles-doble-ventana-experimental.html`, publicada en la ruta de pruebas. Es candidata de ensayo en el celular; **no** validada a bordo.
- **Rama de integración:** `integracion-estable-segura-20261128`. Rama de resguardo: `resguardo-estable-0722-20261128`.
- Regla fija: proteger nóminas, nombres, legajos, dotaciones, auditorías reales, boletines y documentación reservada de Ferrovías S.A.; nunca incrustarlos ni subir respaldos reales a GitHub/Pages/bitácora. Usar datos sintéticos. Consultar `SECURITY.md`.
- Los datos locales del navegador **no están cifrados**. No confundir almacenamiento local con protección integral.
- Existe una diferencia de claves entre versiones (`audit_bn_...` y `auditoria_bn_...`); **no** migrar ni publicar estable hasta probar compatibilidad y respaldo integral local verificado de cada dispositivo.

## Lo conversado hoy y estado real
1. **Cartelería provisional por GPS, 0.7.76: implementada experimentalmente; pendiente campo.** Secuencia automática de tres carteles: **Aviso → Inicio → Fin**. Ventana pequeña de anticipación; ventana principal de control con respuestas **«Lo vi», «No lo vi» y «No pude controlarlo»**; cierre al pasar PK; ausencia de respuesta = **«Sin verificar»**, nunca «Faltante» por defecto. Evitar duplicados y falsas ausencias por GPS impreciso. El control manual se conserva en Herramientas. Requiere auditoría activa, datos técnicos/boletín habilitados y ubicación suficientemente precisa.
2. **Gráfico de marcha: mejora multicolor previa conservada; verificar visualmente.** Diagrama teórico **H-21 punteado**; trayectoria real con colores coherentes con las observaciones (por ejemplo, verde cuando corresponde, sin línea roja residual equivocada). Mantener legibilidad y vista ampliada.
3. **Detenciones extraordinarias y GPS asistido:** proceden de versiones experimentales anteriores; seguir probando sin presentar como validadas en campo.
4. **Pruebas automatizadas reportadas en la conversación:** 19/19 para estados de alertas y 31/31 de regresión del gráfico (50 aprobadas). Esos resultados **no** abarcan todos los módulos y **no** reemplazan pruebas reales en celular/tren.
5. **Velocidades provisorias en el gráfico:** falta completar/verificar la **línea marrón punteada** y su contraste con lo real, sin alterar el H-21 teórico.
6. **Dashboard integral y consolidación de velocidad/cartelería:** aún pendientes; las mejoras de ventanas no implican estadísticas completas.
7. **Seguridad:** política de confidencialidad y exclusiones preventivas documentadas; faltan controles de protección más robustos antes de distribución.

## Tres módulos a revisar, simplificar y terminar (prioridad de próxima sesión)
### A. Informes
- Revisar recorrido completo y estructura de informes; retirar textos redundantes/obsoletos sin perder advertencias que deban mantenerse por seguridad.
- Mostrar novedades numeradas por servicio y fecha, detenciones extraordinarias, estaciones/PK y observaciones; registrar y recuperar el historial.
- Verificar horario teórico H-21 vs hora real (llegada, partida, permanencia y diferencias en **minutos y segundos**) y coherencia con gráfico y estadísticas.
- Validar exportación/impresión y que no filtren legajos o dotaciones por defecto.

### B. Estadísticas / Dashboard
- Presentar **todo lo que registra la auditoría**, con datos trazables y gráficos utilizables en el teléfono.
- Conteo de controles de carteles por estado: correctos, faltantes observados, «no lo vi», «no pude controlarlo», «sin verificar»; no mezclar las categorías.
- Velocidades permanentes y provisorias: controles conformes, excesos/anomalías e intervalos cuando los datos lo sustenten.
- Puntualidad y tiempos de estación: arribos, partidas, adelantos, atrasos, permanencias, detenciones fuera de estación y novedades.
- Leyenda/códigos del proyecto **celeste, verde, amarillo, naranja, rojo y violeta**, incluidos conteos en cero cuando corresponda.
- Gráficos centrados, legibles, ajustables/ampliables; evaluar una solapa dedicada cuando haga falta; distinguir datos faltantes de valores cero.

### C. Herramientas
- Hacer inventario de controles y secciones duplicadas/obsoletas; reducir menús, párrafos y pasos para el uso con una mano.
- Mantener accesible el control **manual** de cartelería como respaldo del GPS.
- Revisar importadores de **Excel, PDF y JSON** para itinerarios H-21/H-22, señales y precauciones, sin perder bases existentes.
- Mantener copia/descarga del **respaldo integral JSON**, y recuperación segura, sin publicar información empresarial.
- Revisar secciones viejas de prueba y opciones que no deberían ocupar pantalla operativa.

## Limpieza puntual del módulo Velocidades
- **Pedido explícito:** eliminar el control o bloque inferior **gris con una línea vertical**, que el usuario señala como **obsoleto**, y revisar si se repite en otros módulos.
- Antes de quitarlo, identificar el elemento exacto en la interfaz/código (con captura, si hiciera falta) y sus dependencias, para **no** suprimir funcionalidad útil ni un indicador de seguridad.
- Regresión visual en móvil tras la limpieza.

## Orden recomendado al retomar
1. Registrar incidencias de la prueba 0.7.76 a bordo: servicio/fecha, sentido, PK aproximado, primer aviso, ventana grande, respuesta, cierre, funcionamiento con pérdida o imprecisión de GPS (sin exponer datos personales).
2. Revisar y limpiar **Velocidades** (control gris obsoleto).
3. Auditar **Herramientas**, **Informes** y **Estadísticas**, anotando por cada pantalla: conservar / corregir / eliminar, prioridad y prueba de aceptación.
4. Completar representación provisional marrón punteada e indicadores del dashboard; asegurar coherencia gráfica de colores y H-21.
5. Ejecutar regresión general en ambos sentidos: estados y secuencia de carteles; cierre/duplicados; GPS sin precisión; gráfico multicolor; detenciones; horarios reales vs teóricos; historial; tres módulos; importadores; respaldo/compatibilidad.
6. Probar en móvil sin datos reales en código y realizar validación operativa a bordo; integrar únicamente lo confirmado en rama de trabajo. Mantener 0.7.22 estable y 0.7.76 de prueba separadas.
7. Antes de una promoción estable, verificar respaldo **local y privado** de datos del celular/PC, lectura de todas las claves y posibilidad de marcha atrás.

## Criterio de cierre
No marcar un ítem como completado sólo por existir en el HTML o pasar pruebas sintéticas. Para cada cambio indicar fecha, rama/commit, prueba ejecutada, resultado, efecto sobre datos y estado: **pendiente / implementado experimental / validado en navegador / validado a bordo / listo para estable**.

**Punto exacto de continuidad:** al finalizar esta conversación quedan **pendientes la revisión de Informes, Estadísticas y Herramientas**, la **retirada del bloque gris obsoleto de Velocidades**, la **línea marrón punteada de provisorias** y la **integración completa del dashboard**, además de la prueba real de las ventanas GPS de 0.7.76. No atribuir estas tareas a una versión hasta verificar su implementación.
