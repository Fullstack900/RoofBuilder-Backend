import mongoose,{Schema} from 'mongoose';

const identitySchema =new Schema({
  provider:{type:String},
  user_id:{type:String},
  isSocial:{type:Boolean, default:true},
  profile_data:{type:Schema.Types.Mixed},
})

const userSchema = new Schema({
  email: { type: String},  
  email_verified: {type: Boolean, default:false},
  created_at: {type:Date, default: Date.now},
  blocked: {type: Boolean, default:false},
  family_name: {type: String},
  given_name: {type:String},
  name: {type:String},
  last_ip: {type:String},
  last_login: {type: Date},
  passwordHash: {type:String},
  last_password_reset: {type: Date},
  phone_number: {type:String},
  phone_verified: {type:Boolean},
  picture: {type:String},
  updated_at: {type:Date, default: Date.now},  
  username:{type:String},
  logins_count:{type:Number},
  //multifactor:[],
  identities:[identitySchema]
})

export default mongoose.model('oauth_users', userSchema)