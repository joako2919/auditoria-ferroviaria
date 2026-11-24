# Servicio 3107 — Revisión preliminar de capturas 19:09–19:21 — 24/11/2026

**Proyecto:** Auditoría de Circulación Ferroviaria, Línea Belgrano Norte.
**Versión de campo:** 0.7.54 experimental; **no modificar la versión ni bases durante circulación**.
**Recorrido indicado por el inspector:** Boulogne Sur Mer → Villa Rosa, sentido **ascendente**. El servicio 3107 tiene origen de itinerario Retiro, pero el inicio físico de la auditoría es Boulogne. Diferenciar origen de tren y estación inicial inspeccionada.
**Fuentes disponibles en esta nota:** cinco capturas recibidas en el chat; las dos primeras, de las 17:11 y 17:22, son del servicio **3097**, no atribuirlas al 3107. Las otras tres reflejan pantallas de las 19:09, 19:17 y 19:21. **Aún no se recibió JSON del 3107** para cotejo por ID y tiempos.

## Avances visibles del 3107
- A las **19:21** el Dashboard integral muestra **servicio 3107, fecha 24/11/2026, 11 movimientos comparados con H21, 11 estaciones con movimientos**, 0 detenciones extraordinarias registradas, **2 novedades**, **4 interrupciones GPS** y 0 interrupciones de red.
- El número 11 se refiere a estaciones con marca del sistema; **no acredita** todas las estaciones físicamente transitadas. Para el tramo parcial Boulogne Sur Mer → Villa Rosa hay **14 estaciones incluyendo extremos**, mientras el tablero histórico usa «/23» de toda la línea. Se requiere denominador dinámico del tramo auditado, sin inventar puntos sin marca.
- A las **19:09** aparece distribución provisional de colores: celeste 0, verde 0, amarillo 0, **naranja 2**, **rojo 7**, violeta sin escala validada. Son 9 marcas clasificadas en esa captura anterior, **no necesariamente discrepancia con las 11 marcas mostradas más tarde**. Según el código 0.7.54, naranja es demora **mayor que 4 y hasta 5 minutos** y rojo **mayor que 5 minutos**, siempre sobre diferencias H21 *estimadas*, sujetas a cotejo. Revisar con JSON del 3107 los 11 horarios y sus diferencias antes de interpretar desempeño.
- Aparece mensaje **«GPS sin lecturas. Seguís registrando manualmente; la ubicación actual no está confirmada.»** a las 19:09. La prueba se diseñó para mantener la web en primer plano, pero la captura sola no demuestra que estuvo visible continuamente. **No atribuir automáticamente todas las pérdidas a ChatGPT**; evaluar cobertura, precisión, túneles, navegador/Android y continuidad real.
- A las 19:17 pantalla de Velocidades: 5 restricciones provisorias PDF disponibles, 2 avisos de clausura PAN, boletín del 24/11 **«cotejo pendiente»** y **«Avisos automáticos de ensayo desactivados»**.
- A las 19:17 y 19:21 sigue apareciendo un cuadro visual genérico «AVISO DE CONTROL: verificá documentación y posición. Aviso de prueba.» sin identificación de restricción o cartel. El sistema reutiliza un modal genérico para múltiples sonidos; **no demostrar cercanía ni aviso de cartel por esta ventana**, tampoco inferir solo por presencia del modal que en ese instante se realizó un nuevo disparo.
- Las casillas de cartelería muestran **0** correctos, **0** anomalías, **0** faltantes y **0** pendientes; significa **sin controles físicos vinculados y asentados**, no que no existan carteles ni que estén todos correctos.
- Se ven **dos novedades** pero se desconoce el texto/causa; requieren respaldo del servicio antes de clasificar.
- No hay evidencia en estas capturas de detección efectiva de **arribos intermedios**, permanencias o **tres carteles** (aviso, inicio y fin). No certificar funcionamiento de esas partes por los 11 movimientos GPS.

