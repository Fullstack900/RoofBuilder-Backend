import mongoose,{Schema} from 'mongoose';

const clientSchema =new Schema({  
  clientSecret: { type: String },
  redirectUris: { type: Array },
  description:{ type: String }
})

export default mongoose.model('oauth_clients', clientSchema)

