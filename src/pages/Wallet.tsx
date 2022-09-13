import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {observer} from "mobx-react-lite";
import {Context} from "../App";
import { useNavigate} from "react-router-dom";
import {WALLET_ROUTE} from "../Utils/consts";
import {Button} from "react-bootstrap";
import { fetchFiveIncome} from "../http/incomeApi";
import styles from './css/wallet.css';
import { fetchFiveExpenses} from "../http/expensesApi";


const Wallet = observer(() => {
    const params = useParams()
    const history = useNavigate()
    const income = useContext(Context)?.wallet
    function moreIncome() {
        history(WALLET_ROUTE+'/'+params.id+"/income")
    }

    function moreExpenses() {
        history(WALLET_ROUTE+'/'+params.id+"/expenses")
    }
    const [isVisible, setIsVisible] = useState(false)







    useEffect(() => {
        income?.setIsHeaderBtn({name:'wallet',path:WALLET_ROUTE})
        fetchFiveIncome(params.id).then(data => {

            income?.setIncome(data)
            setIsVisible(true)
        }).catch(() => {
            setIsVisible(false)
            history(WALLET_ROUTE)
        })
        fetchFiveExpenses(params.id).then(data => {

            setIsVisible(true)
            income?.setExpenses(data)

        }).catch(() => {
            setIsVisible(false)
            history(WALLET_ROUTE)
        })
    },[])
    return (
        <div >
            {isVisible && <div className={styles.box}>
                <div>
                    <h2 style={{textAlign: "center"}}>Доходы</h2>
                    {income?.income.map(inc => {
                        return <div key={inc.id} className={styles.list}>
                            <div className={styles.listItem}>
                                <div style={{marginBottom: 10}}>{inc.name}</div>
                                <div>Сумма: {inc.value}</div>
                            </div>


                        </div>
                    })}
                    <div className={styles.btnBox}><Button onClick={moreIncome} variant={"outline-primary"}>
                        Показать все
                    </Button></div>
                </div>
                <div>
                    <h2 style={{textAlign: "center"}}>Расходы</h2>
                    {income?.expenses.map(inc => {
                        return <div key={inc.id} className={styles.list}>
                            <div className={styles.listItem}>
                                <div style={{marginBottom: 10}}>{inc.name}</div>
                                <div>Сумма: {inc.value}</div>
                            </div>
                        </div>
                    })}
                    <div className={styles.btnBox}><Button onClick={moreExpenses} variant={"outline-primary"}>
                        Показать все
                    </Button></div>
                </div>
            </div>}
        </div>
    );
});

export default Wallet;
