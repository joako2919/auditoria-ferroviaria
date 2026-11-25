# Auditoría Ferroviaria · piloto Android GPS (experimental)

Este prototipo **no reemplaza** la auditoría web, ni la versión estable ni sus respaldos.

## Alcance
- Registro GPS en servicio Android de primer plano con notificación permanente
- Servicio ferroviario ingresado manualmente
- Un archivo CSV por sesión, con hora, coordenadas, velocidad, precisión y huecos de GPS
- Botón Iniciar / Detener y exportar CSV desde el teléfono
- No calcula estaciones, H21, PK, precauciones ni cumplimiento de velocidades
- No se garantiza continuidad ante force-stop, restricción de batería, bloqueo por fabricante o falta de cobertura GPS

## Compilación
GitHub Actions: rama `android-gps-piloto-01`, flujo `APK piloto GPS Android (experimental)`. Usa Android SDK 35, AGP 8.7.3, Gradle 8.9, JDK 17. El artefacto `auditoria-gps-piloto-android-apk` contiene una APK **debug** exclusiva para pruebas. La APK aún debe verificarse y probarse en teléfono Android.

## Prueba segura
Iniciá GPS con la aplicación abierta y permiso de ubicación precisa. Verificá el aviso persistente, cambiá a WhatsApp o bloqueá la pantalla, volvé al piloto, detené la captura y exportá CSV. Revisá tiempos y posibles huecos, sin asumir posiciones en tramos no registrados.

La compilación en GitHub utiliza el SDK Android preinstalado en el entorno de ejecución, sin instalar Android Studio en el teléfono.
