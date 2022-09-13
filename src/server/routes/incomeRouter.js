import incomeController from "../contollers/incomeController";
const Router = require('express')
const router = new Router()

router.post('/:walletId', incomeController.create )
router.get('/:walletId', incomeController.getAll)
router.get('/:walletId/label', incomeController.getFive)
router.get('/:walletId/value', incomeController.getValue)
router.delete('/all/:walletId/:id', incomeController.allDelete)
router.delete('/five/:walletId/:id', incomeController.fiveDelete)
router.put('/:walletId/:id', incomeController.update)

export default router