## Hallazgos de código en la versión 0.7.54
- El Dashboard de colores clasifica movimientos con `diff` numérico: celeste diff<0, verde 0–180 s, amarillo >180–240 s, naranja >240–300 s, rojo >300 s. El contador de colores se recalcula a medida que se reciben nuevos movimientos. Por eso 9 clasificados a las 19:09 y 11 movimientos a las 19:21 puede reflejar evolución temporal.
- `cartel076` se contabiliza por ID de auditoría solo si el inspector lo registró; un cero nunca equivale a cartel verificado ni faltante.
- El aviso genérico de ensayo reutiliza disparos sonoros; ya se registró causa de software previamente. Separar mensaje visual de prueba, tipo de evento y proximidad a cartel efectivo en versión posterior.
- El conteo de estaciones se basa en movimientos registrados, y el denominador 23 es el total de línea; para tramo parcial debe reflejar **tramo seleccionado** y **estaciones verificadas** como dos métricas diferentes.

## Procedimiento después del recorrido
1. No cambiar de la 0.7.54 durante circulación. Al finalizar y cuando sea seguro, comprobar hora de llegada física; **Cerrar y archivar auditoría** desde GPS.
2. Exportar **JSON integral y JSON de servicio si disponible**; conservar capturas y todo archivo privado. **No publicar en GitHub datos personales, GPS precisos ni nómina de dotación.**
3. Analizar en respaldo: ID 3107, inicio/cierre, posiciones y cortes de GPS, 11 movimientos y estaciones realmente identificadas, colores individuales y 2 novedades; confirmar si luego se registraron más estaciones.
4. Determinar si las interrupciones se produjeron aunque Chrome estuvo siempre visible; examinar duración, hora y precisión GPS, sin inferir causas.
5. Revisar carteles en base oficial y registro manual de cada cartel; los avisos de prueba no son control realizado ni sustituyen observación visual.
6. Priorizar en rama experimental **0.7.55 o posterior**, sin tocar 0.7.54 ni estable 0.7.22: aislamiento GPS, gráfico legible, contador de tramo, arribos/permanencias, alertas con causa y actualización de dotación.

**Estado:** evaluación PRELIMINAR basada solo en capturas. El 3107 **no está confirmado como cerrado ni completo** hasta contar con respaldo JSON definitivo. No usar resultados experimentales para sanciones o decisiones de seguridad operacional.

## Resultado final corroborado con respaldo JSON exportado 19:27:57 ART
**Fuente:** respaldo privado recibido al finalizar el 3107 (archivo exportado `2026-11-24T22:27:57.316Z`), procesado localmente. **No publicar datos personales de la dotación, coordenadas individuales ni el JSON completo.**

### Estado del cierre
- Auditoría `BN-2026-11-24-3107-mwv7nyl0`: estado `cerrada`, iniciada **18:32:51 ART**, cerrada **19:27:48 ART**, origen auditado **Boulogne Sur Mer**, destino **Villa Rosa**, sentido `asc`. Se conserva historial de **5 auditorías**: 3102, 3105, 3090, 3097 y 3107.
- La cabecera del exportador interno continúa mostrando la etiqueta heredada `0.7.48`, aunque capturas confirman interfaz **0.7.54**; es incidencia de metadatos, no prueba de versión cambiada.
- Los datos GPS del 3107 y boletines del 24/11 continúan separados por clave/identificador de auditoría.

### Cobertura del recorrido Boulogne → Villa Rosa
- La lista programada del tramo comprende **14 estaciones** (incluidos extremos). **13 estaciones distintas** tienen una marca automática GPS, frente a 14 movimientos GPS archivados. **Manuel Alberti** (H21 paso **19:08**) es la única estación del tramo sin marca.
- Marcas (GPS estimado vs H21; diferencia):
  - Boulogne partida **18:33:48** vs 18:29:00 **+4:48**.
  - Vicealmirante Montes partida **18:40:54** vs 18:36:00 **+4:54**.
  - Don Torcuato partida **18:45:16** vs 18:40:00 **+5:16**.
  - A. Sourdeaux partida **18:49:05** vs 18:44:00 **+5:05**.
  - Villa de Mayo partida **18:52:52** vs 18:46:00 **+6:52**.
  - Los Polvorines partida **18:56:40** vs 18:49:00 **+7:40**.
  - Pablo Nogués partida **18:59:36** vs 18:53:00 **+6:36**.
  - Grand Bourg **partida** 19:03:28 vs H21 **llegada** 18:57:00 **+6:28**, **tipos no equivalentes**.
  - Tierras Altas partida **19:07:07** vs paso 19:01:00 **+6:07**.
  - Tortuguitas partida **19:11:39** vs paso 19:05:00 **+6:39**.
  - Manuel Alberti **sin marca** vs paso H21 19:08:00.
  - Del Viso partida **19:18:07** vs paso 19:12:00 **+6:07**.
  - Cecilia Grierson partida **19:21:56** vs paso 19:16:00 **+5:56**.
  - Villa Rosa **llegada** 19:27:42 vs H21 19:22:00 **+5:42**.
  - **Anomalía**: aplicación añadió **Villa Rosa partida 19:27:46** sin horario teórico (+4 s después de llegada); evitar falsas partidas de cabecera.
