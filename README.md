# ProyectoWebSemestral
Jardineando 1.3.3
Se añadió:
1. Index.html: 
	* Se agregó consumo de API que indica la calidad del aire segun la localidad seleccionada con combobox.
	* Se mejoraron los banners con contenido.
	* Se corrigieron las redirecciones de los botones en los banners

2. Nosotros.html:
	* Se agregó formulario de donación.
	* Se agregaron validaciones a los campos del formulario con la librería Parsley.
	* Se agregó validación al RUT y auto formato, es decir, si el usuario no sigue las reglas de ingresar el RUT sin puntos y guion, le quita los puntos automáticamente y transcribe todo a su versión en mayusculas para ayudar a la validación.
3. productos/productos.html:
	* Se agrego un botón con menú desplegable de filtrado.
	* Se agrego un product-detail para mostrar los productos en detalle.
    productos/paginas-especificas-por-categoría:
	* Se elimino el botón de filtrar cuando se va a una categoría especifica, esto con el fin de evitar que se abuse de los filtros.

4. Carrito.html
	* Se solucionaron algunos bugs que se encontraban al momento de ingresar muchos productos y eliminarlos rápidamente.

Cambios esperados a futuro:
	1.- Consumir API del clima, no lo pudimos consumir en este momento ya que nos daba problemas con CORS (Cross-Origin Resource Sharing)
	2.- Agregar mas funcionalidades al menu de filtrado, ya que este por el momento solo filtra por categoria.
	3.- Agregar mas productos.
	4.- Comenzar a utilizar Django para back-end.
