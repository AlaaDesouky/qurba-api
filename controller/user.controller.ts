import { StatusCodes } from 'http-status-codes'
import UserModel from '../datastore/model/User.model'
import { ExpressHandler } from '../types'


// Get users by fav cuisine
export const getUsersByFavCuisine: ExpressHandler<any, any> = async (req, res) => {
  const { cuisine } = req.params
  // TODO: Associate users and restaurants
  const matchedUsers = await UserModel.aggregate([
    { $match: { favCuisine: { $eq: cuisine } } },
    { $project: { "password" : 0}}
  ])

  res.status(StatusCodes.OK).json({ success: true, data: matchedUsers })
}

// TODO: Update user
export const updateUser = async (req, res) => { }

// TODO: Delete user
export const deleteUser = async (req, res) => { }
