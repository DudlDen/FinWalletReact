import walletRouter from "./walletRouter";
import userRouter from './userRouter'
import authMiddleware from "../middleware/authMiddleware";
import incomeRouter from "./incomeRouter";
import expensesRouter from "./expensesRouter";
const Router = require('express')
const router = new Router()

router.use('/user', userRouter)
router.use('/wallet', authMiddleware, walletRouter)
router.use('/income', authMiddleware, incomeRouter)
router.use('/expenses', authMiddleware, expensesRouter)

export default router
