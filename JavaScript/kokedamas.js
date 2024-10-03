let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0.00;

function mostrarProductos() {
    const container = document.querySelector('.container');
    container.innerHTML = '';

    productos.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('product-card');
        div.setAttribute('data-aos', 'fade-up');
        div.innerHTML = `
            <img class="product-image" src="${producto.imagen}" alt="${producto.nombre}">
            <h2 class="product-name">${producto.nombre}</h2>
            <p class="product-price">$${producto.precio}</p>
            <button class="add-to-cart-btn" onclick="addToCart('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
        `;
        container.appendChild(div);
    });

    AOS.init(); // Inicializar animaciones AOS
}

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
    guardarCarrito();
}

function calcularTotal() {
    total = carrito.map(item => item.precioTotal).reduce((acc, precio) => acc + precio, 0);
}

function actualizarCarrito() {
    const cartItemsElement = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");
    
    cartItemsElement.innerHTML = "";
    carrito.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.nombre} x ${item.cantidad} - $${item.precioTotal}`;
        cartItemsElement.appendChild(li);
    });
    
    cartTotalElement.textContent = Math.round(total);
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total.toString());
}

function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'No has agregado ningún producto al carrito.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    Swal.fire({
        title: 'Compra finalizada',
        html: `<p>Has comprado los siguientes productos:</p><ul>${carrito.map(item => `<li>${item.nombre} x ${item.cantidad} - $${item.precioTotal}</li>`).join('')}</ul><p><strong>Total a pagar: $${Math.round(total)}</strong></p>`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        carrito = [];
        total = 0.00;
        actualizarCarrito();
        guardarCarrito();
    });
}

function cargarProductos() {
    fetch('../JavaScript/kokedamas.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos();
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

window.onload = function() {
    actualizarCarrito();
    cargarProductos();
};