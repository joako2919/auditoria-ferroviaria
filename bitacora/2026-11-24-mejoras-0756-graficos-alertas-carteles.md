# Bitácora — Integración experimental 0.7.56 — 24/11/2026

Proyecto: Auditoría de Circulación Ferroviaria, Línea Belgrano Norte.
Base: 0.7.55 experimental (gráficos por tramo), derivada de 0.7.54 importador PDF 24/11. Se conserva 0.7.54 como versión utilizada en campo y 0.7.22 como estable sin modificar.
Archivo NUEVO en repositorio principal: `pruebas/gps-0756-dashboard-alertas-carteles-experimental.html`.
Enlace GitHub fuente: https://github.com/joako2919/auditoria-ferroviaria/blob/main/pruebas/gps-0756-dashboard-alertas-carteles-experimental.html
Enlace esperado GitHub Pages (requiere comprobar despliegue en celular): https://joako2919.github.io/auditoria-ferroviaria/pruebas/gps-0756-dashboard-alertas-carteles-experimental.html

## Evidencia de campo que motiva esta integración
- Servicio 3107 (24/11, Boulogne Sur Mer → Villa Rosa): 13/14 estaciones con marca GPS, 618 muestras de velocidad, cuatro interrupciones GPS recuperadas; dos interrupciones coincidieron con cambio de app por fuerza mayor según el inspector y dos con traza/circulación. Las causas no están certificadas por GPS.
- Servicio 3097: solo tres marcas y gráficos comprimidos. Los valores de Dashboard eran contadores de marcas, NO el recorrido físico total.
- El aviso «AVISO DE CONTROL ... Aviso de prueba» aparecía sin solicitud de prueba. Origen hallado: wrapper `window.beep076` que emitía sonido genérico y abría modal para cualquier invocación heredada.
- Tres carteles de precauciones provisorias (aviso, inicio, fin) fueron trabajados y ensayados en versiones anteriores, pero el registro manual quedaba escondido en Herramientas y podía no tener vínculo auditId.
- Minutos y segundos en horarios y diferencias ya figuraban en decisiones/prototipos previos; no desarrollar concepto de nuevo ni perder las funciones.

## Cambios concretos de la 0.7.56
1. **Gráficos ampliados**: botón «Ver gráficos ampliados» en Estadísticas abre vista modal amplia. Gráfico de marcha ampliado por tramo heredado de 0.7.55; gráfico velocidad GPS con eje en km/h y tiempo real, línea gris de límite H21 documental, zonas coloreadas de períodos sin muestras >25 s y conteo de umbrales básicos; tabla por estación de horarios H21, GPS, movimiento registrado y diferencia `m:ss`.
2. **Tiempos**: diferencia más reciente y permanencias en panel original expresadas `±min:ss`; actualización para filas de permanencia. El valor `—` sigue significando que no existe información para ese cálculo. No se infieren arribos/permanencias faltantes.
3. **Alertas GPS**: nueva alerta fija ROJA cuando la auditoría está en curso y lleva más de 20 s sin posición GPS reciente, con número de servicio, segundos transcurridos y botón «Reanudar GPS». El botón reutiliza el control real del módulo GPS, tras solicitar detener seguimiento previo; NO crea nueva auditoría ni asigna horas perdidas. Hay opción de silenciar sonido/vibración en la nueva alerta conservando el aviso visual. Dependencia crítica: los navegadores móviles pueden suspender ejecución en segundo plano, por lo que el aviso solo puede visualizarse/emitarse cuando la web esté activa y el navegador lo permita.
4. **Aviso genérico**: se elimina la emisión automática de `beep076` heredada no asociada a causa. El botón explícito «Probar aviso elegido» conserva su test identificado. Permanecen los avisos con causa explícita, sujetos a capacidades de Android/iOS. No se puede garantizar que el sonido se escuche con el navegador suspendido.
5. **Tres carteles**: panel manual ya existente se mueve dentro de la solapa GPS y se expone un acceso rápido Aviso / Inicio / Fin. Se exige una auditoría activa y una precaución documental seleccionada para registrar; cada cartel lleva `auditId`, servicio, fecha, sentido, tipo, resultado, fuente del boletín, velocidad documental y observación con ubicación. Añadida opción «No observado» para no confundir ausencia con falta de lectura. Selector consulta velocidades del último PDF importado (5 velocidades vigentes por fecha documental sin validación operativa) y bases anteriores, evitando duplicados simples.
6. **Terminología**: rótulos visibles Ascendente y Descendente, manteniendo los valores internos `asc/desc` y el H21.
7. **Protecciones**: ningún cambio a bases localStorage, H21, importador PDF 0.7.54, historial, JSON de respaldos o lógica de lectura de las 23 estaciones. El archivo está aislado en pruebas.

