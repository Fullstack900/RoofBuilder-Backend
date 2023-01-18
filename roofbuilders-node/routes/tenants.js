import TenantController from '../controllers/TenantController.js'
import schema from '../schemas/tenants.js'

export default async function routes (fastify, options) {    

    const controller = TenantController(fastify)

    fastify.get('/api/tenants', {schema:schema.list}, controller.list)

    fastify.get('/api/tenants/:id', {schema:schema.show}, controller.show)

    fastify.post('/api/tenants', {schema:schema.create}, controller.create)

    fastify.put('/api/tenants/:id', {schema:schema.update}, controller.update)

}