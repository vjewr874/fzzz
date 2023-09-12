import { Button, Card, Col, Input, Label, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify";
import Service from "../../../../services/request";
// import {Plus, Trash2} from "react-feather";
// import "../../../system-configuration/style/system-configuration.scss"
// import {convertFileToBase64} from "../../../../helper/common";
// import SystemConfig from "../../../../services/systemConfig";
import "./styles/PaymentMethodInfo.scss"
const PaymentMethodInfo = (props) => {
    const [dataToAction, setDataToAction] = useState(
        {
            paymentMethodName: null,
            paymentMethodIdentityNumber: null,
            paymentMethodReceiverName: null,
        }
    )

    useEffect(() => {
        dataToAction.paymentMethodName = props?.data?.paymentMethodName
        dataToAction.paymentMethodIdentityNumber = props?.data?.paymentMethodIdentityNumber
        dataToAction.paymentMethodReceiverName = props?.data?.paymentMethodReceiverName
        setDataToAction({ ...dataToAction })
    }, [props?.data])
    const handleChangeInput = (caseInput, value) => {
        // eslint-disable-next-line default-case
        switch (caseInput) {
            case "paymentMethodName":
                dataToAction.paymentMethodName = value.target.value
                setDataToAction({ ...dataToAction })
                break
            case "paymentMethodIdentityNumber":
                dataToAction.paymentMethodIdentityNumber = value.target.value
                setDataToAction({ ...dataToAction })
                break
            case "paymentMethodReceiverName":
                dataToAction.paymentMethodReceiverName = value.target.value
                setDataToAction({ ...dataToAction })
                break
        }
    }

    const handleSubmit = () => {
        if (!dataToAction.paymentMethodName) {
            toast.warn('Vui lòng nhập Phương thức')
        } else if (!dataToAction.paymentMethodReceiverName) {
            toast.warn('Vui lòng nhập Loại')
        } else if (!dataToAction.paymentMethodIdentityNumber) {
            toast.warn('Vui lòng nhập Tài khoản')
        }
        else {
            if (!props?.id) {
                createPaymentMethod(dataToAction)
            }
            else {
                updatePaymentMethod({
                    id: props?.id,
                    data: {
                        ...dataToAction
                    }
                })
            }
        }
    }
    const createPaymentMethod = (params) => {
        Service.send({
            method: "POST", path: '/PaymentMethod/insert', data: params, headers: {}
        })
            .then(res => {
                if (res) {
                    const { statusCode, message } = res
                    if (statusCode === 200) {
                        toast.success("Tạo mới thành công")
                        history.push('/payment-method/list')
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else { }

            })
    }
    const updatePaymentMethod = (params) => {
        Service.send({
            method: "POST", path: '/PaymentMethod/updateById', data: params, headers: {}
        })
            .then(res => {
                if (res) {
                    const { statusCode, message } = res
                    if (statusCode === 200) {
                        toast.success("Tạo mới thành công")
                        history.push('/payment-method/list')
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else { }

            })
    }
    // function handleChangeImage (e) {
    //     const file = e?.target?.files[0]
    //     convertFileToBase64(file).then((dataUrl) => {
    //         const newData = dataUrl.replace(/,/gi, "").split("base64")
    //         if (newData[1]) {
    //             const dataImage = {
    //                 imageData: newData[1],
    //                 imageFormat: file.type.replace("image/", ""),
    //             }
    //             if (file.size > 10048576) {
    //                 return;
    //             }
    //             SystemConfig.uploadImage(dataImage).then(r => {
    //                 dataToAction.paymentMethodImageUrl=r
    //                 setDataToAction({...dataToAction})
    //             })
    //         }
    //     })
    // }
    // function handleRemoveImage() {
    //     dataToAction.paymentMethodImageUrl=null
    //     setDataToAction({...dataToAction})
    // }
    const history = useHistory()
    return (
        <div className={"payment-method-info"}>
            <Card className={"p-2 detail-input"}>
                <h3 className={"detail-title mb-3"}>{props.title}</h3>
                <Row>
                    <Col lg={4} className={"mb-1"}>
                        <Label>Phương thức</Label>
                        <Input
                            value={dataToAction.paymentMethodName || ""}
                            onChange={e => handleChangeInput("paymentMethodName", e)}
                            disabled={props?.disabled}
                        />
                    </Col>
                    <Col lg={4} className={"mb-1"}>
                        <Label>Loại</Label>
                        <Input
                            value={dataToAction.paymentMethodReceiverName || ""}
                            onChange={e => handleChangeInput("paymentMethodReceiverName", e)}
                            disabled={props?.disabled}
                        />
                    </Col>
                    <Col lg={4} className={"mb-1"}>
                        <Label>Tài khoản</Label>
                        <Input
                            value={dataToAction.paymentMethodIdentityNumber || ""}
                            onChange={e => handleChangeInput("paymentMethodIdentityNumber", e)}
                            disabled={props?.disabled}
                        />
                    </Col>
                </Row>
            </Card>
            <div className={'d-flex justify-content-end align-items-center'}>
                <Button color={'primary'} className={'mr-2'} onClick={() => history.push('/payment-method/list')}>
                    Trở lại
                </Button>
                {
                    !props?.disabled &&
                    <Button color={'primary'} type={'button'}
                        onClick={() => handleSubmit()}
                    >
                        {props?.id ? 'Cập nhật' : 'Lưu'}
                    </Button>
                }
            </div>
        </div>
    )
}
export default PaymentMethodInfo