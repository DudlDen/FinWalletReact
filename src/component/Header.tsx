import React, {useContext} from 'react';
import styles from './header.css';
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, WALLET_ROUTE} from "../Utils/consts";
import {Context} from "../App";
import {observer} from "mobx-react-lite";

const Header = observer(() => {
    const user = useContext(Context)?.user
    const wallet = useContext(Context)?.wallet

    const logOut = () => {
        user?.setUser({})
        user?.setIsAuth(false)
        localStorage.setItem('token','')
    }

    function headerBtn() {
        switch (wallet?.isHeaderBtn.name) {
            case 'wallet':
                return <Link className={styles.btn} to={wallet?.isHeaderBtn.path}>Мои кошельки</Link>
            case 'expensesAndIncome':
                return <Link className={styles.btn} to={wallet?.isHeaderBtn.path}>Назад к кошельку</Link>
            default:
                return
        }

    }

    return (
        <div className={styles.container}>
            {headerBtn()}
            <Link className={styles.btn} onClick={logOut} to={LOGIN_ROUTE}>Выйти</Link>
        </div>
    );
});

export default Header;
