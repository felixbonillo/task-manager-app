//Referencias al formulario de tareas 
const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const tasksContainer = document.getElementById("tasks-container");
const clearAllContainer = document.getElementById("clear-all-container");
const clearAllBtn = document.getElementById("clear-all-btn");
const notificationArea = document.getElementById("notification-area");

// Referencias a elementos  del modal de edicion
const editModal = document.getElementById("edit-modal");
const closeEditModalBtn = document.getElementById("close-edit-modal");
const editTaskForm = document.getElementById("edit-task-form");
const editTaskIdInput = document.getElementById("edit-task-id");
const editTitleInput = document.getElementById("edit-title");
const editDescriptionInput = document.getElementById("edit-description");

// URL base de tu API RESTful
const API_URL = "https://taskmanagerfull.onrender.com/api/tasks";

// --- Función para mostrar Notificaciones ---
function showNotification(message, type = "success") {
  notificationArea.innerHTML = "";

  const notificationDiv = document.createElement("div");
  notificationDiv.textContent = message;

  let bgColor = "bg-blue-100"; // Valor por defecto para 'info' o desconocido
  let textColor = "text-blue-800"; // Valor por defecto para 'info' o desconocido

  if (type === "success") {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  } else if (type === "error") {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
  }

  notificationDiv.className = `p-3 rounded-md ${bgColor} ${textColor} text-sm opacity-0 transition-opacity duration-300 ease-in-out`;

  notificationArea.appendChild(notificationDiv);

  setTimeout(() => {
    notificationDiv.classList.remove("opacity-0");
    notificationDiv.classList.add("opacity-100");
  }, 10);

  setTimeout(() => {
    notificationDiv.classList.remove("opacity-100");
    notificationDiv.classList.add("opacity-0");
    setTimeout(() => {
      notificationArea.innerHTML = "";
    }, 300);
  }, 3000);
}

// --- NUEVA FUNCIÓN: Para renderizar una sola tarea ---
function renderTask(task) {
  const taskElement = document.createElement("div");

  // Clases base para la tarjeta de tarea
  taskElement.className = `
        bg-gray-50 p-4 rounded-md shadow-sm mb-3 
        flex items-center justify-between 
        transition-all duration-200 ease-in-out
        hover:shadow-md hover:bg-gray-100
        ${task.completed ? "opacity-70 line-through bg-green-50" : ""}
    `;

  // Contenido HTML de la tarea
  taskElement.innerHTML = `
        <div class="flex-1 mr-4">
            <h3 class="text-lg font-semibold text-gray-800 break-words">${
              task.title
            }</h3>
            <p class="text-sm text-gray-600 break-words">${task.description}</p>
            <p class="text-xs text-gray-400 mt-1">ID: ${task.id}</p>
        </div>
        <div class="flex flex-col space-y-2">
            <!-- Botón de Completar/Deshacer -->
            <button 
                class="text-blue-500 hover:text-blue-700 font-medium px-3 py-1 rounded-md transition-colors duration-200 
                       ${task.completed ? "bg-blue-100" : "bg-transparent"}
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
                data-id="${task.id}" 
                data-action="toggle-complete">
                ${task.completed ? "Deshacer" : "Completar"}
            </button>
              <!-- NUEVO BOTÓN DE EDITAR -->
            <button 
                class="text-yellow-500 hover:text-yellow-700 font-medium px-3 py-1 rounded-md transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" 
                data-id="${task.id}" 
                data-action="edit">
                Editar
            </button>
            <!-- Botón de Eliminar -->
            <button 
                class="text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded-md transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" 
                data-id="${task.id}" 
                data-action="delete">
                Eliminar
            </button>
        </div>
    `;

  return taskElement;
}

// --- Función para obtener y renderizar todas las tareas ---
async function fetchAndRenderTasks() {
  try {
    tasksContainer.innerHTML =
      '<p class="text-center text-gray-500">Cargando tareas...</p>';
    clearAllContainer.style.display = "none";

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tasks = await response.json();

    tasksContainer.innerHTML = "";

    if (tasks.length === 0) {
      tasksContainer.innerHTML =
        '<p class="text-center text-gray-500">¡No hay tareas aún! Añade una para empezar.</p>';
    } else {
      tasks.forEach((task) => {
        const taskElement = renderTask(task);
        tasksContainer.appendChild(taskElement);
      });
      clearAllContainer.style.display = "block";
    }
  } catch (error) {
    console.error("Error al cargar las tareas:", error);
    tasksContainer.innerHTML =
      '<p class="text-center text-red-500">Error al cargar las tareas. Inténtalo de nuevo.</p>';
    showNotification("Error al cargar las tareas.", "error");
  }
}

// --- Event Listener para el Formulario de Añadir Tareas ---
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title) {
    showNotification("El título de la tarea no puede estar vacío.", "error");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.errors && errorData.errors.length > 0) {
        showNotification(`Error: ${errorData.errors[0].message}`, "error");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return;
    }

    const newTask = await response.json();
    console.log("Tarea creada:", newTask);

    titleInput.value = "";
    descriptionInput.value = "";

    showNotification("¡Tarea creada exitosamente!", "success");
    fetchAndRenderTasks(); // <-- LLAMADA CRUCIAL: Recargar tareas después de añadir
  } catch (error) {
    console.error("Error al añadir la tarea:", error);
    showNotification("Error al añadir la tarea. Inténtalo de nuevo.", "error");
  }
});

