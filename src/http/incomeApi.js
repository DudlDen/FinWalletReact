import { $authHost} from "./index";
export const createIncome = async (walletId,name,value) => {
    const {data} = await $authHost.post('api/income/'+walletId, {name,value})
    return data
}

export const fetchIncome = async (walletId) => {
    const {data} = await $authHost.get('api/income/'+walletId)
    return data
}

export const fetchFiveIncome = async (walletId) => {
    const {data} = await $authHost.get('api/income/'+walletId+"/label")
    return data
}

export const fetchValueIncome = async (walletId) => {
    const {data} = await $authHost.get('api/income/'+walletId+"/value")
    return data
}

export const deleteAllIncome = async (walletId,id) => {
    const {data} = await $authHost.delete('api/income/all/'+walletId+"/"+id)
    return data
}

export const updateIncome = async (walletId,id,name,value) => {
    const {data} = await $authHost.put('api/income/'+walletId+"/"+id,{name,value})
    return data
}
