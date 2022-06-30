import RestaurantModel from '../datastore/model/Restaurant.model'
import { BadRequestError, NotFoundError } from '../errors'
import { StatusCodes } from 'http-status-codes'
import { checkPermission, slugify } from '../utils'
import { ExpressHandler } from '../types'
import { createRestaurantsRequest, createRestaurantsResponse, deleteRestaurantsRequest, deleteRestaurantsResponse, getRestaurantRequest, getRestaurantResponse, listRestaurantsRequest, listRestaurantsResponse, updateRestaurantsRequest, updateRestaurantsResponse } from './restaurant.controller.types'

// List all restaurant with filtering url?cuisine[in]=italian
export const listRestaurants: ExpressHandler<listRestaurantsRequest, any> = async (req, res) => {
  let query;
  let queryStr = JSON.stringify(req.query)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
  query = RestaurantModel.find(JSON.parse(queryStr))
  const restaurants = await query
  res.status(StatusCodes.OK).json({ success: true, count: restaurants.length, data: restaurants })
}

// Get restaurant by id | slug
export const getRestaurantById: ExpressHandler<getRestaurantRequest, getRestaurantResponse> = async (req, res) => {
  const { id: _id } = req.params

  const restaurantExists = await RestaurantModel.findOne({ _id })
  if (!restaurantExists) {
    throw new NotFoundError(`No restaurant found with ${_id}`)
  }
  res.status(StatusCodes.OK).json({ success: true, data: restaurantExists })
}

// Create new restaurant
export const createRestaurant: ExpressHandler<createRestaurantsRequest, createRestaurantsResponse> = async (req, res) => {
  const { name, cuisine, location } = req.body
  if (!name || !cuisine || !location) {
    throw new BadRequestError('Please provide all values')
  }

  // Check if the restaurant already exists
  let slug = slugify(name)
  const restaurantExists = await RestaurantModel.findOne({ slug })
  if (restaurantExists) {
    throw new BadRequestError('Restaurant already exists')
  }

  // Create new restaurant
  const restaurant = await RestaurantModel
    .create({ name, cuisine, location, slug, createdBy: res.locals.user.id })

  // Return restaurant
  return res.status(StatusCodes.CREATED).json({ success: true, message: 'Restaurant added successfully', data: restaurant })
}

// Update restaurant
export const updateRestaurant: ExpressHandler<updateRestaurantsRequest, updateRestaurantsResponse> = async (req, res) => {
  const { id: _id } = req.params
  const { name, cuisine, location } = req.body
  if (!name || !cuisine || !location) {
    throw new BadRequestError('Please provide all values')
  }

  // Check if restaurant exists
  const restaurant = await RestaurantModel.findOne({ _id })
  if (!restaurant) {
    throw new NotFoundError(`No restaurant found with ${_id}`)
  }

  // Check permission
  checkPermission(res.locals.user.id, restaurant.createdBy.id)

  // Update restaurant
  const updatedRestaurant = await RestaurantModel.findOneAndUpdate({ _id },
    req.body, { new: true, runValidators: true })

  // Return updated restaurant
  return res.status(StatusCodes.OK).json({
    success: true, message: 'Restaurant updated successfully', data: updatedRestaurant
  })
}

// Delete restaurant
export const deleteRestaurant: ExpressHandler<deleteRestaurantsRequest, deleteRestaurantsResponse> = async (req, res) => {
  const { id: _id } = req.params

  // Check if restaurant exists
  const restaurant = await RestaurantModel.findOne({ _id })
  if (!restaurant) {
    throw new NotFoundError(`No restaurant found with ${_id}`)
  }

  // Check permission
  checkPermission(res.locals.user.id, restaurant.createdBy.id)

  // Remove restaurant
  await restaurant.remove()
  res.status(StatusCodes.OK).json({ success: true, message: 'Restaurant delete successfully' })
}

// Get nearby restaurants
export const getNearbyRestaurants: ExpressHandler<getRestaurantRequest, any> = async (req, res) => {
  const { lng, lat, distance } = req.query
  // calculate radius by dividing distance / Earth radius in KM
  const radius = distance / 6378

  const restaurants = await RestaurantModel.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  })

  res.status(StatusCodes.OK).json({ success: true, count: restaurants.length, data: restaurants })
}
