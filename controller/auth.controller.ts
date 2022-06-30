import UserModel from '../datastore/model/User.model'
import { BadRequestError, UnAuthenticatedError } from '../errors'
import { StatusCodes } from 'http-status-codes'
import { ExpressHandler, User } from '../types'
import { JwtUtils, PasswordUtils } from '../utils'

// Register functionality types
type RegisterRequest = Pick<User, 'email' | 'password' | 'favCuisine'>
interface ResisterResponse { success: boolean, message: string, access_token: string }

export const register: ExpressHandler<RegisterRequest, ResisterResponse> = async (req, res) => {
  // Get the email and password form the body
  const { email, password, favCuisine } = req.body
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
  const newUser: User = await UserModel.create({ email, password: passwordHash, favCuisine })

  // Generate jwt access token
  const access_token = JwtUtils.generateAccessToken({ sub: newUser.id, email })

  // Return
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: 'Register user successfully', access_token })
}


// Login functionality types
type LoginRequest = Pick<User, 'email' | 'password'>
interface LoginResponse { success: boolean, message: string, access_token: string }

export const login: ExpressHandler<LoginRequest, LoginResponse> = async (req, res) => {
  // Get the email and password form the body
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all fields')
  }

  // Check if the user exists
  const user = await UserModel.findOne({ email }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials: incorrect email')
  }

  // Validate user credentials
  const isPasswordCorrect = await PasswordUtils.comparePassword(user.password, password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials: incorrect password')
  }

  // Generate jwt access token
  const access_token = JwtUtils.generateAccessToken({ sub: user.id, email })

  // Return
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: 'Login user successfully', access_token })
}