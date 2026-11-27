# Bitácora · 27/11/2026 · Auditoría del servicio 3069 y regresión de marcha multicolor 0.7.74

## Datos de la prueba real
- App: candidata **0.7.72**.
- Servicio **3069**, sentido ascendente, Vicealmirante Montes → Villa Rosa, fecha 27/11/2026.
- Se recibieron dos exportaciones JSON privadas y dos capturas de pantalla de Estadísticas y Marcha ampliada. **Los respaldos y datos personales NO se incorporan al repositorio.**
- La aplicación guardó **13 movimientos** vinculados a esta auditoría y **580 muestras** de velocidad. Todos los movimientos H21 cotejados quedaron entre +0:06 y +2:07; arribo Villa Rosa +1:11.
- Hubo avisos experimentales de precauciones, pero no reconocimiento automatizado y verificado de carteles físicos.
- En el gráfico de velocidad, las muestras almacenadas no incorporaban `lp` (límite provisorio PDF); la representación no es prueba de cumplimiento.
- El gráfico de marcha de Estadísticas y su ampliación mostraban la circulación real en **rojo fijo** pese a que todos los tiempos del servicio 3069 correspondían a la categoría verde.
- El usuario aclaró que **amarillo no integra los parámetros acordados**. Colores de marcha: celeste (<0), verde (0 a +3:00), naranja (>+3:00 a +5:00), rojo (>+5:00); violeta para alertas reales persistentes registradas, que deben conservarse históricamente.

## Qué hace cada candidata
- **0.7.72:** versión usada en campo el 27/11; permanece intacta.
- **0.7.73:** `pruebas/gps-0773-grafico-pdf-colores-experimental.html`. Reconstruye exclusivamente para la gráfica una referencia de velocidades provisorias de un boletín local de la fecha del servicio, sin modificar las mediciones originales; retira amarillo de clasificación y usa gris para los huecos GPS. **La vía, precisión PK y vigencia documental aún necesitan comprobación; no inferir infracciones.**
- **0.7.74:** `pruebas/gps-0774-marcha-multicolor-experimental.html`. Basada en 0.7.73; elimina el rojo fijo de `renderFocus0755()` y colorea cada punto real y cada segmento con la diferencia H21 del movimiento representado (segmento = color del movimiento final). El H21 permanece gris punteado, los saltos entre marcas se dibujan discontinuos y los movimientos sin cotejo H21 van en gris. Violeta se usa sólo si existe alerta persistente guardada para ese movimiento. La vista ampliada `marchWide0756` copia el dibujo compacto `dMarchSvg0733`, para evitar divergencias.
- No se reemplazó la versión principal `index.html`, ni 0.7.72, ni 0.7.73, ni se tocó el almacenamiento privado del navegador del auditor.

## Regresión automatizada
- Código reproducible: `tests/regresion-marcha-0774.cjs`.
- Ejecución sobre fuente exacta de GitHub de las versiones 0.7.73 (control) y 0.7.74 (candidata).
- **31 pruebas aprobadas de 31**, incluyendo: demostrar rojo fijo en versión anterior; ausencia de rojo fijo en la nueva; siete segmentos y ocho marcas verdes en la ventana final del servicio sintético 3069; H21 punteado; leyendas sin amarillo; clasificación celeste/verde/naranja/rojo/violeta/gris; permanencia de alerta violeta, aislamiento de otra auditoría; salto punteado ante estación sin marca; identidad gráfica entre compacto y ampliado; sintaxis válida en 47 scripts; presencia de claves de almacenamiento, GPS, velocidades, base PDF, módulo de importación Excel/PDF/JSON.
- La prueba automatizada usa únicamente **horarios sintéticos** basados en las diferencias del servicio, nunca nombres de empleados, legajos, dotaciones o archivos de respaldo.
- No se ha realizado en este turno una prueba completa de navegador ni una nueva circulación física.

## Regla antirregresiones para siguientes versiones
**Antes de publicar otra candidata:** ejecutar `node tests/regresion-marcha-0774.cjs pruebas/RUTA_DE_LA_NUEVA_VERSION.html` desde la raíz del repositorio. La prueba carga la candidata indicada, compara la 0.7.73 y termina con código distinto de cero cuando falla una comprobación. Mantener los archivos anteriores como puntos de retorno y no incorporar bases privadas.

## Pendientes para próxima prueba en terreno
1. Abrir 0.7.74 en Samsung y revisar que la vista chica y ampliada del 3069 se vean verdes, H21 punteado y que se conserven las auditorías anteriores.
2. Confirmar que el módulo de velocidades represente los techos documentales de los PDF asociados a PK/vía/sentido y refleje explícitamente el error de localización y condición de cotejo documental.
3. Automatizar secuencia de avisos de carteles Aviso–Inicio–Fin sin formularios extensos, sin confundirla con un control físico verificado.
4. Revisar la coherencia entre dotación de auditoría cerrada y datos exportados; no incluir datos personales en GitHub.
5. Continuar comprobando GPS en segundo plano y su continuidad; la web aún no es un sistema de seguridad ferroviaria.

