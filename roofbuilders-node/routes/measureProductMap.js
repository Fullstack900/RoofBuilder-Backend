import MeasureProduceMapController from '../controllers/MeasureProductMapController.js'
import schema from '../schemas/measureProductMap.js'

export default async function routes (fastify, options) {    

    const controller = MeasureProduceMapController(fastify)

    fastify.get('/api/measure-product-maps', {schema:schema.list}, controller.list)

    fastify.get('/api/measure-product-maps/:id', {schema:schema.show}, controller.show)

    fastify.post('/api/measure-product-maps', {schema:schema.create}, controller.create)

    fastify.put('/api/measure-product-maps/:id', {schema:schema.update}, controller.update)

    fastify.delete('/api/measure-product-maps/:id', {schema:schema.remove}, controller.remove)

}