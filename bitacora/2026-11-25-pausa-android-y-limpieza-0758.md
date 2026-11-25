# 25/11/2026 — Continuación web y limpieza experimental 0.7.58

## Decisiones de trabajo
- El desarrollo Android Studio / APK queda **en pausa** por decisión del auditor. No se inicia ni se entrega instalador Android en esta etapa.
- Seguimos sobre la aplicación web, con la referencia experimental 0.7.57 y sin modificar la versión estable en uso ni sus respaldos.
- La descarga e instalación de una versión mejorada en el celular se posponen hasta que el usuario pueda consultar adecuadamente las conversaciones de ChatGPT y el archivo esté probado.
- La falla de visualización del historial de ChatGPT es independiente del almacenamiento de archivos en GitHub. No constituye prueba de pérdida del código.

## Cambio experimental creado
- Rama: `limpieza-interfaz-0758-20261125`
- Archivo: `pruebas/gps-0758-interfaz-sintetica-experimental.html`
- Se crea a partir de la 0.7.57 sin reemplazarla.
- Once ajustes de interfaz: título/versión corregida, estado de conexión breve, eliminación de aviso redundante de portada, advertencia de prueba y PK reducida a una línea, explicación corta sobre seguimiento GPS web, texto reducido de respaldo, control manual, detenciones y carteles.
- La advertencia esencial de que la aplicación **no es un sistema de seguridad** se mantiene en forma breve. Las confirmaciones documentales y observación visual deben mantenerse.

## Verificación técnica de archivo
- Comparación de tamaño: origen 487.363 caracteres, nuevo 486.019 caracteres.
- Conteo de etiquetas `<script>` y `</script>`: 40/40 en ambas versiones.
- Conservados: identificador GPS, estado de conexión y estructura de precauciones observadas.
- El archivo quedó confirmado en GitHub, con copia original intacta.
- **Pendiente**: prueba funcional real en navegador, importación PDF/Excel/JSON, visualización en celular, alarmas, datos por servicio, restauración de respaldo, comparación de estadísticas y gráficos. No se declara validación operativa.

## Siguiente orden de trabajo
1. Validación en navegador de 0.7.58 y revisión de textos residuales que distraen al auditor.
2. Verificar los seis registros de velocidad y separar las dos clausuras de PAN, detectando incongruencias en amarillo y excluyéndolas del control automático hasta corregir documento.
3. Simplificar control de tres carteles, evitando doble acción de "Chequear" donde corresponda.
4. Revisar gráficos y dashboard: celeste, verde, amarillo, naranja, rojo y violeta; horarios y diferencias en mm:ss; velocidades permanentes/provisorias; carteles presentes, ausentes y anomalías; novedades; huecos de GPS.
5. Mejorar recuperación de GPS web; **no prometer continuidad en segundo plano** al alternar aplicaciones.
6. Solo tras pruebas y normalización de ChatGPT en el teléfono, preparar entrega para auditoría en traza.
