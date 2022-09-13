import Wallet from "./pages/Wallet";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Functional from "./pages/Functional";
import Auth from "./pages/Auth";
import WalletList from "./pages/WalletList";
import {
    EXPENSES_ROUTE,
    FUNCTIONAL_ROUTE,
    INCOME_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    WALLET_ROUTE
} from "./Utils/consts";


export const authRoutes = [
    {
        path:WALLET_ROUTE,
        Component: WalletList
    },
    {
        path:WALLET_ROUTE+'/:id',
        Component: Wallet
    },
    {
        path:WALLET_ROUTE+'/:walletId/income',
        Component: Income
    },
    {
        path:WALLET_ROUTE+'/:walletId/expenses',
        Component: Expenses
    },
    {
        path:FUNCTIONAL_ROUTE,
        Component: Functional
    }
]

export const publicRoutes = [
    {
        path:LOGIN_ROUTE,
        Component: Auth
    },
    {
        path:REGISTRATION_ROUTE,
        Component: Auth
    }
]
