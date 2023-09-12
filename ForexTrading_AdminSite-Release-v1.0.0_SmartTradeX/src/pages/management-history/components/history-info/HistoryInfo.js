import React, { useState } from "react";
import { Badge, Card, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { convertTimeDate } from "../../../../ultils/convertDate";
import "../styles/HistoryInfo.scss"
import { currencyFormat, currencyFormatUSD } from "../../../../ultils/currentFormacy";
import { Check, X } from "react-feather";
import ModalInputId from "../../../../components/Modal/management-history/ModalInputId";

const HistoryInfo = (props) => {
    const [typeApprove, setTypeApprove] = useState(undefined)
    const statusObj = {
        active: 'light-success',
        notActive: 'light-danger'
    }
    const userIdModal = props.data.paymentDepositTransactionId || props?.data.paymentWithdrawTransactionId || props?.data?.paymentExchangeTransactionId || ""

    return (
        <div className="detail-historyInfo">
            <Card className={"p-2 mb-3"}>
                <div className={"d-flex align-items-center"}>
                    <h3 className={"detail-title"}>{props?.title}</h3>
                    {

                        <Badge style={{ marginLeft: "20px", lineHeight: "20px", marginTop: "-8px" }}
                            className='text-capitalize'
                            color={statusObj[props?.data?.paymentStatus === "Completed" ? "active" : props?.data?.paymentStatus === "Canceled" ? "notActive" : ""]}>
                            {
                                (props?.data?.paymentStatus === "Completed" ? 'Đã duyệt' : props?.data?.paymentStatus === "Canceled" ? 'Từ chối' : props?.data?.paymentStatus === "New" ? "Chưa duyệt" : "")}
                        </Badge>
                    }
                    {
                        props.data?.paymentStatus === "New" && props?.isPermissionApprove(props.type) &&
                        <>
                            <div style={{
                                border: "solid 1px green",
                                padding: "4px 8px",
                                margin: "-8px 0 0 20px",
                                cursor: "pointer"
                            }}
                                // onClick={() => }
                                onClick={() => {
                                    setTypeApprove("approve")
                                    if (props?.type === "PaymentWithdrawTransaction" || props?.type === "PaymentDepositTransaction") {
                                        props?.handleIsOpenModal(true)
                                    }
                                    else {
                                        props?.handleApproveRefuseRequest(props.data.paymentDepositTransactionId || props?.data.paymentWithdrawTransactionId || props?.data?.paymentExchangeTransactionId, "approve")
                                    }
                                }
                                }
                            >
                                <Check style={{ color: "green" }} size={14} className='mr-50' />
                                <span className='align-middle' style={{ color: "green" }}>Duyệt yêu cầu</span>
                            </div>
                            <div style={{
                                border: "solid 1px red",
                                padding: "4px 8px",
                                margin: "-8px 0 0 20px",
                                cursor: "pointer"
                            }}
                                onClick={() =>
                                // props.handleApproveRefuseRequest(props.data.paymentDepositTransactionId || props?.data.paymentWithdrawTransactionId || props?.data?.exchangePaymentMappingOrderId, "refuse")
                                {
                                    setTypeApprove("refuse")
                                    if (props?.type === "PaymentWithdrawTransaction" || props?.type === "PaymentDepositTransaction") {
                                        props?.handleIsOpenModal(true)
                                    }
                                    else {
                                        props?.handleApproveRefuseRequest(props.data.paymentDepositTransactionId || props?.data.paymentWithdrawTransactionId || props?.data?.paymentExchangeTransactionId, "refuse")
                                    }
                                }
                                }
                            >
                                <X style={{ color: "red" }} size={14} className='mr-50' />
                                <span className='align-middle' style={{ color: "red" }}>Từ chối yêu cầu</span>
                            </div>
                        </>
                    }
                </div>
                <h4 className={"mt-1"}>Mã đơn: <span
                    style={{ fontWeight: "bold" }}>#{props.data.paymentDepositTransactionId || props?.data.paymentWithdrawTransactionId || props?.data?.paymentBonusTransactionId || props?.data?.exchangePaymentMappingOrderId || ""}</span>
                </h4>
            </Card>
            <Row className={"detail-input"}>
                <Col lg={6}>
                    <Card className={"p-2"}>
                        <FormGroup>
                            <Label>Tên tài khoản</Label>
                            <Input value={props?.data?.username || ""} disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label>Số điện thoại</Label>
                            <Input value={props?.data?.phoneNumber || props?.data?.customerPhone || ""} disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input value={props?.data?.email || ""} disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label>Trạng thái</Label>
                            <Input
                                value={props?.data?.paymentStatus === "Completed" ? 'Đã duyệt' : props?.data?.paymentStatus === "Canceled" ? 'Từ chối' : props?.data?.paymentStatus === "New" ? "Chưa duyệt" : ""}
                                disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label>Ngày tạo</Label>
                            <Input value={convertTimeDate(props?.data?.createdAt) || ""} disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label>Ngày duyệt</Label>
                            <Input value={convertTimeDate(props?.data?.paymentApproveDate) || ""} disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label>Người duyệt</Label>
                            <Input value={props?.data?.staffName || ""} disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label>Ghi chú</Label>
                            <Input value={props?.data?.paymentNote || ""} disabled />
                        </FormGroup>

                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className={"p-2"}>
                        <FormGroup>
                            <Label>Số
                                tiền {props?.data?.paymentExchangeTransactionId ? `bán` : props?.data?.paymentWithdrawTransactionId ? `rút` : props?.data?.paymentBonusTransactionId ? `rút` : `được nạp`}</Label>
                            <Input value={currencyFormatUSD(props?.data?.paymentAmount || "")} disabled />
                        </FormGroup>
                        {
                            props?.data?.paymentRef &&
                            <FormGroup>
                                <Label>Mã giao dịch</Label>
                                <Input value={props?.data?.paymentRef || ""} disabled />
                            </FormGroup>
                        }
                        {
                            props?.data?.paymentOwner &&
                            <FormGroup>
                                <Label>Tên tài khoản</Label>
                                <Input value={props?.data?.paymentOwner || ""} disabled />
                            </FormGroup>
                        }
                        {
                            props?.data?.paymentOriginName &&
                            <FormGroup>
                                <Label>Số tài khoản</Label>
                                <Input value={props?.data?.paymentOriginName || ""} disabled />
                            </FormGroup>
                        }
                        {
                            props?.data?.paymentOriginSource &&
                            <FormGroup>
                                <Label>Tên ngân hàng</Label>
                                <Input value={props?.data?.paymentOriginSource || ""} disabled />
                            </FormGroup>
                        }

                        {
                            props?.data?.cryptoWalletAddress &&
                            <FormGroup>
                                <Label>Địa chỉ ví</Label>
                                <Input value={props?.data?.cryptoWalletAddress || ""} disabled />
                            </FormGroup>
                        }
                        {
                            props?.data?.cryptoNetwork &&
                            <FormGroup>
                                <Label>Mạng</Label>
                                <Input value={props?.data?.cryptoNetwork || ""} disabled />
                            </FormGroup>
                        }
                        {
                            props?.data?.cryptoUnit &&
                            <FormGroup>
                                <Label>Đơn vị</Label>
                                <Input value={props?.data?.cryptoUnit || ""} disabled />
                            </FormGroup>
                        }
                        {(props?.data?.paymentDepositTransactionId || props?.data?.paymentWithdrawTransactionId) &&
                            <FormGroup>
                                <Label>Hình ảnh giao dịch</Label>
                                <div className={'image-detail-order'}>
                                    <Row className={props?.data?.paymentRefImageUrl ? 'justify-content-center' : ''}>
                                        <Col lg={6}>
                                            <div className={"image"} style={{
                                                backgroundImage: `url("${props?.data?.paymentRefImageUrl ? props?.data?.paymentRefImageUrl : ""}")`,
                                                paddingTop: "70%"
                                            }} />
                                        </Col>
                                    </Row>
                                </div>
                            </FormGroup>
                        }

                    </Card>
                </Col>
            </Row>
            <ModalInputId userIdModal={userIdModal} isOpenModal={props?.isOpenModal}
                handleIsOpenModal={props?.handleIsOpenModal}
                handleApproveRefuseRequest={props.handleApproveRefuseRequest}
                typeApprove={typeApprove}
                typeHistory={props?.type}
            />
        </div>
    )
}
export default HistoryInfo