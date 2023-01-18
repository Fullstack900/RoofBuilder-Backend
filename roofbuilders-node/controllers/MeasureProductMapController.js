import measureProductMapModel from '../models/measureProductMapModel.js'
import productTemplateModel from '../models/productTemplateModel.js'
import productModel from '../models/productModel.js'

export default  (fastify)=>{
 
    return {
 
    async list(req, res) {        
        if(!req.hasRole('product:read') ){
            res.status(401).send()
            return
        }
    
        const query = { tenant:req.tenantId}
/*
        const sort = {}
        sort[(req.query.sortField || 'name')] = (req.query.sortDirection || 'asc')
        
*/
        if(req.query.isDefault) {
            query.isDefault=req.query.isDefault
        }


        const items =  await measureProductMapModel
            .find(query)
            .populate([
                { path: "productTemplate", model: productTemplateModel }  
              ])
            .sort({'productTemplate.name':'asc'})
            .limit(req.query.limitCount)
            .skip(req.query.skipCount)

        //const items =  await measureProductMapModel
        //    .find({})
            //.find(query)
            //.sort(sort)
            //.limit(req.query.limitCount)
            //.skip(req.query.skipCount)

        const total = await measureProductMapModel.find(query).estimatedDocumentCount()
            
        return {data:items, total:total}
    },
 
    async show(req, res) {
        if(!req.hasRole('product:read') ){
            res.status(401).send()
            return
        }
        
        return await measureProductMapModel
            .findOne({_id: req.params.id, tenant:req.tenantId})
            .populate([
                { path: "productTemplate", model: productTemplateModel },
                //{ path: "items.product", model: productModel }                
              ])
    },
 
    async create(req, res) {
        if(!req.hasRole('product:write') ){
            res.status(401).send()
            return
        }

        var data = new measureProductMapModel({tenant:req.tenantId, ...req.body});
        const savedData= await data.save()
        res.status(201).send(savedData)

    },
  
    async update(req, res) {
        if(!req.hasRole('product:write') ){
            res.status(401).send()
            return
        }
                
        await measureProductMapModel.updateOne({_id: req.params.id, tenant:req.tenantId}, {$set:req.body})
        
        const savedData = await measureProductMapModel.findOne({_id: req.params.id, tenant:req.tenantId})
        res.status(200).send(savedData)
        
    },

    async remove(req, res) {
        if(!req.hasRole('product:write') ){
            res.status(401).send()
            return
        }
                
        return measureProductMapModel.remove({_id: req.params.id, tenant:req.tenantId})

    }

}}