import productTemplateModel from '../models/productTemplateModel.js'
import productModel from '../models/productModel.js'

export default  (fastify)=>{
 
    return {
 
    async list(req, res) {        
        if(!req.hasRole('product:read') ){
            res.status(401).send()
            return
        }

        const sort = {}
        sort[(req.query.sortField || 'name')] = (req.query.sortDirection || 'asc')
        const query = {tenant:req.tenantId}
        const items =  await productTemplateModel
            .find(query)
            .sort(sort)
            .limit(req.query.limitCount)
            .skip(req.query.skipCount)

        const total = await productTemplateModel.find(query).estimatedDocumentCount()
            
        return {data:items, total:total}
    },
 
    async show(req, res) {
        if(!req.hasRole('product:read') ){
            res.status(401).send()
            return
        }
        
        return await productTemplateModel
            .findOne({_id: req.params.id, tenant:req.tenantId})
            .populate([
                { path: "products", model: productModel }                
              ])
    },
 
    async create(req, res) {
        if(!req.hasRole('product:write') ){
            res.status(401).send()
            return
        }

        var data = new productTemplateModel({tenant:req.tenantId, ...req.body});
        const savedData= await data.save()
        res.status(201).send(savedData)

    },
  
    async update(req, res) {
        if(!req.hasRole('product:write') ){
            res.status(401).send()
            return
        }
                
        await productTemplateModel.updateOne({_id: req.params.id, tenant:req.tenantId}, {$set:req.body})
        
        const savedData = await productTemplateModel.findOne({_id: req.params.id, tenant:req.tenantId})
        res.status(200).send(savedData)
        
    },

    async remove(req, res) {
        if(!req.hasRole('product:write') ){
            res.status(401).send()
            return
        }
                
        return productTemplateModel.remove({_id: req.params.id, tenant:req.tenantId})

    }

}}