import { createRestaurant, deleteRestaurant, getRestaurantById, listRestaurants, updateRestaurant } from '../../controller'
import { Router } from 'express'
import * as asyncHandler from 'express-async-handler'

const router = Router()

router.route('/')
  .get(asyncHandler(listRestaurants)) // Public route
  .post(asyncHandler(createRestaurant)) // Private route

router.route('/:id')
  .get(asyncHandler(getRestaurantById)) // Public route
  .patch(asyncHandler(updateRestaurant)) // Private route
  .delete(asyncHandler(deleteRestaurant)) // Private route

export default router