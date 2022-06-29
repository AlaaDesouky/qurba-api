import * as argon from 'argon2'

export class PasswordUtils {
  static async hashPassword(password: string): Promise<string> {
    return await argon.hash(password)
  }

  static async comparePassword(passwordHash: string, password: string): Promise<boolean> {
    return await argon.verify(passwordHash, password)
  }
}