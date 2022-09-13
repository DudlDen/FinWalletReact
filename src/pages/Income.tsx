import React, {useContext, useEffect, useState} from 'react';
import styles from "./css/wallet.css";
import {deleteAllIncome,fetchIncome} from "../http/incomeApi";
import {useParams} from "react-router";
import {Context} from "../App";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {ModalAddIncome} from "../component/ModalAddIncome";
import {ModalUpdateIncome} from "../component/ModalUpdateIncome";
import {useNavigate} from "react-router-dom";
import {WALLET_ROUTE} from "../Utils/consts";

const Income = observer(() => {
    const [isAddIncome, setIsAddIncome] = useState(false)
    const [isUpgIncome, setIsUpgIncome] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [idIncome, setIdIncome] = useState('')
    const [nameIncome, setNameIncome] = useState('')
    const [valueIncome, setValueIncome] = useState(0)
    const params = useParams()
    const history = useNavigate()
    const wallet = useContext(Context)?.wallet
    async function deleteIncomeClick(id:number) {
        if (confirm("Вы уверены?")){
            const data = await deleteAllIncome(params.walletId,id)
            wallet?.setIncome(data)
        }
    }
    function clickAdd() {
        setIsAddIncome(true)
    }
    function onCloseAdd() {
        setIsAddIncome(false)
    }

    function clickUpg(id:string, nameInc:string,valueInc:number ) {
        setIsUpgIncome(true)
        setIdIncome(id)
        setNameIncome(nameInc)
        setValueIncome(valueInc)
    }
    function onCloseUpg() {
        setIsUpgIncome(false)
    }
    useEffect(() => {
        wallet?.setIsHeaderBtn({name:'expensesAndIncome',path:WALLET_ROUTE+'/'+params.walletId})

        fetchIncome(params.walletId).then(data => {
            wallet?.setIncome(data)
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
                            Добавить доход
                        </Button>
                    </div>

                    {wallet?.income.map(inc => {
                        return <div key={inc.id} className={styles.list}>
                            <div className={styles.listItem}>
                                <div style={{marginBottom: 10}}>{inc.name}</div>
                                <div>Сумма: {inc.value}</div>
                            </div>
                            <button className={styles.editBtn}
                                    onClick={() => clickUpg(String(inc.id), inc.name, inc.value)}>
                                изменить
                            </button>
                            <button className={styles.delBtn} onClick={() => deleteIncomeClick(inc.id)}>
                                удалить
                            </button>

                        </div>
                    })}
                </div>}

            </div>
            {isAddIncome && <ModalAddIncome walletId={params.walletId} onClose={onCloseAdd}/>}
            {isUpgIncome && <ModalUpdateIncome walletId={params.walletId} valueIncome={String(valueIncome)} nameIncome={nameIncome} incomeId={idIncome} onClose={onCloseUpg}/>}
        </div>
    );
});

export default Income;
