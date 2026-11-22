# Inventario funcional integral y reglas de preservación — Auditoría Belgrano Norte
**Cierre de requisitos:** 22/11/2026. **Alcance:** aplicación de auditoría Retiro–Villa Rosa. **Estado:** inventario de preservación, NO certificado de pruebas.

Este documento complementa `CONTROL_NO_REGRESION_20261122.md`. Fue preparado a partir del historial de decisiones y la revisión del código de `pruebas/gps-0738-bases-limpias.html` (rama principal) junto con los módulos de continuidad y estadísticas aislados. **No es un reemplazo del código ni autoriza modificar 0.7.22, sobrescribir una prueba anterior o borrar datos.** No almacenar aquí nombres ni legajos.

## Regla central
Antes de modificar cada módulo: enumerar sus funciones existentes, marcar las que funcionan (con prueba), conservar esas funciones, añadir lo nuevo en una copia experimental y repetir regresión. **Retirar de la vista un control de ensayo no equivale a borrar la lógica útil ni sus datos.** No publicar una nueva candidata hasta comprobar la matriz completa. Si existe diferencia entre chat, documentación y código, registrar la diferencia, nunca suponer que funciona.

## 1. Servicio, H21 y personal
- Selección de fecha, régimen de día, sentido, origen, destino y número de tren H21; seleccionar próximos servicios conforme al itinerario en la traza; respaldo de datos del servicio.
- Registrar formación, locomotora, conductor, ayudante y guardatrén; conservar importación y búsqueda por nombre y legajo privados. El usuario reportó bases de ~390 personas; **el inventario no prueba la cifra guardada en el celular**.
- H21 conserva calendario, horarios y versiones. Botón permanente de actualización H21/futuro H22; futura publicación pendiente de validación, nunca sobrescribir H21 por inferencia.
- Importación local **Excel (.xls/.xlsx), PDF y JSON** de itinerarios, personal, señales y precauciones. Cada selector y lectura real se prueba por separado; archivos PDF escaneados sin texto requieren tratamiento o aviso, no éxito fingido.
- Evitar publicar información de personal, dotación o auditorías en repositorios públicos.

## 2. GPS y 23 estaciones
- Estaciones correctas, con **Cecilia Grierson** y **Aristóbulo del Valle**; no reintroducir estaciones descartadas. Platforma extensa/túnel de Aristóbulo exige especial cautela.
- Detección automática de arribo, partida o paso; comparación teórico/real en **mm:ss** y conservar el grado de precisión y estado de validación.
- GPS y georreferencias de PK entre estaciones; geolocalización de infraestructura solamente si existen coordenadas validadas. No inventar PK ni posiciones durante pérdida de señal.
- El auditor podrá confirmar/corregir una estación u hora cuando GPS falle. Ocultar calibradores antiguos sin destruir lo útil.
- No reiniciar ni borrar historial cuando se cambia de tren: fecha+servicio+id de auditoría independiente. Persistir tras recargar y respaldar los cambios.

## 3. Detenciones y centro de novedades
- Distinguir parada prevista en estación frente a **detención extraordinaria >10 segundos**, no disparar alerta por simple reducción de velocidad.
- Detección automática -> aviso no invasivo -> ubicación GPS o **última posición conocida** marcada con incertidumbre -> sugerencia PK y referencia de infraestructura -> confirmación/corrección del inspector -> descripción dictada o escrita -> registrar.
- Mantener inicio de detención/reanudación manual para contingencia. Guardar hora, duración, ubicación, motivo, fuente y la auditoría asociada, evitando duplicados por avisos repetidos.
- Dictado español argentino, transcripción visible y editable, tolerancia al ruido a investigar y teclado siempre disponible; navegador no garantiza voz offline.
- Novedades numeradas desde 1 en cada auditoría. No confundir mensajes técnicos automáticos con novedades observadas por el auditor.

## 4. Señales, PK, cartelería y velocidades
- Conservar inventario de señales principales tipo **P** por vía/sentido; excluir señales de maniobra y no habilitar geocercas sin PK validado. Se mencionaron **177 señales** como base privada a proteger, no comprobar por su cantidad visible.
- Mantener PK de estaciones, pasos a nivel, alcantarillas y referencias de traza sin inventar nuevos.
- Precauciones permanentes, provisorias y restricciones/avisos diferentes; fuente documental, fecha/vigencia, PK desde/hasta, vía, velocidad y condición.
- Tres carteles de precaución y aviso visual/sonoro anticipado acordado **400 m antes del primer cartel**, sujeto a calibración y verificación en campo. Clasificar presente/correcto, ausente, anómalo o sin verificar; conservar anotación manual como respaldo técnico aunque se retiren pantallas de prueba.
- Controles de velocidades permanentes y provisorias; el usuario pidió menú compacto de permanentes y provisorias; su mención anterior de **29 permanentes y 6 provisorias** es un requisito de diseño/versión a cotejar, **nunca un resultado fijo forzado**.
- Registrar comparación de velocidad GPS con límite vigente únicamente cuando PK, vía, precisión, vigencia y muestra son confiables. Para episodios de excedencia: inicio/fin, duración, PK, límite/velocidad real, fuente y estado de verificación. No afirmar infracción por una medición orientativa.
- Boletín del 22/11/2026: conservar **dos registros distintos** del PAN Paillete PK 42/228 (ascendente y descendente), **clausura al paso vehicular**, no clausura de vía férrea. Mantener señales 245/246 fuera de servicio y la referencia 235/261 como avisos distintos.

