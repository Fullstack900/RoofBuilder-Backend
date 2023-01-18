import UserModel from '../models/oauthUsers.js'
import ClientUserMetadata from '../models/clientUserMetadata.js'
import bcrypt from 'bcryptjs'

export default  (fastify)=>{
 
    return {
 
    async create(req, res) {
    /*    if(!req.hasRole('user:write') ){
            res.status(401).send()
            return
        }
*/
        var user = new UserModel(req.body);
                
        if(req.body.password && req.body.password.length>0) {
            const saltRounds=10
            user.passwordHash = await bcrypt.hash(req.body.password,saltRounds)            
        }
        

        return await user.save()

    },
  
    async update(req, res) {
        if(!req.hasRole('user:write') ){
            res.status(401).send()
            return
        }


        let user = req.body
        if(user.password && user.password.length>0) {
            const saltRounds=10
            user.passwordHash = await bcrypt.hash(user.password,saltRounds)   
            delete user.password         
        }

        if(user.roles) {

            await ClientUserMetadata.findOneAndUpdate({user:req.params.id,client:req.user.aud}, {metadata:{roles:user.roles}}, {new:true,upsert:true})
            delete user.roles
        }


        await UserModel.updateOne({_id: req.params.id}, {$set:user})

        res.code(204).send()
    },

    async remove(req, res) {
        
        if(!req.hasRole('user:write') ){
            res.status(401).send()
            return
        }
        
        return UserModel.findByIdAndRemove(req.params.id)
    },

    async updateClientMetadata(req,res) {
       
        if(req.user && req.user.scope!='client') {
            res.code(401).send()
            return
        }

        await ClientUserMetadata.findOneAndUpdate({user:req.params.id,client:req.user.aud}, {metadata:req.body}, {new:true,upsert:true})

        res.code(204).send()
    },

    async list(req, res) {        
        
        if(!req.hasRole('user:read') ){
            res.status(401).send()
            return
        }

        const sort = {}
        sort[(req.query.sortField || 'name')] = (req.query.sortDirection || 'asc')
        const query = {}
        const items =  await UserModel
            .find(query)
            .sort(sort)
            .limit(req.query.limitCount)
            .skip(req.query.skipCount)

        const total = await UserModel.find(query).estimatedDocumentCount()
            
        return {data:items, total:total}
    },

    async get(req, res) {

        if(!req.hasRole('user:read') ){
            res.status(401).send()
            return
        }

        let user = await UserModel.findById(req.params.id).lean()

        let meta = await ClientUserMetadata.findOne({user:req.params.id,client:req.user.aud})

        if(meta) {
            user.roles=meta.metadata.roles
        }
        delete user.passwordHash

        return user
    },
}}