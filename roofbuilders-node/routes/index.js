import oauth from './oauth.js'
import users from './users.js'
import clients from './clients.js'
import tenants from './tenants.js'

import projects from './projects.js'
import json from './json.js'
import vendors from './vendors.js'
import productTemplates from './productTemplates.js'
import measureProductMap from './measureProductMap.js'

export default async function routes (fastify, options) {

    fastify.get('/api/status', async (request,reply)=>{ return { name:'Roofbuilder API Server', status: 'running' }})

    oauth(fastify)
    clients(fastify)
    users(fastify)
    tenants(fastify)

    projects(fastify)
    json(fastify)
    vendors(fastify)
    productTemplates(fastify)
    measureProductMap(fastify)
}