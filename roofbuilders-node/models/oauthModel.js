
/**
 * Module dependencies.
 */
import OAuthClientsModel  from './oauthClients.js'

import OAuthTokensModel from './oauthTokens.js'

import OAuthUsersModel from './oauthUsers.js'
import bcrypt from 'bcryptjs'

const oauthModel={}

/**
 * Get access token.
 */
 oauthModel.getAccessToken = function *(bearerToken) {
  console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

  return yield OAuthTokensModel.findOne({ accessToken: bearerToken });
};

/**
 * Get client.
 */

 oauthModel.getClient = async function (clientId, clientSecret) {
  console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + '[removed]' + ')');

  let query = {
    _id: clientId
  }

  if(clientSecret) {
    query.clientSecret= clientSecret;
  } 

  let client = await OAuthClientsModel.findOne(query)

  if(client) {
    client.grants =['password','client_credentials']
  }
  
  return client
};

/**
 * Get refresh token.
 */

 oauthModel.getRefreshToken = function *(refreshToken) {
  console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

  return yield OAuthTokensModel.findOne({ refreshToken: refreshToken });
};

/*
 * Get user.
 */

oauthModel.getUser = async (email, password) => {
  console.log('in getUser (email: ' + email + ', password: ' + '[removed]' + ')');

  const user=await(OAuthUsersModel.findOne({ email: email }))

  //return yield OAuthUsersModel.findOne({ email: email })
  if(user && await bcrypt.compare(password, user.passwordHash) ) {
     return user
  }

};
oauthModel.getUserFromClient = async(client) => {
  //console.log(clientId)
  return {_id:client._id, name:client.description,scope:'client'}
}

/**
 * Save token.
 */

 oauthModel.saveToken = async function (token, client, user) {
    var accessToken = new OAuthTokensModel({
    accessToken: token.accessToken,
    accessTokenExpiresOn: token.accessTokenExpiresOn,
    clientId: client._id,
    refreshToken: token.refreshToken,
    refreshTokenExpiresOn: token.refreshTokenExpiresOn,
    userId: user._id
  });

  const data = await accessToken.save();

  return {    
      accessToken: data.accessToken,
      accessTokenExpiresOn: data.accessTokenExpiresOn,
      client: client,
      refreshToken: data.refreshToken,
      refreshTokenExpiresOn: data.refreshTokenExpiresOn,
      user: user,
      token_type:"Bearer"
  }
};

export default oauthModel