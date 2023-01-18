import jwt from 'jsonwebtoken'
import {jwtKey} from '../config.js'
import ClientUserMetadata from '../models/clientUserMetadata.js'

import oauthserver from 'fastify-oauth-server'
import oauthModule from '../models/oauthModel.js'

export default (app) => {
    
    app.register(oauthserver, {
        accessTokenLifetime: 4 * 60 * 60, // access token liftime in seconds
        model: oauthModule, // oauth2-server model with implemented methods for desired grants
        requireClientAuthentication: { // you can disable clientSecret requirement for different types of grants
        refresh_token: false,  // disable clientSecret requirement for refresh_token grant
        password: false, // disable clientSecret requirement for password grant        
        },
        skipResponse: true, // do not use fastify-oauth-server's handleResponse function
    });

    app.get('/oauth2/v1/certs',async (req, reply) => {
      reply.send(jwtKey.publicKeys)
    })

    app.post('/oauth2/token', async (req, reply) => {
        const token = await req.oauth.token(req, reply);

        let tData={
          iss:jwtKey.iss,
          sub:token.user._id,
          aud:token.client._id,          
        }

        const tokenOptions={ 
          algorithm: jwtKey.algorithm,
          header:{
            kid:jwtKey.kid
          } 
        }

        //lookup client metadata and put in the user
        if(token.user.scope!='client') {
          const client_metadata=await ClientUserMetadata.findOne({client:tData.aud, user:tData.sub})
          if(client_metadata) {
            token.user.app_metadata=client_metadata.metadata
          }
          
        }
        



        const {
          family_name,
          given_name,
          name,
          picture,
          email,
          email_verified,
          scope,
          app_metadata} = token.user
        const userData={
          family_name,
          given_name,
          name,
          picture,
          email,
          email_verified,
          scope,
          app_metadata} 


        let atData={
          ...tData,
          jti:token.accessToken,
          ...userData
        }

        let rtData={
          ...tData,
          jti:token.refreshToken
        }


        let data={
          access_token:jwt.sign(atData, jwtKey.privateKey, tokenOptions),
          token_type:'bearer',
          refresh_token:jwt.sign(rtData, jwtKey.privateKey, tokenOptions)  
        }

        //var aToken = jwt.sign({ foo: 'bar' }, jwtKey.privateKey, { algorithm: jwtKey.algorithm });
        //TODO: add expires_in


        reply
          .header('Cache-Control', 'no-store')
          .header('Pragma', 'no-cache')
          .send(data)
    });
  /*  
    app.get('/status', async (req, reply) => {
        try {
          const token = await req.oauth.authenticate(req, reply);
          console.log(token); // will contain w/e you return from model's getAccessToken method
          reply.code(200).send({ status: 'ok' });
        } catch (e) {
          reply.code(401).send({
            errors: {
              error: e.toString(),
            },
          });
        }

    });
    */
}