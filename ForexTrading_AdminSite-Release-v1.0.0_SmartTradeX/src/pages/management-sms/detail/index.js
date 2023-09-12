import {Card, Col, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import {useParams} from "react-router-dom";
import Service from "../../../services/request";
import {toast} from "react-toastify";

import {currencyFormat} from "../../../ultils/currentFormacy"
import "../../purchase-list/detail/style/detail.scss"
const DetailMessageSMS=()=>{
    const {id}=useParams()
    const history=useHistory()
    const [detailData,setDetailData]=useState({})
    useEffect(()=>{
        const data={
            id: id
        }
        getDetailData(data)
    },[id])
    const getDetailData=(data)=>{
        Service.send({
            method:"POST",path:'/SMSMessage/findById',data:data,headers : {}
        })
            .then(res=>{
                if (res) {
                    const { statusCode, data, message } = res
                    if (statusCode === 200) {
                        setDetailData(data)
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else {
                    setDetailData({})
                }
            })
    }



    return(
        <div id="DetailSMS">
                <Card className={"p-2"}>
                    <h3 className={"detail-title mb-3"}>Chi tiết tin nhắn SMS</h3>
                    <Row className={"detail-input"}>
                        <Col lg={4}>
                            <FormGroup>
                                <Label>ID</Label>
                                <Input value={detailData?.smsMessageId||""} disabled/>
                            </FormGroup>
                        </Col>
                        <Col lg={4}>
                            <FormGroup>
                                <Label>ID Khách hàng</Label>
                                <Input value={detailData?.smsMessageAppUserId||""} disabled/>
                            </FormGroup>
                        </Col>
                        <Col lg={4}>
                            <FormGroup>
                                <Label>Số Tiền</Label>
                                <Input value={currencyFormat(detailData?.smsMessageBalanceAmount||0)} disabled/>
                            </FormGroup>
                        </Col>
                        <Col lg={4}>
                            <FormGroup>
                                <Label>SMS Hash</Label>
                                <Input value={detailData?.smsHash||""} disabled/>
                            </FormGroup>
                        </Col>
                        <Col lg={4}>
                            <FormGroup>
                                <Label>Ngân hàng</Label>
                                <Input value={detailData?.smsMessageOrigin||""} disabled/>
                            </FormGroup>
                        </Col>
                        {/*<Col xs={4}>*/}
                        {/*    <FormGroup>*/}
                        {/*        <Label>Trạng thái</Label>*/}
                        {/*        <Input value={ detailData?.smsMessageStatus === "Completed" ? 'Đã duyệt' : detailData?.smsMessageStatus==="Canceled"? 'Từ chối':detailData?.smsMessageStatus==="New"? "Chưa duyệt": ""} disabled/>*/}
                        {/*    </FormGroup>*/}
                        {/*</Col>*/}
                        <Col xs={4}>
                            <FormGroup>
                                <Label>Ngày nhận</Label>
                                <Input value={detailData?.smsReceiveDate||""} disabled/>
                            </FormGroup>
                        </Col>
                        <Col xs={8}>
                            <FormGroup>
                                <Label>Nội dung</Label>
                                <Input value={detailData?.smsMessageContent||""} disabled/>
                            </FormGroup>
                        </Col>
                    </Row>


                </Card>

                <div style={{textAlign:"right"}}>
                    <button className={'btn btn-primary'}
                        // onClick={() => {history.push('/purchase-list/list')}}
                            onClick={() => history.go(-1)}
                    >Trở về
                    </button>
                </div>
        </div>
    )
}
export default DetailMessageSMS