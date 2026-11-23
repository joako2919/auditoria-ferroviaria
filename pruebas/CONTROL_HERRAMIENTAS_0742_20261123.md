# Control de modernización de navegación — 0.7.42
Fecha: lunes 23 de noviembre de 2026
Estado: EXPERIMENTAL. No aprobado para uso operativo ni validado en celular.
Base: 0.7.41, rama coherencia-modulos-0741-20261123.
Copia independiente: pruebas/gps-0742-herramientas-experimental.html

## Cambio construido
- La pestaña “Más” ahora muestra “Herramientas” y abre su propia vista `herramientasPanel0742`.
- Vista nueva: resumen del servicio GPS seleccionado, sus movimientos/novedades, acceso directo a Bases, Informe/PDF A4, exportación del respaldo integral JSON y restauración privada mediante los controles ORIGINALES. No se cambió ninguna función de importación o de restauración.
- Historial archivado: consulta no destructiva a `auditoria_bn_0728_historial`, con conteos por servicio y fecha; solo lectura, sin mezclar al servicio activo.
- Diagnóstico técnico dentro de un desplegable, con información de conexión navegador y hora de la última muestra GPS si la hubiera.
- Ayuda descriptiva extensa de GPS plegada, manteniendo a la vista el aviso principal de seguridad y los botones de iniciar/cerrar.
- Los paneles manuales heredados siguen en el código y disponibles como contingencia. Se conserva el aspecto de informe A4 sin modificar su estructura.

## Control estático realizado
- 34 bloques JS de origen preservados literalmente y un bloque nuevo adicional: 35 bloques.
- 35/35 bloques sin errores de sintaxis.
- Script `importadores0729` literalmente idéntico a la 0.7.41.
- Lógica de respaldo integral JSON y restauración idéntica a la 0.7.41.
- Destino de navegación coherente con panel creado en DOM: OK por inspección.
- Sin duplicaciones de IDs en el marcado HTML original + nuevos bloques estáticos.
- No se cambian claves localStorage ni datos privados. El HTML no incorpora personal ni auditorías reales.

## Riesgos y pendiente
- NO se ejecutó navegador real ni prueba visual/móvil; la comprobación de sintaxis y estructura no es una prueba de funcionamiento.
- Debe verificarse la interacción del botón de respaldo, restauración con confirmación, cambio de vistas, historial tras recarga, plegado de ayudas y accesibilidad móvil con la 0.7.42.
- Faltan pruebas reales integrales de los cuatro importadores, GPS, boletín PDF, separación 3102/3103, restauración en entorno aislado y Dashboard integral completo.
- Las pestañas de velocidad/estadísticas aún contienen controles de validación heredados; su simplificación requiere prueba funcional antes de mover u ocultar más.
- Nunca reemplazar index.html estable 0.7.22 ni el contenido de 0.7.40 y 0.7.41.

La modernización se acota a presentación y navegación para evitar regresiones en funciones aprobadas.
