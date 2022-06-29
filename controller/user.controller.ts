import UserModel from '../datastore/model/User.model'
import { BadRequestError } from '../errors'
import { StatusCodes } from 'http-status-codes'
import { ExpressHandler, User } from '../types'
import { JwtUtils, PasswordUtils } from '../utils'

// Register functionality types
type RegisterRequest = Pick<User, 'email' | 'password'>
interface ResisterResponse { success: boolean, message: string, access_token: string }

export const register: ExpressHandler<RegisterRequest, ResisterResponse> = async (req, res) => {
  // Get the email and password form the body
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all fields')
  }

  // Check if the user already exists
  const userExists = await UserModel.findOne({ email })
  if (userExists) {
    throw new BadRequestError('Email already exists')
  }

  // If the user does not exist hash the password and create a new user
  const passwordHash = await PasswordUtils.hashPassword(password)
  const newUser: User = await UserModel.create({ email, password: passwordHash })

  // Generate jwt access token
  const access_token = JwtUtils.generateAccessToken({ sub: newUser.id, email })

  // Return
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: 'Register user successfully', access_token })
}

export const login = async (req, res) => {
  res.send('login')
}