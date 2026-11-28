# Bitácora de continuidad — 28/11/2026 — experimental 0.7.76

**Proyecto:** Auditoría de Circulación Ferroviaria — Línea Belgrano Norte.  
**Objetivo:** dejar un punto de reanudación concreto para la noche del 28/11 o el 29/11/2026 y continuar mejorando sin perder avances ni registros.  
**Estado:** LISTA DE PENDIENTES; esta entrada **no implica** que se hayan ejecutado los cambios ni validado su funcionamiento real.

## 1. Estado comprobado al cierre de esta conversación

- `0.7.22` sigue siendo la versión estable publicada en `index.html`; **no sustituirla** todavía.
- `0.7.76` es una candidata **experimental** accesible en `pruebas/gps-0776-carteles-doble-ventana-experimental.html`, y se utilizará para pruebas a bordo.
- Reportado en la sesión: **19/19** pruebas sintéticas de alertas de carteles y **31/31** regresiones del gráfico aprobadas (**50/50**); esta aprobación **no** demuestra validación en navegador móvil ni en circulación real.
- Existe rama de resguardo `resguardo-estable-0722-20261128` y rama de preparación `integracion-estable-segura-20261128`. Consultar el documento de compatibilidad en esa rama antes de cualquier promoción.
- Las versiones 0.7.22 y 0.7.76 utilizan familias de claves distintas para determinados registros locales. Su compatibilidad de lectura y restauración sigue pendiente; **no limpiar el almacenamiento local**.

## 2. Prioridad próxima sesión: limpieza de los tres módulos pendientes

- [ ] **Informes:** auditar de extremo a extremo qué datos presenta, omisiones, duplicaciones, exportación/impresión, lectura por servicio y fecha, novedades y diferencias horarias. Simplificar textos extensos; mantener advertencias esenciales sin saturar la pantalla. Confirmar que los datos existentes se expresan con precisión, por ejemplo diferencias de tiempos en minutos y segundos.
- [ ] **Estadísticas / dashboard:** revisar y rediseñar la presentación en celular para que ningún gráfico quede cortado o desplazado; usar solapa independiente si es necesario. Integrar **todos los registros** de circulación: horarios teóricos/reales, adelantos y atrasos, permanencias en estaciones, detenciones extraordinarias, señales/carteles verificados-no vistos-no controlados-faltantes (sin mezclar estados), precauciones y velocidades permanentes/provisorias, anomalías e indicadores de cantidad por categorías. Mostrar también los estados con cantidad cero; respetar la codificación de colores acordada (celeste, verde, amarillo, naranja, rojo, violeta) sin asignar semánticas nuevas sin comprobar el diseño actual.
- [ ] **Herramientas:** revisar utilidad y ubicación de cada control; quitar únicamente elementos obsoletos o duplicados, mantener accesibles los controles manuales que respaldan al GPS, importadores y respaldo integral. Evitar menús extensos y pasos innecesarios.

## 3. Limpieza puntual solicitada hoy: módulo Velocidades

- [ ] Localizar en el módulo **Velocidades** el elemento visual antiguo descrito por el auditor como «cartel gris con una línea vertical», situado **abajo**.
- [ ] Verificar si el mismo control/línea aparece en otros módulos, identificar su selector y función exacta y **retirarlo de la interfaz donde esté obsoleto**, sin borrar datos, estados ni cálculos útiles.
- [ ] Probar visualmente en celular y en pantallas amplias que no queden restos, huecos, barras o líneas superpuestas. No confundirlo con la leyenda vigente ni con el gráfico de velocidades: identificar antes de suprimir.

## 4. Gráficos, velocidades y GPS — pendientes acumulados

