# 25/11/2026 — Regla de validación documental de precauciones · experimental 0.7.57

## Decisión operativa acordada
Cuando se importa una base documental de precauciones provisorias, la aplicación detecta inconsistencias, presenta aviso AMARILLO, obliga a cotejar y confirmar con el archivo original y preserva la anomalía con la información documental intacta para formular la denuncia. El registro observado NO se utiliza para los controles automáticos de velocidad o carteles. No se modifica el dato de la fuente. La regularización exige nuevo archivo oficial y cotejo del inspector; ninguna corrección se presume.

## Ejemplo comunicado
Vía ascendente PK 31/480 → 00/088, 30 km/h. Rango de progresivas incompatible con el sentido ascendente: ARCHIVAR COMO OBSERVADO, no calcular aviso o límite GPS con ese tramo hasta recibir fuente corregida.

## Cambio implementado
- Archivo nuevo: `pruebas/gps-0757-validacion-documental-experimental.html` (copia de 0.7.56).
- La importación PDF ya separaba registros observados y activos; ahora muestra la advertencia amarilla, requiere confirmación explícita y archiva `estadoAnomalia: pendiente_denuncia`.
- En Excel y JSON se comparan PK inicial/final y sentido cuando constan ambos, se señalan velocidades inusuales y se archivan los registros inconsistentes aparte en `precaucionesObservadas0757` dentro de la base local, sin reemplazar la lista operativa con anomalías.
- La evaluación de provisorias filtra también rangos erróneos heredados de bases antiguas; no los usa para controles automáticos.
- No se envía una denuncia a terceros automáticamente. El auditor la tramita por la vía institucional correspondiente.
- Si el nuevo documento conserva la misma fecha, el lector de boletines ya prioriza el importado más recientemente, preservando historial previo. La verificación manual de versión y vigencia sigue siendo indispensable.

## Comprobaciones ejecutadas
- Análisis sintáctico de los 39 scripts de la nueva página: sin errores.
- Prueba sintética de seis velocidades con motivo y sentido: 5 válidas, 1 observada (31/480 → 00/088).
- Prueba sintética del importador Excel/JSON: 2 utilizables, 1 anomalía.
- Prueba sintética del motor de evaluación con documentos nuevos y base anterior: se excluye 31/480 → 00/088 en ambos orígenes.
- No se verificó aún carga y cotejo del PDF oficial real, interfaz en Android, respaldo/restauración tras importar, ni continuidad GPS en segundo plano.
- Enlace de GitHub de archivo confirmado; disponibilidad de su URL en GitHub Pages no verificada todavía.

## Protección
No se modificaron la estable 0.7.22 ni la anterior experimental 0.7.56. 0.7.57 es copia autónoma para pruebas, sin migración ni borrado automáticos de historiales.
