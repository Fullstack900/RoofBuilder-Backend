import UserController from '../controllers/UserController.js'
//import authSchema from '@schemas/auth'

export default (fastify) => {
    

    const userController = UserController(fastify)

    fastify.get('/api/users', {}, userController.list)

    fastify.get('/api/users/:id', {}, userController.get)

    fastify.post('/api/users', {}, userController.create)

    fastify.put('/api/users/:id', {}, userController.update)

    fastify.delete('/api/users/:id', {}, userController.remove)

    fastify.post('/api/users/:id/clientmetadata', {}, userController.updateClientMetadata)

}