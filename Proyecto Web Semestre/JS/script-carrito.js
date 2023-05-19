$(document).ready(function () {
    var carritoContainer = $('#carrito-container');

    // Obtener el carrito desde el almacenamiento local
    var carrito = JSON.parse(localStorage.getItem('carrito'));
    console.log(carrito);

    // Verificar si hay productos en el carrito
    if (carrito && carrito.length > 0) {
        // Recorrer los productos del carrito y crear elementos HTML
        $.each(carrito, function (index, producto) {
            var nombre = producto.nombre;
            var precio = producto.precio;
            var precioFormateado = separarMiles(precio);
            var rutaImagen = producto.rutaImagen;
            var cantidad = producto.cantidad; // Agregar propiedad cantidad al objeto del producto
            var precioFinal = cantidad * precio;
            var precioFinalFormateado = separarMiles(precioFinal);

            // Crear elementos HTML para mostrar el producto en el carrito
            var productoElement = $('<div>').addClass('tarjeta-carrito');
            var imagen = $('<div>').addClass('img').append($('<img>').attr('src', rutaImagen).attr('alt', 'Imagen de ' + nombre));
            var contenido = $('<div>').addClass('contenido');
            var nombreElement = $('<div>').addClass('nombre').text(nombre);
            var precioElement = $('<div>').addClass('precio').text('Precio por unidad: $' + precioFormateado);
            var contadorElement = $('<input>').addClass('contador-carrito').attr('type', 'number').attr('min', 1).val(cantidad).prop('disabled', true); // Contador deshabilitado
            var subtotalElement = $('<div>').addClass('subtotal').text('Subtotal: $' + precioFinalFormateado);
            var btnMenos = $('<button>').addClass('btn-eliminar').text('-');
            var btnMas = $('<button>').addClass('btn-eliminar').text('+');
            var btnEliminar = $('<button>').addClass('btn-eliminar').html('<i class="bi bi-trash"></i>');

            // Agregar eventos a los botones para cambiar la cantidad y eliminar el producto
            btnMenos.on('click', function () {
                var nuevaCantidad = parseInt(contadorElement.val()) - 1;
                if (nuevaCantidad >= 1) {
                    contadorElement.val(nuevaCantidad);
                    actualizarCantidad(index, nuevaCantidad); // Llamar a la función para actualizar la cantidad en el carrito
                    actualizarSubtotal(productoElement, precio, nuevaCantidad); // Actualizar el subtotal del producto
                    actualizarTotal(); // Actualizar el total del carrito
                }
            });

            btnMas.on('click', function () {
                var nuevaCantidad = parseInt(contadorElement.val()) + 1;
                contadorElement.val(nuevaCantidad);
                actualizarCantidad(index, nuevaCantidad); // Llamar a la función para actualizar la cantidad en el carrito
                actualizarSubtotal(productoElement, precio, nuevaCantidad); // Actualizar el subtotal del producto
                actualizarTotal(); // Actualizar el total del carrito
            });

            btnEliminar.on('click', function () {
                eliminarProducto(index); // Llamar a la función para eliminar el producto del carrito
                productoElement.remove(); // Eliminar el elemento del productodel DOM
                actualizarTotal(); // Actualizar el total del carrito
            });
            contenido.append(nombreElement, precioElement, btnMenos, contadorElement, btnMas, subtotalElement, btnEliminar);
            productoElement.append(imagen, contenido);
            // Agregar el elemento del producto al contenedor del carrito
            carritoContainer.append(productoElement);
        });
    } else {
        // Mostrar un mensaje si el carrito está vacío
        carritoContainer.text('No hay productos en el carrito');
    }
    // Función para actualizar la cantidad en el carrito
    function actualizarCantidad(index, cantidad) {
        var carrito = JSON.parse(localStorage.getItem('carrito'));
        carrito[index].cantidad = cantidad; // Actualizar la cantidad en el objeto del producto
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado en el almacenamiento local

        // Obtener la cantidad total de productos en el carrito
        var cantidadTotal = carrito.reduce(function (total, producto) {
            return total + producto.cantidad;
        }, 0);

        // Actualizar el valor del contador total
        $('.contador-total').text(cantidadTotal);
    }

    // Función para actualizar el subtotal del producto
    function actualizarSubtotal(elemento, precio, cantidad) {
        var subtotal = precio * cantidad;
        elemento.find('.subtotal').text('Subtotal: $' + separarMiles(subtotal));
    }

    // Función para actualizar el total del carrito
    function actualizarTotal() {
        var carrito = JSON.parse(localStorage.getItem('carrito'));
        var total = carrito.reduce(function (acumulador, producto) {
            return acumulador + producto.precio * producto.cantidad;
        }, 0);

        $('.total').text('$' + separarMiles(total));
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(index) {
        var carrito = JSON.parse(localStorage.getItem('carrito'));
        carrito.splice(index, 1); // Eliminar el producto del carrito por su índice
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado en el almacenamiento local

        // Obtener la cantidad total de productos en el carrito
        var cantidadTotal = carrito.reduce(function (total, producto) {
            return total + producto.cantidad;
        }, 0);

        // Actualizar el valor del contador total
        $('.contador-total').text(cantidadTotal);

        actualizarTotal(); // Actualizar el total del carrito
    }

    // Obtener la cantidad total de productos en el carrito
    var cantidadTotal = carrito.reduce(function (total, producto) {
        return total + producto.cantidad;
    }, 0);

    // Establecer el valor inicial del contador total como la cantidad total de productos
    $('.contador-total').text(cantidadTotal);
    actualizarTotal();
});

// Función auxiliar para formatear el número con separadores de miles
function separarMiles(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
