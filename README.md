# personal-budget

**Descripción**
- **Proyecto**: Una billetera digital simple en JavaScript que permite registrar ingresos y retiros usando prompts del navegador.

**Archivo principal**
- **Ruta**: `app.js` — contiene la lógica interactiva que solicita entradas al usuario y almacena los movimientos en memoria.

**Resumen del comportamiento**
- **Entrada de usuario**: se usan `alert()` y `prompt()` para interactuar en el navegador.
- **Datos**: la variable `billetera` (un arreglo) almacena objetos con la forma `{ nombre, monto, tipo }`.
- **Flujo principal**: un bucle `while` muestra un menú principal con las opciones actuales: 1) Registrar movimiento, 2) Mostrar resumen general, 3) Mostrar resumen por tipo, 4) Eliminar movimiento por nombre, 5) Mostrar máximos, 6) Salir.

**Variables y estructura**
- **`nombre`**: string obtenido con `prompt()` para personalizar la experiencia.
- **`billetera`**: `const []` — arreglo que guarda los movimientos (ingresos y retiros).
- **`salir`**: boolean que controla el bucle principal.

**Operaciones**
- **Opción 1 — Ingresar dinero**: se pide `descripcion` y `monto`, se crea un objeto con `tipo: 'ingreso'` y se hace `billetera.push(ingreso)`.
- **Opción 2 — Retirar dinero**: se pide `descripcion` y `monto`, se crea un objeto con `tipo: 'retiro'` y se hace `billetera.push(retiro)`.
- **Opción 3 — Salir**: cambia `salir = true` y finaliza el bucle.
- **Validación**: si la opción no es 1, 2 o 3 se muestra un `alert()` indicando opción inválida.

**Consola y depuración**
- Se usa `console.log(billetera)` para inspeccionar el contenido tras cada movimiento y al finalizar.

**Ejemplo de uso**
1. Abrir `index.html` en un navegador (doble clic o `Abrir con` en el navegador).
2. Verás un `alert` de bienvenida y se pedirá tu nombre.
3. Aparecerá el menú con las opciones 1/2/3; interactúa respondiendo en los `prompt`.
4. Revisa la consola del navegador (F12) para ver el contenido del arreglo `billetera`.

**Cómo ejecutar (rápido)**
- Abre el archivo `index.html` en tu navegador preferido.

**Mejoras sugeridas**
- Guardar los datos en `localStorage` para persistencia entre sesiones.
- Añadir validaciones de monto (números positivos) y manejo de entradas vacías.
- Reemplazar `prompt`/`alert` por una interfaz HTML para mejor experiencia de usuario.

**Contacto**
- Proyecto por: josecarlos978

**Funciones implementadas**
- `registrarMovimiento()` — Solicita `nombre`, `tipo` (`ingreso`/`egreso`) y `monto`. Valida entradas (nombre no vacío, monto > 0) y guarda el movimiento en el array `billetera`.
- `calcularTotalSaldo(movimientos = billetera)` — Recorre el array pasado (por defecto `billetera`) y devuelve el saldo total (ingresos - egresos). Acepta un array opcional para calcular saldos de subconjuntos (por ejemplo, la sesión actual).
- `mostrarResumen()` — Muestra la cantidad de movimientos, total de ingresos, total de egresos y saldo (usa `calcularTotalSaldo`).
- `mostrarResumenPorTipo()` — Muestra el total por cada tipo (solo los tipos con movimientos).
- `eliminarMovimientoPorNombre()` — Elimina la primera coincidencia por `nombre`.
- `mostrarMaximos()` — Muestra el ingreso más alto y el egreso más alto.

**Comportamiento añadido en la opción 1 (Registro en sesión)**
- Al elegir `1 - Registrar movimiento` el programa inicia una pequeña sesión que permite registrar múltiples movimientos seguidos.
- Después de cada movimiento se imprime en consola la ficha del movimiento y se pregunta `¿Registrar otro movimiento? (si/no):`.
- Al finalizar la sesión se imprime en consola un `Resumen Final` con totales y desglose por tipo.

**Ejemplo de salida en consola**
Este es un ejemplo realista que muestra cómo aparecen los mensajes cuando se registra en sesión:

Registro de Gastos
-----------------------
Nombre del movimiento: Cena
Tipo: Egreso
Monto: 45.50

¿Registrar otro movimiento? (si/no): si
Nombre del movimiento: Consultoría
Tipo: Ingreso
Monto: 150.00

¿Registrar otro movimiento? (si/no): no

Resumen Final
-----------------------
Total de movimientos registrados: 2
Saldo total: $104.50

Desglose por tipo:
- Egresos: $45.50
- Ingresos: $150.00

**Cómo probar (rápido)**
1. Abrir `index.html` en un navegador (doble clic o `Abrir con`).
2. Interactuar con los `prompt()` y `alert()` que aparecen.
3. Después de registrar movimientos, abre la consola (F12 → Console) para revisar los mensajes impresos. Algunas salidas clave también aparecen con `alert()` para mayor visibilidad.

**Notas y mejoras sugeridas**
- Los datos se guardan solo en memoria (variable `billetera`) y se pierden al recargar la página. Para persistencia, usar `localStorage`.
- Se podría reemplazar `prompt`/`alert` por una interfaz HTML para mejor experiencia.


