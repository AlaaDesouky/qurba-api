import { getUsersByFavCuisine } from '../../controller'
import { Router } from 'express'
import * as asyncHandler from 'express-async-handler'

const router = Router()

router.route('/:cuisine').get(asyncHandler(getUsersByFavCuisine))

export default router