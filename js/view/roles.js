function renderRoles() {
    const container = $("#view-container");
    container.empty();
    const tablaHTML = `
            <table id="datos-tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Materia</th>
                        <th>editar</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="content"></div>
        `;
    container.append(tablaHTML);
    obtenerDatos()
}

// const Urls = 'https://66d901d94ad2f6b8ed533858.mockapi.io/docentes';
// Función para cargar los datos en la tabla
function cargarDatosEnTabla(datos) { // Asegúrate de recibir 'datos' como parámetro
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
    // Ordenar los datos por el campo 'nombre' alfabéticamente
    datos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    // Vaciar la tabla antes de insertar nuevos datos
    tabla.innerHTML = '';
    datos.forEach(dato => {
        let fila = tabla.insertRow();
        let celdaNombre = fila.insertCell(0);
        let celdaMateria = fila.insertCell(1);
        let celdaEditar = fila.insertCell(2);
        let btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.className = 'btn-editar';
            btnEditar.onclick = function() {
                // Lógica para editar
                alert('Editar ' + dato.nombre);
            };
            let btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.className = 'btn-eliminar';
            btnEliminar.onclick = function() {
                // Lógica para eliminar
                alert('Eliminar ' + dato.nombre);
            };
            let btnOtro = document.createElement('button');
            btnOtro.textContent = 'Otro';
            btnOtro.className = 'btn-otro';
            btnOtro.onclick = function() {
                // Lógica para otro botón
                alert('Otro ' + dato.nombre);
            };
        celdaNombre.textContent = dato.nombre || 'N/A';
        celdaMateria.textContent = dato.materia;
        celdaEditar.appendChild(btnEditar);
        celdaEditar.appendChild(btnEliminar);
        celdaEditar.appendChild(btnOtro);
    });
}
// Función para obtener los datos desde el host remoto
function obtenerDatos() {
    const url = 'https://66d901d94ad2f6b8ed533858.mockapi.io/docentes';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(datos => {
            cargarDatosEnTabla(datos); // Pasar los datos obtenidos a la función cargarDatosEnTabla
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
// document.addEventListener('DOMContentLoaded', obtenerDatos); // Llama a obtenerDatos en lugar de cargarDatosEnTabla

