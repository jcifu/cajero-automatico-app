/* Simulador de cajero automático */

let continuar = true
let saldo = 500000
let numSecreto = 123456

function consultarSaldo() {
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

function cambiarClave() {
    console.log('Cambiar clave')
    numSecreto = prompt('Ingrese su nuevo número secreto') //en futuras versiones implementar validación clave numérica de 4 dígitos
    console.log('Nuevo número secreto: ' + numSecreto)
    alert('Su número secreto ha sido cambiado con éxito.')
}

function cuentaCorriente() {
    console.log('Cuenta Corriente')
    let opcionCorr = prompt('Por favor, seleccione la operación que desea realizar \n 1: Giro rápido por $5000 \n 2: Giro por otro monto \n 3: Consultar Saldo \n 0: Cancelar operación')
    let montoGiro
    do {
        switch (opcionCorr) {
            case '1':
                console.log('Giro rápido por $5000')
                montoGiro = 5000
                girarDinero(montoGiro)
                nuevaOperacion()
                break
            case '2':
                console.log('Giro rápido por otro monto')
                montoGiro = prompt('Ingrese el monto que desea girar. Tope máximo: $' + saldo)
                //en versiones posteriores se implementará if para validar que el monto a girar sea menor al saldo
                girarDinero(montoGiro)
                nuevaOperacion()
                break
            case '3':
                console.log('Consultar saldo')
                consultarSaldo()
                nuevaOperacion()
                break
            case '0':
                console.log("Cancelar operación")
                despedida()
                continuar = false
                break
            case null:
                console.log("Cancelar operación")
                alert('Operación cancelada. Retire su tarjeta')
                continuar = false
                break
            default:
                console.log('Opción no valida')
                alert('Ingrese una opción válida')
                break
        }
    } while (continuar === true)
}

function girarDinero(montoGiro) {
    console.log(montoGiro)
    saldo -= montoGiro
    console.log('Giro por $' + montoGiro + '. Saldo restante: $' + saldo)
    alert('Giro por $' + montoGiro + '. Saldo restante: $' + saldo + '. Retire su dinero y comprobante')
    return saldo
}

function nuevaOperacion(continuar) {
    continuar = prompt('Desea realizar otra operación? \n 1: Sí \n 2: No')
    switch (continuar) {
        case '1':
            menuPrincipal()
            break
        case '2': despedida()
            continuar = false
            break
        case '':
            console.log('Continuar :' + continuar)
            menuPrincipal()
            break
        case null:
            despedida()
            continuar = false
            break
        default: alert('Ingrese una opción válida')
    }
}

function menuPrincipal() {
    do {
        let opcion = prompt('Bienvenido. Por favor, seleccione el producto que desea operar\n 1: Cuenta Corriente\n 2: Cuenta Vista (No disponible) \n 3: Cambiar número secreto\n 0: Salir')
        switch (opcion) {
            case '1':
                cuentaCorriente()
                break
            case '2': //Cuenta Vista. Función no disponible por el momento
                noDisponible()
                break
            case '3':
                cambiarClave()
                break
            case '0':
                alert('Operación cancelada. Retire su tarjeta')
                continuar = false
                break
            case null:
                alert('Operación cancelada. Retire su tarjeta')
                continuar = false
                break
            default:
                alert('Ingrese una opción válida')
                break
        }
    } while (continuar === true)
}

menuPrincipal()