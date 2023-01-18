import VendorController from '../controllers/VendorController.js'
import schema from '../schemas/vendors.js'

export default async function routes (fastify, options) {    

    const controller = VendorController(fastify)

    fastify.get('/api/vendors', {schema:schema.list}, controller.list)

    fastify.get('/api/vendors/:id', {schema:schema.show}, controller.show)

    fastify.post('/api/vendors', {schema:schema.create}, controller.create)

    fastify.put('/api/vendors/:id', {schema:schema.update}, controller.update)

}