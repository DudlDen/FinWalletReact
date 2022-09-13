import React, {createContext} from "react";
import './main.global.css';
import {hot} from "react-hot-loader/root";
import {generateId} from "./Utils/react/generateRandomIndex";
import {BrowserRouter} from 'react-router-dom'
import timerStore from "./timerStore";
import AppRouter from "./component/AppRouter";
import UserStore from "./store/UserStore";
import RootApp from "./RootApp";
import WalletStore from "./store/WalletStore";
interface IContext{
    user: UserStore,
    wallet: WalletStore
}
export const Context = createContext<IContext| null>(null)

setInterval(() => {
    timerStore.increase()
}, 1000)


const LIST = [
    {value:'some'},
    {value:'some1'},
    {value:'some2'},
].map(generateId)


function AppComponent() {
    return(
        <Context.Provider value={{user: new UserStore(),wallet: new WalletStore()}}>
            <RootApp/>
        </Context.Provider>
    );
}

export const App = hot(AppComponent);


