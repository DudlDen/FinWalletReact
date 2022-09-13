import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../App";
import {Link, Route, useNavigate} from "react-router-dom";
import {WALLET_ROUTE} from "../Utils/consts";
import {deleteWallet, fetchWallets, updateValueWallet} from "../http/walletApi";
import {Button} from "react-bootstrap";
import {ModalAddWallet} from "../component/ModalAddWallet";
import {ModalUpdateWallet} from "../component/ModalUpdateWallet";
import {fetchValueIncome} from "../http/incomeApi";
import {queries} from "@testing-library/react";
import {fetchValueExpenses} from "../http/expensesApi";

const WalletList = observer(() => {
    const wallet = useContext(Context)?.wallet
    const history = useNavigate()

    async function deleteClick(id:number) {
        if (confirm("Вы уверены?")){
            const data = await deleteWallet(id)
            wallet?.setWallet(data)
        }
    }
    const [isAddWallet, setIsAddWallet] = useState(false)
    const [isUpdWallet, setIsUpdWallet] = useState(false)
    const [nameWallet, setNameWallet] = useState('')
    const [idWallet, setIdWallet] = useState(0)

    function clickAdd() {
        setIsAddWallet(true)
    }
    function onCloseAdd() {
        setIsAddWallet(false)
    }
    function clickUpd(id:number,name:string) {
        setIsUpdWallet(true)
        setIdWallet(id)
        setNameWallet(name)
    }
    function onCloseUpd() {
        setIsUpdWallet(false)
    }
    useEffect(() => {
        wallet?.setIsHeaderBtn({name:'',path:''})

        fetchWallets().then(data => {
            wallet?.setWallet(data)
            for (let dataValue of data) {
                fetchValueIncome(dataValue.id).then((data2) => {
                    fetchValueExpenses(dataValue.id).then((data3) => {
                        let sum: number = 0
                        let sum1: number = 0
                        for (let dataValue2 of data2) {
                            sum += Number(dataValue2.value)
                        }
                        for (let dataValue2 of data3) {
                            sum1 += Number(dataValue2.value)
                        }
                        updateValueWallet(dataValue.id,sum-sum1).then(data4 => wallet?.setWallet(data4))
                    })
                })
            }

        })
    },[])
    return (
        <div className='d-flex justify-content-center align-items-center flex-column list-group' style={{marginTop:140,marginLeft:200,marginRight:200}}>

            {wallet?.wallet.map((wal) => {
                return  <div key={wal.id} className='d-flex justify-content-center align-items-center' style={{width: '100%' }}>
                            <Link to={WALLET_ROUTE+'/'+wal.id} style={{textAlign: "center", fontSize:20, fontFamily:"sans-serif"}} className="p-3 m-2 list-group-item list-group-item-action" >
                                <div style={{marginBottom:20}}>{wal.name}</div>
                                <div>Баланс: {wal.balance}</div>
                            </Link>
                            <Button variant={"outline-primary"} style={{height:50, marginRight:10}} onClick={() => clickUpd(wal.id,wal.name)}>
                                редактировать
                            </Button>
                            <Button variant={"outline-danger"} style={{height:50}} onClick={() => deleteClick(wal.id)}>
                                удалить
                            </Button>

                        </div>
            })}
            <Button variant={"outline-success"} onClick={clickAdd}>
                Добавить кошелек
            </Button>
            {isAddWallet && <ModalAddWallet onClose={onCloseAdd}/>}
            {isUpdWallet && <ModalUpdateWallet idWallet={idWallet} nameWallet={nameWallet} onClose={onCloseUpd}/>}
        </div>
    );
});

export default WalletList;
