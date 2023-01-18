
import {authHeader} from './auth.js'

const itemSchema= {
  type: 'object',
  properties: {
    _id: {type: 'string'},
    name: { type: 'string' },
    website: { type: 'string' },
    logo: { type: 'string' }

  }
}

export default {

    list:{
        headers: authHeader,
        response: {
          200: {
            type:'object',
            properties:{
              items: {
                type:'array',
                items:itemSchema
              }
            }            
          }
        }
      },

      show:{
        headers: authHeader,
        response: {
          200: itemSchema
        }
      },

      create:{
        headers: authHeader,
        body: itemSchema,
        response: {
          201: {
            type:'object',
            properties:{
              _id:{type:'string'},
            }            
          }
        }
      },

      update:{
        headers: authHeader,
        body: itemSchema
      },

}

