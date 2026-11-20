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
