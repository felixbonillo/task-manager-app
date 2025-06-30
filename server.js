// Importar modulo express

const express = require('express');
const patch = require('node:path');
const tasksRouter = require('./routes/task');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware globales 

app.use(express.json()); // Para parsear el cuerpo de las solicitudes como JSON
app.use(express.static(patch.join(__dirname, 'public'))); // Servir archivos estáticos desde la carpeta 'public' (HTML, CSS, JS) del frontend

//Configurar rutas definidas en taskRouter seran prefijadas por '/api/tasks'
app.use('/api/tasks', tasksRouter);

// --- Manejo de la ruta principal para servir index.html ---
//Si se va a la raiz del servidor, enviamos el archivo index.html

app.get('/', (req, res) => {
  res.sendFile(patch.join(__dirname, 'public', 'index.html'));
});


// Iniciar el servidor

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  console.log(`Listo para construir el gestor de tareas con Express.js`);
  console.log(`http://localhost:${PORT}`); 
});