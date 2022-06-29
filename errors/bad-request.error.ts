import { StatusCodes } from 'http-status-codes';
import { CustomErrorApi } from './custom-error-api.error';

export class BadRequestError extends CustomErrorApi {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}