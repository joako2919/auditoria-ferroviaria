# Control técnico: modalidades de aviso Android / iPhone — 0.7.45
Fecha: 23/11/2026
Estado: EXPERIMENTAL; sin validación funcional en teléfonos reales
Versión base: 0.7.44, rama dashboard-cobertura-0744-20261123
Nueva candidata: pruebas/gps-0745-avisos-android-ios-experimental.html
SHA de archivo confirmado al releer GitHub: e5eaa426b92bf89a3c194ef555f581f29422eb1f

## Requisito solicitado
Dar una opción accesible para que el usuario de iPhone/iPad pueda elegir modalidad de sonido/aviso, y mantener Android con vibración cuando el navegador realmente la soporte.

## Limitaciones reales de Safari iPhone
- Safari iOS no implementa la API de vibración `navigator.vibrate`; el selector NO puede habilitar háptica nativa por arte de software. En iPhone se ofrece aviso VISUAL y tono Web Audio configurable.
- Apple/Safari puede exigir un gesto (tocar `Probar aviso elegido`) para crear/reanudar AudioContext. Reproducir sonido no está garantizado con pantalla bloqueada, en segundo plano o según controles de sonido.
- En Android, vibración solo si `navigator.vibrate` existe y la plataforma no se identifica como iOS. Una llamada aceptada no acredita que el motor vibró físicamente.
- Dictado, importación de PDF/Excel cuando faltan bibliotecas de red, seguimiento GPS con pantalla apagada y permisos son otras diferencias funcionales pendientes; NO se declara compatibilidad integral iOS.

## Implementación
- Nuevo panel plegable en GPS llamado «Modalidad de avisos · Android / iPhone». Selector de perfil Automático, iPhone/iPad o Android. Sonido normal, reforzado o silencio; interruptor de vibración condicionado a soporte real; botón «Probar aviso elegido».
- En Herramientas: acceso directo a configuración de avisos. El botón navega a GPS y abre el panel plegable sin copiar funciones.
- Sonido original de tres pulsos sigue disponible como fallback técnico. Para el aviso de ensayo del módulo de velocidades y el aviso de posible detención >10 s se llama al nuevo despachador de sonido/visual/vibración compatible.
- Aviso visual persistente durante unos segundos; se presenta como orientación experimental, jamás instrucción de circulación.
- Preferencia local: `audit_bn_device_alerts_0745`. La expresión del respaldo integral `/^(audit_bn_|auditoria_bn_)/` incluye automáticamente la configuración. Sin cambios en el código de backup/restauración.
- No se alteraron los módulos de importación, itinerario, bases privadas, registros GPS ni históricas; dos scripts heredados solo fueron adaptados en puntos de aviso para respetar elección de dispositivo.

## Comprobaciones ejecutadas
- Archivo generado, guardado y releído desde GitHub.
- 38 bloques JavaScript: sintaxis válida de los 38.
- Importador `importadores0729` idéntico al anterior.
- Función `getBackup` y lógica de restauración conservadas idénticas.
- Simulación JavaScript aislada con UA de iPhone y sin vibrate: 0 llamadas de vibración.
- Simulación con UA de iPhone pero una función vibrate ficticia: sigue 0 llamadas de vibración (iOS prioritario).
- Simulación con Android y vibrate disponible: una llamada al solicitar detención.
- Simulación con Android sin vibrate: 0 llamadas.
- En los cuatro escenarios, `emit` reportó aviso visual; no hubo escritura de almacenamiento al reproducir el evento.
- Las simulaciones no midieron salida real de altavoz, audibilidad, pantalla, hardware háptico, velocidad, GPS ni compatibilidad de Safari.

## Estado GitHub
Durante la solicitud anterior se intentó escribir el documento de control de 0.7.44 y no apareció confirmado en la rama al verificarlo. La lectura del HTML 0.7.44 sí funcionó; después, se creó una nueva rama y se guardó satisfactoriamente el código de 0.7.45. Esto no demuestra una caída general de GitHub; la causa de aquel intento incompleto no está determinada.
Ninguna versión estable fue sobrescrita.

## Próxima validación obligatoria
En Android real e iPhone Safari real: elegir perfil, seleccionar cada tono, tocar Prueba, verificar aviso visual y salida audible, verificar bloqueo de vibración en iOS y vibración real en Android, recargar, confirmar persistencia y acceso en Herramientas. Comprobar la interacción con el control original «Activar avisos de ENSAYO», GPS, detención >10s y respaldo integral. No usar como sistema de seguridad ferroviaria.
