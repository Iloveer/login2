document.querySelectorAll('.myButton').forEach(button => {
    button.addEventListener('click', function () {
        const ruta = button.getAttribute('data-view');
        window.location.hash = ruta;
        rutas();
    });
});
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}
function rutas() {
    let path = window.location.hash.substring(1);
    console.log(path);
    //para formulario
    const container = document.getElementById("view-container");
    container.classList.remove('agregar-active');
    //para diferenciar rutas
    document.querySelectorAll('.myButton').forEach(button => {
        const ruta = button.getAttribute('data-view');
        if (ruta === path) {
            button.classList.add('active'); // Agregar la clase 'active' al botón actual
        } else {
            button.classList.remove('active'); // Remover la clase 'active' de los demás botones
        }
    });
    if (path === 'Usuario/Agregar') {
        console.log("/Agregar");
        container.classList.add('agregar-active');
        // Asegúrate de cargar el script de usuario
        loadScript('./js/view/agregar.js').then(() => {
            console.log("Script de Añadir cargado");
            if (typeof renderAgregar === 'function') {
                renderAgregar();
            } else {
                console.error("La función renderAgregar no está definida");
            }
        }).catch((err) => {
            console.error("Error al cargar el script de Agregar:", err);
        });
    }
    if (path === '/inicio') {
        console.log("/inicio");
        loadScript('./js/view/inicio.js').then(() => {
            console.log("Script de Inicio cargado");
            if (typeof renderInicio === 'function') {
                renderInicio();
            } else {
                console.error("La función renderUsuario no está definida");
            }
        }).catch((err) => {
            console.error("Error al cargar el script de Usuario:", err);
        });
    }
    if (path === '/usuario') {
        console.log("/usuario");
        // Asegúrate de cargar el script de usuario
        loadScript('./js/view/usuario.js').then(() => {
            console.log("Script de Usuario cargado");
            if (typeof renderUsuario === 'function') {
                renderUsuario();
            } else {
                console.error("La función renderUsuario no está definida");
            }
        }).catch((err) => {
            console.error("Error al cargar el script de Usuario:", err);
        });
    }
    if (path === '/docente') {
        console.log("/docente");
        loadScript('./js/view/docente.js').then(() => {
            console.log("Script de Docente cargado");
            if (typeof renderDocente === 'function') {
                renderDocente();
            } else {
                console.error("La función renderdocente no está definida");
            }
        }).catch((err) => {
            console.error("Error al cargar el script de Docente:", err);
        });
    }
    if (path === '/roles') {
        console.log("/roles");
        // Asegúrate de cargar el script de usuario
        loadScript('./js/view/roles.js').then(() => {
            console.log("Script de Roles cargado");
            if (typeof renderRoles === 'function') {
                renderRoles();
            } else {
                console.error("La función renderRoles no está definida");
            }
        }).catch((err) => {
            console.error("Error al cargar el script de Roles:", err);
        });
    }
}
window.addEventListener('hashchange', (e) => {
    rutas(e);
});
$(document).ready(() => {
    rutas('');
});