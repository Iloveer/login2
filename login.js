// login.js

$(document).ready(function () {
    $("#login-form").submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/login",
            data: $(this).serialize(),
            success: function (response) {
                // Maneja la respuesta exitosa del servidor
                alert("Login exitoso");
                // Redireccionar o mostrar un mensaje de éxito
            },
            error: function (error) {
                // Maneja los errores
                alert("Error en el login: " + error.responseText);
            }
        });
    });
});
