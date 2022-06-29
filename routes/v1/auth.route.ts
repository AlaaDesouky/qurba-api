import { login, register } from '../../controller'
import { Router } from 'express'
import * as asyncHandler from 'express-async-handler'

const router = Router()


router.route('/register').post(asyncHandler(register))
router.route('/login').post(asyncHandler(login))

export default router