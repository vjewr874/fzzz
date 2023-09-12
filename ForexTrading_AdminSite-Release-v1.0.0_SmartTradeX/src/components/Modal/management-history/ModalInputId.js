import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";

import React, {useState} from "react";
import {Plus, Trash2} from "react-feather";
import {convertFileToBase64} from "../../../helper/common";
import SystemConfig from "../../../services/systemConfig";
import '../../../pages/system-configuration/style/system-configuration.scss'

const ModalInputId=(props)=>{
    const [paymentRef,setPaymentRef]=useState(null)
    const [paymentNote,setPaymentNote]=useState("")

    function handleChangeImage (e) {
        const file = e?.target?.files[0]
        convertFileToBase64(file).then((dataUrl) => {
            const newData = dataUrl.replace(/,/gi, "").split("base64")
            if (newData[1]) {
                const dataImage = {
                    imageData: newData[1],
                    imageFormat: file.type.replace("image/", ""),
                }
                if (file.size > 10048576) {
                    return;
                }
                SystemConfig.uploadImage(dataImage).then(r => {
                    setPaymentRef(r)

                })
            }
        })
    }
    function handleRemoveImage() {
        setPaymentRef(null)
    }

    return(
        <div>
            <Modal
                isOpen={props?.isOpenModal}
                className={`modal-dialog-centered `}
            >
                <ModalHeader
                    toggle={() => {
                        props.handleIsOpenModal(false)
                        setPaymentRef(undefined)
                        setPaymentNote("")
                    }}
                >
                    Hình ảnh Chuyển khoản
                </ModalHeader>
                <ModalBody>
                    {/*<FormGroup>*/}
                    {/*    <Label>Mã giao dịch</Label>*/}
                    {/*    <Input*/}
                    {/*        value={paymentRef}*/}
                    {/*        onChange={e=>setPaymentRef(e.target.value)}*/}
                    {/*        placeholder={"Vui lòng nhập mã giao dịch"}*/}
                    {/*    />*/}
                    {/*</FormGroup>*/}
                    <Row className={'container-input'} style={{border:"none"}}>
                        <Col sm={12}>
                            <FormGroup>
                                <Label>
                                    Ghi chú
                                </Label>
                                <Input
                                    type={"textarea"}
                                    rows={4}
                                    value={paymentNote}
                                    onChange={(e)=>setPaymentNote(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        {
                            props?.typeHistory==="PaymentWithdrawTransaction" && props?.typeApprove==="approve"&&
                            <Col sm={12}>
                                <FormGroup>
                                    <Label>Hình ảnh</Label>
                                    {
                                        paymentRef &&
                                        <div className={'container-input-file'}>
                                            <Trash2 className={'icon-remove'} onClick={() => handleRemoveImage('1')}/>
                                            <img src={paymentRef} alt="" width={'100%'} height={'100%'} style={{objectFit: 'cover'}}/>
                                        </div>
                                    }
                                    {
                                        !paymentRef &&
                                        <div className={'container-input-file'}>
                                            <div className={'text-center'}>
                                                <div>
                                                    <Plus/>
                                                </div>
                                                Tải ảnh lên
                                            </div>
                                            <Input
                                                type="file"
                                                id="exampleCustomFileBrowser"
                                                name="customFile"
                                                accept=".jpg, .png, .jpeg"
                                                className={'input-file'}
                                                onChange={(e) => handleChangeImage(e)}
                                            />
                                        </div>
                                    }
                                </FormGroup>
                            </Col>
                        }
                    </Row>

                    <br/>
                    <Button
                        onClick={()=>{
                            props.handleApproveRefuseRequest(props.userIdModal,props?.typeApprove,paymentNote, paymentRef,props?.typeHistory==="PaymentWithdrawTransaction"? true :false)
                            setPaymentRef(undefined)
                            setPaymentNote("")
                        }
                        }
                        color={"primary"}
                    >
                        Xác nhận
                    </Button>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default ModalInputId