# Control integral sintético — 0.7.46

**Fecha:** 24/11/2026 — mañana, Argentina.  
**Código ensayado:** `pruebas/gps-0746-avisos-perfiles-revisados-experimental.html`, rama `revision-avisos-0746-20261124`, SHA original de la 0.7.46 `0f7c24f52fe38fd78bb74f4ad0d621321bb9b3eb`.  
**Ambiente:** ejecución aislada de módulos JavaScript originales extraídos del HTML, DOM/almacenamiento/GPS simulados, sin conexión a dispositivos reales. **NO ES prueba integral de navegador o de tren**.

## Resultados ejecutados

1. **Sintaxis y preservación:** 38/38 scripts sin error de sintaxis; entre 0.7.45 y 0.7.46 solo cambia el bloque de configuración de avisos, además de título/comentario; importador Excel/PDF/JSON sin cambio. Estable 0.7.22 y experimental 0.7.45 conservadas.
2. **GPS — recorrido ficticio completo:** se inició auditoría de tren 3103 con origen Retiro/destino Villa Rosa y un H21 sintético de 23 estaciones. Se alimentaron dos lecturas simuladas por estación, con precisiones y velocidades artificiales: **23 movimientos distintos y 23 estaciones con marca, sin duplicados**. Primera marca: partida Retiro. Última: llegada Villa Rosa. La simulación NO demuestra precisión geográfica ni temporal del teléfono.
3. **GPS — casos adversos:** lecturas con precisión ±200 m: cero marcas; salto inverosímil de Retiro a M. M. Padilla: rechazado; dos lecturas válidas de Saldías: única marca; mismo timestamp repetido: cero marcas adicionales. Estado de auditoría/filtros preservado.
4. **Auditorías sucesivas de un mismo tren:** tras cerrar y archivar la primera auditoría, iniciada otra con tren 3103 y fecha siguiente, se generó ID diferente, se mantuvieron los movimientos anteriores y el historial guardado. El filtrado por `auditId` excluyó los movimientos históricos de la auditoría activa.
5. **Dashboard 0.7.43:** ocho diferencias H21 comparables ficticias y un registro sin comparación: cinco franjas celeste 1 (12,5%), verde 2 (25%), amarillo 2 (25%), naranja 2 (25%), rojo 1 (12,5%); violeta correctamente **no cuantificado**. Una segunda auditoría del mismo tren/otra fecha mostró solo su propio movimiento (1 rojo, 100%). Los registros de carteles y avisos GPS quedaron separados.
6. **Respaldo integral JSON:** simulación aislada de exportación incluyó las claves `audit_bn_` y `auditoria_bn_`, incluidas las preferencias de avisos de iPhone/Android, y excluyó una clave ajena. Simulación de restauración con confirmación recuperó los valores anteriores y dejó intacta la clave ajena. NO equivale a prueba de descargas/permisos/almacenamiento físico.
7. **Avisos de dispositivo 0.7.46:** cinco escenarios sintéticos aprobados en la revisión anterior (iOS real/simulado sin vibración, Android con y sin API, selección manual de perfil iOS). No se midió el sonido o háptica real.

## Pendiente obligatorio antes de auditoría en terreno

- **Android real con la pantalla activa:** abrir la versión elegida en entorno de prueba, iniciar GPS con permisos, seleccionar servicio H21 y fecha/sentido, guardar dos movimientos de prueba, comprobar Dashboard, observación manual, bloqueo de pantalla/retorno y cerrar auditoría ficticia; asegurarse de no mezclar servicios.
- **Respaldo privado desde el celular:** exportar JSON, confirmar que se descargó y tiene tamaño no nulo, conservarlo fuera del navegador; prueba de restauración solo sobre entorno o dispositivo aislado para no sobrescribir datos de campo.
- **Documentos:** importación de PDF/Excel/JSON con archivos de prueba reales, incluyendo restauración de bases. Posible dependencia de bibliotecas externas en primera carga. No volver a alterar motor importador ya aprobado.
- **Prueba iPhone Safari:** pendiente física, especialmente permisos y continuidad GPS/audio en segundo plano.
- **Reporte A4 y Dashboard:** verificar desde navegador y teléfono, incluida navegación y actualización visual en marcha.
- **Observación crítica:** el seguimiento GPS de navegador puede suspenderse en segundo plano o al bloquear la pantalla. Si falta señal, completar los movimientos manualmente y consignar la diferencia; no atribuir medidas que no se observaron.

## Dictamen

**Control sintético: conforme para pasar a prueba supervisada en Android.**  
**Control operativo/compatible iPhone: pendiente.** No declarar aplicación terminada ni recomendar reemplazar el piloto estable 0.7.22 hasta superar las pruebas funcionales reales. Como herramienta de auditoría, no sustituye al RITO ni a los procedimientos de seguridad de circulación.

**Sin información privada de empleados, servicios reales, imágenes de campo ni bases operativas.**