- [ ] Mantener gráfico de marcha multicolor: trayectoria real según colores de desempeño y trayectoria teórica H-21 **punteada**; no volver accidentalmente a una única línea roja. Mantener legibilidad tanto en vista reducida como ampliada.
- [ ] Incorporar y comprobar representación **marrón punteada** de precauciones/velocidades provisorias en el gráfico, claramente diferenciada de la teoría H-21. Verificar semántica y duración de cada tramo.
- [ ] Incorporar plenamente las comprobaciones de carteles, excesos de velocidad y novedades al dashboard y al informe de auditoría, sin falsas equivalencias («No lo vi» no significa «Faltante»; «Sin verificar» tampoco).
- [ ] Continuar mejoras GPS pendientes, incluida la línea de trabajo 0.7.73: precisión por PK y reconocimiento de estaciones, sin suponer que está validada. Preservar controles manuales y el registro de detenciones extraordinarias.
- [ ] Mantener navegación móvil sencilla; diálogos breves, botones adecuados, sin textos repetitivos.

## 5. Validación de campo de la 0.7.76 (hoy)

- [ ] Con auditoría iniciada, GPS fiable y boletín vigente confirmado, verificar **Aviso, Inicio y Fin** de precaución provisoria.
- [ ] Comprobar en cada cartel: aviso anticipado **ventana chica**, luego **ventana grande** de control; respuestas «Lo vi», «No lo vi» y «No pude controlarlo»; cierre automático al superar el PK; siguiente cartel; sin duplicados ni respuestas inventadas.
- [ ] Probar comportamiento ante GPS impreciso/perdido, ambos sentidos de circulación, boletín ausente/no confirmado y casos sin interacción: registrar «Sin verificar» cuando corresponda, **no** «Faltante».
- [ ] Si aparece una falla, anotar únicamente **datos operativos mínimos no sensibles** (versión, tramo aproximado/PK, tipo de alerta, comportamiento y condiciones GPS), sin nombres, legajos, dotaciones ni respaldo real en GitHub.
- [ ] Esta función es un apoyo de auditoría, **no** un sistema de seguridad operacional ni sustituto de observación/reglamentación.

## 6. Protección de datos y promoción de la estable

- [ ] Mantener como regla permanente `SECURITY.md`: **no publicar** nóminas, nombres, legajos, dotaciones, auditorías reales, boletines reservados, archivos importados ni respaldos en repositorio público, GitHub Pages, bitácoras o issues.
- [ ] Usar exclusivamente **datos sintéticos** en tests y capturas públicas. No confundir almacenamiento local con cifrado: aún faltan medidas de seguridad para distribuir a terceros.
- [ ] Antes de modificar la versión estable, hacer respaldo integral JSON **privado** desde cada dispositivo que contenga datos y verificar recuperación local sin enviar esos archivos al repositorio.
- [ ] Resolver claves de almacenamiento distintas de estable/experimental con migración o lectura compatible **no destructiva**; controlar recuentos e historial, sin sobreescrituras silenciosas.
- [ ] Integrar solamente mejoras verificadas en la rama `integracion-estable-segura-20261128`. Repetir regresiones de GPS, importación Excel/PDF/JSON, gráfico H-21, velocidades, carteles, detenciones, informes y dashboard, más prueba móvil. No actualizar `main/index.html` sin completar salvaguardas y validación.

## 7. Orden de trabajo al retomar

1. Leer esta bitácora y el plan de integración segura de 0.7.22; revisar hallazgos de la auditoría real 0.7.76.
2. Identificar y eliminar la **línea/control gris vertical obsoleto** de Velocidades y módulos afectados, con verificación visual y prueba de regresión.
3. Revisar **Informes**, **Estadísticas/dashboard** y **Herramientas**; definir y ejecutar limpieza por separado sin perder funciones.
4. Completar representación de velocidades provisorias, integración estadística y mejora GPS pendiente; validar fuentes, tramos y estados.
5. Correr regresiones, documentar resultados y versiones; respaldar y resolver compatibilidad antes de pensar en promover cambios a estable.

## 8. Criterio de registro de avances

Por cada modificación nueva documentar **fecha**, **versión/rama**, **problema observado**, **causa comprobada**, **cambio concreto**, **pruebas/regresiones**, **resultado**, **pendientes** y **reversión posible**. No marcar como «hecho» lo que solo está solicitado ni confundir pruebas sintéticas con una validación a bordo.

**Punto de reanudación:** 0.7.76 experimental para auditoría; 0.7.22 estable intacta; limpieza de Velocidades + módulos Informes, Estadísticas y Herramientas como próximo bloque de desarrollo.