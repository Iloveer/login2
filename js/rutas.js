// Function to dynamically load scripts
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
    });
}

// Function to handle route changes
function rutas() {
    const path = window.location.hash.substring(1) || '/inicio'; // Default to '/inicio' if no hash is set
    console.log(path);

    const scriptMap = {
        '/agregar': './js/view/agregar.js',
        '/inicio': './js/view/inicio.js',
        '/usuario': './js/view/usuario.js',
        '/docente': './js/view/docente.js',
        '/roles': './js/view/roles.js'
    };

    const scriptPath = scriptMap[path];

    if (scriptPath) {
        console.log(`${path} route detected`);
        loadScript(scriptPath)
            .then(() => {
                console.log(`Script for ${path} loaded`);
                const renderFunction = window[`render${path.charAt(1).toUpperCase() + path.slice(2)}`];
                if (typeof renderFunction === 'function') {
                    renderFunction();
                } else {
                    console.error(`Function render${path.charAt(1).toUpperCase() + path.slice(2)} not defined`);
                }
            })
            .catch(err => {
                console.error(`Error loading script for ${path}:`, err);
            });
    } else {
        console.error(`No script mapped for ${path}`);
    }
}

// Event listener for hash changes
window.addEventListener('hashchange', rutas);

// Initial call to handle the default route
document.addEventListener('DOMContentLoaded', rutas);

// Handle form cancel button
document.getElementById("cancelar-form")?.addEventListener("click", function () {
    window.location.hash = '/inicio'; // Redirect to a default or specific route
});

// Handle .myButton click events
document.querySelectorAll('.myButton').forEach(button => {
    button.addEventListener('click', function () {
        const ruta = button.getAttribute('data-view');
        window.location.hash = ruta;
        rutas();
    });
});
