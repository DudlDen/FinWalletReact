import expensesController from "../contollers/expensesController";
const Router = require('express')
const router = new Router()

router.post('/:walletId', expensesController.create )
router.get('/:walletId', expensesController.getAll)
router.get('/:walletId/label', expensesController.getFive)
router.get('/:walletId/value', expensesController.getValue)
router.delete('/all/:walletId/:id', expensesController.allDelete)
router.delete('/five/:walletId/:id', expensesController.fiveDelete)
router.post('/:walletId/:id', expensesController.update)

export default router
