import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { generateKeyPairSync } from 'crypto';

const saltRounds = 10;

export async function encrypt(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function encryptRsa(text: string, rsaPublic: string): Promise<string> {
  const buffer = Buffer.from(text, 'utf8');
  const encrypted = crypto.publicEncrypt(rsaPublic, buffer);
  return encrypted.toString('base64');
}

export async function desencryptRsa(encrypted: string, rsaPrivate: string): Promise<string> {
  const buffer = Buffer.from(encrypted, 'base64');
  const decrypted = crypto.privateDecrypt(rsaPrivate, buffer);
  return decrypted.toString('utf8');
}

export async function generateRSAPrivate(): Promise<string> {
  const { privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
  return privateKey;
}
