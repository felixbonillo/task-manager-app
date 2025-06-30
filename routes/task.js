const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

//Definir rutas y asociar con los controladores

router.get('/', taskController.getAllTasks); // Obtener todas las tareas
router.post('/', taskController.createTask); // Crear una nueva tarea
router.get('/:id', taskController.getTaskById); // Obtener una tarea por ID
router.patch('/:id', taskController.updateTask); // Actualizar parcialmente una tarea
router.delete('/:id', taskController.deleteTask); // Eliminar una tarea
router.delete('/', taskController.deleteAllTasks); // Eliminar todas las tareas

