import { generateKeyPairSync } from 'crypto';
import { writeFileSync } from 'fs';

const option = {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
};

const { publicKey, privateKey } = generateKeyPairSync('rsa', option);
console.log(publicKey);
console.log(privateKey);
