import { UnAuthenticatedError } from '../errors'

export const checkPermission = (requestUserId: string, resourceUserId: string): boolean => {
  if (requestUserId === resourceUserId) return
  throw new UnAuthenticatedError('Not authorized to access this route')
}