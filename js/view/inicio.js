function renderInicio() {
    const container = $("#view-container");
    container.empty();
    const tablaHTML = `
    <div class=content-agregar>
    <div class="myButton" data-view="usuario" id=btn-Actualizar>Actualizar</div>
    <div class="myButton" data-view="Usuario/Agregar" id=btn-agregar>Añadir</div>
    </div>
            <table id="datos-tabla">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Fecha Creación</th>
                        <th>Fecha Actualización</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="content"></div>
        `;
    container.append(tablaHTML);
    document.querySelectorAll('.myButton').forEach(button => {
        button.addEventListener('click', function () {
            const ruta = button.getAttribute('data-view');
            window.location.hash = ruta; // Cambiar la ruta en el hash
        });
    });
    obtenerDatos();
}
function cargarDatosEnTabla(datos) {
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
    datos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    tabla.innerHTML = '';
    datos.forEach(dato => {
        let fila = tabla.insertRow();
        fila.insertCell(0).textContent = dato.id || 'N/A';
        fila.insertCell(1).textContent = dato.nombre || 'N/A';
        fila.insertCell(2).textContent = new Date(dato.createdAt).toLocaleDateString();
        fila.insertCell(3).textContent = new Date(dato.updatedAt).toLocaleDateString();
        let celdaAcciones = fila.insertCell(4);
        let btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'btn-editar';
        btnEditar.onclick = function () {
            alert('Editar ' + dato.nombre);
        };
        let btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.onclick = function () {
            alert('Eliminar ' + dato.nombre);
        };
        celdaAcciones.appendChild(btnEditar);
        celdaAcciones.appendChild(btnEliminar);
    });
}
// Función para obtener los datos desde el host remoto
function obtenerDatos() {
    const url = `${URL_SERVER}/Usuario/lista`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(datos => {
            cargarDatosEnTabla(datos);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
            document.getElementById('view-container').innerHTML = '<p>Error al cargar los datos.</p>';
        });
}
function mostrarCargando() {
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '<tr><td colspan="6">Cargando...</td></tr>';
}
function configurarFormulario() {
    // Mostrar el formulario cuando se hace clic en "Añadir"
    document.getElementById("form-container").style.display = "block";
    document.getElementById("view-container").style.display = "none";
    // Ocultar el formulario cuando se hace clic en "Cancelar"
    document.getElementById("cancelar").addEventListener("click", function () {
        document.getElementById("form-container").style.display = "none";
        document.getElementById("view-container").style.display = "block";
    });
    // Manejar el envío del formulario
    document.getElementById("add-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = {};
        // Convertir el formulario a un objeto
        formData.forEach((value, key) => {
            data[key] = value;
        });
        fetch(`${URL_SERVER}/Usuario/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                alert('Usuario agregado exitosamente');
                document.getElementById("form-container").style.display = "none";
                document.getElementById("add-form").reset();
                obtenerDatos(); // Volver a cargar los datos
                document.getElementById("view-container").style.display = "block";
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al agregar el usuario');
            });
        document.getElementById("view-container").style.display = "block";
    });
}
document.addEventListener('DOMContentLoaded', renderInicio);
