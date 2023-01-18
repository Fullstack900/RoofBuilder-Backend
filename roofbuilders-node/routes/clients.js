import ClientController from '../controllers/ClientController.js'
//import authSchema from '@schemas/auth'

export default (fastify) => {
    

    const clientController = ClientController(fastify)

    fastify.post('/api/clients', {}, clientController.create)

    fastify.delete('/api/clients/:id', {}, clientController.remove)

}