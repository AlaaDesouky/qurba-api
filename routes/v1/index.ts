import { Router } from 'express'
import authRoutes from './auth.route'
import restaurantRoutes from './restaurant.route'

const v1Router = Router()
v1Router.use('/auth', authRoutes)
v1Router.use('/restaurant', restaurantRoutes)

export default v1Router