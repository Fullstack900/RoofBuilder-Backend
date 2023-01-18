
const userRead=['user:read']
const userWrite=['user:write',...userRead]
const projectRead=['project:read']
const projectWrite=['project:write',...projectRead]
const vendorRead=['vendor:read']
const vendorWrite=['vendor:write',...vendorRead]
const productRead=['product:read']
const productWrite=['product:write',...productRead]

export default {
    admin: {
        name:"Admin",
        description:"Global access to all things",
        access:[
        ...userWrite,
        ...projectWrite,
        ...vendorWrite,
        ...productWrite
        ]
    }
}
