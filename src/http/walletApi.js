import { $authHost} from "./index";
export const createWallet = async (name) => {
    const {data} = await $authHost.post('api/wallet', {name})
    return data
}

export const fetchWallets = async () => {
    const {data} = await $authHost.get('api/wallet')
    return data
}


export const deleteWallet = async (id) => {
    const {data} = await $authHost.delete('api/wallet/'+id)
    return data
}

export const updateWallet = async (id,name) => {
    const {data} = await $authHost.post('api/wallet/'+id,{name})
    return data
}

export const updateValueWallet = async (id, balance) => {
    const {data} = await $authHost.post('api/wallet/valueUpdate/'+id,{balance})
    return data
}
