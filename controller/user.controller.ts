import { StatusCodes } from 'http-status-codes'
import UserModel from '../datastore/model/User.model'
import { ExpressHandler } from '../types'


// Get users by fav cuisine
export const getUsersByFavCuisine: ExpressHandler<any, any> = async (req, res) => {
  const { cuisine } = req.params
  // Associate users and restaurants
  const matchedUsers = await UserModel.aggregate([
    { $lookup: { from: 'restaurants', localField: '_id', foreignField: 'createdBy', pipeline: [{ $match: { cuisine: { $eq: cuisine } } }], as: 'favCuisineRestaurant' } },
    { $project: { "password": 0 } }
  ])

  res.status(StatusCodes.OK).json({ success: true, data: matchedUsers })
}

// TODO: Update user
export const updateUser = async (req, res) => { }

// TODO: Delete user
export const deleteUser = async (req, res) => { }