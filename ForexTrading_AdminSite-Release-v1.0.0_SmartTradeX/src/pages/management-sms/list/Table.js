import React, {Fragment, useEffect, useState} from "react";
import {Card, Col, FormGroup, Row} from "reactstrap";
import {columns} from "./columns";
import {Calendar, ChevronDown} from "react-feather";
import DataTable from "react-data-table-component";
import Service from "../../../services/request";
import {toast} from "react-toastify";
import Pagination from "../../../components/Pagination/Pagination";
// import {useHistory} from "react-router-dom"
import ModalDeleteById from "../../../components/Modal/management-paymentMethod/ModalDeleteById";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import "flatpickr/dist/themes/material_blue.css"

const Table=()=>{
    // const history = useHistory()
    const [listMessageSMS,setListMessageSMS]=useState([])
    const [currentPage, setCurrentPage]=useState(0)
    const [totalRecords, setTotalRecords]=useState(0)
    const rowsPerPage=10
    const [filterStartDate,setFilterStartDate]=useState(undefined)
    const [endDate, setEndDate]=useState(undefined)
    const [defaultValue,setDefaultValue]=useState(null)
    const [isOpenModal,setIsOpenModal]=useState(false)
    const [dataToDelete,setDataToDelete]=useState({
        id:null,
        name:null
    })
    useEffect(()=>{
        const params={
            skip: currentPage,
            limit: rowsPerPage
        }
        getListMessageSMS(params)
    },[])
    const getListMessageSMS=(params)=>{
        Service.send({
            method:"POST",path:'/SMSMessage/Find',data:params,headers : {}
        })
            .then(res=>{
                if (res) {
                    const { statusCode, data, message } = res
                    if (statusCode === 200) {
                        setListMessageSMS(data.data)
                        setTotalRecords(data.count)
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else {
                    setListMessageSMS([])
                }
            })
    }
    const handlePagination = page => {
        const params = {
            skip: page?.selected*rowsPerPage,
            limit: rowsPerPage,
        }
        setCurrentPage(page?.selected*rowsPerPage)
        getListMessageSMS(params)
    }
    const CustomPagination = () => {
        return (
            <Pagination
                handlePagination={handlePagination}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                total={totalRecords}
            />
        )
    }
    const handleDataToDelete=(id,name)=>{
        dataToDelete.id=id
        dataToDelete.name=name
        setDataToDelete({...dataToDelete})
    }
    const handleFilterStartDate=(value)=>{
        if(value===undefined){
            setFilterStartDate(undefined)
            setEndDate(undefined)
        }
        else{
            setFilterStartDate(moment(value[0]).format())
            setEndDate(moment(value[1]).format())
        }
        const param={
            skip:0,
            limit:rowsPerPage,
            startDate:value?`${moment(value[0]).format()}` : undefined,
            endDate:value?`${moment(value[1]).format()}` : undefined,
            // searchText:dataFilter.searchText ||undefined,
            // filter:{
            //     paymentStatus: dataFilter.status ||undefined
            // }||undefined,
        }
        getListMessageSMS(param)
    }
    const deletePaymentMethodId=(id)=>{
        Service.send({
            method:"POST",path:'/PaymentMethod/deleteById',data:{id},headers : {}
        })
            .then(res=>{
                if (res) {
                    const { statusCode,message } = res
                    if (statusCode === 200) {
                        toast.success("Xoá thành công")
                        getListMessageSMS({
                            skip: currentPage,
                            limit: rowsPerPage
                        })
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else {
                    setListMessageSMS([])
                }
            })
    }

    return(
        <Fragment>
            <Card className={"p-2"}>
                <div className={'container-header'}>
                    <Row style={{marginBottom:"20px"}} className={"justify-content-between"}>
                        <Col lg={6}>
                            <FormGroup style={{position:"relative"}}>
                                <Flatpickr
                                    id='startDate'
                                    placeholder={"Chọn ngày"}
                                    options={{
                                        mode: 'range'
                                    }}
                                    className={`form-control form-control__date custom-flatpickr-pj`}
                                    onChange={(date) => handleFilterStartDate(date, filterStartDate, endDate)}
                                    // disabled={props?.disabled}
                                    value={defaultValue}
                                />
                                <Calendar size={20} onClick={()=>{
                                    setDefaultValue(!defaultValue)
                                    handleFilterStartDate(undefined)
                                }}
                                          style={{position:"absolute", right:"15px",transform:"translateY(calc(-100% - 10px))",color:"#82868b"}}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <DataTable
                    columns={columns(setIsOpenModal,handleDataToDelete)}
                    noHeader
                    persistTableHead
                    data={listMessageSMS}
                    sortIcon={<ChevronDown />}
                    className='datatable-custom-project p-0'
                    noDataComponent={<h3>Không tìm thấy dữ liệu</h3>}
                />
                <div>
                    <CustomPagination/>
                </div>
            </Card>
            <ModalDeleteById isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} deletePaymentMethodId={deletePaymentMethodId} dataToDelete={dataToDelete}/>
        </Fragment>
    )
}
export default Table