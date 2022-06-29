import { createRestaurant, deleteRestaurant, getRestaurantById, listRestaurants, updateRestaurant } from '../../controller'
import { Router } from 'express'
import * as asyncHandler from 'express-async-handler'
import { authMiddleware } from '../../middleware/auth.middleware'

const router = Router()

router.route('/')
  .get(asyncHandler(listRestaurants)) // Public route
  .post(authMiddleware, asyncHandler(createRestaurant)) // Private route

router.route('/:id')
  .get(asyncHandler(getRestaurantById)) // Public route
  .patch(authMiddleware, asyncHandler(updateRestaurant)) // Private route
  .delete(authMiddleware, asyncHandler(deleteRestaurant)) // Private route

export default router