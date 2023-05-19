var carrito = [];

function toggleMenu() {
  var menu = document.getElementById('menu-lateral');
  menu.classList.toggle('show'); // Agrega o quita la clase 'show' al menú lateral

  var colMd3 = document.querySelector('.col-md-3');
  var colMd9 = document.querySelector('.col-md-9');
  if (menu.classList.contains('show')) {
    colMd3.style.width = '0'; // Reducimos el ancho del menú lateral
    colMd9.style.gridTemplateColumns = '1fr'; // Expandimos los productos a ocupar toda la página
  } else {
    colMd3.style.width = 'auto'; // Restablecemos el ancho del menú lateral
    colMd9.style.gridTemplateColumns = 'auto 1fr'; // Volvemos a la configuración original de las columnas
  }
}

$(document).ready(function () {
  mostrarProductos();
  mostrarCarrito();
});

// Función auxiliar para formatear el número con separadores de miles
function separarMiles(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function mostrarNotificacion(mensaje) {
  var notification = $('#notification');
  notification.text(mensaje);

  // Crear el botón de redireccionamiento al carrito
  var btnCarrito = $('<button>').addClass('btn-redireccionar').text('Ver carrito');
  btnCarrito.on('click', function () {
    // Redireccionar al carrito de compras
    window.location.href = '../carrito.html';
  });

  // Limpiar cualquier botón de redireccionamiento anterior
  notification.find('.btn-redireccionar').remove();

  // Agregar el botón de redireccionamiento al mensaje de notificación
  notification.append(btnCarrito);

  notification.fadeIn().delay(2000).fadeOut();
}
function mostrarProductos() {
  $.getJSON('js/products.json', function (products) {
    for (var i = 0; i < products.length; i++) {
      var producto = products[i];

      // Obtener los datos del producto
      var nombre = producto.nombre;
      var categoria = producto.categoria;
      var precio = producto.precio;
      var rutaImagen = producto.rutaImagen;

      // Formatear el precio con separadores de miles
      var precioFormateado = separarMiles(precio);

      // Crear la tarjeta HTML y asignar los datos del producto
      var tarjeta = $('<div>').addClass('tarjeta').addClass(categoria.toLowerCase());
      var imagen = $('<div>').addClass('img').append($('<img>').attr('src', '../' + rutaImagen).attr('alt', 'Imagen de ' + nombre));
      var descripcion = $('<div>').addClass('desc').text(categoria);
      var titulo = $('<div>').addClass('titulo').text(nombre);
      var box = $('<div>').addClass('box');
      var precioElemento = $('<div>').addClass('precio').text('$' + precioFormateado);
      var boton = $('<button>').addClass('btn-add-cart').text('Añadir al carrito');

      // Agregar elementos a la tarjeta
      box.append(precioElemento, boton);
      tarjeta.append(imagen, descripcion, titulo, box);

      // Agregar la tarjeta al contenedor de productos
      $('.productos').append(tarjeta);

      // Agregar evento click al botón "Añadir al carrito"
      boton.on('click', crearManejador(nombre, precio, rutaImagen));
    }
  }).fail(function (error) {
    console.log('Error al cargar el archivo JSON:', error);
  });
}

function crearManejador(nombre, precio, rutaImagen) {
  return function () {
    agregarAlCarrito(nombre, precio, rutaImagen);
    mostrarCarrito();
  };
}

function agregarAlCarrito(nombre, precio, rutaImagen) {
  console.log('Producto agregado al carrito:', nombre, precio, rutaImagen);

  // Verificar si el producto ya está en el carrito
  var productoExistente = carrito.find(function (producto) {
    return producto.nombre === nombre && producto.rutaImagen === rutaImagen;
  });

  if (productoExistente) {
    // Si el producto ya existe en el carrito, incrementar su cantidad
    productoExistente.cantidad += 1;
  } else {
    // Si el producto no existe en el carrito, agregarlo con cantidad 1
    carrito.push({
      nombre: nombre,
      precio: precio,
      rutaImagen: rutaImagen,
      cantidad: 1
    });
  }
  mostrarNotificacion('Se ha añadido ' + nombre + ' a tu carrito');

}

function mostrarCarrito() {
  var carritoContainer = $('#carrito-container');
  carritoContainer.empty();

  if (carrito.length > 0) {
    $.each(carrito, function (index, producto) {
      var nombre = producto.nombre;
      var precio = producto.precio;
      var rutaImagen = producto.rutaImagen;
      var cantidad = producto.cantidad;

      var productoElement = $('<div>').addClass('producto');
      var imagen = $('<div>').addClass('img').append($('<img>').attr('src', rutaImagen).attr('alt', 'Imagen de ' + nombre));
      var detalles = $('<div>').addClass('detalles');
      var nombreElemento = $('<div>').addClass('nombre').text(nombre);
      var precioElemento = $('<div>').addClass('precio').text('$' + precio);
      var contador = $('<div>').addClass('contador');
      var contadorLabel = $('<span>').text('Cantidad:');
      var contadorInput = $('<input>').attr('type', 'number').attr('min', '0').val(cantidad);

      contadorInput.on('change', function () {
        var nuevaCantidad = parseInt($(this).val());
        actualizarCantidad(nombre, rutaImagen, nuevaCantidad);
      });

      contador.append(contadorLabel, contadorInput);
      detalles.append(nombreElemento, precioElemento, contador);
      productoElement.append(imagen, detalles);

      carritoContainer.append(productoElement);
    });
  } else {
    carritoContainer.text('No hay productos en el carrito');
  }
}

function actualizarCantidad(nombre, rutaImagen, nuevaCantidad) {
  var productoExistente = carrito.find(function (producto) {
    return producto.nombre === nombre && producto.rutaImagen === rutaImagen;
  });

  if (productoExistente) {
    productoExistente.cantidad = nuevaCantidad;
  }
}

window.onbeforeunload = function () {
  // Guardar el carrito en el almacenamiento local antes de salir de la página
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Cargar el carrito desde el almacenamiento local al iniciar la página
var carritoGuardado = localStorage.getItem('carrito');
if (carritoGuardado) {
  carrito = JSON.parse(carritoGuardado);
}