// --- Event Listener para el botón "Borrar Todas las Tareas" ---
clearAllBtn.addEventListener("click", async () => {
  if (
    !confirm(
      "¿Estás seguro de que quieres borrar TODAS las tareas? Esta acción es irreversible."
    )
  ) {
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    showNotification("¡Todas las tareas han sido eliminadas!", "success");
    fetchAndRenderTasks(); // <-- LLAMADA CRUCIAL: Recargar tareas después de borrar todas
  } catch (error) {
    console.error("Error al borrar todas las tareas:", error);
    showNotification(
      "Error al borrar todas las tareas. Inténtalo de nuevo.",
      "error"
    );
  }
});

// --- NUEVO EVENT LISTENER para manejar clics en los botones de las tareas individuales (Delegación de Eventos) ---
tasksContainer.addEventListener("click", async (event) => {
  const target = event.target;

  if (
    target.tagName === "BUTTON" &&
    target.dataset.id &&
    target.dataset.action
  ) {
    const taskId = target.dataset.id;
    const action = target.dataset.action;

    if (action === "toggle-complete") {
      await toggleTaskComplete(taskId);
    } else if (action === "delete") {
      await deleteTaskById(taskId);
    } else if (action === "edit") {
      //Logica boton implementar
      await openEditModal(taskId);
    }
  }
});

// --- NUEVAS FUNCIONES para interactuar con la API para tareas individuales ---

// Función para alternar el estado 'completed' de una tarea
async function toggleTaskComplete(taskId) {
  try {
    const getResponse = await fetch(`${API_URL}/${taskId}`);
    if (!getResponse.ok) {
      throw new Error(`HTTP error! status: ${getResponse.status}`);
    }
    const task = await getResponse.json();

    const newCompletedStatus = !task.completed;

    const patchResponse = await fetch(`${API_URL}/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: newCompletedStatus }),
    });

    if (!patchResponse.ok) {
      const errorData = await patchResponse.json();
      showNotification(
        `Error al actualizar: ${errorData.message || "Error desconocido"}`,
        "error"
      );
      return;
    }

    showNotification(
      `Tarea '${task.title}' ${
        newCompletedStatus ? "completada" : "marcada como pendiente"
      }!`,
      "success"
    );
    fetchAndRenderTasks(); // <-- LLAMADA CRUCIAL: Recargar tareas después de actualizar
  } catch (error) {
    console.error("Error al alternar estado de tarea:", error);
    showNotification("Error al actualizar la tarea.", "error");
  }
}

// Función para eliminar una tarea por su ID
async function deleteTaskById(taskId) {
  if (!confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
    return;
  }

  try {
    const deleteResponse = await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    });

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      showNotification(
        `Error al eliminar: ${errorData.message || "Error desconocido"}`,
        "error"
      );
      return;
    }

    showNotification("Tarea eliminada exitosamente!", "success");
    fetchAndRenderTasks(); // <-- LLAMADA CRUCIAL: Recargar tareas después de eliminar
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    showNotification("Error al eliminar la tarea.", "error");
  }
}

// --- NUEVA FUNCIÓN para abrir el modal de edición ---
async function openEditModal(taskId) {
    try{
        //Obtener los datos de la tarea especifica desde el backend
        const response = await fetch(`${API_URL}/${taskId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const task = await response.json();

        //Rellenar los campos del modal con los datos de la tarea
        editTaskIdInput.value = task.id; //Guarda el id de la tarea en el campo oculto
        editTitleInput.value = task.title;
        editDescriptionInput.value = task.description;

        //Mostrar el modal
        editModal.classList.remove("hidden");
    } catch (error) {
        console.error("Error al abrir el modal de edición:", error);
        showNotification("Error al cargar la tarea para editar.", "error");
    }
}

// --- NUEVA FUNCIÓN para cerrar el modal de edición ---
function closeEditModal() {
    editModal.classList.add("hidden"); // Ocultar el modal de edición
    editTaskForm.reset(); // Limpiar el formulario de edición al cerrar
}

//Funcion para manejar el envio del formulario de edicion
async function handleEditTask(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const taskId = editTaskIdInput.value;
    const newTitle = editTitleInput.value.trim();
    const newDescription = editDescriptionInput.value.trim();

    if (!newTitle) {
        showNotification("El título de la tarea no puede estar vacío.", "error");
        return;
    }

    try{
        //Realizar la petición PATCH al backend para actualizar la tarea
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newTitle, description: newDescription }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            showNotification(
                `Error al actualizar: ${errorData.message || "Error desconocido"}`,
                "error"
            );
            return;
        }

        //Cerral modal y recargar tareas despues de actualizar
        showNotification("¡Tarea actualizada exitosamente!", "success");
        closeEditModal()
        fetchAndRenderTasks(); // <-- LLAMADA CRUCIAL: Recargar tareas después de actualizar

    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        showNotification("Error al actualizar la tarea.", "error");
        return;
    }
}


// Cerrar el modal de edición
closeEditModalBtn.addEventListener('click', closeEditModalBtn)

// Manejar el envío del formulario de edición
editTaskForm.addEventListener("submit", handleEditTask);

// --- LLAMADA INICIAL: Cargar tareas cuando la página se carga ---
document.addEventListener("DOMContentLoaded", fetchAndRenderTasks);
