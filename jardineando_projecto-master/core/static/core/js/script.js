$(document).ready(function () {
    // Realizar la solicitud a la API
    $.getJSON("https://sinca.mma.gob.cl/index.php/json/listadomapa2k19/", function (data) {
        var selectElemento = $("#select-elemento");
        var tablaDatos = $("#tabla-datos");

        // Ordenar el arreglo de elementos alfabéticamente
        data.sort(function (a, b) {
            return a.nombre.localeCompare(b.nombre);
        });
        // Agregar la opción por defecto al combobox
        selectElemento.append('<option value="">Seleccione una ciudad...</option>');


        // Llenar el combobox de elementos ordenados
        $.each(data, function (index, elemento) {
            $("<option>").text(elemento.nombre).appendTo(selectElemento);
        });

        // Función para filtrar los datos y actualizar la tabla
        function filtrarDatos(elementoSeleccionado) {
            tablaDatos.empty();

            // Buscar el elemento seleccionado en los datos
            var elemento = data.find(function (item) {
                return item.nombre === elementoSeleccionado;
            });

            // Verificar si se encontró el elemento
            if (elemento) {
                // Crear la tabla y encabezados
                var table = $("<table>").addClass("data-table");
                var thead = $("<thead>").appendTo(table);
                var tbody = $("<tbody>").appendTo(table);
                var headerRow = $("<tr>").appendTo(thead);
                $("<th>").text("Fecha").appendTo(headerRow);
                $("<th>").text("Valor").appendTo(headerRow);
                $("<th>").text("Nivel").appendTo(headerRow);

                // Recorrer los datos en tiempo real y agregar filas a la tabla
                $.each(elemento.realtime, function (index, item) {
                    var rowData = item.info.rows[0].c;
                    var fecha = rowData[0].v;
                    var valor = rowData[1].v;
                    var nivel = rowData[3].v;

                    var dataRow = $("<tr>").appendTo(tbody);
                    $("<td>").text(fecha).appendTo(dataRow);
                    $("<td>").text(valor).appendTo(dataRow);
                    $("<td>").html(nivel).appendTo(dataRow);
                });

                // Agregar la tabla a la página
                tablaDatos.append(table);
            } else {
                // Mostrar un mensaje si no se encontró el elemento
                tablaDatos.text("Elemento no encontrado");
            }
        }

        // Manejar el evento de cambio en el combobox de elementos
        selectElemento.on("change", function () {
            var elementoSeleccionado = $(this).val();
            filtrarDatos(elementoSeleccionado);
        });
    });
});
