import vendorModel from '../models/vendorModel.js'
 
export default  (fastify)=>{
 
    return {
 
    async list(req, res) {        
        if(!req.hasRole('vender:read') ){
            res.status(401).send()
            return
        }

        const sort = {}
        sort[(req.query.sortField || 'name')] = (req.query.sortDirection || 'asc')
        const query = {tenant:req.tenantId}
        const items =  await vendorModel
            .find(query)
            .sort(sort)
            .limit(req.query.limitCount)
            .skip(req.query.skipCount)

        const total = await vendorModel.find(query).estimatedDocumentCount()
            
        return {data:items, total:total}
    },
 
    async show(req, res) {
        if(!req.hasRole('vendor:read') ){
            res.status(401).send()
            return
        }
        
        return await vendorModel.findOne({_id: req.params.id, tenant:req.tenantId})
    },
 
    async create(req, res) {
        if(!req.hasRole('vendor:write') ){
            res.status(401).send()
            return
        }

        var data = new vendorModel({tenant:req.tenantId, ...req.body});
        const savedData= await data.save()
        res.status(201).send(savedData)

    },
  
    async update(req, res) {
        if(!req.hasRole('vendor:write') ){
            res.status(401).send()
            return
        }
                
        await vendorModel.updateOne({_id: req.params.id, tenant:req.tenantId}, {$set:req.body})
        
        const savedData = await vendorModel.findOne({_id: req.params.id, tenant:req.tenantId})
        res.status(200).send(savedData)
        
    },

 /* Purge not allowed
    async remove(req, res) {
        
        return vendorModel.findByIdAndRemove(req.params.id)

    }
*/
}}