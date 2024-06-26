import crypto from 'crypto'


export function generateSHA256HexEncryption(str) {
  return crypto.createHash('sha256').update(str).digest('hex')
}


export function generateToken() { 
  return crypto.randomBytes(64).toString('hex')
}