import React, {useContext, useEffect, useState} from 'react';
import styles from "./css/wallet.css";
import {useParams} from "react-router";
import {Context} from "../App";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {ModalAddIncome} from "../component/ModalAddIncome";
import {ModalUpdateIncome} from "../component/ModalUpdateIncome";
import {deleteAllExpenses, fetchExpenses} from "../http/expensesApi";
import {ModalAddExpenses} from "../component/ModalAddExpenses";
import {ModalUpdateExpenses} from "../component/ModalUpdateExpenses";
import {WALLET_ROUTE} from "../Utils/consts";
import {useNavigate} from "react-router-dom";

const Expenses = observer(() => {
    const [isAddExpenses, setIsAddExpenses] = useState(false)
    const [isUpgExpenses, setIsUpgExpenses] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [idExpenses, setIdExpenses] = useState('')
    const [nameExpenses, setNameExpenses] = useState('')
    const [valueExpenses, setValueExpenses] = useState(0)
    const params = useParams()
    const history = useNavigate()
    const wallet = useContext(Context)?.wallet
    async function deleteExpensesClick(id:number) {
        if (confirm("Вы уверены?")){
            const data = await deleteAllExpenses(params.walletId,id)
            wallet?.setExpenses(data)
        }
    }
    function clickAdd() {
        setIsAddExpenses(true)
    }
    function onCloseAdd() {
        setIsAddExpenses(false)
    }

    function clickUpg(id:string, nameInc:string,valueInc:number ) {
        setIsUpgExpenses(true)
        setIdExpenses(id)
        setNameExpenses(nameInc)
        setValueExpenses(valueInc)
    }
    function onCloseUpg() {
        setIsUpgExpenses(false)
    }
    useEffect(() => {
        wallet?.setIsHeaderBtn({name:'expensesAndIncome',path:WALLET_ROUTE+'/'+params.walletId})
        fetchExpenses(params.walletId).then(data => {
            wallet?.setExpenses(data)
            setIsVisible(true)
        }).catch(() => {
            setIsVisible(false)
            history(WALLET_ROUTE)
        })
    },[])
    return (
        <div>
            <div className={styles.box}>
                {isVisible && <div>
                    <h2 style={{textAlign: "center"}}>Доходы</h2>
                    <div className={styles.btnBox}>
                        <Button variant={"outline-success"} onClick={clickAdd}>
                            Добавить расход
                        </Button>
                    </div>

                    {wallet?.expenses.map(inc => {
                        return <div key={inc.id} className={styles.list}>
                            <div className={styles.listItem}>
                                <div style={{marginBottom: 10}}>{inc.name}</div>
                                <div>Сумма: {inc.value}</div>
                            </div>
                            <button className={styles.editBtn}
                                    onClick={() => clickUpg(String(inc.id), inc.name, inc.value)}>
                                изменить
                            </button>
                            <button className={styles.delBtn} onClick={() => deleteExpensesClick(inc.id)}>
                                удалить
                            </button>

                        </div>
                    })}
                </div>}

            </div>
            {isAddExpenses && <ModalAddExpenses walletId={params.walletId} onClose={onCloseAdd}/>}
            {isUpgExpenses && <ModalUpdateExpenses walletId={params.walletId} valueExpenses={String(valueExpenses)} nameExpenses={nameExpenses} expensesId={idExpenses}  onClose={onCloseUpg}/>}
        </div>
    );
});

export default Expenses;
