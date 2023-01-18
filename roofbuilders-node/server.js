
import config from './config.js'
import Fastify from 'fastify'

const fastify = Fastify(config.fastify)

import routes from './routes/index.js'
import mongoose from 'mongoose'

import tokenMiddleware from './lib/tokenMiddleware.js'
import fastifyFormBody from '@fastify/formbody'

mongoose.connect(config.mongoUrl,{ useNewUrlParser: true,useUnifiedTopology: true, dbName:config.mongoDbName })
 .then(() => console.log('MongoDB connected…'))
 .catch(err => console.log(err))

fastify.register(fastifyFormBody)

tokenMiddleware(fastify)

fastify.register(routes)

// Run the server!
const start = async () => {
    try {
        await fastify.listen({port:config.port,host:'0.0.0.0'})
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
