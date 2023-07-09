/* Simulador de cajero automático */
const login = document.getElementById("login");
let continuar = true;

function cancelar() {
    console.log("Cancelar operación");
    alert("Operación cancelada. Retire su tarjeta");
    sessionStorage.removeItem('cliente');
    continuar = false;
}

function consultarSaldo(idCuenta) {
    const saldo = idCuenta.saldo;
    console.log("Consulta saldo: " + saldo);
    alert("Su saldo es : $" + saldo);
}

function despedida() {
    console.log("Despedida");
    alert("Muchas gracias por preferir nuestro servicio. Hasta pronto.");
    continuar = false;
}

function noDisponible() {
    console.log("Función no disponible");
    alert("Función no disponible");
}

function cambiarClave(cliente) {
    console.log("Cambiar clave");
    nuevoPassword = prompt("Ingrese su nuevo número secreto"); //Validación clave numérica de 4 dígitos por implementar...
    if (id !== null && id !== "") cliente.password = nuevoPassword;
    else alert("Ingrese un número correcto");
    console.log(cliente.password);
    alert("Su número secreto ha sido cambiado con éxito.");
}

function girarDinero(idCuenta, montoGiro) {
    let saldo = idCuenta.saldo;
    console.log("Saldo disponible: $" + saldo);
    console.log("Monto a girar: $" + montoGiro);

    if (montoGiro <= idCuenta.saldo && montoGiro > 0) {
        //Giro rápido por 5000 
        if (montoGiro === 5000) {
            saldo -= montoGiro;
            console.log("Giro por $" + montoGiro + ". Saldo restante: $" + saldo);
            alert("Giro por $" + montoGiro + ". Saldo restante: $" + saldo + ". Retire su dinero y comprobante");
        } else {
            //Giro por otro monto 
            //Se debe separar la funcionalidad de Giro Rápido del Giro por otro monto para poder ingresar el valor después de una validación rápida 
            montoGiro = prompt("Ingrese monto a girar");
            saldo -= montoGiro;
            console.log("Giro por $" + montoGiro + ". Saldo restante: $" + saldo);
            alert("Giro por $" + montoGiro + ". Saldo restante: $" + saldo + ". Retire su dinero y comprobante");
        }
    } else if (montoGiro === 0) alert("El monto a girar no puede ser $0.");
    else
        alert("Monto inválido. No puede exceder el saldo disponible ni ser menor a 0.");
    return saldo;
}

function cuentaCorriente(cliente) {
    let montoGiro;
    console.log("Cuenta Corriente ID: " + cliente.cuentaCorr.idCuenta);
    const menuCorr = document.createElement("div");
    document.body.appendChild(menuCorr);
    let menuCorrHTML = `
    <div>
            <button id="giroRap-btn" type="button">Giro rápido por $5000</button>
            <button id="giroMonto-btn" type="button">Giro por otro monto</button>
            <button id="saldo-btn" type="button">Consultar Saldo</button>
            <button id="salir-btn" type="button">Salir</button>
        </div>
    `;
    menuCorr.innerHTML = menuCorrHTML;
    menuCorr.id = "menuCorr";
    const giroRap = document.getElementById("giroRap-btn");
    const giroMonto = document.getElementById("giroMonto-btn");
    const consultaSaldo = document.getElementById("saldo-btn");
    const salir = document.getElementById("salir-btn");

    //Giro rápido por $5000
    giroRap.addEventListener("click", () => {
        montoGiro = 5000;
        document.getElementById("menuCorr").remove();
        return girarDinero(cliente.cuentaCorr, montoGiro);
    });
    //Giro por otro monto
    giroMonto.addEventListener("click", () => {
        document.getElementById("menuCorr").remove();
        return girarDinero(cliente.cuentaCorr, parseInt(montoGiro));
    });
    //Consultar Saldo
    consultaSaldo.addEventListener("click", () => {
        document.getElementById("menuCorr").remove();
        return consultarSaldo(cliente.cuentaCorr);
    });
    //Cancelar operación
    salir.addEventListener("click", () => {
        document.getElementById("menuCorr").remove();
        return cancelar();
    });
}

function nuevaOperacion(cliente) {
    continuar = prompt("Desea realizar otra operación? \n 1: Sí \n 2: No");
    switch (continuar) {
        case "1":
            menuPrincipal(cliente);
            break;
        case "2":
            despedida();
            continuar = false;
            break;
        case "":
            menuPrincipal(cliente);
            break;
        case null:
            despedida();
            continuar = false;
            break;
        default:
            alert("Ingrese una opción válida");
    }
}

function menuPrincipal(cliente) {
    const menu = document.createElement("div");
    document.body.appendChild(menu);
    let menuHTML = `
        <div>
            <button id="ctaCorr-btn" type="button">Cuenta corriente</button>
            <button id="ctaVista-btn" type="button">Cuenta Vista</button>
            <button id="password-btn" type="button">Cambiar clave</button>
            <button id="salir-btn" type="button">Salir</button>
        </div>
     `;
    menu.innerHTML = menuHTML;
    menu.id = "menuPrincipal";

    const ctaCorr = document.getElementById("ctaCorr-btn");
    const ctaVista = document.getElementById("ctaVista-btn");
    const password = document.getElementById("password-btn");
    const salir = document.getElementById("salir-btn");

    ctaCorr.addEventListener("click", () => {
        document.getElementById("menuPrincipal").remove();
        return cuentaCorriente(cliente);
    });
    //No disponible. Por implementar...
    ctaVista.addEventListener("click", () => {
        document.getElementById("menuPrincipal").remove();
        return noDisponible();
    });
    //No disponible. Por implementar...
    password.addEventListener("click", () => {
        document.getElementById("menuPrincipal").remove();
        return noDisponible();
    });
    salir.addEventListener("click", () => {
        document.getElementById("menuPrincipal").remove();
        return cancelar();
    });
}

function accesoPrincipal(event) {
    event.preventDefault();
    const idCliente = document.getElementById("idCliente").value;
    const password = document.getElementById("password").value;
    const parent = login.parentNode;
    
    const clientes = JSON.parse(listaClientesJSON);
    let cliente = clientes.find(
        (el) => el.id === idCliente && el.password === password
    );

    if (cliente) {
        parent.removeChild(login);
        //Almacenamiento y recuperación del cliente en sessionStorage
        sessionStorage.setItem('cliente', JSON.stringify(cliente));
        cliente = JSON.parse(sessionStorage.getItem('cliente'));

        alert("Acceso concedido cliente ID: " + cliente.id);
        console.log("Acceso concedido cliente ID: " + cliente.id);
        
        menuPrincipal(cliente); 
    } else {
        //Validacion por usuario invalido por implementar...
        // Máximo 3 intentos por implementar

        if (cliente) {
            alert("Acceso concedido cliente ID: " + cliente.id);
            console.log("Acceso concedido cliente ID: " + cliente.id);
        } else {
            alert("Numero de cliente incorrecto. Intente nuevamente");
            console.log("Numero de cliente incorrecto. Intente nuevamente");
        }
    }
}

login.addEventListener("submit", accesoPrincipal);