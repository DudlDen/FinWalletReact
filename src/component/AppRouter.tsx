import React, {useContext} from 'react';
import {Navigate, Route,Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {LOGIN_ROUTE, WALLET_ROUTE} from "../Utils/consts";
import {Context} from "../App";
import Header from "./Header";
import {observer} from "mobx-react-lite";


const AppRouter = observer(() => {
    const user:any = useContext(Context)
    return (
        <Routes>
            {user?.user.isAuth && authRoutes.map(({path,Component}) =>
                <Route key={path} path={path} element={<div><Header/><Component/></div>} />
            )}
            {publicRoutes.map(({path,Component}) =>
                <Route key={path} path={path} element={<Component/>} />
            )}
            {user?.user.isAuth ? <Route path={'*'} element={<Navigate to={WALLET_ROUTE}/>} /> : <Route path={'*'} element={<Navigate to={LOGIN_ROUTE}/>} />}
        </Routes>
    );
});

export default AppRouter;
