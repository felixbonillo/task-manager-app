const { success } = require("zod/v4");

//Primero haremos referencia al elemento del DOM
const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const taskContainer = document.getElementById("task-container");
const clearAllContainer = document.getElementById("clear-all-container");
const clearAllBtn = document.getElementById("clear-all-btn");
const notificacionArea = document.getElementById("notificacion-area");

//URL base de la API RESTful

const API_URL = "http://localhost:3000/api/tasks";

//Función para mostrar notificaciones
function showNotification(message, type = "success") {
  //Limpia cualquiero notificacion anterior
  notificacionArea.innerHTML = "";

  const noticationDiv = document.createElement("div");
  notificationDiv.textContent = message;

  //Aplicar estilos de Tailwind basados en el tipo
  let bgColor = "bg-blue-100"; // Por defecto es azul
  let textColor = "text-blue-800"; // Por defecto es azul
    if (type === success) {
        bgColor = "bg-green-100";
        textColor = "text-green-800";
    } else if (type === "error") {
        bgColor = "bg-red-100";
        textColor = "text-red-800";
    } else {
        bgColor = "bg-blue-100";
        textColor = "text-blue-800";
    }

    noticationDiv.className = `p-3 rounded-md ${bgColor} ${textColor} text-sm opacity-0 transition-opacity duration-300 ease-in-out`;

    notificacionArea.appendChild(noticationDiv);

    //Aparecer la notificación
    setTimeout(() => {
        noticationDiv.classList.remove("opacity-0");
        noticationDiv.classList.add("opacity-100");
    }, 10);

    //Desaparecer la notificación después de 3 segundos

    setTimeout(() => {
        noticationDiv.classList.remove("opacity-100");
        noticationDiv.classList.add("opacity-0");
        setTimeout(() => {
            notificacionArea.innerHTML = "";
        },300);
    }, 3000);
}

// --- Funcion para obtener y renderizar todas las tareas ---

async function fetchAndRenderTasks() {
    
}
