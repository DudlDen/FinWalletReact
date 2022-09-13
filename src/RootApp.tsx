import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./component/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./App";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const RootApp = observer(() => {
    const user = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect(() => {


        const dataUser = check().then(data => {
                user?.user.setIsAuth(true)
                user?.user.setUser(dataUser)
            }).finally(() => {setLoading(false)})


    }, [])
    if (loading)
    {
        return <Spinner animation={"grow"}/>
    }
    return (
        <BrowserRouter >
            <AppRouter/>
        </BrowserRouter>
    );
});

export default RootApp;
