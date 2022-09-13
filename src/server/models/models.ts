import base from "../../client/src/bd";
import {DataTypes} from "sequelize";

export const User = base.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

export const Wallet = base.define('wallet',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING},
    balance: {type: DataTypes.INTEGER,defaultValue: 0}
})

User.hasMany(Wallet)
Wallet.belongsTo(User)

export const Income = base.define('income',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING},
    value: {type: DataTypes.INTEGER},
    walletId:{type: DataTypes.INTEGER}
})

Wallet.hasMany(Income)
Income.belongsTo(Wallet)

export const Expenses = base.define('expenses',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING},
    value: {type: DataTypes.INTEGER},
    walletId:{type: DataTypes.INTEGER}
})

Wallet.hasMany(Expenses)
Expenses.belongsTo(Wallet)
