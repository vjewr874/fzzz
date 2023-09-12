import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";

const ModalDeleteAccount=(props)=>{
    return(
        <div>
            <Modal
                isOpen={props?.isOpenModal}
                className={`modal-dialog-centered `}
            >
                <ModalHeader
                    toggle={() => props.setIsOpenModal(false)}
                >
                    Xoá tài khoản
                </ModalHeader>
                <ModalBody>
                    <h4>Bạn muốn xoá tài khoản
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
                                props?.deleteAccountId(props?.dataToDelete?.id)
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
export default ModalDeleteAccount