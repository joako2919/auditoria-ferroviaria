# 26/11/2026 — Inicio del pulido visual experimental 0.7.61

## Decisión funcional
Por decisión del auditor, primero terminar y estabilizar la aplicación web de Auditoría de Circulación Ferroviaria, sus menús, gráficos, carteles, horarios e informes. Posponer Android nativo y distribución por Google Play hasta después de las pruebas satisfactorias. No instalar ahora el APK piloto en el Samsung S22.

## Base real y protección
- Repositorio: joako2919/auditoria-ferroviaria.
- Base: rama `dotacion-flexible-0760-20261125`.
- Nueva rama aislada: `pulido-dashboard-interfaz-0761-20261126`.
- Archivo completo: `pruebas/gps-0761-pulido-dashboard-interfaz-experimental.html`.
- No se modifica `index.html`, la versión estable 0.7.22, la 0.7.60, auditorías locales, importadores ni claves de almacenamiento.

## Cambios introducidos
1. Dashboard: SVG de resumen ajustados al ancho disponible; se elimina la anchura fija obligatoria de 780/1050 píxeles que forzaba desplazamiento lateral y ocultaba parte del gráfico.
2. Gráficos ampliados: botones **Vista completa** y **Ampliar para leer**, con scroll lateral en modo detalle. En móvil, tabla de horarios y diferencias apilada por estación; se conserva el formato m:ss y la distinción entre datos reales y huecos de GPS.
3. Carteles: los controles originales de precaución, PK observado, resultado y nota se agrupan en un panel rápido GPS. Los botones Aviso/Inicio/Fin ya no obligan a navegar hacia el formulario desplegable. Un único botón invoca la función original de registro, preservando las validaciones de precaución seleccionada, PK observado, sentido y vínculo con la auditoría.
4. Seis colores en Dashboard: se visualizan valores cero, incluso violeta, con advertencia explícita de que **violeta todavía no tiene criterio de clasificación validado**. Cero no acredita cumplimiento.
5. Rotulación 0.7.61 experimental, conservando las 40 etiquetas script existentes y agregando una extensión aislada (41 scripts balanceados).

## Evidencia y límites
- Código nuevo pasó comprobación sintáctica de la extensión JS; generación de archivo y confirmación de commit por GitHub.
- No se ha realizado prueba de renderizado en Samsung S22 ni prueba funcional a bordo.
- El GPS web puede perder muestras al cambiar de aplicación o bloquear pantalla; no se infieren posiciones o velocidades inexistentes.
- La vista rápida sigue exigiendo PK observado válido y precaución documental, sin convertir una aproximación GPS en prueba documental.
- El botón de instalación APK no se utiliza.

## Próximas pruebas antes de publicar o distribuir
- Abrir archivo experimental en navegador móvil, revisar ancho de gráficos y navegación visual sin datos y con datos respaldados.
- Guardar controles de aviso, inicio y fin en una auditoría de prueba; confirmar atribución a la precaución seleccionada y al servicio; verificar que no se dupliquen.
- Revisar tiempos reales y teóricos, m:ss, seis indicadores, interrupciones GPS, importación Excel/PDF/JSON, backup/restauración e historial.
- Revisar textos dinámicos redundantes restantes y controles del resto de solapas.
- No declarar versión estable hasta pasar pruebas.
