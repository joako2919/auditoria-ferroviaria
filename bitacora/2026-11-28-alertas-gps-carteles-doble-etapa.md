# Bitácora · 28/11/2026 · Requerimiento GPS: doble alerta por cartel de precaución provisoria

## Origen y estado
Definición funcional acordada en el 9.º chat. **Estado: especificado, no implementado en la aplicación ni probado a bordo.** Conservar la candidata 0.7.74 de marcha multicolor y los archivos históricos. No tocar `index.html` (piloto 0.7.22) sin comprobar ruta de despliegue.

## Objetivo
La pantalla extensa de consulta, carga y control manual de precauciones pasa a **Herramientas**. En auditoría activa, el GPS gobierna una secuencia automática para cada precaución vigente, con sentido de marcha, vía, PK y vigencia del boletín. El reconocimiento visual de carteles es manual; la medición de velocidad es un registro independiente.

## Estados por cartel (Aviso → Inicio → Fin)
1. **Pendiente:** próximo control elegible, calculado según la dirección real de circulación y la fuente documental.
2. **Preaviso pequeño:** aviso anticipado con tipo de cartel, PK objetivo y distancia restante; referencia conversada: aviso a **1.200 m** del primer cartel y siguiente aviso a **800 m**, sujetos a configuración y pruebas a bordo.
3. **Control grande:** al entrar en una zona de aproximación configurable, ventana con botones grandes: **Lo vi**, **No lo vi**, **No pude controlarlo**. Debe admitir corrección de pulsación accidental antes de cierre y no obstruir la seguridad del inspector.
4. **Cierre automático al superar el PK teórico:** retirar la ventana incluso sin pulsación, guardar estado final y presentar el preaviso del cartel siguiente. Si no se respondió: **Sin verificar**, nunca ausencia física.
5. **Fin:** guardar resultado por cartel y pasar a próxima precaución sin invocar formularios manuales. No mostrar dos ventanas grandes simultáneamente; procesar próximos PK en orden real por dirección, incluyendo precauciones solapadas.

## Semántica de resultados
- **Lo vi:** presencia confirmada visualmente por auditor.
- **No lo vi:** no observado; registrar novedad que requiere revisión, **no** demostrar por sí solo ausencia física.
- **No pude controlarlo:** imposibilidad de inspección (por ejemplo, exceso de pasajeros o acceso visual impedido).
- **Sin verificar:** no respondió dentro de la ventana; jamás inferir que faltaba el cartel.
- GPS sin precisión, ubicación PK sin validar, boletín dudoso o interrupción GPS: **No evaluable automáticamente** y posibilidad de registro manual, sin inferir cumplimiento ni infracción.

## Mediciones de velocidad y gráficos
Comparar velocidad real y velocidad máxima provisoria únicamente si constan boletín aplicable, lado/vía y PK georreferenciados fiables. Guardar serie temporal, límite, margen de incertidumbre y evento potencial de exceso por separado del resultado del cartel. Graficar límite provisorio con línea/franja **marrón punteada** en el gráfico de velocidad; mantener el **H-21 gris punteado** en el diagrama de marcha y los colores de marcha existentes (celeste, verde, naranja, rojo y violeta para alertas persistidas). No clasificar infracciones solo por un salto aislado del GPS.

## Trazabilidad
Guardar ID de auditoría, servicio, sentido, PK objetivo y observado, tipo cartel, fuente/versión/fecha de boletín, momento de entrada al preaviso, apertura del control, decisión/cierre y calidad GPS. Mantener historial y aislamiento entre auditorías. No incluir datos personales de personal o respaldos reales en pruebas/repositorio.

## Matriz mínima de regresión para nueva candidata
- Secuencia pequeña → grande → cierre → siguiente, en Aviso/Inicio/Fin.
- Tres resultados más ausencia de respuesta; **No pude controlarlo** no equivale a **No lo vi**.
- Cierre al superar PK, cancelación y no repetición de ventana; posibilidad de corregir antes de cierre.
- Orden invertido en sentido contrario; cambio de vía, superposición de precauciones y carteles próximos.
- Saltos de GPS, pérdida de señal, recuperación, lecturas antiguas y error de PK; nunca falsos faltantes.
- Precaución sin georreferenciación validada y boletín vencido → advertencia sin conclusión automática.
- Separación entre cartelería y velocidad; gráfica marrón punteada y H-21 gris punteado.
- Preservación de historial, importadores PDF/Excel/JSON, exportación y pruebas existentes `tests/regresion-marcha-0774.cjs`.

## Próxima implementación
Integrar **en candidata experimental**, no en base estable, una máquina de estados reproducible y pruebas sintéticas antes de auditar a bordo. Definir y calibrar metros de apertura/cierre y tolerancias GPS con datos de campo; conservar control manual.
