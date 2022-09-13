import {makeAutoObservable} from "mobx";

export interface IWallet {
    id:number,
    name:string,
    balance: number
}

interface IIncome {
    id:number,
    name:string,
    value: number
}

interface IExpenses {
    id:number,
    name:string,
    value: number
}

interface IHeaderBtn {
    name:string
    path:string
}

export default class WalletStore {
    _wallet:Array<IWallet> = []
    _income:Array<IIncome> = []
    _expenses:Array<IExpenses> = []
    _isHeaderBtn:IHeaderBtn = {
        name:'',
        path:''
    }
    constructor() {
        makeAutoObservable(this)
    }


    setWallet(wallet:[]) {
        this._wallet = wallet
    }

    get wallet() {
        return this._wallet
    }

    setIncome(income:[]) {
        this._income = income
    }

    get income() {
        return this._income
    }

    setExpenses(expenses:[]) {
        this._expenses = expenses
    }

    get expenses() {
        return this._expenses
    }

    setIsHeaderBtn(isHeaderBtn:IHeaderBtn) {
        this._isHeaderBtn = isHeaderBtn
    }

    get isHeaderBtn() {
        return this._isHeaderBtn
    }



}
