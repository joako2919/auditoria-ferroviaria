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
