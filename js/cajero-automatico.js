/* Simulador de cajero automático */

let continuar = true

function cancelar() {
    console.log("Cancelar operación")
    alert('Operación cancelada. Retire su tarjeta')
    continuar = false
}

function consultarSaldo(saldo) {
    console.log('Consulta saldo')
    alert('Su saldo es : $' + saldo)
}

function despedida() {
    console.log('Despedida')
    alert('Muchas gracias por preferirnos. Hasta pronto.')
    continuar = false
}

function noDisponible() {
    console.log('Función no disponible')
    alert('Función no disponible')
}

function cambiarClave(cliente) {
    console.log('Cambiar clave')
    nuevoPassword = prompt('Ingrese su nuevo número secreto') //en futuras versiones implementar validación clave numérica de 4 dígitos
    if (id !== null && id !== '') cliente.password = nuevoPassword
    else alert('Ingrese un número correcto')
    console.log(cliente.password)
    alert('Su número secreto ha sido cambiado con éxito.')
}

function cuentaCorriente(cliente) {
    console.log('Cuenta Corriente')
    let opcionCorr = prompt('Por favor, seleccione la operación que desea realizar \n 1: Giro rápido por $5000 \n 2: Giro por otro monto \n 3: Consultar Saldo \n 0: Cancelar operación')
    let montoGiro
    do {
        switch (opcionCorr) {
            case '1':
                console.log('Giro rápido por $5000')
                montoGiro = 5000
                cliente.cuentaCorr.saldo = girarDinero(cliente.cuentaCorr.saldo, montoGiro)
                nuevaOperacion(cliente)
                break
            case '2':
                console.log('Giro por otro monto')
                montoGiro = prompt('Ingrese monto a girar')
                // por agregar: mensaje de error cuando el monto es 0
                if (montoGiro <= cliente.cuentaCorr.saldo ) cliente.cuentaCorr.saldo = girarDinero(cliente.cuentaCorr.saldo, montoGiro)
                else alert('Monto inválido. No puede exceder el saldo disponible.') 
                nuevaOperacion(cliente)
                break
            case '3':
                consultarSaldo(cliente.cuentaCorr.saldo)
                nuevaOperacion(cliente)
                break
            case '0':
                despedida()
                continuar = false
                break
            case null:
                cancelar()
                break
            default:
                console.log('Opción no valida')
                alert('Ingrese una opción válida.')
                break
        }
    } while (continuar === true)
}

function girarDinero(saldo, montoGiro) {
    console.log(montoGiro)
    saldo -= montoGiro
    console.log('Giro por $' + montoGiro + '. Saldo restante: $' + saldo)
    alert('Giro por $' + montoGiro + '. Saldo restante: $' + saldo + '. Retire su dinero y comprobante')
    return saldo
}

function nuevaOperacion(cliente) {
    continuar = prompt('Desea realizar otra operación? \n 1: Sí \n 2: No')
    switch (continuar) {
        case '1':
            menuPrincipal(cliente)
            break
        case '2': despedida()
            continuar = false
            break
        case '':
            menuPrincipal(cliente)
            break
        case null:
            despedida()
            continuar = false
            break
        default: alert('Ingrese una opción válida')
    }
}

function menuPrincipal(cliente) {
    console.log('Acceso cliente id: ' + cliente.id)
    do {
        let opcion = prompt('Bienvenido. Por favor, seleccione el producto que desea operar\n 1: Cuenta Corriente\n 2: Cuenta Vista (No disponible) \n 3: Cambiar número secreto\n 0: Salir')
        switch (opcion) {
            case '1':
                cuentaCorriente(cliente)
                break
            case '2': 
            //por agregar: cuentaVista(). Misma lógica que cuentaCorriente()
                noDisponible()
                break
            case '3':
                cambiarClave(cliente)
                //Por agregar: despedida alternativa en caso de cambio de clave (evento)
                despedida() 
                break
            case '0':
                cancelar()
                break
            case null:
                cancelar()
                break
            default:
                alert('Ingrese una opción válida')
                break
        }
    } while (continuar === true)
}


function accesoPrincipal() {
    /* 
    Por mejorar: corregir el comportamiento cuando se desea cancelar la operación durante el ingreso de id y password, se repite 3 veces. 
    */

    let id;
    id = prompt('Bienvenido. Ingrese número id de cliente')
    if (id !== null && id !== '') {
    for (let i = 2; i >= 0; --i) {
            let password = prompt('Ingrese su password')
            if (accesoClientes.some((el) => el.id === id && el.password === password)) {
                const cliente = listaClientes.find((el) => el.id === id)    
                menuPrincipal(cliente)
                return; // Salir de la función después de iniciar sesión
            } else {
                if (i === 0) {
                    alert('Número id incorrecto. Intentos restantes: 0.\nSu tarjeta ha sido bloqueada')
                    console.log('Número id incorrecto. Intentos restantes: 0.\nSu tarjeta ha sido bloqueada')
                } else {
                    console.log('Número id incorrecto. Intentos restantes: ' + i)
                    alert('Número id incorrecto. Intentos restantes: ' + i)
                }
            }
        }
    } else {
        cancelar() // Si el usuario cancela la operación, salir del ciclo
    }
}


accesoPrincipal()