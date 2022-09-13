import ApiError from "../error/apiError";
import {Income, User, Wallet} from "../models/models";
import jwt from 'jsonwebtoken'

class WalletController {
    async create(req, res, next) {
        try{
            const {name} = req.body
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            await Wallet.create({name, userId})
            const wallet = await Wallet.findAll({where: {userId},order: [['id', 'ASC']]})
            return res.json(wallet)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }

    }
    async getAll(req, res, next) {
        try{
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }

            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            const wallet = await Wallet.findAll({where: {userId},order: [['id', 'ASC']]})
            return res.json(wallet)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }

    async getOne(req, res, next) {
        try{
            let {id} = req.params
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            const wallet = await Wallet.findOne({where: {userId, id}})
            return res.json(wallet)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }
    async delete(req, res, next) {
        try{
            let {id} = req.params
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            await Wallet.destroy({where: {userId, id}})
            const wallet = await Wallet.findAll({where: {userId},order: [['id', 'ASC']]})
            return res.json(wallet)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }

    async update(req, res, next) {
        try{
            let {id} = req.params
            const {name} = req.body
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            await Wallet.update({name}, {where: {userId, id}})
            const wallet = await Wallet.findAll({where: {userId},order: [['id', 'ASC']]})
            return res.json(wallet)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }

    async valueUpdate(req, res, next) {
        try{
            let {id} = req.params
            const {balance} = req.body
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            await Wallet.update({balance}, {where: {userId, id}})
            const wallet = await Wallet.findAll({where: {userId},order: [['id', 'ASC']]})
            return res.json(wallet)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }

}

const walletController = new WalletController()
export default walletController
