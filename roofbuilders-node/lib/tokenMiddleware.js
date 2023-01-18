import jwt from 'jsonwebtoken'
import {jwtKey} from '../config.js'
import RoleMap from '../shared/auth/RoleMap.js'

const getKey = (header, callback) => {
    const key = jwtKey.publicKeys[header.kid]
    if(!key) {
      callback('Error finding public key')
      return
    }
    callback(null,key)
  }

const parseTokenFromHeader = (request) => {
    const authorization=request.headers.authorization
    if(authorization)         {
        const parts = authorization.split(' ')
        if(parts[0] === 'Bearer') {
            return parts[1]
        }        
        throw 'Invalid Authorization Header'
    }

}

export default async function (fastify) {

//    fastify.decorateRequest('user', {isAuth:false})

    fastify.addHook('preParsing', async (request, reply) => {

    request.isAuth=false
    request.user=null
    request.hasRole=(role)=>{return false}
    request.tenantId=null

       const jwtToken = parseTokenFromHeader(request)


       if(jwtToken) {
         //const keys = await getSsoKeys()
         let decoded = await new Promise(function(resolve, reject) {
            jwt.verify(jwtToken,getKey,{issuer:jwtKey.iss},function(err, decoded){
                if(err) {                    
                    reject(err)
                }else{
                    resolve(decoded)                    
                }
            })
         })                  
         
         request.isAuth=true
         request.user=decoded

         console.log(request.headers)
         const tenantId=request.headers['x-tenant-id']
         request.tenantId=tenantId

         let allRoles=[]
        if(decoded.app_metadata) {
            if(decoded.app_metadata.tenants) {
                const tenant = decoded.app_metadata.tenants[tenantId]
                if(tenant.permissions) {
                    for(const role in tenant.permissions) {
                        if(tenant.permissions[role]) {
                            allRoles=[...allRoles, ...RoleMap[role].access]
                        }
                    }   
                }
            }
        }

         request.hasRole=(role)=>{ return allRoles.includes(role)}

         
       }       
       
        return
     }) 

}


