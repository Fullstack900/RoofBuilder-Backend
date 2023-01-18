import ProductTemplateController from '../controllers/ProductTemplateController.js'
import schema from '../schemas/productTemplates.js'

export default async function routes (fastify, options) {    

    const controller = ProductTemplateController(fastify)

    fastify.get('/api/product-templates', {schema:schema.list}, controller.list)

    fastify.get('/api/product-templates/:id', {schema:schema.show}, controller.show)

    fastify.post('/api/product-templates', {schema:schema.create}, controller.create)

    fastify.put('/api/product-templates/:id', {schema:schema.update}, controller.update)

    fastify.delete('/api/product-templates/:id', {schema:schema.remove}, controller.remove)

}