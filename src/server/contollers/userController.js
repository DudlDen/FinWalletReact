import ApiError from "../error/apiError";
import {User} from "../models/models";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController {
    async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('нет пароля или логина'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('такой email уже есть'))
        }
        const hashPassword = await  bcrypt.hash(password,5)
        const user = await User.create({email,password:hashPassword})
        const token = jwt.sign(
            {id: user.id, email: user.email},
        'random_key',
            {expiresIn: '24h'}
        )
        return res.json({token})
    }
    async login(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('нет пароля или логина'))
        }
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('неверный логин или пароль'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.badRequest('неверный логин или пароль'))
        }
        const token = jwt.sign(
            {id: user.id, email: user.email},
            'random_key',
            {expiresIn: '24h'}
        )
        return res.json({token})
    }
    async check(req, res, next) {
        const token = jwt.sign(
            {id: req.user.id, email: req.user.email},
            'random_key',
            {expiresIn: '24h'}
        )
        return res.json({token})
    }
}

const userController = new UserController()
export default userController
