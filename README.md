📝 Tu Organizador Personal de Tareas (Full-Stack)

🚀 Descripción del Proyecto

"Tu Organizador Personal de Tareas" es una aplicación web full-stack minimalista y eficiente diseñada para ayudarte a gestionar tus tareas diarias de forma sencilla. Permite a los usuarios añadir, marcar como completadas, y eliminar tareas, proporcionando una experiencia de usuario fluida y visualmente atractiva.

Este proyecto ha sido desarrollado siguiendo principios de arquitectura limpia y separación de responsabilidades en el backend, y un enfoque moderno y responsive (mobile-first) en el frontend, utilizando las últimas tendencias en diseño y desarrollo web.

✨ Características Principales

Gestión Completa de Tareas (CRUD):

Crear: Añade nuevas tareas con título y descripción.

Leer: Visualiza todas tus tareas pendientes y completadas.

Actualizar: Marca tareas como completadas o deshaz su estado.

Eliminar: Borra tareas individualmente o todas a la vez.

Interfaz de Usuario Intuitiva: Diseño limpio, minimalista y cautivador con animaciones sutiles.

Notificaciones en Tiempo Real: Feedback visual instantáneo para acciones como crear, actualizar o eliminar tareas.

Diseño Responsive: Adaptado para funcionar perfectamente en cualquier dispositivo (móvil, tablet, escritorio) con un enfoque mobile-first.

Validación de Datos Robusta: Asegura la integridad de los datos enviados al backend.

🛠️ Tecnologías Utilizadas
Este proyecto está construido con un stack moderno y eficiente:

Categoría

Tecnología

Logo

Descripción

Backend

Node.js

<img src="https://placehold.co/60x60/000000/FFFFFF?text=Node.js" alt="Logo de Node.js" width="60" height="60">

Entorno de ejecución de JavaScript del lado del servidor.



Express.js

<img src="https://placehold.co/60x60/000000/FFFFFF?text=Express" alt="Logo de Express.js" width="60" height="60">

Framework web rápido y minimalista para Node.js, utilizado para construir la API RESTful.



Zod

<img src="https://placehold.co/60x60/000000/FFFFFF?text=Zod" alt="Logo de Zod" width="60" height="60">

Librería de declaración y validación de esquemas TypeScript/JavaScript, utilizada para asegurar la integridad de los datos de entrada.

Frontend

JavaScript (Vanilla)

<img src="https://placehold.co/60x60/000000/FFFFFF?text=JS" alt="Logo de JavaScript" width="60" height="60">

El lenguaje de programación principal del lado del cliente, utilizado para la interactividad y la lógica del DOM.



Fetch API

<img src="https://placehold.co/60x60/000000/FFFFFF?text=Fetch" alt="Logo de Fetch API" width="60" height="60">

API moderna para realizar peticiones HTTP (comunicación con el backend).



HTML5

<img src="https://placehold.co/60x60/000000/FFFFFF?text=HTML5" alt="Logo de HTML5" width="60" height="60">

Lenguaje de marcado para la estructura de la página web.



Tailwind CSS

<img src="https://placehold.co/60x60/000000/FFFFFF?text=Tailwind" alt="Logo de Tailwind CSS" width="60" height="60">

Framework CSS de primera utilidad para construir diseños personalizados y responsivos directamente en el HTML.

⚙️ Requisitos
Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

Node.js (versión 14.x o superior recomendada)

npm (viene con Node.js) o Yarn

🚀 Instalación
Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

Clona el repositorio:

git clone https://github.com/felixbonillo/task-manager-app.git

cd task-manager-app

Instala las dependencias del backend:

npm install
# o si usas yarn
# yarn install

🏃 Uso
Para iniciar la aplicación:

Inicia el servidor backend:

node server.js

El servidor se iniciará en http://localhost:3000. Verás un mensaje en la consola indicando que el servidor está corriendo.

Abre la aplicación en tu navegador:
Una vez que el servidor esté activo, abre tu navegador web y navega a:

http://localhost:3000

¡Ya puedes empezar a usar "Tu Organizador Personal de Tareas"!

📁 Estructura del Proyecto


La estructura del proyecto sigue una arquitectura modular para una mejor organización y mantenibilidad:


task-manager-app/
├── public/                 # Archivos del frontend (HTML, CSS, JS del navegador)
│   ├── index.html          # La interfaz de usuario principal
│   ├── script.js           # Lógica JavaScript del frontend
│   └── style.css           # Estilos CSS adicionales (si los hay)
├── routes/                 # Define las rutas de la API
│   └── tasks.js            # Rutas específicas para las tareas
├── controllers/            # Contiene la lógica de negocio para cada ruta
│   └── tasks.js            # Lógica para manejar las operaciones CRUD de tareas
├── schemas/                # Define los esquemas de validación de datos (Zod)
│   └── task.js             # Esquema de validación para las tareas
├── server.js               # Punto de entrada principal del servidor Express
├── package.json            # Metadatos del proyecto y dependencias
└── README.md               # Este archivo

➡️ Próximos Pasos y Hoja de Ruta

Este proyecto es el punto de partida de una ambiciosa hoja de ruta para dominar el desarrollo Full-Stack. Los siguientes pasos incluyen:


Refuerzo de JavaScript (Vanilla): Ejercicios prácticos en manipulación del DOM, asincronía, promesas y métodos de arrays, consumiendo APIs externas.


Proyectos de Portafolio con JS Vanilla: Construcción de una aplicación de películas/libros, una aplicación del clima, un cuestionario interactivo y un dashboard simple, enfocados en la dificultad de cliente real.


Desarrollo Frontend con React.js: Refactorización de esta aplicación de tareas a React, y creación de sistemas de ventas, inventario y dashboards interactivos con librerías avanzadas (Framer Motion, Shadcn UI, Recharts, etc.).


Profundización en Backend: Integración de bases de datos reales (MongoDB con Mongoose), implementación de autenticación y autorización (JWT, Bcrypt).

Herramientas de Producción: Contenerización con Docker y estrategias de despliegue.

📞 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

Nombre: Felix Bonillo

Email: felix.bonillo3@gmail.com

LinkedIn: https://www.linkedin.com/in/felix-bonillo-b9368936b/

GitHub: https://github.com/felixbonillo