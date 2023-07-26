let id, nombre;
let cuentaVista, cuentaCorr;

function Cliente(id, nombre, password, cuentaVista, cuentaCorr) {
    this.id = id
    this.nombre = nombre
    this.password = password
    this.cuentaVista = {
        idCuenta: cuentaVista.idCuenta,
        saldo: cuentaVista.saldo
    }
    this.cuentaCorr = {
        idCuenta: cuentaCorr.idCuenta,
        saldo: cuentaCorr.saldo
    }
}

const cliente1 = new Cliente('000001', 'Javier', '123456', { idCuenta: '000012', saldo: 400000 }, { idCuenta: '800024', saldo: 750000 });
const cliente2 = new Cliente('000002', 'María', '654321', { idCuenta: '000034', saldo: 100000 }, { idCuenta: '800045', saldo: 250000 });
const cliente3 = new Cliente('000003', 'Pedro', '333333', { idCuenta: '000056', saldo: 200000 }, { idCuenta: '800067', saldo: 350000 });
const cliente4 = new Cliente('000004', 'Ana', '444444', { idCuenta: '000078', saldo: 150000 }, { idCuenta: '800089', saldo: 400000 });

// Creación de una lista que emula una base de datos de clientes. Por ahora no se utilizará
// const listaClientes = [cliente1, cliente2, cliente3, cliente4];
// const listaClientesJSON = JSON.stringify(listaClientes);