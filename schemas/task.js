const z = require('zod');

//Esquema para la creacion/ validacion completa de una tarea
const taskSchema = z.object({
    title: z.string().min(1, 'El título es obligatorio'),
    description: z.string().optional().default(''),
    completed: z.boolean().default(false),
})

// Esquema para la actualizacion parcial de una tarea
const partialTaskSchema = taskSchema.partial();

//Exportamos los esquemas para poder usarlos en otras partes de la aplicación
module.exports = {
    taskSchema,
    partialTaskSchema
};