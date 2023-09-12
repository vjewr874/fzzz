import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";
import Select from "react-select";
import React, {useState} from "react";
import {WALLETS} from "../../../constants/wallet"
import {toast} from "react-toastify";

const wallets=WALLETS
const ModalManageCustomer=(props)=>{
    const [typeWallet,setTypeWallet]=useState("PointWallet")
    const [paymentAmount,setPaymentAmount]=useState(0)

    const dataToAPI={
        type:props?.title,
        typeWallet:typeWallet,
        paymentAmount:paymentAmount
    }
    function handleCheckSubmit(){
        if (dataToAPI.paymentAmount===0 || dataToAPI.paymentAmount==""){
            toast.warn("Vui lòng nhập số tiền")
        }
        else if (dataToAPI.typeWallet===""){
            toast.warn("Vui lòng chọn loại ví")
        }
        else if(dataToAPI.paymentAmount!==0 && dataToAPI.typeWallet!==""){
            props.handleIncreaseDecreasePoint(dataToAPI)
        }
        setPaymentAmount(0)
    }
    return(
        <div>
            <Modal
                isOpen={props.isOpen}
                className={`modal-dialog-centered `}
            >
                <ModalHeader
                    toggle={() => props.handleIsOpenModal(false)}
                >
                    {props?.title==="increase"?"Tăng thưởng cho người chơi" : props?.title==='decrease'? "Giảm điểm người chơi":""}
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Số tiền</Label>
                        <Input
                            type={"number"}
                            value={paymentAmount}
                            onChange={e=>setPaymentAmount(e.target.value)}
                            placeholder={"Vui lòng nhập số tiền"}
                        />

                    </FormGroup>
                    <FormGroup>
                        <Label>Loại ví</Label>
                        <Select
                            // theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            // defaultValue={wallets[0]}
                            placeholder={"Chọn một loại ví"}
                            options={wallets}
                            value={wallets?.find(item => item.value === typeWallet) || ''}
                            // isClearable={false}
                            onChange={({ value }) => setTypeWallet(value)}
                        />
                    </FormGroup>
                    <Button
                        onClick={handleCheckSubmit}
                        color={"primary"}
                    >
                        Xác nhận
                    </Button>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default ModalManageCustomer