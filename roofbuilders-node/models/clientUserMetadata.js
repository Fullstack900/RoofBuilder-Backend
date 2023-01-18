import mongoose,{Schema} from 'mongoose';

const clientMetadataSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'oauth_clients'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'oauth_users'
  },
  metadata:{type:Schema.Types.Mixed},
})

export default mongoose.model('client_user_metadata', clientMetadataSchema)