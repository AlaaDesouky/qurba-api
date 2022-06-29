import { ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, try again later'
  }

  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.message = Object.values(err.errors).map((err: any) => err.message)
  }

  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST,
      defaultError.message = `${Object.keys(err.keyValue)} field must be unique`
  }

  res.status(defaultError.statusCode).json({ message: defaultError.message })
}
