import { $authHost} from "./index";
export const createExpenses = async (walletId,name,value) => {
    const {data} = await $authHost.post('api/expenses/'+walletId, {name,value})
    return data
}

export const fetchExpenses = async (walletId) => {
    const {data} = await $authHost.get('api/expenses/'+walletId)
    return data
}

export const fetchFiveExpenses = async (walletId) => {
    const {data} = await $authHost.get('api/expenses/'+walletId+"/label")
    return data
}

export const fetchValueExpenses = async (walletId) => {
    const {data} = await $authHost.get('api/expenses/'+walletId+"/value")
    return data
}

export const deleteAllExpenses = async (walletId,id) => {
    const {data} = await $authHost.delete('api/expenses/all/'+walletId+"/"+id)
    return data
}

export const updateExpenses = async (walletId,id,name,value) => {
    const {data} = await $authHost.post('api/expenses/'+walletId+'/'+id,{name,value})
    return data
}
