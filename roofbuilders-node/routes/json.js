import JsonCacheController from '../controllers/JsonCacheController.js'

export default async function routes (fastify, options) {    

    const controller = JsonCacheController(fastify)

    fastify.get('/api/json/:name',/* {schema:schema.show}*/ {}, controller.show)

}