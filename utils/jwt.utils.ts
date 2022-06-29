import * as jwt from 'jsonwebtoken'
import { JwtObject } from '../types'
import { environment } from '../config'


export class JwtUtils {
  static generateAccessToken(payload: JwtObject, option?): string {
    return jwt.sign(
      payload,
      environment.jwtAccessTokenSecret,
      { expiresIn: environment.jwtExpiresIn })
  }

  static verifyAccessToken(accessToken: string) {
    return jwt.verify(accessToken, environment.jwtAccessTokenSecret)
  }
}