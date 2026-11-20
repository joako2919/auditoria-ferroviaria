# Auditoría Ferroviaria Belgrano Norte — continuidad obligatoria (20/11/2026)

## Conservación y control de versiones
- Copia histórica de la estable `0.7.22` en rama `respaldo-estable-0722-20261120`.
- Desarrollo de importadores sobre rama `consolidacion-importadores-20261120`; proteger `main/index.html` hasta tener una candidata probada. El usuario autorizó corregir posteriormente la estable y solicita comprobación antes de cerrar.
- H21 incorporado: conservar, no reemplazar silenciosamente; H22 sigue pendiente como itinerario independiente.
- No subir nombres, legajos, auditorías ni respaldos privados al repositorio.

## Soluciones aprobadas anteriormente
- Dotación: carga previa por JSON derivado de Excel el 11/11. Conteos aprobados: 156 conductores, 111 ayudantes, 123 guardatrenes (390). JSON de referencia `dotacion_personal_0714_tres_categorias.json`. No repetir carga aprobada. **Lectura directa del XLSX todavía no se validó**.
- Señales: antecedente histórico de 177 registros, revisar fuente y conservar clasificación de vía principal P. No asumir lectura directa Excel/PDF ya validada sin evidencia.
- Precauciones provisorias: conservar importador específico de boletines PDF, vista previa, clasificación por vía, PK, velocidad/clausura, fecha, historia y aviso de carga parcial; el lector previo exige verificar documentos nuevos y no equivale a importar todas las secciones del boletín.

## Defecto confirmado en el código de la estable
- Selectores de dotación, señales y horarios solo aceptan JSON; los lectores ejecutan JSON.parse. Precauciones PDF/JSON con parser específico; Excel pendiente. `accept` no equivale a compatibilidad.
- 0.7.29 experimental incluye lectores universales, pero el XLSX real falló con encabezados no reconocidos. Integración H21 exige que el horario actualizado sea visible en el selector: no basta guardarlo en otra clave local.

## Regla de cierre y siguientes pruebas
1. Reutilizar el JSON aprobado de dotación y su criterio de clasificación. Buscar el XLSX original ya compartido antes de pedirlo nuevamente.
2. Candidato: Excel (.xlsx, .xls), PDF textual y JSON en dotación, señales, precauciones y horarios; prueba de lectura, vista previa, conteos, errores, cancelar y confirmación antes de guardar. No sobrescribir datos ante fallo.
3. Precauciones: cotejar con boletines reales de 03/11 y 11/11 y no eliminar controles especiales.
4. H21 y 23 estaciones, Aristóbulo del Valle, auditorías, controles manuales, GPS, respaldo/restauración, fechas/servicios y novedades desde 1 deben superar regresión.
5. Verificar en teléfono Android antes de publicar en rama `main`; registrar resultado y commit SHA de cada corrección. No etiquetar como TERMINADO sin pruebas con archivos reales y confirmación del usuario.


## POLÍTICA PERMANENTE DE NO REGRESIÓN (instrucción del usuario 20/11/2026)
- Toda característica, base o corrección **aprobada** en una versión anterior pasa a formar parte del conjunto de requisitos de **todas** las versiones posteriores. No suprimir, ocultar, reiniciar, sustituir ni cambiar los datos o controles aprobados sin una justificación documentada, respaldo y aprobación específica.
- Toda entrega debe verificar el **programa actual publicado en GitHub** además de cualquier rama experimental y documentar diferencias, versiones, pruebas ejecutadas, resultados pendientes y problemas conocidos. Crear una versión nueva no implica perder la versión estable anterior.
- Importadores funcionales en los CUATRO campos: **dotación, señales vía principal, precauciones provisorias y horarios H21 / futuro H22**, con **Excel (.xlsx/.xls), JSON y PDF textual**, vista previa, identificación de errores y confirmación sin sobreescritura accidental. La posibilidad de elegir un archivo **no** significa que su lectura haya sido aprobada.
- **Precauciones permanentes de velocidad**: base DIFERENTE de las provisorias. Las permanentes se derivan del itinerario vigente y deben conservar PK inicial y final, velocidad, vía/sentido, fuente y vigencia. Verificar si se encuentran realmente incorporadas; NO declarar que se cargaron sin corroborar los archivos. Las provisorias provienen de boletines por fecha, conservan histórico, sentido, PK y aviso de que el boletín puede contener otras disposiciones. El control y contraste con lo permanente y provisorio debe permanecer accesible en la auditoría.
- GPS experimental para 23 estaciones incluyendo Aristóbulo del Valle (túnel y plataforma extendida); detección y comparación de hora real frente al H21, paradas fuera de estación, controles manuales como alternativa, gráficos e informe. Ensayo real a bordo de **un solo tren** para validar todo el circuito. No declarar automático un control de PK/velocidad hasta contar con georreferenciación de vía validada.
- Auditorías separadas por fecha y número de servicio, novedades numeradas desde 1 dentro de cada auditoría e historial preservado. Guardado, exportación y restauración deben pasar prueba de regresión.
- **Privacidad**: GitHub contiene solamente código y documentación no sensible. Nunca subir legajos reales, nóminas, auditorías personales, boletines privados ni respaldos JSON. Los datos locales no se comparten automáticamente entre un HTML abierto desde archivo y una página GitHub Pages. Ningún módulo debe transmitirlos fuera de la aplicación sin autorización explícita.
- Bitácora es el registro durable para continuidad entre conversaciones. Al comenzar cualquier sesión retomar este control y la bitácora maestra más reciente, cotejándolo con el código y las incidencias; no pedir al usuario repetir resultados ya comprobados. La memoria conversacional por sí sola no sustituye a las verificaciones del repositorio.

## Estado verificado 20/11 (no confundir con funcionalidad aprobada)
- Inspección de `main/index.html` 0.7.22: controles de precauciones **permanentes** expresamente señalados como NO cargados ni automáticamente controlados. Pendiente incorporar/verificar su base con la fuente oficial. El H21 incorporado contiene horarios, no demuestra por sí solo importación de velocidades permanentes.
- Experimental 0.7.29: los cuatro selectores aceptan tres formatos, pero el lector Excel real de legajos falló antes; faltan pruebas con archivos originales y pruebas en celular. Precauciones PDF tienen un lector específico que no debe perderse.
- Respaldo estable GitHub: rama `respaldo-estable-0722-20261120`. Rama de trabajo `consolidacion-importadores-20261120`. Publicación `main` no validada aún; no afirmar que fue actualizada sin consultar el commit.
