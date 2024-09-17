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
        <button id="btn-anadir">Añadir</button>
    `;
    container.append(tablaHTML);
    obtenerDatos();
    document.getElementById("btn-anadir").addEventListener("click", function() {
        document.getElementById("form-container").style.display = "block";
    });
    document.getElementById("cancelar").addEventListener("click", function() {
        document.getElementById("form-container").style.display = "none";
    });
    document.getElementById("add-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Enviar los datos a la URL usando fetch
        // fetch('https://66d901d94ad2f6b8ed533858.mockapi.io/datos', {
        fetch('http://192.168.1.12/Usuario', {
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
            obtenerDatos(); // Volver a cargar los datos para reflejar el nuevo usuario
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al agregar el usuario');
        });
    });
}

// Función para cargar los datos en la tabla
function cargarDatosEnTabla(datos) {
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
    datos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    tabla.innerHTML = '';
    datos.forEach(dato => {
        let fila = tabla.insertRow();
        fila.insertCell(0).textContent = dato.nombre || 'N/A';
        fila.insertCell(1).textContent = dato.DatosPersonale.ci;
        fila.insertCell(2).textContent = dato.DatosPersonale.telefono;
        fila.insertCell(3).textContent = dato.DatosPersonale.Correo;
        fila.insertCell(4).textContent = new Date(dato.DatosPersonale.FechaNacimiento).toLocaleDateString();
        fila.insertCell(5).textContent = dato.DatosPersonale.Domicilio;
        
        let celdaAcciones = fila.insertCell(6);
        let btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'btn-editar';
        btnEditar.onclick = function() {
            alert('Editar ' + dato.nombre);
        };
        let btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.onclick = function() {
            alert('Eliminar ' + dato.nombre);
        };
        celdaAcciones.appendChild(btnEditar);
        celdaAcciones.appendChild(btnEliminar);
    });
}

// Función para obtener los datos desde el host remoto
function obtenerDatos() {
    // const url = 'https://66d901d94ad2f6b8ed533858.mockapi.io/datos';
    const url = 'http://192.168.1.12/Usuario';
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

document.addEventListener('DOMContentLoaded', renderUsuario);
