// login.js

$(document).ready(function() {
    $("#login-form").submit(function(event) {
        event.preventDefault();  // Evita que el formulario se envíe de manera convencional
        
        $.ajax({
            type: "POST",
            url: "/login",  // Endpoint del backend que manejará el login
            data: $(this).serialize(),  // Serializa los datos del formulario
            success: function(response) {
                // Maneja la respuesta exitosa del servidor
                alert("Login exitoso");
                // Redireccionar o mostrar un mensaje de éxito
            },
            error: function(error) {
                // Maneja los errores
                alert("Error en el login: " + error.responseText);
            }
        });
    });
});
