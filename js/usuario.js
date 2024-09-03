// const url = "http://192.168.1.41/Usuario";
// // Función para cargar los datos en la tabla
// function cargarDatosEnTabla() {
//     const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];

//     datos.forEach(dato => {
//         let fila = tabla.insertRow();
        
//         let celdaNombre = fila.insertCell(0);
//         let celdaCI = fila.insertCell(1);
//         let celdaTelefono = fila.insertCell(2);
//         let celdaCorreo = fila.insertCell(3);
//         let celdaFechaNacimiento = fila.insertCell(4);
//         let celdaDomicilio = fila.insertCell(5);

//         celdaNombre.textContent = dato.nombre;
//         celdaCI.textContent = dato.contrasenia;
//         celdaTelefono.textContent = dato.createdAt;
//         celdaCorreo.textContent = dato.correo;
//         celdaFechaNacimiento.textContent = dato.fechaNacimiento;
//         celdaDomicilio.textContent = dato.domicilio;
//     });
// }
// // Función para obtener los datos desde el host remoto
// function obtenerDatos() {
//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error al obtener los datos');
//             }
//             return response.json();
//         })
//         .then(datos => {
//             cargarDatosEnTabla(datos);
//         })
//         .catch(error => {
//             console.error('Hubo un problema con la solicitud:', error);
//         });
// }
// document.addEventListener('DOMContentLoaded', cargarDatosEnTabla);
// URL desde la cual obtener los datos
// URL desde la cual obtener los datos
const url = 'http://192.168.1.41/Usuario';

// Función para cargar los datos
async function cargarDatos() {
    try {
        const response = await fetch(url);
        const datos = await response.json(); // Convertir la respuesta a JSON

        const tbody = document.querySelector('#datos-tabla tbody');

        datos.forEach(dato => {
            const fila = document.createElement('tr');

            // Insertar las propiedades que deseas mostrar en la tabla
            fila.innerHTML = `
                <td>${dato.nombre}</td>
                <td>${dato.id}</td>
                <td>${new Date(dato.createdAt).toLocaleDateString()}</td>
            `;

            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Cargar los datos al cargar la página
window.onload = cargarDatos;
