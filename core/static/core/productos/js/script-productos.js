var carrito = [];



$(document).ready(function () {
  mostrarProductos();

});

// Función auxiliar para formatear el número con separadores de miles
function separarMiles(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function mostrarNotificacion(mensaje) {
  var notification = $('#notification');
  notification.text(mensaje);

  // Crear el botón de redireccionamiento al carrito
  var salto = $('<br>')
  var btnCarrito = $('<button>').addClass('btn-redireccionar').text('Ver carrito');
  btnCarrito.on('click', function () {
    // Redireccionar al carrito de compras
    window.location.href = '../carrito.html';
  });

  // Limpiar cualquier botón de redireccionamiento anterior
  notification.find('.btn-redireccionar').remove();

  // Agregar el botón de redireccionamiento al mensaje de notificación
  notification.append(salto, btnCarrito);

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
      var stock = producto.stock;

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
      var productosContainer = $('.productos');
      productosContainer.append(tarjeta);

      // Almacenar el precio en el elemento de la tarjeta
      tarjeta.data('precio', precio);

      // Agregar evento click al botón "Añadir al carrito"
      boton.on('click', crearManejador(nombre, precio, rutaImagen));

      // Agregar evento click a la tarjeta para mostrar el detalle del producto
      tarjeta.find('.img').on('click', function () {
        var tarjeta = $(this).closest('.tarjeta');
        var nombreProducto = tarjeta.find('.titulo').text();
        var imagenProducto = tarjeta.find('img').attr('src');
        var descripcionProducto = tarjeta.find('.desc').text();
        var precioTarjeta = tarjeta.data('precio');

        mostrarDetalleProducto(nombreProducto, imagenProducto, descripcionProducto, precioTarjeta, stock);
      });
    }
  }).fail(function (error) {
    console.log('Error al cargar el archivo JSON:', error);
  });
}


function mostrarDetalleProducto(nombre, imagen, descripcion, precio, stock) {
  // Crear el contenedor del detalle del producto
  var detalleProducto = $('<div>').addClass('detalle-producto');
  var fondoNegro = $('<div>').addClass('fondo-negro');
  var imagenElemento = $('<img>').attr('src', imagen).attr('alt', 'Imagen de ' + nombre);
  var nombreElemento = $('<h2>').text(nombre);
  var descripcionElemento = $('<p>').text(descripcion);
  var precioDetalleFormateado = separarMiles(precio)
  var precioElemento = $('<p>').addClass('precio').text('Precio: $' + precioDetalleFormateado);
  var stockElemento = $('<p>').addClass('stock').text('Stock disponible: ' + stock);
  var botonAgregar = $('<button>').addClass('btn-add-cart').text('Añadir al carrito');
  var botonCerrar = $('<button>').addClass('btn btn-close btn-cerrar').text('');

  // Agregar los elementos al contenedor del detalle del producto
  detalleProducto.append(
    botonCerrar,
    imagenElemento,
    nombreElemento,
    descripcionElemento,
    precioElemento,
    stockElemento,
    botonAgregar
  );

  // Agregar el contenedor del detalle del producto y el fondo negro al cuerpo del documento
  $('body').append(fondoNegro, detalleProducto);

  // Agregar evento click al botón "Cerrar"
  botonCerrar.on('click', function () {
    detalleProducto.remove();
    fondoNegro.remove();
  });

  // Agregar evento click al botón "Agregar al carrito"
  botonAgregar.on('click', function () {
    agregarAlCarrito(nombre, precio, imagen);
    mostrarNotificacion('Se ha añadido ' + nombre + ' a tu carrito');
  });
}




function crearManejador(nombre, precio, rutaImagen) {
  return function () {
    agregarAlCarrito(nombre, precio, rutaImagen);
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
$(document).ready(function () {
  $('#filterButton').click(function () {
    $(this).toggleClass('active');
    $('#filterMenu').toggleClass('open');
    $('#overlay').toggleClass('open');
  });

  $('#overlay').click(function () {
    $('#filterButton').removeClass('active');
    $('#filterMenu').removeClass('open');
    $('#overlay').removeClass('open');
  });
});
$(document).ready(function () {
  // Capturar el evento de cambio en los checkboxes
  $('input[type="checkbox"]').on('change', function () {
    // Ocultar todos los productos
    $('.productos .tarjeta').hide();

    // Obtener las categorías seleccionadas
    var categoriasSeleccionadas = [];
    $('input[type="checkbox"]:checked').each(function () {
      var categoria = $(this).attr('id').replace('filtro-', '');
      categoriasSeleccionadas.push(categoria);
    });

    // Mostrar los productos de las categorías seleccionadas
    categoriasSeleccionadas.forEach(function (categoria) {
      $('.' + categoria).show();
    });
  });
});