## 5. Gráficos y Dashboard integral (no duplicarlos)
- **Gráficos existentes:** marcha H21 teórica/real, demora/adelanto y tendencia; preservar también tablas de permanencias existentes.
- **Dashboard integral:** agregación por **auditoría activa o seleccionada**, nunca de todos los servicios sin filtro. Contadores, porcentajes y tablas de TODAS las familias medidas: movimientos; estaciones; permanencia teórica/real; adelantados y atrasados; duración total y tiempo recuperado; detenciones; novedades; señales y carteles; velocidades permanentes/provisorias; precauciones; georreferencias/PK; formación/dotación; salud GPS/Internet; calidad/procedencia del dato.
- **Colores acordados:** celeste = adelanto; verde = en horario/hasta 3 min; amarillo = >3 a 4 min; naranja = >4 a 5 min; rojo = >5 min. **Violeta:** conservar indicador especial de alerta/proyección, sin asignarle automáticamente un rango no verificado; mostrar 0 cuando hay datos completos y 0 eventos, «sin verificar» cuando no hay datos suficientes.
- La versión 0.7.38 ya tiene pantalla «Estadísticas y gráficos» con cuatro indicadores y gráficos. Se debe **AMPLIAR**, no sustituir ni perder sus gráficos. Motor de conteo aislado de Dashboard existe en rama de mejoras, pero aún no está conectado.
- No confundir ausencia de registro de anomalía con cumplimiento; diferenciar «correcto», «incorrecto», «faltante» y «no controlado».

## 6. Continuidad sin GPS o Internet
- Detectar y diferenciar **GPS caído**, **Internet caído** y **GPS impreciso**. Guardar inicio, último fix conocido con precisión y hora, fin y duración, recuperación, método manual y registros pendientes de revisión.
- Seguir capturando eventos manuales **localmente**; volver a usar GPS cuando retorne sin inventar muestras de la zona sin señal. Recuperación GPS **no es sincronización remota**: la aplicación actual guarda datos localmente y no tiene servidor.
- Mostrar aviso emergente/no invasivo; registrar interrupción de forma diferenciada en informe PDF/Dashboard, sin exigir observaciones inventadas ni impedir el trabajo a bordo.
- Preservar módulo experimental `pruebas/continuidad-gps-offline-20261122.js`; integración y validación en celular pendientes.

## 7. Informe A4, historial y respaldo
- Informe para jefatura **solo de la auditoría elegida**: servicio/dotación, movimiento, gráfico H21/real, Dashboard, novedades, restricciones verificadas, interrupciones e intervalos sin datos.
- Imprimir/guardar PDF A4, compartir desde celular cuando sea posible, exportar JSON y restaurar respaldos **sin borrar silenciosamente**; probar restauración en un entorno aislado.
- Mantener claves del navegador históricas, estructura de datos de bases, archivos privados y boletines. Ninguna migración destructiva de localStorage; nuevas claves con prefijos compatibles con respaldo integral, sin modificar datos existentes.
- Mantener aviso breve «Respaldá antes de borrar» en lugar de párrafos repetidos en pantalla; la semántica técnica/validaciones se conserva internamente.

## 8. Interfaz y archivo técnico
- Menús Servicio, Dotación, GPS, Bases, Velocidades, Estadísticas, Informe y «Más» reorganizado como **Herramientas**; conservar accesibilidad móvil.
- Quitar mensajes redundantes, controles duplicados de GPS y manuales experimentales, formularios antiguos de calibración y pruebas de tres carteles **solo después de comprobar sustitución funcional**. Archivar cada fragmento técnico y documentar función reemplazante.
- Los controles manuales de contingencia deben permanecer accesibles donde corresponde, aunque desaparezcan los paneles de ensayo.
- Sistema de auditoría/alerta **informativo**, no sustitutivo de reglamentos ni decisiones del personal habilitado; ocultar textos repetitivos no convierte datos sin validar en validados.

## 9. Secuencia segura de trabajo
1. Congelar SHA/copia de 0.7.38 y cada fuente; no tocar `main` ni 0.7.22; nueva rama y nuevo HTML experimental.
2. Comparar lo que existe con este inventario; detectar datos y botones duplicados; no asumir validación por existencia en código.
3. Añadir continuidad GPS/Internet por adaptador no destructivo, sin reemplazar watcher ni almacenamiento original; ensayar recarga, caída/retorno, sesiones diferentes y JSON exportado.
4. Ampliar Dashboard como **lector** de registros existentes por auditoría con desglose verificable; preservar estadísticas/colores originales; después sumar datos faltantes.
5. Reubicar controles obsoletos tras validación; no borrarlos de biblioteca técnica.
6. Repetir matriz Excel/PDF/JSON, 23 estaciones, importación de boletín por vía, carteles, horarios, gráficos, novedades, PDF e historial en celular antes de ofrecer prueba de martes 24/11.
7. Marcar cada funcionalidad **existente/comprobada**, **integrada sin validar**, **pendiente** o **bloqueada**; no publicar como lista una aplicación aún no terminada.

**Nota de procedencia:** recopila decisiones históricas y estructuras halladas en 0.7.38; cantidades de personas/señales y cumplimiento real requieren validación con las bases locales, a las que GitHub no tiene acceso.
