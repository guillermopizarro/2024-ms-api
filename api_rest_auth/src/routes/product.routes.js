import { Router } from 'express'

import * as productCtrl from '../controllers/product.controller'
import { auth_jwt } from '../middlewares'

const router = Router()

router.get('/', [auth_jwt.verify_token], productCtrl.getProducts)
router.post('/', [auth_jwt.verify_token, auth_jwt.is_admin], productCtrl.createProduct)

export default router
