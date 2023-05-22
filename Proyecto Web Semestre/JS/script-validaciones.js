$(document).ready(function () {
    $('#formulario-donacion').parsley();

    $('#rut').on('blur', function () {
        var rut = $(this).val().toUpperCase();
        $(this).val(rut);
    });

    $('#rut').on('input', function () {
        var rut = $(this).val();
        rut = rut.replace(/\./g, ''); // Eliminar todos los puntos del valor
        $(this).val(rut);
    });

    $('#donar').on('click', function (e) {
        e.preventDefault();
        
        var rut = $('#rut').val();
        var partes = rut.split("-");
        var numero = partes[0]; // Parte antes del guion
        var dv = partes[1]; // Parte después del guion

        var dvCalculado = getDV(numero);
        if (dv == dvCalculado) {
            console.log('Rut válido');
            $('#rut').removeClass("parsley-error");
        } else {
            console.log('Rut inválido');
            $('#rut').addClass("parsley-error");
        }
    });

    function validarRut(numero, dv) {
        if (!isNaN(numero) || numero.length == 0 || numero.length > 8) {
            return false;
        } else {
            if (getDV(numero) == dv) return true;
        }
        return false;
    }

    function getDV(numero) {
        nuevo_numero = numero.toString().split("").reverse().join("");
        for (i = 0, j = 2, suma = 0; i < nuevo_numero.length; i++, (j == 7 ? j = 2 : j++)) {
            suma += parseInt(nuevo_numero.charAt(i)) * j;
        }
        n_dv = 11 - (suma % 11);
        return n_dv == 11 ? 0 : n_dv == 10 ? "K" : n_dv;
    }
});
