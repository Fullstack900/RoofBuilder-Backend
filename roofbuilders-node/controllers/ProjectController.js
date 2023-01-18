import projectModel from '../models/projectModel.js'
import measureProductMapModel from '../models/measureProductMapModel.js'
import productTemplateModel from '../models/productTemplateModel.js'
import productModel from '../models/productModel.js'
import {convertUoM} from '../shared/calcs.js'

export default  (fastify)=>{
 
    return {
 
    async list(req, res) {        
        if(!req.hasRole('project:read') ){
            res.status(401).send()
            return
        }

        const sort = {}
        sort[(req.query.sortField || 'updatedAt')] = (req.query.sortDirection || 'desc')
        const query = {tenant:req.tenantId}
        console.log(query)
        const items =  await projectModel
            .find(query)
            .sort(sort)
            .limit(req.query.limitCount)
            .skip(req.query.skipCount)

        const total = await projectModel.find(query).estimatedDocumentCount()
            
        return {data:items, total:total}
    },
 
    async show(req, res) {
        if(!req.hasRole('project:read') ){
            res.status(401).send()
            return
        }
        
        return await projectModel.findOne({_id: req.params.id, tenant:req.tenantId})
        .populate([                
            { path: "materialList.items.product", model: productModel }                
        ])

    },
 
    async create(req, res) {
        if(!req.hasRole('project:write') ){
            res.status(401).send()
            return
        }

        var data = new projectModel({tenant:req.tenantId, ...req.body});
        const savedData= await data.save()
        res.status(201).send(savedData)

    },
  
    async update(req, res) {
        if(!req.hasRole('project:write') ){
            res.status(401).send()
            return
        }
                
        await projectModel.updateOne({_id: req.params.id, tenant:req.tenantId}, {$set:req.body})
        
        const savedData = await projectModel.findOne({_id: req.params.id, tenant:req.tenantId})
        res.status(200).send(savedData)
        
    },

 /* Purge not allowed
    async remove(req, res) {
        
        return projectModel.findByIdAndRemove(req.params.id)

    }
*/

    async calcMaterials(req, res) {
        if(!req.hasRole('project:write') ){
            res.status(401).send()
            return
        }

        const project = await projectModel.findOne({_id: req.params.id, tenant:req.tenantId})

        const mapQuery = {tenant:req.tenantId}
        if(req.body?.productTemplate) {
            mapQuery.productTemplate = req.body.productTemplate
        }else{
            mapQuery.isDefault=true
        }

        const map = await measureProductMapModel.findOne(mapQuery)
            .populate([            
                { path: "items.product", model: productModel }                
            ])

        const sumMeasures=project.measurement?.calculated_values ?? []


        const mapping = {}
        const materialList=[]

        for(const item of map.items) {
            let isMeasurementFound=false;
            for(const meas of sumMeasures) {                
                if(item.materialType===meas.name) {
                    if(!item.pitchMin || meas.pitch >= item.pitchMin) {
                        if(!item.pitchMax || meas.pitch <= item.pitchMax) {
                            isMeasurementFound=true;

                            const measTotal = convertUoM(meas.uom, item.packageUom, meas.overriddenTotal ?? meas.total ?? 0)
                            const value = measTotal / item.packageQty
                            let convWasteMinQty=null
                            if(item.wasteMinQty) {
                                convWasteMinQty=item.wasteMinQty / item.packageQty
                            }   

                            if(!mapping[item.product._id]) {
                                mapping[item.product._id]={}
                            }
                            
                            const subComponent = {
                                total: measTotal,
                                packageUom: item.packageUom,
                                packageQty: item.packageQty
                            }
                            
                            const curProdMap=mapping[item.product._id]

                            if(!curProdMap[item.uom]) {
                                
                                let waste=0
                                if(item.wastePercent) {
                                    waste=value*(item.wastePercent/100)
                                }
                                if(waste < convWasteMinQty) {
                                    waste=convWasteMinQty
                                }

                                curProdMap[item.uom]={
                                    product: item.product._id, 
                                    calcQuantity: value,                                    
                                    quantity: Math.ceil(value+waste),                                    
                                    uom: item.uom,
                                    color: item.defaultColor,
                                    wastePercent: item.wastePercent,
                                    wasteMinQty: item.wasteMinQty,
                                    subComponents: {}
                                }                   
                                curProdMap[item.uom].subComponents[item.materialType] = subComponent
                            }else{
                                const curItem=curProdMap[item.uom]
                                const combValue=value+curItem.calcQuantity

                                let waste=0
                                if(curItem.wastePercent) {
                                    waste=combValue*(curItem.wastePercent/100)
                                }
                                if(waste < convWasteMinQty) {
                                    waste=convWasteMinQty
                                }
                                curItem.calcQuantity=combValue
                                curItem.quantity= Math.ceil(combValue+waste)
                                if(curProdMap[item.uom].subComponents[item.materialType]) {
                                    curProdMap[item.uom].subComponents[item.materialType].total = curProdMap[item.uom].subComponents[item.materialType].total + subComponent.total
                                } else {
                                    curProdMap[item.uom].subComponents[item.materialType] = subComponent
                                }
                            }                    

                        }
                    }
                }
                
            }
            if(!isMeasurementFound) {
                materialList.push({
                    product: item.product._id, 
                    calcQuantity: 0,                                    
                    quantity: 0,
                    uom: item.uom,
                    color: item.defaultColor,
                    wastePercent: item.wastePercent,
                    wasteMinQty: item.wasteMinQty,
                })
            }
        }        
        
        for(const prod in mapping) {
            for(const e in mapping[prod]) {
                materialList.push(mapping[prod][e])
            }
        }
        console.log(materialList)
        project.materialList={
            measureProductMap:map._id,
            items:materialList
        };

        let savedData = await project.save()

        res.status(200).send(savedData)
    }

    
}}