- El registro automático etiqueta como «partida» todas las estaciones intermedias incluso cuando el itinerario tiene evento de «paso». No certifica permanencias ni arribos intermedios; corregir tipología documental antes de comparar.

### Interrupciones y muestras
- Continuidad GPS del 3107: **cuatro interrupciones recuperadas**, duraciones 13 s, 109 s, 35 s, 23 s = **180 s, 3 min** de eventos cerrados; 0 pérdidas abiertas en ese expediente a la exportación. Se observan 4 restauraciones GPS correspondientes.
- El inspector dejó **dos novedades técnicas** que describen una reanudación manual del GPS cerca de Tortuguitas y una nueva reanudación entre Manuel Alberti y Del Viso; por lo tanto no calificar como seguimiento sin interacción ni atribuir fallas exclusivamente a cambiar de aplicación.
- Historial de velocidad: **618 muestras**, 18:32:55–19:27:42 ART. Máxima velocidad GPS muestral **83,6 km/h**. **79** muestras cumplen simultáneamente umbrales locales `gpsAccuracy <= 25 m` y `pkAccuracy <= 100 m`; ninguna muestra supera su límite documental nominal muestral, **esto NO demuestra cumplimiento de velocidades** por falta de PK/vía y precauciones provisionales validados.
- Carteles: **cero verificaciones específicas** en registros de este servicio. El modal «AVISO DE CONTROL... Aviso de prueba» no prueba proximidad a un cartel ni acredita cartelería existente/ausente.
- 2 novedades del 3107 = eventos técnicos de reanudación del GPS, no incidentes ferroviarios de circulación por sí mismos.

### Prioridades de mejora
1. **Marcación al pasar**: distinguir según H21 **paso vs llegada vs partida**, evitando comparar una partida GPS con un paso o llegada H21 como si fueran hechos equivalentes; recuperar arribos/permanencias con dos marcas suficientemente fiables.
2. **No marcar partida en cabecera terminal** después de llegada.
3. Cobertura: etiquetar `13/14 estaciones con evento GPS`, `14 movimientos (uno no programado)`; estaciones sin marca como **sin verificar**, sin inventar tiempos.
4. Continuidad: historial de pérdida y restauración y acciones manuales claras, protección Android segundo plano y estados visibles.
5. Dashboard: gráficos ampliados y métricas por tramo, colores basados en eventos equivalentes validados, sin confundir lecturas GPS con precisiones PK.
6. Unificar panel de alertas por **causa efectiva**, asociar a restricciones y controles de tres carteles; preservar control manual.
7. Mantener corrección del boletín PDF 24/11 sin reimportar; cambiar leyendas del sentido a **ascendente/descendente** en una versión experimental futura sin romper sentido interno ni H21.
8. Sin modificar 0.7.54 estable en uso ni respaldos privados; ensayar pilotos 0.7.55+ sobre copia, después de validación.

**Conclusión:** 3107 es la auditoría con mejor reconocimiento de estaciones entre las analizadas el 24/11, **13 de 14**, pero no se puede declarar detección perfecta: Manuel Alberti quedó sin marca, hubo cuatro cortes GPS y la llegada a Villa Rosa disparó una partida ficticia. El cierre y preservación del historial funcionaron.
