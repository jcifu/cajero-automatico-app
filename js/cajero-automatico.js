  /* Simulador de cajero automático */
  //Creación de formulario Login inicial
  let crearMenu = () => {
    let container = document.createElement("container")
    let login = document.createElement("div")
    let loginHTML = `
    <div>
    <form id="login">
    <div>
      <label for="idCliente"> ID Cliente</label>
      <input id="idCliente" type="number" placeholder="000001"/>
    </div>
    <div>
      <label for="password"> Password</label>
      <input id="password" type="number" placeholder="123456"/>
    </div>
    <button id="login-button" type="submit">Ok</button>
  </form>
  </div>`
    login.innerHTML = loginHTML
    login.id = "login"
    document.body.appendChild(container)
    container.appendChild(login)
    login.addEventListener("submit", (evt) => accesoPrincipal(evt))
  }

  //Formulario login que simula la validación de una tarjeta bancaria
  let accesoPrincipal = (evt) => {
    const URL = "./js/clientes.json"
    evt.preventDefault()
      const login = document.getElementById("login")
      let idCliente = document.getElementById("idCliente")
      let password = document.getElementById("password")
      //Recuperación de datos desde JSON
      fetch(URL)
        .then((response) => response.json())
        .then((clientes) => {
          let cliente = clientes.find(
            (el) => el.id === idCliente.value && el.password === password.value
          )
          if (cliente) {
            login.remove()
            //Almacenamiento del cliente en localStorage
            localStorage.setItem("cliente", JSON.stringify(cliente))
            cliente = JSON.parse(localStorage.getItem("cliente"))
            Swal.fire({
              icon: "success",
              title: "Acceso concedido",
              text: "Cliente ID: " + cliente.id,
            })
            console.log("Acceso concedido cliente ID: " + cliente.id)
            menuPrincipal(cliente)
          } else {
            // borrar inputs en caso de password y idCliente inválidos
            idCliente.value = ""
            password.value = ""
            Swal.fire({
              icon: "error",
              title: "Acceso denegado",
              text: "Número de cliente o contraseña incorrectos. Intente nuevamente.",
            })
            console.log("Numero de cliente incorrecto. Intente nuevamente")
          }
        })
        .catch((error) => {
          console.error("Error al cargar los datos de clientes:", error)
        })
  }
  //Acceso a operaciones bancarias básicas
  let menuPrincipal = (cliente) => {
    const menu = document.createElement("div")
    document.body.appendChild(menu)
    let menuHTML = `
          <div>
              <div>
              Bienvenido </br>
              Por favor, seleccione el producto que desea operar
              </div>
              <button id="ctaCorr-btn" type="button">Cuenta corriente</button>
              <button id="password-btn" type="button">Cambiar clave</button>
              <button id="salir-btn" type="button">Salir</button>
          </div>
      `
    menu.innerHTML = menuHTML
    menu.id = "menuPrincipal"

    const ctaCorr = document.getElementById("ctaCorr-btn")
    const password = document.getElementById("password-btn")
    const salir = document.getElementById("salir-btn")

    // Acceso a menú Cuenta Corriente
    ctaCorr.addEventListener("click", () => {
      document.getElementById("menuPrincipal").remove()
      return cuentaCorriente(cliente)
    })
    // Acceso a Menu para cambiar contraseña
    password.addEventListener("click", () => {
      document.getElementById("menuPrincipal").remove()
      return cambiarClave(cliente)
    })
    // Cancelar operación y regresar a accesoPrincipal
    salir.addEventListener("click", () => {
      document.getElementById("menuPrincipal").remove()
      return cancelar()
    })
  }
  // Función Cambiar clave
  let cambiarClave = (cliente) => {
    return new Promise((resolve, reject) => {
      console.log("Cambiar clave")
      console.log("Cliente id: " + cliente?.id)
      const menuCambiar = document.createElement("div")

      document.body.appendChild(menuCambiar)
      let menuCambiarHTML = `
      <div>
        <form id="formPassword">
          <label>Ingrese su nueva clave secreta. Es correcta?</label>
          <input for="password" id="password" type="number">
          <button id="submit" for="password" type="submit">Sí</button>
          <button id="borrar-btn" for="password" type="button">No</button>
        </form>
        <button id="volver-btn" type="button">Volver a Menú</button>
      </div>
      `
      menuCambiar.innerHTML = menuCambiarHTML
      menuCambiar.id = "menuCambiar"
      const formPassword = document.getElementById("formPassword")
      const input = document.getElementById("password")
      const borrarBtn = document.getElementById("borrar-btn")
      const volver = document.getElementById("volver-btn")

      formPassword.addEventListener("submit", (evt) => {
        evt.preventDefault()

        let password = parseInt(input.value)
        if (password) {
          cliente.password = password
          localStorage.setItem("cliente", JSON.stringify(cliente)) // se guarda la nueva contraseña en localStorage para simular un backend y poder usar nuevamente la contraseña
          console.log("Su clave secreta ha sido cambiada exitosamente.")
          Swal.fire({
            icon: "success",
            title: "",
            text: "Su clave secreta ha sido cambiada exitosamente.",
          })
          document.getElementById("menuCambiar").remove()
          nuevaOperacion(cliente)
          resolve(cliente)
        } else reject(new Error("No es posible realizar la operación"))

        borrarBtn.addEventListener("click", () => {
          input.value = ""
        })
      })

      volver.addEventListener("click", () => {
        document.getElementById("menuCambiar").remove()
        console.log("Volver a Menú Principal")
        return menuPrincipal(cliente)
      })
    })
  }

  let consultarSaldo = (cliente) => {
    return new Promise((resolve, reject) => {
      const { saldo } = cliente?.cuentaCorr ?? {}
      if (saldo) {
        console.log("Consulta saldo: " + saldo)
        Swal.fire({
          icon: "success",
          title: "Su saldo es: ",
          text: "$" + saldo,
        })
        nuevaOperacion(cliente)
        resolve(cliente)
      } else {
        mensajeError = "Cliente o cuenta corriente no encontrada."
        console.error(mensajeError)
        reject(new Error(mensajeError))
      }
    })
  }

  let girarRap = (cliente, giro) => {
    return new Promise((resolve, reject) => {
      let { saldo } = cliente?.cuentaCorr ?? {}
      if (saldo) {
        console.log("Giro Rápido: $" + giro)
        saldo -= giro
        console.log("Giro por $" + giro + ". Saldo restante: $" + saldo)
        Swal.fire({
          icon: "success",
          title: "Giro por $" + giro,
          text: "Retire su dinero y comprobante",
        })
        cliente.cuentaCorr.saldo = saldo
        nuevaOperacion(cliente)
        resolve(cliente)
      } else reject(new Error("No es posible realizar la operación"))
    })
    
  }

  let girarOtro = (cliente, giro) => {
    return new Promise((resolve, reject) => {
      let { saldo } = cliente?.cuentaCorr ?? {}
      console.log("Giro por otro monto")
      const giroMax = 250000 // giro máximo permitido
      const menuGirar = document.createElement("div")
      document.body.appendChild(menuGirar)
      let menuGirarHTML = `
        <div>
          <form id="formGiro">
            <div>
              <p> Ingrese monto que desea girar</br>
                  ¿Está correcto?
              </p>
              <label for="giro">$</label>
              <input id="giro" for="giro" type="number">
            </div>
            <button id="si-btn" for="giro" type="submit">Sí</button>
            <button id="no-btn" type="button">No</button>
          </form>
        </div>
        `
      menuGirar.innerHTML = menuGirarHTML
      menuGirar.id = "menuGirar"
      const formGiro = document.getElementById("formGiro")
      const noBtn = document.getElementById("no-btn")
      const input = document.getElementById("giro")

      formGiro.addEventListener("submit", (evt) => {
        evt.preventDefault()
        giro = parseInt(input.value)
        if (giro <= saldo && giro <= giroMax && giro > 0) {
          saldo -= giro
          console.log("Giro por $" + giro + ". Saldo restante: $" + saldo)
          Swal.fire({
            icon: "success",
            title: "Giro por $" + giro,
            text: "Retire su dinero y comprobante",
          })
          document.getElementById("menuGirar").remove()
          nuevaOperacion(cliente)
          resolve(cliente)
        } else if (giro > giroMax) {
          Swal.fire({
            icon: "error",
            title: "Giro inválido",
            text:
              "Monto a girar no puede ser superior a $" +
              giroMax +
              ". Ingrese monto a girar nuevamente.",
          })
          input.value = ""
          reject(
            new Error(
              "Monto a girar no puede ser superior a $" +
                giroMax +
                ". Ingrese monto a girar nuevamente."
            )
          )
        } else {
          reject(new Error("Monto inválido. Ingrese monto a girar nuevamente."))
          input.value = ""
        }
      })
      noBtn.addEventListener("click", () => {
        input.value = ""
      })
    })
  }

  let cuentaCorriente = (cliente) => {
      let giro
      console.log("Cuenta Corriente ID: " + cliente.cuentaCorr.idCuenta)
      const menuCorr = document.createElement("div")
      document.body.appendChild(menuCorr)
      let menuCorrHTML = `
      <div>
      <button id="giro5K-btn" type="button">Giro rápido por $5000</button>
      <button id="giro10K-btn" type="button">Giro rápido por $10000</button>
      <button id="giro25K-btn" type="button">Giro rápido por $25000</button>
      <button id="giroOtro-btn" type="button">Giro por otro monto</button>
      <button id="saldo-btn" type="button">Consultar Saldo</button>
      <button id="volver-btn" type="button">Volver a Menú</button>
      <button id="salir-btn" type="button">Salir</button>
      </div>
      `
      menuCorr.innerHTML = menuCorrHTML
      menuCorr.id = "menuCorr"
      const giro5K = document.getElementById("giro5K-btn")
      const giro10K = document.getElementById("giro10K-btn")
      const giro25K = document.getElementById("giro25K-btn")
      const giroOtro = document.getElementById("giroOtro-btn")
      const consultaSaldo = document.getElementById("saldo-btn")
      const volver = document.getElementById("volver-btn")
      const salir = document.getElementById("salir-btn")
      
      //Giro rápido por $5000
      giro5K.addEventListener("click", () => {
        giro = 5000
        document.getElementById("menuCorr").remove()
        girarRap(cliente, giro)
      })
      //Giro rápido por $10000
      giro10K.addEventListener("click", () => {
        giro = 10000
        document.getElementById("menuCorr").remove()
        girarRap(cliente, giro)
      })
      //Giro rápido por $25000
      giro25K.addEventListener("click", () => {
        giro = 25000
        document.getElementById("menuCorr").remove()
        girarRap(cliente, giro)
      })
      //Giro por otro monto
      giroOtro.addEventListener("click", () => {
        giro = undefined
        document.getElementById("menuCorr").remove()
        girarOtro(cliente, giro)
      })
      //Consultar Saldo
      consultaSaldo.addEventListener("click", () => {
        document.getElementById("menuCorr").remove()
        consultarSaldo(cliente)
      })
      //volver a Menú Principal
      volver.addEventListener("click", () => {
        document.getElementById("menuCorr").remove()
        console.log("Volver a Menú Principal")
        return menuPrincipal(cliente)
      })
      
      //Cancelar operación y regresar a accesoPrincipal
      salir.addEventListener("click", () => {
        document.getElementById("menuCorr").remove()
        return cancelar()
      })
  }

  let nuevaOperacion = (cliente) => {
    const menuNuevaOp = document.createElement("div")
    document.body.appendChild(menuNuevaOp)
    let nuevaOpHTML = `
      <div>
          <div>
              <p> 
              Desea realizar otra operación?
              </p>
              <button id="si-btn" type="button">Sí</button>
              <button id="no-btn" type="button">No</button>
          </div>
          </div>
      `
    menuNuevaOp.innerHTML = nuevaOpHTML
    menuNuevaOp.id = "nuevaOp"
    const siBtn = document.getElementById("si-btn")
    const noBtn = document.getElementById("no-btn")
    siBtn.addEventListener("click", () => {
      document.getElementById("nuevaOp").remove()
      return menuPrincipal(cliente)
    })

    noBtn.addEventListener("click", () => {
      document.getElementById("nuevaOp").remove()
      despedida(cliente)
    })
  }

  let despedida = (cliente) => {
    console.log("Despedida")
    Swal.fire({
      icon: "success",
      title: "Hasta pronto",
      text:
      "Muchas gracias por preferir nuestro servicio."
    })
    localStorage.removeItem("cliente")
    crearMenu()
  }

  let cancelar = () => {
    console.log("Cancelar operación")
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Operación cancelada. Retire su tarjeta",
    })
    localStorage.removeItem("cliente")
    crearMenu()
  }
  crearMenu()