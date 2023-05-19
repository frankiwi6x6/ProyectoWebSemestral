$(document).ready(function () {
    $("#restablecer-contrasenna").hide();
    $("#formulario-registro").hide();

    $("#forgotten-pword").click(function () {
        $("#formulario-log-in").hide();
        $("#restablecer-contrasenna").show();
        $("#formulario-registro").hide();

    })
    $("#back-to-log-in").click(function () {
        $("#formulario-log-in").show();
        $("#restablecer-contrasenna").hide();
        $("#formulario-registro").hide();
    })
    $("#back-to-log-in-reg").click(function () {
        $("#formulario-log-in").show();
        $("#restablecer-contrasenna").hide();
        $("#formulario-registro").hide();

    })
    $("#crear-cuenta").click(function () {
        $("#formulario-log-in").hide();
        $("#restablecer-contrasenna").hide();
        $("#formulario-registro").show();

    })
});

function validateForm() {
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var correo = $("#correo").val();
    var password = $("#password").val();
    var warning = "";

    if (nombre.length <= 2) {
        warning += "<p>El nombre debe tener más de 2 caracteres.</p>";
    }
    if (apellido.length <= 2) {
        warning += "<p>El apellido debe tener más de 2 caracteres.</p>";
    }
    if (correo.indexOf("@") === -1) {
        warning += "<p>El correo debe contener el símbolo @.</p>";
    }
    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
        warning += "<p>La contraseña debe tener al menos 8 caracteres, <br>incluyendo al menos un número y un símbolo especial.</p>";
    }

    $(".warnings").html(warning);

    return warning === ""; // Devuelve true si no hay mensajes de alerta, false en caso contrario
}