## Restricciones y cosas todavía NO validadas
- Se comprobó sintaxis de los **40 bloques JavaScript** del HTML nuevo, pero NO una auditoría real en Android. Se requiere comprobar que GitHub Pages despliegue y que el botón «Reanudar GPS» opere correctamente sin reiniciar el servicio o crear otro auditId.
- La alerta roja puede ejecutarse solo mientras el navegador ejecute JavaScript; no es un servicio nativo en segundo plano.
- La curva de velocidad compara con límites **documentales y PK geométricos estimados**; no determina cumplimiento ni infracción.
- La localización de los tres carteles no está validada por GPS ferroviario de precisión; el nuevo acceso sirve para **registrar observación manual**. El disparo de carteles automático por ubicación real aún no se valida ni se declara funcional en campo.
- Las cinco velocidades PDF y dos avisos PAN del 24/11 siguen «cotejo de vigencia pendiente»; una progresiva incoherente quedó archivada como observada separada y no integra alertas automáticas.
- Falta resolver clasificación entre paso, llegada, partida, ausencia de arribos intermedios, permanencia por estación, falsa partida en Villa Rosa, y sincronización tardía de dotación.

## Pruebas de aceptación para próxima sesión
1. Abrir en celular el nuevo archivo 0.7.56, confirmar encabezado nuevo; sin borrar Chrome ni importar PDF otra vez, verificar bases existentes 390 personal, 177 señales y 5 restricciones PDF.
2. Con auditoría 3107 cerrada, visualizar gráficos ampliados sin iniciar servicio nuevo: ver 13/14 estaciones (una sin marca, Manuel Alberti), 14 movimientos con el de partida ficticia terminal sin horario teórico y sus diferencias m:ss. No crear datos ni reetiquetar partidas como pasos automáticamente.
3. Verificar velocidad con eje temporal legible, muestras y huecos y límites H21 claramente diferenciados. Confirmar que no se califican infracciones a partir del gráfico.
4. Con simulación segura y auditoría NUEVA de prueba: provocar ausencia de lecturas en primer plano, observar alerta roja y botón Reanudar; confirmar que no genera ID nuevo ni borra historial. Si se verifica pérdida durante recorrido real, registrar desde pantalla cuando sea seguro.
5. Verificar que la ventana genérica no aparezca sola y que «Probar aviso» solo se muestre tras pulsar prueba explícita.
6. Probar carteles en auditoría de prueba con precaución seleccionada, 3 tipos y resultado No observado; revisar que cada registro posea auditId correcto y figure en informe/dashboard. No usar ausencia de GPS como cartel faltante.
7. Si cualquier cambio afecta datos o estado activo, volver a 0.7.54, conservar los JSON y abrir incidencia; no modificar estable 0.7.22.

**Conclusión:** la 0.7.56 está creada y sintácticamente comprobada como prototipo integrado, pendiente de prueba móvil. No confundir prototipo con controles ferroviarios validados ni con despliegue verificado en GitHub Pages.
