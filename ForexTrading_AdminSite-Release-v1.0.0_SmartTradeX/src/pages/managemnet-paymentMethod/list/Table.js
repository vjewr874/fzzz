import React, {Fragment, useEffect, useState} from "react";
import {Card, Col, Row} from "reactstrap";
import {columns} from "./columns";
import {ChevronDown, Plus} from "react-feather";
import DataTable from "react-data-table-component";
import Service from "../../../services/request";
import {toast} from "react-toastify";
import Pagination from "../../../components/Pagination/Pagination";
import {useHistory} from "react-router-dom"
import ModalDeleteById from "../../../components/Modal/management-paymentMethod/ModalDeleteById";

const Table=()=>{
    const history = useHistory()
    const [listPaymentMethod,setListPaymentMethod]=useState([])
    const [currentPage, setCurrentPage]=useState(0)
    const [totalRecords, setTotalRecords]=useState(0)
    const rowsPerPage=10

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
        getListPaymentMethod(params)
    },[])
    const getListPaymentMethod=(params)=>{
        Service.send({
            method:"POST",path:'/PaymentMethod/find',data:params,headers : {}
        })
            .then(res=>{
                if (res) {
                    const { statusCode, data, message } = res
                    if (statusCode === 200) {
                        setListPaymentMethod(data.data)
                        setTotalRecords(data.total)
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else {
                    setListPaymentMethod([])
                }
            })
    }
    const handlePagination = page => {
        const params = {
            skip: page?.selected*rowsPerPage,
            limit: rowsPerPage,
        }
        setCurrentPage(page?.selected*rowsPerPage)
        getListPaymentMethod(params)
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
    const deletePaymentMethodId=(id)=>{
        Service.send({
            method:"POST",path:'/PaymentMethod/deleteById',data:{id},headers : {}
        })
            .then(res=>{
                if (res) {
                    const { statusCode,message } = res
                    if (statusCode === 200) {
                        toast.success("Xoá thành công")
                        getListPaymentMethod({
                            skip: currentPage,
                            limit: rowsPerPage
                        })
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else {
                    setListPaymentMethod([])
                }
            })
    }

    return(
        <Fragment>
            <Card className={"p-2"}>
                <div className={'container-header'}>
                    <Row style={{marginBottom:"20px"}} className={"justify-content-end"}>
                        <Col lg={2} className={"text-right"}>
                            <button className={'btn btn-primary'} onClick={() => {
                                history.push('/payment-method/create')
                            }}>
                                <Plus size={17} style={{marginTop:"-2px",marginRight:"10px"}}/>
                                Tạo mới
                            </button>
                        </Col>
                    </Row>
                </div>
                <DataTable
                    columns={columns(setIsOpenModal,handleDataToDelete)}
                    noHeader
                    persistTableHead
                    data={listPaymentMethod}
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