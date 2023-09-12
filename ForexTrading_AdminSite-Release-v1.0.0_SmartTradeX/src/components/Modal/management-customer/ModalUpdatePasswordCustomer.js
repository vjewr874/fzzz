import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";

import React, {useState} from "react";

const ModalUpdatePasswordCustomer=(props)=>{
    const [passwordChange,setPasswordChange]=useState("")
    return(
        <div>
            <Modal
                isOpen={props?.isOpenModal}
                className={`modal-dialog-centered `}
            >
                <ModalHeader
                    toggle={() => props.handleIsOpenModal(false)}
                >
                    Đổi mật khẩu
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Mật khẩu mới</Label>
                        <Input
                            onChange={e=>setPasswordChange(e.target.value)}
                            placeholder={"Vui lòng nhập mật khẩu mới"}
                        />

                    </FormGroup>
                    <Button
                        onClick={()=>{
                            props.handleUpdatePasswordCustomer(passwordChange)
                            props.handleIsOpenModal(false)
                        }                        }
                        color={"primary"}
                    >
                        Xác nhận
                    </Button>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default ModalUpdatePasswordCustomer