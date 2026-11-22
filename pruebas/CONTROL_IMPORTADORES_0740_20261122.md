# Control de importadores — etapa inicial 22/11/2026

**Objeto:** auditoría de no regresión sobre `pruebas/gps-0740-continuidad-respaldo-dashboard-experimental.html`. Se conserva 0.7.22 y la base 0.7.39.

## Primer resultado
Se ejecutó `parseBulletin079` extraído del HTML 0.7.40 con **filas de prueba reconstruidas de las tablas del boletín del 22/11/2026**. No se realizó todavía la prueba integral de abrir el PDF desde el selector móvil. Resultado:
- **8 registros** reconocidos: 5 de vía ascendente y 3 de vía descendente.
- **6 restricciones de velocidad** y **2 clausuras de PAN**.
- P.A.N. Paillete, PK 42/228, figura dos veces con distinto sentido, **clausurado al paso vehicular**, no a la circulación ferroviaria.
- Fecha documental: 22/11/2026.

El resultado coincide con las tablas del documento aportado, pero no certifica la importación de su archivo PDF real, la persistencia del contenido completo ni la validez de todas las demás disposiciones.

## Limitaciones verificadas por inspección
- El lector universal de Excel y PDF (`importadores-0729.js`) carga bibliotecas XLSX y pdf.js desde redes CDN cuando no están precargadas. **No se puede prometer importación de PDF/Excel sin Internet** en instalación fresca; la continuidad de auditoría sin GPS/Internet es un requisito distinto.
- El importador de boletines `importPrecautions079` envía PDF al lector específico y conserva sus precauciones y clausuras de PAN. Declara expresamente `documentoCompleto:false`, `alcance:'solo_precauciones'`; cuadrillas de vía, señalamiento y demás disposiciones **no están importados automáticamente**.
- Un selector visible con la extensión correspondiente no certifica el procesamiento ni el guardado de archivos reales.
- En la 0.7.40 los importadores y las bases siguen sin modificación funcional respecto de la 0.7.39.

## Próximas verificaciones necesarias antes del martes
1. Importar PDF real y comparar registros, fecha, motivo y vía contra el original, sin grabar automáticamente en bases de uso operativo.
2. Ensayar libros XLS/XLSX y JSON representativos para itinerarios H21/H22, señales P, boletines, dotación; comprobar que no destruyan las bases previas y la restauración íntegra.
3. Validar operaciones con Internet ausente y presente y mantener la auditoría local disponible; no prometer importación de bases offline hasta incorporar lectores locales.
4. Incorporar disposiciones, cuadrillas, señalamiento y demás tipos del boletín en módulo propio, sin convertirlos falsamente en restricciones de velocidad.
5. Probar en celular informe PDF A4, respaldo JSON, selección por auditoría, GPS y Dashboard.

**Estado:** prueba unitaria simulada **OK** para 8 registros de la tabla; prueba real de archivo, integración y no regresión **PENDIENTES**. No publicar como lista para uso en campo. No se incluyen datos personales ni registros de auditorías reales.
