import {Card, Col, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import {useParams} from "react-router-dom";
import Service from "../../../services/request";
import {toast} from "react-toastify";
import {convertDateVN} from "../../../ultils/convertDate";
import {currencyFormat} from "../../../ultils/currentFormacy"
import "./style/detail.scss"
// import noImage from "../../../assets/images/img-pictures.png";
const DetailPurchaseList=()=>{
    const {id}=useParams()
    const history=useHistory()
    const [detailData,setDetailData]=useState({})
    // const [productImage, setProductImage] = useState([])
    const [orderItemQuantity,setOrderItemQuantity]=useState(0)
    const [orderItemPrice,setOrderItemPrice]=useState(0)

    useEffect(()=>{
        const data={
            id: id
        }
        getDetailData(data)
    },[id])
    const getDetailData=(data)=>{
        Service.send({
            method:"POST",path:'/ProductOrder/findById',data:data,headers : {}
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

    function sumQuantityTicket(arr,type){
        let total=0
        if (arr?.length>0){
            //du an nay chi can item dau tien.
            //voi lai, neu hien thi thi phai hien thi tach biet tung orderItem
            //gop lai roi lam sao update ? update se update cho orderItem nao ?
            total+=arr[0][type]
        }
        return total
    }

    useEffect(()=>{
        setOrderItemQuantity(sumQuantityTicket(detailData.productOrderItems,"orderItemQuantity"))
        setOrderItemPrice(sumQuantityTicket(detailData.productOrderItems,"orderItemPrice"))
    },[detailData])

    function updateOrderItem() {
        if (!orderItemQuantity){
            toast.warning("Vui lòng nhập Số lượng bán ra")
            return
        }
        if (!orderItemPrice){
            toast.warning("Vui lòng nhập Đơn giá")
            return
        }
        Service.send({
            method:"POST",path:'/ProductOrderItem/updateById',data:
                {
                    id:parseInt(detailData?.productOrderItems[0].productOrderItemId),
                    data:{
                        orderItemPrice:parseInt(orderItemPrice),
                        orderItemQuantity:parseInt(orderItemQuantity),
                    }
                },headers : {}
        })
            .then(res=>{
                if (res) {
                    const { statusCode, data, message } = res
                    if (statusCode === 200) {
                        toast.success('Cập nhật thành công'||message)
                        getDetailData({
                            id: id
                        })
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else {
                    setDetailData({})
                }
            })
    }
    return(
        <div id="DetailPurchaseList">
            <div className="detail-purchase-list">
                <Card className={"p-2"}>
                    <h3 className={"detail-title"}>Chi tiết đơn mua</h3>
                </Card>

                <Row>
                    <Col lg={6}>
                        <Card className={"p-2 detail-input"}>
                            <FormGroup>
                                <Label>Đơn mua (ID)</Label>
                                <Input value={detailData?.productOrderId||""} disabled/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Họ và tên</Label>
                                <Input value={detailData?.firstName||""} disabled/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Tài khoản</Label>
                                <Input value={detailData?.customerPhone||""} disabled/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Thời gian</Label>
                                <Input value={detailData?.createdAt? convertDateVN(detailData?.createdAt):""} disabled/>
                            </FormGroup>
                            {/*<FormGroup>*/}
                            {/*    <Label>Phí</Label>*/}
                            {/*    <Input value={currencyFormat(detailData?.fee)||""} disabled/>*/}
                            {/*</FormGroup>*/}
                            {/*<FormGroup>*/}
                            {/*    <Label>Tổng tiền</Label>*/}
                            {/*    <Input value={currencyFormat(detailData?.total || 0)} disabled/>*/}
                            {/*</FormGroup>*/}

                        </Card>
                    </Col >
                    <Col lg={6}>
                        <Card className={"p-2 detail-input"}>
                            <FormGroup>
                                <Label>Số lượng bán ra</Label>
                                <Input
                                    value={ orderItemQuantity|| ""}
                                    onChange={(e)=>setOrderItemQuantity(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Đơn giá</Label>
                                <Input
                                    value={ orderItemPrice || ""}
                                    onChange={(e)=>setOrderItemPrice(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Tổng tiền</Label>
                                <Input value={currencyFormat(detailData?.total)||""} disabled/>
                            </FormGroup>


                            <FormGroup>
                                <Label>Trạng thái</Label>
                                <Input value={detailData?.orderStatus === 'New' ? 'Mới' : detailData?.orderStatus==="Completed"? "Hoàn thành": ""} disabled/>
                            </FormGroup>
                            {/*{*/}
                            {/*    detailData?.productOrderItems?.map((value, index)=>(*/}
                            {/*        <div key={index}>*/}
                            {/*            <h5 className={"mt-2"}>Vé Thứ {index+1}</h5>*/}
                            {/*            <Row>*/}
                            {/*                <Col lg={3} md={6} >*/}
                            {/*                    <FormGroup>*/}
                            {/*                        <Label>Bộ số</Label>*/}
                            {/*                        <Input value={value.producName || ""} disabled/>*/}
                            {/*                    </FormGroup>*/}
                            {/*                </Col>*/}
                            {/*                <Col lg={3} md={6}>*/}
                            {/*                    <FormGroup>*/}
                            {/*                        <Label>Loại vé</Label>*/}
                            {/*                        <Input value={value.productType==="SINGLE"? "Vé thường" : value.productType==="BATCH"?"Cặp Nguyên" : ""} disabled/>*/}
                            {/*                    </FormGroup>*/}
                            {/*                </Col>*/}
                            {/*                <Col lg={3} md={6}>*/}
                            {/*                    <FormGroup>*/}
                            {/*                        <Label>Số lượng</Label>*/}
                            {/*                        <Input value={value.orderItemQuantity || ""} disabled/>*/}
                            {/*                    </FormGroup>*/}
                            {/*                </Col>*/}
                            {/*                <Col lg={3} md={6}>*/}
                            {/*                    <FormGroup>*/}
                            {/*                        <Label>Số tiền</Label>*/}
                            {/*                        <Input value={currencyFormat(value.orderItemPrice) ||""} disabled/>*/}
                            {/*                    </FormGroup>*/}
                            {/*                </Col>*/}
                            {/*            </Row>*/}
                            {/*           /!*imgage*!/*/}
                            {/*            <div className={'image-detail-order'}>*/}
                            {/*                <Row className={value.productImages.length === 0 ? 'justify-content-center' : ''}>*/}
                            {/*                    /!*{*!/*/}
                            {/*                    /!*    value.productImages.length > 0 &&*!/*/}
                            {/*                    /!*    value.productImages.map((image, index) => {*!/*/}
                            {/*                    /!*        return (*!/*/}
                            {/*                    /!*            <Col xs={6} key={index}>*!/*/}
                            {/*                    /!*                <div className={'image__lottery'}>*!/*/}
                            {/*                    /!*                    /!*{*!/*!/*/}
                            {/*                    /!*                    /!*    !props?.disabled &&*!/*!/*/}
                            {/*                    /!*                    /!*    <img className={'image-close'} src={icClose} alt="" onClick={() => props?.handleRemoveImage(index)}/>*!/*!/*/}
                            {/*                    /!*                    /!*}*!/*!/*/}
                            {/*                    /!*                    <div className={'image'} style={{backgroundImage: `url('${image?.productImageUrl || image}')`}}/>*!/*/}
                            {/*                    /!*                </div>*!/*/}
                            {/*                    /!*            </Col>*!/*/}
                            {/*                    /!*        )*!/*/}
                            {/*                    /!*    })*!/*/}
                            {/*                    /!*}*!/*/}
                            {/*                    /!*{*!/*/}
                            {/*                    {*/}
                            {/*                        value.productImages.length > 0 &&*/}
                            {/*                        value.productImages.map((image,index)=>(*/}
                            {/*                            <Col lg={6} key={index}>*/}
                            {/*                               <div className={"image"} style={{backgroundImage: `url("${image.productImageUrl ? image.productImageUrl: ""}")`}}/>*/}
                            {/*                            </Col>*/}
                            {/*                        ))*/}
                            {/*                    }*/}
                            {/*                    {   value.productImages.length === 0 &&*/}
                            {/*                        <span>Không có hình ảnh</span>*/}
                            {/*                    }*/}
                            {/*                </Row>*/}
                            {/*            </div>*/}

                            {/*        </div>*/}
                            {/*    ))*/}
                            {/*}*/}
                        </Card>
                    </Col>
                </Row>

                <div style={{textAlign:"right"}}>
                    <button className={'btn btn-primary mr-1'}
                            onClick={() => history.go(-1)}
                    >Trở về
                    </button>
                    <button className={'btn btn-primary'}
                            onClick={() => updateOrderItem()}
                    >Cập nhật
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DetailPurchaseList