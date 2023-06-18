
let id, nombre

let cuentaAhorro, cuentaCorr

/* const cliente = {
    id: '000001',
    nombre: 'Javier Cifuentes',
    cuentas : {
        cuentaAhorro: {
            numCuenta: '000012',
            saldo: 500000
        },
        cuentaCorr: {
            numCuenta: '800024',
            saldo: 750000
        }
    }
} */


function Cliente(id, nombre, password, cuentaAhorro, cuentaCorr) {
    this.id = id
    this.nombre = nombre
    this.password = password
    this.cuentaAhorro = {
        numCuenta: cuentaAhorro.numCuenta,
        saldo: cuentaAhorro.saldo
    }
    this.cuentaCorr = {
        numCuenta: cuentaCorr.numCuenta,
        saldo: cuentaCorr.saldo
    }
}
const cliente1 = new Cliente('000001', 'Javier', '123456', { numCuenta: '000012', saldo: 400000 }, { numCuenta: '800024', saldo: 750000 });
const cliente2 = new Cliente('000002', 'María', 'abcdef', { numCuenta: '000034', saldo: 100000 }, { numCuenta: '800045', saldo: 250000 });
const cliente3 = new Cliente('000003', 'Pedro', 'qwerty', { numCuenta: '000056', saldo: 200000 }, { numCuenta: '800067', saldo: 350000 });
const cliente4 = new Cliente('000004', 'Ana', 'zxcvbn', { numCuenta: '000078', saldo: 150000 }, { numCuenta: '800089', saldo: 400000 });


// Creación de una lista que emula una base de datos de clientes  
const listaClientes = [cliente1, cliente2, cliente3, cliente4]

const accesoClientes = listaClientes.map((cliente) => {
    return {
        id: cliente.id, 
        password: cliente.password
    }
    })