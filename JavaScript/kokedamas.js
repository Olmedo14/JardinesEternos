// Definición de variables globales para los productos y sus precios
let kokesyngonium = "Kokedama de Syngonium";
let preciokokesyngonium = 12000;

let kokehelechos = "Kokedama de Helechos";
let preciokokehelechos = 16000;

let kokebonsai = "Kokedama de Bonsai";
let preciokokebonsai = 18000;

let kokeficus = "Kokedama de Ficus";
let preciokokeficus = 20000;

let carrito = [];
let total = 0.00;

// Función para mostrar los productos disponible
function mostrarProductos() {
    return `Productos disponibles:
1. ${kokesyngonium} - $${preciokokesyngonium}
2. ${kokehelechos} - $${preciokokehelechos}
3. ${kokebonsai} - $${preciokokebonsai}
4. ${kokeficus} - $${preciokokeficus}
5. Finalizar Compra`;
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto, precio) {
    carrito.push(producto);
    total += precio;
    console.log(`${producto} ha sido agregado al carrito. Total: $${total}`);
}

// Función principal para manejar la compra
function iniciarCompra() {
    let continuar = true;

    while (continuar) {
        let seleccion = prompt(`${mostrarProductos()}\n\nIngresa el número del producto que deseas agregar al carrito:`);
        switch (seleccion) {
            case "1":
                agregarAlCarrito(kokesyngonium, preciokokesyngonium);
                break;
            case "2":
                agregarAlCarrito(kokehelechos, preciokokehelechos);
                break;
            case "3":
                agregarAlCarrito(kokebonsai, preciokokebonsai);
                break;
            case "4":
                agregarAlCarrito(kokeficus, preciokokeficus);
                break;
            case "5":
                continuar = false;  // Finalizar la compra
                break;
            default:
                alert("Selección no válida. Por favor, intenta de nuevo.");
        }
    }

    finalizarCompra();
}

// Función para finalizar la compra y mostrar el total
function finalizarCompra() {
    if (carrito.length > 0) {
        alert(`Has comprado los siguientes productos:\n${carrito.join("\n")}\n\nTotal a pagar: $${total}`);
        console.log("Compra finalizada. Total: $" + total);
    } else {
        alert("No has agregado ningún producto al carrito.");
        console.log("No se realizó ninguna compra.");
    }
}

// Llama a la función para iniciar el proceso de compra
iniciarCompra();