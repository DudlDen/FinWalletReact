import ApiError from "../error/apiError";
import {Income, Wallet} from "../models/models";
import jwt from 'jsonwebtoken'

class IncomeController {
    async create(req, res, next) {
        try{
            const {name, value} = req.body
            const {walletId} = req.params
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            const wallet = await Wallet.findOne({where: {userId, id:walletId}})
            if (!wallet){
                return res.status(401).json({message: 'Нет доступа'})
            }
            await Income.create({name, value, walletId})
            const income = await Income.findAll({where: {walletId},order: [['id', 'DESC']]})
            return res.json(income)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }

    }
    async getAll(req, res, next) {
        try{
            const {walletId} = req.params
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }

            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            const wallet = await Wallet.findOne({where: {userId, id:walletId}})
            if (!wallet){
                return res.status(401).json({message: 'Нет доступа'})
            }
            const income = await Income.findAll({where: {walletId},order: [['id', 'DESC']]})
            return res.json(income)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }
    async getFive(req, res, next) {
        try{
            let {walletId} = req.params
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            const wallet = await Wallet.findOne({where: {userId, id:walletId}})
            if (!wallet){
                return res.status(401).json({message: 'Нет доступа'})
            }
            const income = await Income.findAll({where: {walletId}, limit:5, order: [ [ 'createdAt', 'DESC' ]]})
            return res.json(income)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }

    async getValue(req, res, next) {
        try{
            let {walletId} = req.params
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            const wallet = await Wallet.findOne({where: {userId, id:walletId}})
            if (!wallet){
                return res.status(401).json({message: 'Нет доступа'})
            }
            const income = await Income.findAll({attributes: ['value'],where: {walletId}, order: [ [ 'createdAt', 'DESC' ]]})
            return res.json(income)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }
    async allDelete(req, res, next) {
        try{
            let {walletId,id} = req.params
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            const wallet = await Wallet.findOne({where: {userId, id:walletId}})
            if (!wallet){
                return res.status(401).json({message: 'Нет доступа'})
            }
            await Income.destroy({where: {walletId, id}})
            const income = await Income.findAll({where: {walletId},order: [['id', 'DESC']]})
            return res.json(income)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }

    async fiveDelete(req, res, next) {
        try{
            let {walletId,id} = req.params
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            const wallet = await Wallet.findOne({where: {userId, id:walletId}})
            if (!wallet){
                return res.status(401).json({message: 'Нет доступа'})
            }
            await Income.destroy({where: {walletId, id}})
            const income = await Income.findAll({where: {walletId},limit:5, order: [ [ 'createdAt', 'DESC' ]]})
            return res.json(income)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }

    async update(req, res, next) {
        try{
            let {walletId,id} = req.params
            const {name,value} = req.body

            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, 'random_key')
            const userId = decoded.id
            const wallet = await Wallet.findOne({where: {userId, id:walletId}})

            if (!wallet){
                return res.status(401).json({message: 'Нет доступа'})
            }
            if (name){
                await Income.update({name, value}, {where: {walletId, id}})
            }
            if (value){
                await Income.update({value}, {where: {walletId, id}})
            }

            const income = await Income.findAll({where: {walletId},order: [['id', 'DESC']]})
            return res.json(income)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }
}

const incomeController = new IncomeController()
export default incomeController
