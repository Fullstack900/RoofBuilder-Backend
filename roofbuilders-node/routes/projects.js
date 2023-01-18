import ProjectController from '../controllers/ProjectController.js'
import schema from '../schemas/projects.js'

export default async function routes (fastify, options) {    

    const controller = ProjectController(fastify)

    fastify.get('/api/projects', {schema:schema.list}, controller.list)

    fastify.get('/api/projects/:id',/* {schema:schema.show}*/ {}, controller.show)

    fastify.post('/api/projects', {schema:schema.create}, controller.create)

    fastify.put('/api/projects/:id', {schema:schema.update}, controller.update)

    fastify.post('/api/projects/:id/calc-materials', {schema:schema.calcMaterials}, controller.calcMaterials)

}