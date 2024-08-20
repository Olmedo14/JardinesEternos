let nombre = prompt("Bienvenido, por favor ingrese su nombre")
let apellido = prompt("Ingrese su apellido")
alert(`Bienvenido ${nombre} ${apellido} a Jardines Eternos`)
// Definición de variables globales para los productos y sus precios
let TerrarioDesértico = "Terrario Desértico";
let precioTerrarioDesértico = 15000;

let TerrarioBoscoso = "Terrario Boscoso";
let precioTerrarioBoscoso = 20000;

let TerrarioPantanoso = "Terrario Pantanoso";
let precioTerrarioPantanoso = 22000;

let TerrarioMontañoso = "Terrario Montañoso";
let precioTerrarioMontañoso = 30000;

let carrito = [];
let total = 0.00;

// Función para mostrar los productos disponible
function mostrarProductos() {
    return `Productos disponibles:
1. ${TerrarioMontañoso} - $${precioTerrarioMontañoso}
2. ${TerrarioDesértico} - $${precioTerrarioDesértico}
3. ${TerrarioBoscoso} - $${precioTerrarioBoscoso}
4. ${TerrarioPantanoso} - $${precioTerrarioPantanoso}
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
                agregarAlCarrito(TerrarioMontañoso, precioTerrarioMontañoso);
                break;
            case "2":
                agregarAlCarrito(TerrarioDesértico, precioTerrarioDesértico);
                break;
            case "3":
                agregarAlCarrito(TerrarioBoscoso, precioTerrarioBoscoso);
                break;
            case "4":
                agregarAlCarrito(TerrarioPantanoso, precioTerrarioPantanoso);
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