// Importar modulo express

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Servidor del gestor de tareas funcionando!');
});


// --- Rutas de la API de tareas ---

//1. Obtener todas la tareas
app.get('/api/tareas', (req, res) => {
  res.json(tareas);
})

// Iniciar el servidor

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  console.log(`Listo para construir el gestor de tareas con Express.js`);
  console.log(`http://localhost:${PORT}`); 
});