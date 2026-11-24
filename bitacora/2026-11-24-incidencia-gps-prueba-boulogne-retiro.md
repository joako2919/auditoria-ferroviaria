# Incidencia de campo en revisión — GPS y marcas de estaciones — 24/11/2026

**Proyecto:** Auditoría de Circulación Ferroviaria, Línea Belgrano Norte.
**Versión de referencia:** 0.7.54 experimental.
**Fuente:** comunicación del auditor del 24/11/2026 (tarde). Esta ficha registra observaciones reportadas; no equivale a una medición técnica de GPS.

## Hechos reportados
- Se intentó iniciar una auditoría desde **Boulogne Sur Mer** con destino **Retiro**.
- El usuario informa que el sistema no registró estaciones automáticamente mediante GPS y pidió utilizar el control manual.
- Se enviaron imágenes de la situación para diagnóstico, pero aún no se cotejan coordenadas y textos exactos en esta ficha.
- Se considera la posibilidad de una siguiente prueba, desde **Carapachay** hacia **Retiro**, con un servicio de pasajeros posterior y diferente, seleccionado del H-21.

## Hallazgos verificados en el código 0.7.54
1. **GPS de sugerencias de estación** («Buscar 3 estaciones cercanas») es diferente de **GPS de seguimiento automático** («GPS → Iniciar / reanudar GPS automático»). El primero solo propone ubicaciones y obliga a confirmar el origen.
2. En la selección de origen, una estación propuesta deja de ser confirmable automáticamente cuando la precisión supera **120 m** o la estación se encuentra a más de **1.500 m**; la selección manual permanece disponible.
3. En el registro automático, se descartan muestras sin ubicación reciente, con precisión **mayor de 55 m** (o **90 m** en Aristóbulo del Valle), fuera del radio configurado o sin dos lecturas suficientemente consistentes. No suponer falta de sensor por ausencia de marcas automáticas.
4. El seguimiento iniciado separadamente no equivale a iniciar la **auditoría automática**. Para vincular movimientos al servicio seleccionado, es necesario utilizar el control específico de «Iniciar / reanudar GPS automático».
5. La función heredada **Nueva auditoría** puede eliminar registros locales actuales después de una confirmación. **No utilizarla como forma de comenzar el próximo servicio sin exportar el respaldo**. En su lugar, usar «Cerrar y archivar auditoría» en GPS y el control de nueva auditoría de ese módulo, que utiliza ID/fecha/servicio separados.
6. El control «Exportar respaldo JSON» del módulo GPS llama al respaldo integral de las claves locales de la app. La exportación debe confirmarse en el dispositivo.

## Hipótesis, NO conclusiones
- Falta de inicio de auditoría GPS (solo se habilitó seguimiento o búsqueda de estación).
- Falta de precisión o antigüedad de muestras GPS, que el algoritmo descarta por diseño.
- Estación de origen incorrecta/no confirmada o servicio H-21 distinto al tren auditado.
- Restricción de GPS por navegador/permisos/ubicación en segundo plano o túnel/tramo difícil.
- Error del algoritmo de comparación/selección de estaciones, pendiente de evidencia.

## Próximo protocolo mínimo
1. **Primera auditoría (Boulogne → Retiro):** si aún sigue abierta, entrar a GPS y «Cerrar y archivar auditoría»; luego exportar **respaldo integral JSON** desde el dispositivo. No borrar ni limpiar datos. Etiquetar el resultado como parcial si no se registraron movimientos automáticos.
2. **Próximo servicio Carapachay → Retiro, si corresponde:** seleccionar en Servicio **Carapachay** manualmente, fecha 24/11/2026, sentido «Villa Rosa → Retiro», servicio real del H-21 y destino final Retiro. Completar dotación solo si corresponde.
3. Ir a GPS y tocar el botón **«Iniciar / reanudar GPS automático»**; verificar que indique «Auditoría [tren] en curso. GPS solicitado». No basta con tocar «Iniciar seguimiento GPS» en Dotación.
4. Anotar en las primeras estaciones: servicio, estación, hora real observada, estado literal del GPS y precisión ±m, calidad de registro (automático/manual/no observado) y captura de pantalla cuando sea seguro.
5. Si falla: usar «Registro manual de estaciones» para consignar las horas comprobadas; nunca reconstruir horas automáticas retroactivamente. Registrar como novedad técnica «GPS sin detección automática».
6. Terminado el servicio, «Cerrar y archivar auditoría», exportar JSON integral; comprobar que el servicio anterior permanezca en historial.

## Pendiente para diagnóstico
- Comprobar mensajes literales y calidad GPS de las capturas en la pestaña **GPS**.
- Indicar número de servicio en cada recorrido, hora real, estación y si se tocó **«Iniciar / reanudar GPS automático»**.
- Comparar marcas automáticas/manuales en el informe por servicio y el respaldo (archivo privado, no publicarlo en GitHub).
- No inferir ni prometer que el GPS está calibrado; se requiere prueba en campo.

**Estado:** Incidencia de GPS **abierta para validación**, sin modificación del código ni de bases. Importador de PDF 24/11 permanece cerrado y funcionando en 0.7.54.
