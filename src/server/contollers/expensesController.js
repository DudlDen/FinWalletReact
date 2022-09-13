import ApiError from "../error/apiError";
import {Expenses, Wallet} from "../models/models";
import jwt from 'jsonwebtoken'


class ExpensesController {
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
            await Expenses.create({name, value, walletId})
            const expenses = await Expenses.findAll({where: {walletId},order: [['id', 'DESC']]})
            return res.json(expenses)
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
            const expenses = await Expenses.findAll({where: {walletId},order: [['id', 'DESC']]})
            return res.json(expenses)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }
    async getFive(req, res, next) {
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
            const expenses = await Expenses.findAll({where: {walletId}, limit:5, order: [ [ 'createdAt', 'DESC' ]]})
            return res.json(expenses)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }
    async getValue(req, res, next) {
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
            const expenses = await Expenses.findAll({attributes: ['value'],where: {walletId}, limit:5, order: [ [ 'createdAt', 'DESC' ]]})
            return res.json(expenses)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }

    async allDelete(req, res, next) {
        try{
            const {walletId,id} = req.params
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
            await Expenses.destroy({where: {walletId, id}})
            const expenses = await Expenses.findAll({where: {walletId},order: [['id', 'DESC']]})
            return res.json(expenses)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }

    async fiveDelete(req, res, next) {
        try{
            const {walletId,id} = req.params
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
            await Expenses.destroy({where: {walletId, id}})
            const expenses = await Expenses.findAll({where: {walletId},limit:5, order: [ [ 'createdAt', 'DESC' ]]})
            return res.json(expenses)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }

    async update(req, res, next) {
        try{
            const {walletId,id} = req.params
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
                await Expenses.update({name, value}, {where: {walletId, id}})
            }
            if (value){
                await Expenses.update({value}, {where: {walletId, id}})
            }
            const expenses = await Expenses.findAll({where: {walletId},order: [['id', 'DESC']]})
            return res.json(expenses)
        } catch (e){
            next(ApiError.badRequest('Ошибка'))
        }
    }
}

const expensesController = new ExpensesController()
export default expensesController
