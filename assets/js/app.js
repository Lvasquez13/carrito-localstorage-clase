// ===== LOGIN =====
function login() {
  const email = document.getElementById("correo").value
  if (email.trim() === "") {
    alert("Por favor ingresa tu correo")
    return
  }

  // Guardar correo en localStorage
  localStorage.setItem("usuario", email)

  // Mostrar tienda
  mostrarTienda()
}

function logout() {
  localStorage.removeItem("usuario")
  // Ocultar tienda y mostrar login
  document.getElementById("tienda-view").style.display = "none"
  document.getElementById("login-view").style.display = "block"
}

// Comprobar si ya hay usuario logueado al cargar
document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuario")
  if (usuario) {
    mostrarTienda()
  }
})

// ====== TIENDA ======
const productos = [
  { id: 1, nombre: "Mouse", precio: 5000, img: "assets/img/mouse.jpg" },
  { id: 2, nombre: "Teclado", precio: 15000, img: "assets/img/teclado.jpg" },
  { id: 3, nombre: "Monitor", precio: 120000, img: "assets/img/monitor.jpg" }
]

function mostrarTienda() {
  document.getElementById("login-view").style.display = "none"
  document.getElementById("tienda-view").style.display = "block"
  const usuario = localStorage.getItem("usuario")
  document.getElementById("usuario").innerText = "Usuario: " + usuario

  mostrarProductos()
  mostrarCarrito()
}

// Mostrar productos como cards
function mostrarProductos() {
  const contenedor = document.getElementById("productos")
  contenedor.innerHTML = ""
  productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="card">
        <img src="${p.img}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>Precio: $${p.precio}</p>
        <button onclick='agregarProducto(${JSON.stringify(p)})'>Agregar al carrito</button>
      </div>
    `
  })
}

// ====== FUNCIONES DEL CARRITO ======
function obtenerCarrito() {
  const usuario = localStorage.getItem("usuario")
  const carrito = localStorage.getItem("carrito_" + usuario)
  return carrito ? JSON.parse(carrito) : []
}

function guardarCarrito(carrito) {
  const usuario = localStorage.getItem("usuario")
  localStorage.setItem("carrito_" + usuario, JSON.stringify(carrito))
}

function agregarProducto(producto) {
  let carrito = obtenerCarrito()
  const existe = carrito.find(p => p.id === producto.id)
  if (existe) {
    existe.cantidad++
  } else {
    producto.cantidad = 1
    carrito.push(producto)
  }
  guardarCarrito(carrito)
  mostrarCarrito()
}

function mostrarCarrito() {
  const carrito = obtenerCarrito()
  const contenedor = document.getElementById("carrito")
  const totalHTML = document.getElementById("total")

  contenedor.innerHTML = ""
  carrito.forEach(p => {
    contenedor.innerHTML += `
      <p>
        ${p.nombre} - $${p.precio} x 
        <input type="number" min="1" value="${p.cantidad}" onchange="editarCantidad(${p.id}, this.value)">
        <button onclick="eliminarProducto(${p.id})">❌</button>
      </p>
    `
  })

  totalHTML.innerText = "Total: $" + calcularTotal()
}

function editarCantidad(id, cantidad) {
  let carrito = obtenerCarrito()
  const producto = carrito.find(p => p.id === id)
  if (producto) {
    producto.cantidad = parseInt(cantidad)
    if (producto.cantidad < 1) producto.cantidad = 1
  }
  guardarCarrito(carrito)
  mostrarCarrito()
}

function eliminarProducto(id) {
  let carrito = obtenerCarrito()
  carrito = carrito.filter(p => p.id !== id)
  guardarCarrito(carrito)
  mostrarCarrito()
}

function calcularTotal() {
  const carrito = obtenerCarrito()
  return carrito.reduce((total, p) => total + p.precio * p.cantidad, 0)
}

function vaciarCarrito() {
  guardarCarrito([])
  mostrarCarrito()
}