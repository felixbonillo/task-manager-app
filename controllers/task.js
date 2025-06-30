import { error } from 'node:console';

const cryto = require('node:crypto');

//Importar los esquemas de validacion que definimos en schemas/task.js

const { taskSchema, partialTaskSchema } = require('../schemas/task');

// Simulamos una base de datos en memoria
const tareas = [];

// ---Logica del controlador para cada operacion CRUD---

// 1. Obtener todas las tareas
function getAllTasks(req, res) {
    res.json(task)
}

// 2. Crear una nueva tarea
function createTask(req, res) {
    //Validamos los datos de la tarea usando el esquema definido
    const result = taskSchema.safeParse(req.body);

    if(result.error) {
        //Si la validacion falla, enviamos un error 400 con los detalles (El error 400 es solicitud incorrecta)
        return res.result.status(400).json({ errors : result.error.errors });
    }

    //Si la validacion es correcta, creamos una nueva tarea
    const { title, description, completed } = result.data;

    const newTask = {
        id: crypto.randomUUID(), //Generamos un ID unico para la tarea
        title,
        description,
        completed,
        createdAt: new Date(), //Fecha de creacion
    }

    //Agregamos la tarea a nuestra "base de datos"
    tareas.push(newTask);
    res.status(201).json(newTask); //Devolvemos la tarea creada con un codigo 201 (Creado)
}

// 3. Obtener una tarea por su ID
function getTaskById(req, res) {
    const {id} = req.params; 
    const tarea = tareas.find(tarea => tarea.id === id);

    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' }); //Error 404 si no existe la tarea
    }

    res.json(tarea); //Devolvemos la tarea encontrada
}

// 4. Actualizar parcialmente una tarea
function updateTask(req, res) {
    const { id } = req.params;
    const tareaIndex = tareas.findIndex(tarea => tarea.id === id);

    if (tareaIndex === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' }); //Error 404 si no existe la tarea

    }

    //Validar datos parciales usando el esquema definido
    const result = partialTaskSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ errors: result.error.errors }); //Error 400 si la validacion falla
    }

    //Si la validacion es correcta, actualizamos la tarea fusionando los datos nuevos
    const updateTask = {
        ...tareas[tareaIndex], //Mantenemos los datos existentes
        ...result.data, //Sobreescribimos con los nuevos datos
        updatedAt: new Date(), //Actualizamos la fecha de modificacion
    }

    tareas[tareaIndex] = updateTask; //Reemplazamos la tarea en la memoria por la nueva
    res.json(updateTask); //Devolvemos la tarea actualizada

}

// 5. Eliminar una tarea
function deleteTask(req, res) {
    const { id } = req.params;
    const initialLength = tareas.length; //Guardamos la cantidad inicial de tareas

    //Filtramos el array para crear uno nuevo sin la tarea a eliminar
    tareas = tareas.filter(tarea => tarea.id !== id);

    if (tareas.length === initialLength) {
        return res.status(404).json({ error: 'Tarea no encontrada' }); //Error 404 si no se elimino ninguna tarea
    }
    res.status(204).send(); //Devolvemos un 204 No Content si la eliminacion fue exitosa
}

// Exportamos las funciones del controlador para usarlas en las rutas
module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
}


