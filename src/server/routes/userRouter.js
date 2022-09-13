import userController from '../contollers/userController'
import authMiddleware from "../middleware/authMiddleware";
const Router = require('express')
const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth',authMiddleware, userController.check)

export default router
