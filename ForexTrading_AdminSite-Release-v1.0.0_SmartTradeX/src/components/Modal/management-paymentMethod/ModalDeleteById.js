import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";

const ModalDeleteById=(props)=>{
    return(
        <div>
            <Modal
                isOpen={props?.isOpenModal}
                className={`modal-dialog-centered `}
            >
                <ModalHeader
                    toggle={() => props.setIsOpenModal(false)}
                >
                    Xoá phương thức thanh toán
                </ModalHeader>
                <ModalBody>
                    <h4>Bạn muốn xoá phương thức
                        <span style={{fontWeight:"bold"}}> {props?.dataToDelete?.name}</span>
                    </h4>
                    <br/>
                    <br/>

                    <div className={"d-flex justify-content-end"} >
                        <Button
                            style={{width:"105px",marginRight:"20px"}}
                            onClick={()=>{
                                props.setIsOpenModal(false)
                            }                        }
                            color={"primary"}
                        >
                            Huỷ
                        </Button>
                        <Button
                            onClick={()=>{
                                props?.deletePaymentMethodId(props?.dataToDelete?.id)
                                props?.setIsOpenModal(false)
                            }                        }
                            color={"primary"}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default ModalDeleteById