$(document).ready(function () {
    $("#restablecer-contrasenna").hide();
    $("#formulario-registro").hide();

    $("#forgotten-pword").click(function () {
        $("#formulario-log-in").hide();
        $("#restablecer-contrasenna").show();
        $("#formulario-registro").hide();
    });

    $("#back-to-log-in, #back-to-log-in-reg").click(function () {
        $("#formulario-log-in").show();
        $("#restablecer-contrasenna").hide();
        $("#formulario-registro").hide();
    });

    $("#crear-cuenta").click(function () {
        $("#formulario-log-in").hide();
        $("#restablecer-contrasenna").hide();
        $("#formulario-registro").show();
    });
});

function validateForm() {
    var cIncorrecto = 0;
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var correo = $("#correo-registro").val();
    var password = $("#password").val();
    var warning = "";

    if (nombre.length < 2) {
        warning += "<p>El nombre debe tener al menos 2 caracteres.</p>";
        $('#warnings').addClass('incorrecto').removeClass('correcto');
        $('#nombre').addClass('incorrecto').removeClass('correcto');
        cIncorrecto += 1;
    }
    else {
        $('#nombre').addClass('correcto').removeClass('incorrecto');
        $('#warnings').removeClass('incorrecto').addClass('correcto');
        
    }
    if (apellido.length < 2) {
        warning += "<p>El apellido debe tener al menos 2 caracteres.</p>";
        $('#warnings').addClass('incorrecto').removeClass('correcto');
        $('#apellido').addClass('incorrecto').removeClass('correcto');
        cIncorrecto += 1;
    }
    else {
        $('#apellido').addClass('correcto').removeClass('incorrecto');
        $('#warnings').removeClass('incorrecto').addClass('correcto');
    }
    if (correo.indexOf("@") === -1) {
        warning += "<p>El correo debe contener el símbolo @.</p>";
        $('#warnings').addClass('incorrecto').removeClass('correcto');
        $('#correo-registro').addClass('incorrecto').removeClass('correcto');
        cIncorrecto += 1;
    }
    else {
        $('#correo-registro').addClass('correcto').removeClass('incorrecto');
        $('#warnings').removeClass('incorrecto').addClass('correcto');
    }
    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
        warning += "<p>La contraseña debe tener al menos 8 caracteres, incluyendo al menos un número y un símbolo especial.</p>";
        $('#warnings').addClass('incorrecto').removeClass('correcto');
        $('#password').addClass('incorrecto').removeClass('correcto');
        cIncorrecto += 1;
    }
    else {
        $('#password').addClass('correcto').removeClass('incorrecto');
        $('#warnings').removeClass('incorrecto').addClass('correcto');
        warning += "<p>La cuenta se ha creado correctamente.</p>";
    }

    $(".warnings").html(warning);
    if (cIncorrecto === 0) {
        window.location.href = "../index.html";
    }
    return warning === "";
}
