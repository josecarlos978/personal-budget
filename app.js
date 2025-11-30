// Mensaje de bienvenida inicial
alert("Bienvenido a mi billetera digital");

// Pedimos el nombre del usuario para personalizar la experiencia
let nombre = prompt("¿Cuál es tu nombre?");
alert(`Bienvenido ${nombre}, a tu billetera digital`);

// Arreglo que almacenará los movimientos (ingresos y egresos)
const billetera = [];

// Función: solicita y valida datos, y guarda cada movimiento
function registrarMovimiento() {
    // Nombre (no puede estar vacío)
    let nombreMovimiento;
    do {
        nombreMovimiento = prompt('Ingrese el nombre del movimiento:');
        if (nombreMovimiento === null) return; // usuario canceló
        if (!nombreMovimiento || nombreMovimiento.trim() === '') {
            alert('Nombre inválido. Por favor ingresa un nombre.');
        }
    } while (!nombreMovimiento || nombreMovimiento.trim() === '');

    // Tipo (ingreso / egreso) — aceptamos 'ingreso', 'egreso', '1' o '2'
    let tipo;
    do {
        tipo = prompt("Ingrese el tipo ('ingreso' o 'egreso'):\n - o ingrese '1' para ingreso y '2' para egreso");
        if (tipo === null) return; // cancelar
        tipo = tipo.trim().toLowerCase();
        if (tipo === '1') tipo = 'ingreso';
        if (tipo === '2') tipo = 'egreso';
        if (!(tipo === 'ingreso' || tipo === 'egreso')) {
            alert("Tipo inválido. Debe ser 'ingreso' o 'egreso'.");
        }
    } while (!(tipo === 'ingreso' || tipo === 'egreso'));

    // Monto (número > 0)
    let monto;
    do {
        const entrada = prompt('Ingrese el monto (número mayor que 0):');
        if (entrada === null) return; // cancelar
        monto = Number(entrada);
        if (isNaN(monto) || monto <= 0) {
            alert('Monto inválido. Debe ser un número mayor que 0.');
        }
    } while (isNaN(monto) || monto <= 0);

    // Crear y guardar el movimiento
    const movimiento = {
        nombre: nombreMovimiento.trim(),
        monto: monto,
        tipo: tipo
    };
    billetera.push(movimiento);
    alert('Movimiento registrado correctamente.');
    console.log('Movimiento agregado:', movimiento);
    return movimiento;
}

// Función: recorre el array y calcula el saldo total (ingresos - egresos)
// Acepta un array de movimientos opcional; por defecto usa `billetera`.
function calcularTotalSaldo(movimientos = billetera) {
    let saldo = 0;
    for (const m of movimientos) {
        if (m.tipo === 'ingreso') saldo += m.monto;
        else saldo -= m.monto;
    }
    return saldo;
}

// Función: muestra cantidad de movimientos, total de ingresos, total de egresos y saldo
function mostrarResumen() {
    const cantidad = billetera.length;
    let totalIngresos = 0;
    let totalEgresos = 0;
    for (const m of billetera) {
        if (m.tipo === 'ingreso') totalIngresos += m.monto;
        else totalEgresos += m.monto;
    }
    const saldo = calcularTotalSaldo(billetera);
    const mensaje = `--- Resumen General ---\nCantidad de movimientos: ${cantidad}\nTotal ingresos: ${totalIngresos}\nTotal egresos: ${totalEgresos}\nSaldo total: ${saldo}`;
    console.log(mensaje);
    alert(mensaje);
}

// Función: muestra totales agrupados por tipo (solo tipos con al menos un movimiento)
function mostrarResumenPorTipo() {
    const totales = {};
    for (const m of billetera) {
        totales[m.tipo] = (totales[m.tipo] || 0) + m.monto;
    }
    let mensaje = '--- Resumen por Tipo ---\n';
    for (const tipo in totales) {
        if (totales[tipo] > 0) mensaje += `${tipo}: ${totales[tipo]}\n`;
    }
    if (mensaje.trim() === '--- Resumen por Tipo ---') mensaje += 'No hay movimientos registrados.';
    console.log(mensaje);
    alert(mensaje);
}

// Logro 1: eliminar un movimiento por nombre (elimina la primera coincidencia)
function eliminarMovimientoPorNombre() {
    const nombreEliminar = prompt('Ingrese el nombre del movimiento a eliminar:');
    if (!nombreEliminar) {
        alert('Nombre inválido o operación cancelada.');
        return;
    }
    const index = billetera.findIndex(m => m.nombre.toLowerCase() === nombreEliminar.trim().toLowerCase());
    if (index === -1) {
        alert('No se encontró un movimiento con ese nombre.');
    } else {
        const eliminado = billetera.splice(index, 1)[0];
        alert(`Movimiento eliminado: ${eliminado.nombre} (${eliminado.tipo} - ${eliminado.monto})`);
        console.log('Movimiento eliminado:', eliminado);
    }
}

