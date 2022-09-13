import React, {createContext} from "react";
import './main.global.css';
import {hot} from "react-hot-loader/root";
import UserStore from "./store/UserStore";
import RootApp from "./RootApp";
import WalletStore from "./store/WalletStore";

interface IContext{
    user: UserStore,
    wallet: WalletStore
}
export const Context = createContext<IContext| null>(null)


function AppComponent() {
    return(
        <Context.Provider value={{user: new UserStore(),wallet: new WalletStore()}}>
            <RootApp/>
        </Context.Provider>
    );
}

export const App = hot(AppComponent);


