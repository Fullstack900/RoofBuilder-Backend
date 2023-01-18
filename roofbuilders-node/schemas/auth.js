
export const authHeader = {
  type: 'object',
  properties: {
    'authorization': { type: 'string' },
    'X-Tenant-Id': { type: 'string' }
  },
  required: ['authorization'],
  required: ['X-Tenant-Id']
}