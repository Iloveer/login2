function renderUsuario() {
    const container = $("#view-container");
    container.empty();
    const tablaHTML = `
            <table id="datos-tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>CI</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Domicilio</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="content"></div>
        `;
    // Actualiza el contenido del contenedor con la tabla
    //container.innerHTML = tablaHTML;
    container.append(tablaHTML);
    obtenerDatos()
}

// const url = 'https://66d901d94ad2f6b8ed533858.mockapi.io/datos';
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
        let celdaCI = fila.insertCell(1);
        let celdaTelefono = fila.insertCell(2);
        let celdaCorreo = fila.insertCell(3);
        let celdaFechaNacimiento = fila.insertCell(4);
        let celdaDomicilio = fila.insertCell(5);
        let celdaEditar = fila.insertCell(6);

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
        let btnAñadir = document.createElement('button');
        btnAñadir.textContent = 'Añadir';
        btnAñadir.className = 'btn-oñadir';
        btnAñadir.onclick = function() {
            // Lógica para otro botón
            alert('Añadir ' + dato.nombre);
        };
        celdaNombre.textContent = dato.nombre || 'N/A';
        celdaCI.textContent = dato.ci;
        celdaTelefono.textContent = dato.telefono;
        celdaCorreo.textContent = dato.correo;
        celdaFechaNacimiento.textContent = new Date(dato.fechanacimiento).toLocaleDateString(); // Convertir a formato de fecha legible
        celdaDomicilio.textContent = dato.domicilio;
        celdaEditar.appendChild(btnEditar);
        celdaEditar.appendChild(btnEliminar);
        celdaEditar.appendChild(btnAñadir);
    });
}
// Función para obtener los datos desde el host remoto
function obtenerDatos() {
    const url = 'https://66d901d94ad2f6b8ed533858.mockapi.io/datos';
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
        // .catch(error => {
        //     console.error('Hubo un problema con la solicitud:', error);
        // });
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
            document.getElementById('view-container').innerHTML = '<p>Error al cargar los datos.</p>';
        });
}
function mostrarCargando() {
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '<tr><td colspan="6">Cargando...</td></tr>';
}
// Cargar los datos cuando el DOM esté completamente cargado
// document.addEventListener('DOMContentLoaded', obtenerDatos); // Llama a obtenerDatos en lugar de cargarDatosEnTabla

