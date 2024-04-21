import * as bcrypt from 'bcrypt';

export function encodePassword(rawPass: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hash(rawPass, SALT);
}

export function comparePassword(rawPass: string, hash: string){
  return bcrypt.compareSync(rawPass, hash);
}