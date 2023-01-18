import mongoose,{Schema} from 'mongoose';

export default mongoose.model('oauth_tokens', new Schema({
    accessToken: { type: String },
    accessTokenExpiresOn: { type: Date },
    clientId: { type: String },
    refreshToken: { type: String },
    refreshTokenExpiresOn: { type: Date },
    userId: { type: String }
  }));