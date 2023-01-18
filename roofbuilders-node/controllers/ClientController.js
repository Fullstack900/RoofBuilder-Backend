import OAuthClientsModel from '../models/oauthClients.js'
import { v4 as uuidv4 } from 'uuid'
import  randomBytes from 'randombytes'

export default  (fastify)=>{
 
    return {
 
    async create(req, res) {

        var client = new OAuthClientsModel(req.body);
        
        var data = randomBytes(32)
        let buff = new Buffer(data);
        let base64data = buff.toString('base64');

        client.clientId=uuidv4()
        client.clientSecret=base64data
        
        return await client.save()

    },
  
    async remove(req, res) {
        
        res.code(401).send()
        return
        
        return OAuthClientsModel.findByIdAndRemove(req.params.id)

    }

}}