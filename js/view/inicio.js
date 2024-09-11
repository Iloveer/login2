function renderInicio() {
  const container = $('#view-container');
  container.empty();
  const tablaHTML = `
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
    // Actualiza el contenido del contenedor con la tabla
    //container.innerHTML = tablaHTML;
    container.append(tablaHTML);
    obtenerDatos()
}

//const apiUrl = 'http://192.168.1.12/Usuario';

// Función para cargar los datos en la tabla
function cargarDatosEnTabla(datos) {
    const tabla = document.getElementById('datos-tabla')?.getElementsByTagName('tbody')[0];
    if (!tabla) {
        console.error('Elemento de tabla no encontrado.');
        return;
    }
    // Ordenar los datos por el campo 'nombre' alfabéticamente
    datos.sort((a, b) => a.nombre.localeCompare(b.nombre));

    // Vaciar la tabla antes de insertar nuevos datos
    tabla.innerHTML = '';
    datos.forEach(dato => {
        let fila = tabla.insertRow();

        let celdaId = fila.insertCell(0);
        let celdaNombre = fila.insertCell(1);
        let celdaCreateAt = fila.insertCell(2);
        let celdaUpdateAt= fila.insertCell(3);
        

        celdaId.textContent = dato.id || 'N/A';
        celdaNombre.textContent = dato.nombre;
        celdaCreateAt.textContent = new Date (dato.createdAt).toLocaleDateString();
        celdaUpdateAt.textContent =new Date (dato.updatedAt).toLocaleDateString();
        //celdaFechaNacimiento.textContent = new Date(dato.fechanacimiento).toLocaleDateString();
        
    });
}
// Función para obtener los datos desde el host remoto
function obtenerDatos() {
    const url = 'http://192.168.1.12/Usuario';
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

