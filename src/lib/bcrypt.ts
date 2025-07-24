import bcrypt from 'bcrypt'

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 10

/**
 * Hash a password using bcrypt.
 * @param pwd
 */
export function hashPwd(pwd: string): Promise<string>
export function hashPwd(pwd: string, saltRound?: string | number): Promise<string> {
  return bcrypt.hash(pwd, saltRound ?? SALT_ROUNDS)
}

/**
 * Hash a password synchronously using bcrypt.
 * @param pwd
 */
export function hashPwdSync(pwd: string): string
export function hashPwdSync(pwd: string, saltRound?: string | number): string {
  return bcrypt.hashSync(pwd, saltRound ?? SALT_ROUNDS)
}

export function comparePwd(pwd: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pwd, hash)
}
