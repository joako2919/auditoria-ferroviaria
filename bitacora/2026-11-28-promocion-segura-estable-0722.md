# Integración segura de la base estable 0.7.22 — 28/11/2026

## Alcance de esta rama
La rama `integracion-estable-segura-20261128` deriva de `main`, que mantiene `index.html` en **piloto 0.7.22**. Es una zona de preparación: **no publicar ni reemplazar el index de `main`** hasta completar compatibilidad, respaldo real en el dispositivo del auditor y regresiones.

Se creó además la rama `resguardo-estable-0722-20261128` como copia de `main` previa a cualquier promoción.

## Qué verificamos en el código
| Función | `index.html` estable 0.7.22 | Candidata 0.7.74 / 0.7.76 |
|---|---|---|
| Estado piloto general | `audit_bn_pilot_01` | `auditoria_bn_0728_pilot` |
| Movimientos / registros | `audit_bn_076_records` | `auditoria_bn_0728_records` |
| Bases locales | `audit_bn_bases_private_v075` | `audit_bn_bases_private_v075` |
| Horarios locales | `audit_bn_076_schedules` | `audit_bn_076_schedules` |
| Respaldo integral | `v22Download`, JSON | `v22Download`, JSON |

Ambas versiones incluyen el patrón de respaldo `/^(audit_bn_|auditoria_bn_)/`, que reúne ambas familias de claves, **pero esto no constituye una migración de registros ni garantiza que los históricos de una familia se vean automáticamente en la otra**.

Los datos privados del auditor viven en el almacenamiento del navegador del dispositivo; **GitHub no dispone de esos datos ni puede respaldarlos por sí solo**. Los respaldos nunca se suben a GitHub.

## Protocolo obligatorio antes de actualizar `main`
1. Exportar el **respaldo integral JSON desde cada dispositivo/navegador que contenga auditorías** (incluido el celular de uso real), verificar que el archivo se descargó y conservar copia privada.
2. Trabajar exclusivamente en esta rama con los cambios considerados estables, evitando introducir prototipos no validados en campo.
3. Probar restauración y lectura de claves antiguas y nuevas en un entorno **sintético**. La compatibilidad debe ser no destructiva: copiar registros cuando proceda tras contrastar por ID, sin vaciar claves anteriores ni sobrescribir conflictos. Los registros que no tengan ID verificable requieren conciliación explícita.
4. Ejecutar regresiones del gráfico de marcha, GPS, importadores Excel/PDF/JSON, estados por servicio, carteles y dashboard; realizar prueba visual en móvil.
5. Comprobar con respaldo real **local** del inspector que se preservan recuentos de auditorías, movimientos, novedades, boletines y personal, sin almacenar información privada en el repositorio.
6. Preparar cambio reversible y promover al `index.html` de `main` **solo cuando se cumplan las pruebas**, sin confundir confirmación de código con validación de operación ferroviaria.

## Estado al 28/11/2026
- Resguardo de `main`: **realizado**.
- Rama de integración segura: **creada**, sin cambios en versión publicada.
- Diferencia de claves: **identificada**.
- Respaldo integral: presente en ambas versiones, pero **no ejecutado desde los dispositivos del auditor**.
- Migración/conciliación de claves: **pendiente**.
- Actualización de `main`: **no realizada**.
- Versión experimental 0.7.76 de carteles GPS: separada en `prueba-alertas-carteles-0776`; no promover automáticamente.

## Advertencia operativa
No limpiar almacenamiento del navegador, no desinstalar navegador/app ni restaurar encima de los registros sin respaldo privado verificado. Los datos de la PC y del celular pueden ser distintos. Una nueva versión publicada puede leer una familia de claves diferente aunque los registros originales sigan almacenados.
