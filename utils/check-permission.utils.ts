import { UnAuthenticatedError } from '../errors'

export const checkPermission = (requestUserId: string, resourceUserId: string): boolean => {
  if (requestUserId === resourceUserId.toString()) return
  throw new UnAuthenticatedError('Not authorized to access this route')
}