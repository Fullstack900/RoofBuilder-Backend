import tenantModel from '../models/tenantModel.js'
 
export default  (fastify)=>{
 
    return {
 
    async list(req, res) {        

        const tenantIds=req.getTenantIds()

        const items =  await tenantModel.find({_id: {$in: tenantIds }})
        return {items:items}
    },
 
    async show(req, res) {
        if(!req.hasRole(req.params.id,'tenant:read') ){
            res.status(401).send()
            return
        }
        
        return await tenantModel.findOne({_id: req.params.id})

    },
 
    async create(req, res) {
       /* if(!req.hasRole(req.params.id,'tenant:write') ){
            res.status(401).send()
            return
        }*/

        var data = new tenantModel(req.body);
        const savedData= await data.save()
        res.status(201).send(savedData)

    },
  
    async update(req, res) {
        if(!req.hasRole(req.params.id,'tenant:write') ){
            res.status(401).send()
            return
        }
                
        await tenantModel.updateOne({_id: request.params.id}, {$set:request.body})

        reply.status(204).send()
        
    },

 /* Purge not allowed
    async remove(req, res) {
        
        return tenantModel.findByIdAndRemove(req.params.id)

    }
*/
}}