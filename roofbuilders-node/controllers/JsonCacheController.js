import jsonCacheModel from '../models/jsonCacheModel.js'
 
export default  (fastify)=>{
 
    return {

    async show(req, res) {
        if(!req.hasRole('project:read') ){
            res.status(401).send()
            return
        }
        
        return (await jsonCacheModel.findOne({name: req.params.name, tenant:req.tenantId}) ).data
    },
 
}}