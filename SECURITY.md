# Seguridad y confidencialidad — Auditoría de Circulación Ferroviaria

**Regla del proyecto — 28/11/2026.** Los datos de trabajadores y la información reservada de Ferrovías S.A. deben mantenerse fuera del repositorio público y de GitHub Pages. Esta regla rige para todas las versiones, incluidos los prototipos y las pruebas.

## Datos considerados reservados
- Nombres, apellidos, números de legajo, categorías y dotaciones asignadas a servicios.
- Nóminas, planillas de personal, archivos importados y respaldos JSON reales.
- Auditorías reales asociadas a personas y registros identificables, ubicaciones sensibles, anotaciones y documentación empresarial no autorizada para difusión.
- Boletines, señales y precauciones cuya difusión pública no haya sido autorizada por su titular. No se presupone que un dato técnico es público.

## Reglas de desarrollo y publicación
1. **No incrustar** bases de personal, dotaciones, legajos ni documentos reservados en HTML, JavaScript, archivos de prueba, commits, bitácoras, problemas de GitHub o capturas públicas.
2. **No subir respaldos reales** ni archivos importados del dispositivo; utilizar exclusivamente datos ficticios y no identificables para desarrollo y regresión.
3. **Separación de datos:** el repositorio público debe contener únicamente código e información publicable; los datos de auditoría se administran en el dispositivo o en una infraestructura privada explícitamente autorizada.
4. **Minimización:** mostrar nombres/legajos sólo donde resulte necesario; reducir su aparición en gráficos, capturas, errores y exportaciones de prueba.
5. **No confundir local con cifrado:** localStorage del navegador no cifra los datos y el JavaScript de ese origen puede leerlos. El dispositivo debe tener bloqueo y el navegador/servidor deben considerarse superficies de riesgo.
6. **Antes de cambiar versión:** respaldo privado verificado, compatibilidad y recuperación no destructiva de registros, pruebas con datos sintéticos y revisión de que no se incorporaron datos personales al código.
7. **Antes de distribuir a otros inspectores:** definir autorización, control de acceso, cifrado en reposo cuando sea aplicable, retención, borrado seguro y actualización del modelo de amenazas. Una contraseña de interfaz por sí sola no protege localStorage ni el código público.
8. **Dependencias externas:** revisar bibliotecas de terceros, restringir cargas remotas cuando sea posible y evaluar Content Security Policy; no afirmar que un archivo local no se transmite sin verificar todo el flujo de importación y dependencias.
9. **Incidente:** si alguna información reservada se incorpora a GitHub, detener la difusión, coordinar la respuesta con responsables autorizados, retirar el archivo y revisar el historial; borrarlo en una versión nueva NO lo elimina de commits antiguos.

## Alcance actual y pendientes
- El código de 0.7.76 usa bases locales para personal, señales y boletines, pero no dispone de protección criptográfica integral de datos locales.
- La lectura local de bases no prueba que la información esté en GitHub; tampoco constituye una garantía integral de confidencialidad.
- El repositorio sigue siendo público. La presencia de `.gitignore` es una barrera parcial contra inclusiones accidentales, no un control de acceso ni una garantía para los archivos ya publicados.
- No publicar la aplicación como sistema de seguridad o de decisión ferroviaria hasta su validación operativa.
