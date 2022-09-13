import React, {ChangeEvent, FormEvent, useContext, useEffect, useRef, useState} from 'react';

import styles from './modalAddWallet.css';
import {Button, Form} from "react-bootstrap";
import {login, registration} from "../http/userAPI";
import {WALLET_ROUTE} from "../Utils/consts";
import {createWallet} from "../http/walletApi";
import {Context} from "../App";
import {createIncome} from "../http/incomeApi";


interface IModalAddIncome {
    onClose?: (() => void);
    walletId?:string
}

export function ModalAddIncome({onClose,walletId}:IModalAddIncome) {
    const [name, setName] = useState('')
    const [value, setValue] = useState('')

    function nameChange(e:ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }
    function valueChange(e:ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }
    const ref = useRef<HTMLDivElement>(null);
    document.body.style.overflow = "hidden"
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (event.target instanceof Node && !ref.current?.contains(event.target)){
                document.body.style.overflow = "auto"
                if (onClose) {
                    onClose()
                }
            }

        }
        document.addEventListener('click',handleClick);

        return () => {
            document.removeEventListener('click',handleClick);
        }
    },[])
    const wallet = useContext(Context)?.wallet
    const click = async () => {
        try {
            const data = await createIncome(walletId,name,value)
            wallet?.setIncome(data)

            if (onClose) {
                document.body.style.overflow = "auto"
                onClose()
            }
        } catch (e:any){
            alert(e.response.data.message)
        }

    }

    const submit = async (event:FormEvent) => {
        try {
            event.preventDefault();
            const data = await createIncome(walletId,name,value)
            wallet?.setIncome(data)

            if (onClose) {
                document.body.style.overflow = "auto"
                onClose()
            }
        } catch (e:any){
            alert(e.response.data.message)
        }

    }




    return (
        <div className={styles.bcg}>
            <div className={styles.box} ref={ref}>
                <Form className="d-flex flex-column" onSubmit={submit}>
                    <div style={{fontFamily: "sans-serif",fontSize:16}}>Введите название дохода:</div>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите название дохода"
                        value={name}
                        onChange={nameChange}
                    />
                    <div style={{fontFamily: "sans-serif",fontSize:16}}>Введите значение:</div>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите значение"
                        value={value}
                        onChange={valueChange}
                    />
                    <div className="d-flex justify-content-center align-items-center mt-3">

                        <Button variant={"outline-success"} onClick={click}>
                            Добавить
                        </Button>
                    </div>
                </Form>




            </div>
        </div>

    );
}
