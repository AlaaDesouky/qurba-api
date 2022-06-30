import { Router } from 'express'
import authRoutes from './auth.route'
import restaurantRoutes from './restaurant.route'
import userRoutes from './user.route'

const v1Router = Router()
v1Router.use('/auth', authRoutes)
v1Router.use('/restaurant', restaurantRoutes)
v1Router.use('/user', userRoutes)

export default v1Router
