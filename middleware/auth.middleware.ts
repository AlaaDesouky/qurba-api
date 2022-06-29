import { UnAuthenticatedError } from '../errors';
import { RequestHandler } from 'express';
import { JwtUtils } from 'utils';

export const authMiddleware: RequestHandler<any, any> = async (req, res, next) => {
  // Verify Bearer token exists in req headers
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication invalid')
  }

  // Extract jwt token
  const token = authHeader.split(' ')[1]

  try {
    // Verify jwt and attach the user to the request body
    const payload = JwtUtils.verifyAccessToken(token)
    req.body.user = { id: payload.sub }
    next()
  } catch (error) {
    throw new UnAuthenticatedError('Authentication invalid')
  }
}