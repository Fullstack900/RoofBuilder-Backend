import fs from 'fs'
import crypto from 'crypto'

const port = process.env.PORT || '3010';
const secretKey = process.env.JWT_KEY;
const expiredAfter = 60 * 60 * 1000;
const mongoUrl = process.env.MONGO_URL
const mongoDbName = process.env.MONGO_DB_NAME


const privateKey = fs.readFileSync('./keys/jwtRS256.key');
const publicKey = fs.readFileSync('./keys/jwtRS256.key.pub');

var md5sum = crypto.createHash('md5');
md5sum.update(publicKey);
const kid = md5sum.digest('hex');

export const jwtKey = {
  privateKey:privateKey,
  publicKeys:{},
  kid: kid,
  algorithm:'RS256',
  iss: process.env.JWT_ISS || 'https://dev.app.myroofbuilder.com'  
}

jwtKey.publicKeys[jwtKey.kid]=publicKey.toString()

export default {
  port,
  secretKey,
  expiredAfter,
  mongoUrl,
  mongoDbName,
  fastify: {logger:true},
};
