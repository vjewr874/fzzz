import React from "react";
import {Badge, Card, Col,FormGroup, Input, Label, Row} from "reactstrap";

import "../styles/HistoryInfo.scss"

import {Check, X} from "react-feather";
import ModalInputId from "../../../../../components/Modal/management-history/ModalInputId";
import {currencyFormat} from "../../../../../ultils/currentFormacy";
import {convertTimeDate} from "../../../../../ultils/convertDate";
const HistoryInfo=(props)=>{

    const statusObj = {
        active: 'light-success',
        notActive:'light-danger'
    }
    const userIdModal = props.data.paymentDepositTransactionId|| props?.data.paymentWithdrawTransactionId|| props?.data?.paymentBonusTransactionId|| props?.data?.paymentExchangeTransactionId||""

    return(
        <div className="detail-historyInfo">
            <Card className={"p-2 mb-3"}>
                <div className={"d-flex align-items-center"}>
                    <h3 className={"detail-title"}>{props?.title}</h3>
                    {
                        <Badge style={{marginLeft:"20px",lineHeight:"20px",marginTop:"-8px"}} className='text-capitalize' color={statusObj[props?.data?.paymentStatus==="Completed" ?"active": props?.data?.paymentStatus==="Canceled" ? "notActive": ""]}>
                            {
                                ( props?.data?.paymentStatus === "Completed" ? 'Đã duyệt' : props?.data?.paymentStatus==="Canceled"? 'Từ chối': props?.data?.paymentStatus==="New"? "Chưa duyệt":"")}
                        </Badge>
                    }
                    {/*props?.isPermissionApprove(props.type)&&*/}
                    {
                        props.data?.paymentStatus==="New" &&
                        <>
                            <div style={{border: "solid 1px green", padding: "4px 8px", margin:"-8px 0 0 20px",cursor:"pointer"}}
                                 onClick={()=> props?.handleIsOpenModal(true)}
                                // onClick={() => props?.handleApproveRefuseRequest(props.data.paymentDepositTransactionId|| props?.data.paymentWithdrawTransactionId|| props?.data?.paymentBonusTransactionId,"approve")}
                            >
                                <Check style={{color:"green"}} size={14} className='mr-50' />
                                <span className='align-middle' style={{color:"green"}}>Duyệt yêu cầu</span>
                            </div>
                            <div style={{border: "solid 1px red", padding: "4px 8px", margin:"-8px 0 0 20px", cursor:"pointer"}}
                                onClick={() => props.handleApproveRefuseRequest(props.data.paymentDepositTransactionId|| props?.data.paymentWithdrawTransactionId|| props?.data?.paymentBonusTransactionId,"refuse")}
                            >
                                <X style={{color:"red"}} size={14} className='mr-50' />
                                <span className='align-middle' style={{color:"red"}}>Từ chối yêu cầu</span>
                            </div>
                        </>
                    }
                </div>
                <h4 className={"mt-1"}>Mã đơn: <span style={{fontWeight:"bold"}}>#{props.data.paymentDepositTransactionId|| props?.data.paymentWithdrawTransactionId|| props?.data?.paymentBonusTransactionId|| props?.data?.paymentExchangeTransactionId||""}</span></h4>
            </Card>
            <Row className={"detail-input"}>
                <Col lg={6}>
                    <Card className={"p-2"}>
                        <FormGroup>
                            <Label>Khách hàng</Label>
                            <Input value={props?.data?.firstName||""} disabled/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Số điện thoại</Label>
                            <Input value={props?.data?.phoneNumber||""} disabled/>
                        </FormGroup>
                        {
                            !props?.data?.paymentExchangeTransactionId &&
                            <>
                                <FormGroup>
                                    <Label>Ngân hàng</Label>
                                    <Input value={props?.data?.paymentOriginSource||props?.data?.tennganhang||""} disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Số tài khoản</Label>
                                    <Input value={props?.data?.paymentOriginName||props?.data?.sotaikhoan||""} disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Tên tài khoản</Label>
                                    <Input value={props?.data?.paymentOwner||props?.data?.tentaikhoan||""} disabled/>
                                </FormGroup>
                            </>
                        }
                        {
                            props?.data?.paymentExchangeTransactionId &&
                            <>
                                <FormGroup>
                                    <Label>Tên tài khoản sử dụng</Label>
                                    <Input value={props?.data?.username||""} disabled/>
                                </FormGroup>
                            </>
                        }
                        {
                            (props?.data?.paymentWithdrawTransactionId || props?.data?.paymentBonusTransactionId || props?.data?.paymentDepositTransactionId)&&
                            <FormGroup>
                                <Label>Hình ảnh giao dịch</Label>
                                <div className={'image-detail-order'}>
                                    <Row className={props?.data?.paymentRef ? 'justify-content-center' : ''}>
                                        <Col lg={6}>
                                            <div className={"image"} style={{backgroundImage: `url("${props?.data?.paymentRef ? props?.data?.paymentRef: ""}")`,paddingTop:"70%"}}/>
                                        </Col>
                                    </Row>
                                </div>
                            </FormGroup>
                        }
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className={"p-2"}>
                        {/*{*/}
                        {/*    (props?.data?.paymentWithdrawTransactionId || props?.data?.paymentBonusTransactionId) &&*/}
                        {/*    <FormGroup>*/}
                        {/*        <Label>Mã giao dịch</Label>*/}
                        {/*        <Input value={props?.data?.paymentRef||""} disabled/>*/}
                        {/*    </FormGroup>*/}
                        {/*}*/}
                        <FormGroup>
                            <Label>Số tiền {props?.data?.paymentExchangeTransactionId? `đổi` : props?.data?.paymentWithdrawTransactionId? `rút`: props?.data?.paymentBonusTransactionId? `rút`: `được nạp`}</Label>
                            <Input value={currencyFormat(props?.data?.paymentAmount||"")} disabled/>
                        </FormGroup>
                        {
                            (props?.data?.paymentWithdrawTransactionId || props?.data?.paymentBonusTransactionId ) &&
                            <>
                                <FormGroup>
                                    <Label>Phí rút</Label>
                                    <Input value={currencyFormat(props?.data?.paymentFeeAmount||0)} disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Số tiền cần chuyển</Label>
                                    <Input value={currencyFormat(props?.data?.paymentRefAmount||0)} disabled/>
                                </FormGroup>
                            </>
                        }
                        {
                            props?.data?.paymentExchangeTransactionId &&
                            <FormGroup>
                                <Label>Số tiền nhận</Label>
                                <Input value={currencyFormat(props?.data?.receiveAmount||"")} disabled/>
                            </FormGroup>
                        }
                        {
                            !props?.data?.paymentExchangeTransactionId &&
                            <FormGroup>
                                <Label>Nội dung</Label>
                                <Input value={props?.data?.paymentNote||""} disabled/>
                            </FormGroup>
                        }
                        <FormGroup>
                            <Label>Ngày tạo</Label>
                            <Input value={convertTimeDate(props?.data?.createdAt)||""} disabled/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Ngày duyệt</Label>
                            <Input value={convertTimeDate(props?.data?.paymentApproveDate)||""} disabled/>
                        </FormGroup>
                        {
                            !props?.data?.paymentExchangeTransactionId &&
                            <FormGroup>
                            <Label>Người duyệt</Label>
                            <Input value={props.nameStaff||""} disabled/>
                            </FormGroup>
                        }

                    </Card>
                </Col>
            </Row>
            <ModalInputId userIdModal ={userIdModal} isOpenModal={props?.isOpenModal} handleIsOpenModal={props?.handleIsOpenModal} handleApproveRefuseRequest={props.handleApproveRefuseRequest}/>
        </div>
    )
}
export default HistoryInfo