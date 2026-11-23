# Control incremental de coherencia entre módulos — 0.7.41
**Fecha:** 23/11/2026  
**Estado:** experimental; NO aprobado para uso operativo  
**Origen:** `continuidad-dashboard-seguro-0740-20261122/pruebas/gps-0740-continuidad-respaldo-dashboard-experimental.html`  
**Candidata nueva:** `pruebas/gps-0741-coherencia-modulos-experimental.html`

## Regla de trabajo
No modificar funciones que ya se probaron a bordo ni reabrir por defecto problemas corregidos. La importación de Excel, PDF y JSON fue utilizada y aprobada por el auditor durante la revisión previa de 0.7.38. En esta revisión se conserva literalmente el script `importadores0729`. Tampoco se modifica la lógica de respaldo integral ni su restauración: el filtro de claves `/^(audit_bn_|auditoria_bn_)/` incluye registros de continuidad. Las limitaciones offline de bibliotecas de PDF/Excel son un asunto separado, no una regresión introducida aquí.

## Riesgo de coherencia confirmado por lectura de código
- La lista heredada de registros usaba `records076.map` sin condicionar por `auditId`, aunque el panel GPS actual y el Dashboard ampliado sí se separaban por auditoría. Podía mostrar registros de un servicio anterior en la vista de uno nuevo.
- Los contadores heredados y algunos gráficos filtraban por número de tren, pero no por identificador único de auditoría; eso permite mezclar viajes de igual tren realizados en distintas fechas.
- La anotación de un movimiento manual y de un cartel se asociaba a la auditoría después de una renderización previa; algunas vistas no se repintaban inmediatamente. La novedad manual también se guardaba sin pedir nuevo render inmediato.
- El resumen integral y la cronología GPS ya filtraban por `auditId`; esos cálculos no se reescribieron.

## Cambios aislados (sin alterar las bases)
1. Filtro por `auditId` en la lista heredada de movimientos/carteles y en las etiquetas PK de carteles.
2. Filtro por `auditId` en conteo H21, gráfico previo, gráfico de hilos y resumen de cabecera. Sin auditoría GPS seleccionada, se conserva el comportamiento heredado para consulta.
3. Render inmediato al guardar una novedad manual, asociar un movimiento manual y asociar un cartel a la auditoría actual.
4. Etiqueta independiente 0.7.41. El HTML original 0.7.40 no se modifica.

## Comprobaciones ejecutadas
- 34 bloques JavaScript compilados sintácticamente: **OK**.
- Cantidad de scripts respecto del origen: **34, sin pérdidas**.
- Script `importadores0729` cotejado literalmente con 0.7.40: **idéntico**.
- Lógica de respaldo integral y restauración cotejada literalmente con 0.7.40: **idéntica**.
- Filtro simulado sobre registros ficticios de servicios 3102/3103 con identificadores distintos: **OK**, una sola auditoría visible cuando hay una activa; comportamiento anterior conservado cuando no la hay.
- Se mantiene el formato de almacenamiento local y el código de GPS original.

## Pruebas que faltan
**NO** se probó todavía el comportamiento extremo a extremo en navegador/móvil, ni una restauración real. Antes de aprobar:
- Crear dos auditorías ficticias con fechas y servicios diferentes, y repetir un número de servicio en otra fecha; comprobar que lista, gráficos, Dashboard, impresión y JSON no crucen registros.
- Anotar estación, cartel, detención y novedad manual; comprobar aparición en vistas y recarga del navegador.
- Probar exportación y restauración integral en almacenamiento aislado, conservando registros de continuidad GPS/red.
- Hacer verificación de humo de importación previamente aprobada (Excel/PDF/JSON) sin volver a transformar bases ni sobrescribir archivos reales.
- Comprobar arranque, funcionamiento GPS y controles manuales, impresión A4, precisión de estaciones y distribución móvil.
- Dashboard completo: faltan controles documentados de velocidades, señales, precauciones y seis colores; no presentar como verificados valores sin evidencia.

## Condición para probar el martes 24
La versión estable 0.7.22 y la 0.7.40 deben permanecer disponibles. No sustituir la versión de campo hasta superar las verificaciones. No subir a GitHub nombres, legajos, dotaciones ni registros operativos reales.
