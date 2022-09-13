import React, {ChangeEvent, useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, WALLET_ROUTE} from "../Utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../App";

const Auth = observer(() => {
    const user = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    function emailChange(e:ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState('')
    function passwordChange(e:ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }
    const click = async () => {
        try {
            let data:any
            if (isLogin){
                data = await login(email, password)
            }else{
                data = await registration(email, password)
            }
            user?.user.setUser(data)
            user?.user.setIsAuth(true)
            history(WALLET_ROUTE)
        } catch (e:any){
            alert(e.response.data.message)
        }

    }
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Реристрациия"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                    className="mt-3"
                    placeholder="Введите ваш email"
                    value={email}
                    onChange={emailChange}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль"
                        value={password}
                        onChange={passwordChange}
                        type="password"
                    />
                    <div className="d-flex justify-content-between mt-3">
                        {isLogin ?
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегитрируйтесь!</NavLink>
                        </div> :
                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти!</NavLink>
                        </div>}
                        <Button variant={"outline-success"} onClick={click}>
                            {isLogin ? "Войти" : "Зарегистрироваться"}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
