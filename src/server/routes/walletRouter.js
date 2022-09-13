import WalletController from "../contollers/walletController";
const Router = require('express')
const router = new Router()

router.post('/', WalletController.create)
router.get('/', WalletController.getAll)
router.get('/:id', WalletController.getOne)
router.delete('/:id', WalletController.delete)
router.post('/:id', WalletController.update)
router.post('/valueUpdate/:id', WalletController.valueUpdate)

export default router
