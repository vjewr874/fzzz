import React from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

function ModalAcceptNotificaion(props) {
    return (
        <Modal
            isOpen={props?.isOpenModal}
            className={`modal-dialog-centered `}
        >
            <ModalHeader
                toggle={() => props?.handleInitAudio()}
            >
                Thông báo
            </ModalHeader>
            <ModalBody>
                Trang web có thông báo bằng âm thanh. Vui lòng mở loa để sử dụng
                <br />
                <br />

                <div className={"d-flex justify-content-end"} >
                    <Button
                        onClick={() => {
                            props?.handleInitAudio()
                        }}
                        color={"primary"}
                    >
                        Xác nhận
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
}

export default ModalAcceptNotificaion;