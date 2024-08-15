// Obtener referencias a los elementos del DOM
const formButton = document.querySelector('.for');
const form = document.querySelector('.formulario');
const closeIcon = document.querySelector('.cerar ion-icon');
const taskList = document.querySelector('.tarea-contenido');
const taskForm = document.getElementById('formulario');
const titleInput = document.getElementById('titulo');
const descriptionInput = document.getElementById('descripcion');
const dueDateInput = document.getElementById('fechaInput');
const createButton = document.getElementById('btnCrear');

let isEditMode = false; // Bandera para indicar si se está editando una tarea

// Función para mostrar/ocultar el formulario
function toggleForm() {
  form.classList.toggle('show');
}

// Función para crear una nueva tarea
function createTask(event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

  // Obtener los valores de los campos del formulario
  const title = titleInput.value;
  const description = descriptionInput.value;
  const dueDate = dueDateInput.value;

  // Crear un nuevo objeto de tarea
  const task = {
    id: Date.now(), // Generar un identificador único para la tarea
    title,
    description,
    dueDate
  };

  // Agregar la nueva tarea al almacenamiento local
  saveTaskToLocalStorage(task);

  // Limpiar los campos del formulario
  taskForm.reset();

  // Renderizar las tareas
  renderTasks();
}

// Función para guardar una tarea en el almacenamiento local
function saveTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para renderizar las tareas
function renderTasks() {
  taskList.innerHTML = ''; // Limpiar la lista de tareas

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('tarea');
    taskElement.dataset.id = task.id; // Agregar el id de la tarea como un atributo de datos
    taskElement.innerHTML = `
      <h3 class="titulo">${task.title}</h3>
      <p>${task.description}</p>
      <p>Fecha límite: ${task.dueDate}</p>
      <div class="actions">
        <button onclick="editTask(${task.id})" class="editar">Editar</button>
        <button onclick="deleteTask(this.parentNode.parentNode)" class="eliminar">Eliminar</button>
      </div>
    `;

    taskList.appendChild(taskElement);
  });
}



// Función para eliminar una tarea
function deleteTask(taskElement) {
  const taskId = taskElement.dataset.id;
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.id !== parseInt(taskId));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskElement.remove(); // Eliminar el elemento de tarea del DOM
}

// Función para editar una tarea
function editTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    dueDateInput.value = task.dueDate;

    // Cambiar el texto del botón "Crear" a "Editar"
    createButton.textContent = 'Editar';

    // Mostrar el formulario
    toggleForm();

    isEditMode = true; // Activar el modo de edición

    // Asignar un evento al formulario para actualizar la tarea
    taskForm.removeEventListener('submit', createTask);
    taskForm.addEventListener('submit', () => updateTask(taskId));
  }
}

// Función para actualizar una tarea
function updateTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTask = {
    id: taskId,
    title: titleInput.value,
    description: descriptionInput.value,
    dueDate: dueDateInput.value
  };

  const updatedTasks = tasks.map(task => {
    if (task.id === taskId) {
      return updatedTask;
    }
    return task;
  });

  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  taskForm.reset();
  renderTasks();

  // Restablecer el texto del botón "Editar" a "Crear"
  createButton.textContent = 'Crear';
  isEditMode = false; // Desactivar el modo de edición
  taskForm.removeEventListener('submit', updateTask);
  taskForm.addEventListener('submit', createTask);
}

// Renderizar las tareas al cargar la página
renderTasks();

// Agregar eventos
formButton.addEventListener('click', toggleForm);
closeIcon.addEventListener('click', toggleForm);
taskForm.addEventListener('submit', createTask);