// Logro 2: mostrar el egreso más alto y el ingreso más alto
function mostrarMaximos() {
    let maxIngreso = null;
    let maxEgreso = null;
    for (const m of billetera) {
        if (m.tipo === 'ingreso') {
            if (maxIngreso === null || m.monto > maxIngreso.monto) maxIngreso = m;
        } else if (m.tipo === 'egreso') {
            if (maxEgreso === null || m.monto > maxEgreso.monto) maxEgreso = m;
        }
    }
    let mensaje = '--- Máximos registrados ---\n';
    if (maxIngreso) mensaje += `Ingreso más alto: ${maxIngreso.nombre} - ${maxIngreso.monto}\n`;
    else mensaje += 'No hay ingresos registrados.\n';
    if (maxEgreso) mensaje += `Egreso más alto: ${maxEgreso.nombre} - ${maxEgreso.monto}\n`;
    else mensaje += 'No hay egresos registrados.\n';
    console.log(mensaje);
    alert(mensaje);
}

// Bucle principal: se repite hasta que el usuario elija salir
let salir = false;
while (!salir) {
    const entradaMenu = prompt(`¿Qué operaciones deseas realizar?\n1 - Registrar movimiento\n2 - Mostrar resumen general\n3 - Mostrar resumen por tipo\n4 - Eliminar movimiento por nombre\n5 - Mostrar máximos\n6 - Salir`);
    if (entradaMenu === null) {
        // Si el usuario cancela el prompt del menú, volvemos a mostrarlo
        continue;
    }
    const opcion = parseInt(entradaMenu.trim(), 10);
    switch (opcion) {
        case 1:
            // Sesión de registro: permitir registrar múltiples movimientos seguidos
            console.log('Registro de Gastos');
            console.log('-----------------------');
            {
                // Mantener los movimientos añadidos solo en esta sesión
                const sessionMovimientos = [];
                let seguir = true;
                while (seguir) {
                    const mov = registrarMovimiento();
                    if (!mov) {
                        // usuario canceló durante registro
                        break;
                    }
                    // Agregar también al arreglo de la sesión
                    sessionMovimientos.push(mov);

                    // Mostrar en consola el registro tal como en el ejemplo
                    console.log(`Nombre del movimiento: ${mov.nombre}`);
                    // Mostrar tipo con primera letra mayúscula
                    const tipoDisplay = mov.tipo.charAt(0).toUpperCase() + mov.tipo.slice(1);
                    console.log(`Tipo: ${tipoDisplay}`);
                    console.log(`Monto: ${mov.monto.toFixed(2)}`);
                    console.log('');

                    // Preguntar si desea registrar otro movimiento
                    const respuesta = prompt('¿Registrar otro movimiento? (si/no):');
                    if (respuesta === null) {
                        // cancelar: salir de la sesión
                        seguir = false;
                    } else if (respuesta.trim().toLowerCase() === 'si') {
                        seguir = true;
                    } else {
                        seguir = false;
                    }
                }

                // Al terminar la sesión de registro, mostrar resumen final en consola
                console.log('');
                console.log('Resumen Final');
                console.log('-----------------------');
                const totalMovimientos = sessionMovimientos.length;
                // calcular totales por tipo en la sesión
                let totalIngresos = 0;
                let totalEgresos = 0;
                for (const m of sessionMovimientos) {
                    if (m.tipo === 'ingreso') totalIngresos += m.monto;
                    else totalEgresos += m.monto;
                }
                const saldoTotal = calcularTotalSaldo(sessionMovimientos);
                console.log(`Total de movimientos registrados: ${totalMovimientos}`);
                console.log(`Saldo total: $${saldoTotal.toFixed(2)}`);
                console.log('');
                console.log('Desglose por tipo:');
                console.log(`- Egresos: $${totalEgresos.toFixed(2)}`);
                console.log(`- Ingresos: $${totalIngresos.toFixed(2)}`);
            }
            break;
        case 2:
            mostrarResumen();
            break;
        case 3:
            mostrarResumenPorTipo();
            break;
        case 4:
            eliminarMovimientoPorNombre();
            break;
        case 5:
            mostrarMaximos();
            break;
        case 6:
            salir = true;
            alert('Saliendo de la billetera. ¡Gracias!');
            break;
        default:
            alert('Opción no válida. Por favor elige una opción del 1 al 6.');
    }
}

// Al finalizar mostramos la billetera completa en la consola
console.log('Billetera final:', billetera);

