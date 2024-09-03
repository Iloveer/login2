const datos = [
    {
        nombre: "Juan Pérez",
        ci: "12345678",
        telefono: "123-456-7890",
        correo: "juan.perez@example.com",
        fechaNacimiento: "1990-01-01",
        domicilio: "Calle Falsa 123"
    },
    {
        nombre: "María López",
        ci: "87654321",
        telefono: "098-765-4321",
        correo: "maria.lopez@example.com",
        fechaNacimiento: "1985-05-15",
        domicilio: "Avenida Siempre Viva 456"
    }
];

// Función para cargar los datos en la tabla
function cargarDatosEnTabla() {
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];

    datos.forEach(dato => {
        let fila = tabla.insertRow();
        
        let celdaNombre = fila.insertCell(0);
        let celdaCI = fila.insertCell(1);
        let celdaTelefono = fila.insertCell(2);
        let celdaCorreo = fila.insertCell(3);
        let celdaFechaNacimiento = fila.insertCell(4);
        let celdaDomicilio = fila.insertCell(5);

        celdaNombre.textContent = dato.nombre;
        celdaCI.textContent = dato.ci;
        celdaTelefono.textContent = dato.telefono;
        celdaCorreo.textContent = dato.correo;
        celdaFechaNacimiento.textContent = dato.fechaNacimiento;
        celdaDomicilio.textContent = dato.domicilio;
    });
}
document.addEventListener('DOMContentLoaded', cargarDatosEnTabla);