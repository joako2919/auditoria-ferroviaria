# Cierre de trabajo — jueves 26/11/2026

## Estado verificado en GitHub
- Sitio estable en la ruta `index.html` de `main`: piloto **0.7.22**. No fue reemplazado.
- Versión experimental de prueba disponible como archivo separado en `pruebas/gps-0762-carteles-velocidades-gps-asistido-experimental.html` de `main`, derivada de la rama `pulido-dashboard-interfaz-0761-20261126`.
- El acceso a GitHub se comprobó con permisos de lectura y escritura. No pedir nuevas autorizaciones; el mensaje “Model not found” visto en el teléfono no prueba un rechazo de GitHub.
- Se registraron correcciones de presentación de gráficos vacíos y duplicados en la experimental 0.7.61; no se verificaron visualmente en el teléfono.
- En la experimental 0.7.62 se trasladó la interfaz de control de carteles al módulo **Velocidades**, con sugerencia basada en PK GPS estimado y precauciones del boletín local verificadas; incluye bloqueo para tramos demasiado cortos frente a la incertidumbre GPS. Guarda solo controles confirmados manualmente por el inspector. Es implementación experimental, no validación ferroviaria.

## Condiciones y limitaciones
- El boletín del 26/11/2026 fue aportado para análisis documental; **no** fue incrustado ni publicado en el repositorio. Debe cargarse y cotejarse por el inspector en el almacenamiento local de la aplicación.
- Las distancias de preparación de 1.200 m y aviso de 800 m son referencias de ensayo del módulo; no permiten acreditar la ubicación real de la señalización. La presencia física exige observación.
- La velocidad GPS y el PK entre estaciones siguen siendo estimativos: no declaran infracciones, ni sustituyen indicaciones de circulación y señalización ferroviaria.
- La web puede dejar de registrar lecturas en segundo plano con llamadas/WhatsApp; la solución nativa Android queda diferida como decisión del proyecto.
- **Precaución con almacenamiento:** abrir estable y experimental en la misma procedencia web puede compartir `localStorage`. Hacer respaldo JSON antes de ensayar y no generar una auditoría experimental encima de una real sin aislar los datos.

## Recomendación para la prueba de hoy
1. Usar **0.7.22 estable** para el registro real, luego de exportar respaldo JSON y comprobar su existencia.
2. Seleccionar servicio, sentido, dotación e itinerario ya cargados, iniciar auditoría y GPS con la aplicación en primer plano; si se pierde el GPS usar anotaciones manuales y registrar el intervalo sin lectura.
3. Para carteles y velocidad, documentar únicamente lo que el inspector observe en campo y cotejarlo con el boletín oficial. No depender de alertas experimentales.
4. Cerrar y archivar el servicio; exportar otro respaldo JSON y guardar evidencia de pantalla de los gráficos y controles que hayan fallado.

## Próximos pendientes
- Probar 0.7.62 en entorno aislado con boletín local del 26 y recorrido GPS real, corroborando ruta, sentido, PK, elección automática de precaución, tres carteles y comparación de velocidades.
- Revisar legibilidad en Samsung S22 del dashboard y sus seis colores, cero vs sin datos, gráficas ampliadas, horarios y permanencias en mm:ss.
- Simplificar los resúmenes consultables del boletín (precauciones, trabajos e instrucciones Transporte) como prioridad posterior; el texto completo oficial debe seguir disponible.
- Consolidar sólo cambios verificados y con respaldo, sin modificar ni borrar los registros históricos.
