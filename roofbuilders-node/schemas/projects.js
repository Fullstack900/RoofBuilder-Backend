
import {authHeader} from './auth.js'

const itemSchema= {
  type: 'object',
  properties: {
    _id: {type: 'string'},
    job_name: { type: 'string' },
    client_name: { type: 'string' },

    priority: { type: 'string' },
    salesperson: { type: 'string' },
    sale_state: { type: 'string' },
    type: { type: 'string' },
    paidby: { type: 'string' },

    address_line_1: { type: 'string' },
    address_line_2: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    zip: { type: 'string' },

    description: { type: 'string' },
  }
}

const createItemSchema = {
  type: 'object',
  properties: {
    job_name: { type: 'string' },
    client_name: { type: 'string' },

    priority: { type: 'string' },
    salesperson: { type: 'string' },
    sale_state: { type: 'string' },
    type: { type: 'string' },
    paidby: { type: 'string' },

    address_line_1: { type: 'string' },
    address_line_2: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    zip: { type: 'string' },

    description: { type: 'string' },
  },
  required: [
    'priority',
    'salesperson',
    'sale_state',
    'type',
    'paidby'
  ]
}

const updateItemSchema = {
  type: 'object',
  properties: {
    job_name: { type: 'string' },
    client_name: { type: 'string' },

    priority: { type: 'string' },
    salesperson: { type: 'string' },
    sale_state: { type: 'string' },
    type: { type: 'string' },
    paidby: { type: 'string' },

    address_line_1: { type: 'string' },
    address_line_2: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    zip: { type: 'string' },

    description: { type: 'string' },
  },
  required: [
    'priority',
    'salesperson',
    'sale_state',
    'type',
    'paidby'
  ]
}

/*  
  export const MaterialCreateSchema = yup.object({
    materialList: yup.array().of(
      yup.object().shape({
        itemcode: yup.string().required("Quantity required"),
        quantity: yup.number().required("Quantity required"),
        waste: yup.number()
          .required("Waste required").label("waste")
        
      })
    )
  })
*/

export default {

    list:{
        headers: authHeader,
        response: {
          200: {
            type:'object',
            properties:{
              data: {
                type:'array',
                items:itemSchema
              },
              total: {type:'number'}
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
        body: createItemSchema,
 /*       response: {
          201: {
            type:'object',
            properties:{
              _id:{type:'string'},
            }            
          }
        }*/
      },

      update:{
        headers: authHeader,
        body: updateItemSchema
      },

      calcMaterials:{
        headers: authHeader
      },
}

