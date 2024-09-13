// Variables globales para los productos y sus precios
let productos = [
    { nombre: "Kokedama de Syngonium", precio: 12000 },
    { nombre: "Kokedama de Helechos", precio: 16000 },
    { nombre: "Kokedama de Bonsai", precio: 18000 },
    { nombre: "Kokedama de Ficus", precio: 20000 }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];  // Recuperar carrito del storage o inicializar vacío
let total = parseFloat(localStorage.getItem('total')) || 0.00;    // Recuperar total del storage o inicializar en 0.00

// Función para agregar productos al carrito
function addToCart(nombre, precio) {
    let productoEnCarrito = carrito.find(item => item.nombre === nombre);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
        productoEnCarrito.precioTotal += precio;
    } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1, precioTotal: precio });
    }
    
    calcularTotal();
    actualizarCarrito();
    guardarCarrito();  // Guardar en localStorage después de cada cambio
}

// Función para calcular el total
function calcularTotal() {
    total = carrito.map(item => item.precioTotal).reduce((acc, precio) => acc + precio, 0);
}

// Función para actualizar el DOM con el carrito
function actualizarCarrito() {
    const cartItemsElement = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");
    
    cartItemsElement.innerHTML = "";  // Limpiar lista del carrito
    carrito.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.nombre} x ${item.cantidad} - $${item.precioTotal}`;
        cartItemsElement.appendChild(li);
    });
    
    cartTotalElement.textContent = Math.round(total);
}

// Función para guardar carrito y total en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));  // Guardar carrito en JSON
    localStorage.setItem('total', total.toString());           // Guardar total
}

// Función para finalizar la compra y mostrar mensaje en el DOM
function finalizarCompra() {
    const mensajeElement = document.getElementById('mensajeCompra');  // Elemento para mostrar el mensaje

    if (carrito.length > 0) {
        mensajeElement.innerHTML = `<p>Has comprado los siguientes productos:</p><ul>${carrito.map(item => `<li>${item.nombre} x ${item.cantidad} - $${item.precioTotal}</li>`).join('')}</ul><p><strong>Total a pagar: $${Math.round(total)}</strong></p>`;
        console.log("Compra finalizada. Total: $" + Math.round(total));
        
        // Reiniciar carrito y total
        carrito = [];
        total = 0.00;
        actualizarCarrito();
        guardarCarrito();  // Vaciar el storage después de la compra
    } else {
        mensajeElement.innerHTML = `<p>No has agregado ningún producto al carrito.</p>`;
        console.log("No se realizó ninguna compra.");
    }
}

// Cargar el carrito almacenado cuando se carga la página
window.onload = function() {
    actualizarCarrito();  // Actualizar el DOM con los datos del storage
};