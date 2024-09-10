function renderInicio() {
  const container = $('#view-container');
  container.empty();
  const plantilla = '<h1>inicio</h1>';
  container.append(plantilla);
}

const apiUrl = 'http://192.168.1.12/Usuario';

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
        celdaCreateAt.textContent = new Date (dato.createAt).toLocaleDateString();
        celdaUpdateAt.textContent =new Date (dato.updateAt).toLocaleDateString();
        //celdaFechaNacimiento.textContent = new Date(dato.fechanacimiento).toLocaleDateString();
        
    });
}