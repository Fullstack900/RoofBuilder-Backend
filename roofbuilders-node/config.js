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
  s3: {
    url:process.env.S3_URL || 'https://myroofbuilder-dev.nyc3.digitaloceanspaces.com',
    urlCdn:process.env.S3_URL_CDN ||'https://viceroy-staging.nyc3.cdn.digitaloceanspaces.com',
    bucket:process.env.S3_BUCKET ||'myroofbuilder-dev',
    region:process.env.S3_REGION ||'nyc3',
    accessKeyId:process.env.S3_ACCESS_KEY_ID || '7TXWOTSAIHRXZBAAT5D3',
    secretAccessKey:process.env.S3_SECRET_ACCESS_KEY || 'mnzCgVuHEX6aEROP6zYfDJTuYkfcn7k2+Jh1fQnnD7M'
  }
};
