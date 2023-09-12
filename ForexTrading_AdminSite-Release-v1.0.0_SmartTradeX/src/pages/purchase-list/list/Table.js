import React, {Fragment, useEffect, useState} from "react";
import {Calendar, ChevronDown} from "react-feather";
import {columns} from "./columns";
import DataTable from "react-data-table-component";
import Service from "../../../services/request"
import {toast} from "react-toastify";
import {Card, Col, FormGroup, Input,  Row} from "reactstrap";
import Pagination from "../../../components/Pagination/Pagination";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"
import {ORDER_STATUS} from "../../../constants/status"
import moment from "moment";

const statusType=ORDER_STATUS
const Table=()=>{
    const [purchaseList,setPurchaseList]=useState([])
    const [currentPage, setCurrentPage]=useState(0)
    const rowsPerPage=10
    const [totalRecords, setTotalRecords]=useState(0)
    const [filterOrderStatus,setFilterOrderStatus]=useState("")
    const [filterText,setFilterText]=useState("")
    const [data, setData] = useState({productName: null, productChannel: null, productType: null, expireDate: null,status:null,createdAt:null,filterText:null})
    const [filterDate,setFilterDate]=useState("")
    const [endDate, setEndDate]=useState("")
    const [defaultValue,setDefaultValue]=useState(null)

    useEffect(() => {
        const data={
            skip: currentPage,
            limit: rowsPerPage
        }
        getPurchaseList(data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getPurchaseList=(data)=>{
        Service.send({
            method:"POST",path:'/ProductOrder/find',data:data,headers : {}
        })
            .then(res=>{
                if (res) {
                    const { statusCode, data, message } = res
                    if (statusCode === 200) {
                        setPurchaseList(data.data)
                        setTotalRecords(data.total)
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else {
                    setPurchaseList([])
                }
            })
    }
    const handlePagination=(page)=>{
        setCurrentPage(page.selected*rowsPerPage)
        const data={
            skip: page.selected *rowsPerPage,
            limit: rowsPerPage,
            searchText:filterText||undefined,
            filter: {
                orderStatus: filterOrderStatus|| undefined
            },
            startDate: filterDate||undefined,
            endDate: endDate||undefined
        }
        getPurchaseList(data)
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

    const handleChangeSearch=(e)=>{
        data.filterText=e.target.value
        setData(data)
        setFilterText(e.target.value)
        const param={
            skip: 0,
            limit: rowsPerPage,
            searchText:e.target.value || undefined,
            filter: {
                orderStatus:filterOrderStatus || undefined
            },
            startDate: filterDate||undefined,
            endDate: endDate||undefined
        }
        setCurrentPage(0)
        getPurchaseList(param)
    }
    const handleChangeStatus = (value) => {
        data.status = value?.value
        setData(data)
        setFilterOrderStatus(value?.value)
        const param={
            skip: 0,
            limit: rowsPerPage,
            filter: {
                orderStatus:data?.status || undefined
            },
            searchText:filterText||undefined,
            startDate: filterDate||undefined,
            endDate: endDate||undefined
        }
        setCurrentPage(0)
        getPurchaseList(param)
    }

    const handleChangeFilterDate = (value) =>{
        setFilterDate(value? moment(value[0]).format() : undefined)
        setEndDate(value? moment(value[1]).add(24,'hours').subtract(1,'second').format() : undefined)
        setData(data)
        const param={
            searchText:data.filterText||undefined,
            skip:0,
            limit: rowsPerPage,
            filter: {
                orderStatus:data.status || undefined
            },
            startDate: value? moment(value[0]).format():undefined,
            endDate:value? moment(value[1]).add(24,'hours').subtract(1,'second').format():undefined
        }
        setCurrentPage(0)
        getPurchaseList(param)
    }

    return(
        <Fragment>
            <Card className={'p-2 purchase '}>
                <Row className={"mb-1"}>
                    <Col lg={8}>
                        <Row>
                            <Col lg={4} style={{marginBottom:"1rem"}}>
                                <Input placeholder={"Tìm kiếm"}
                                       onChange={(value) => {handleChangeSearch(value)
                                           setFilterText(value.target.value)}}
                                       className={"custom-input-pj"}
                                />
                            </Col>
                            <Col lg={6} >
                                <FormGroup>
                                    <Flatpickr
                                        value={filterDate}
                                        id=''
                                        options={{
                                            mode: 'range'
                                        }}

                                        className='form-control form-control__date custom-flatpickr-pj'
                                        placeholder={"Chọn ngày"}
                                        onChange={handleChangeFilterDate}
                                        defaultValue={defaultValue}
                                    />
                                    <Calendar size={20} onClick={()=>{
                                        setDefaultValue(!defaultValue)
                                        handleChangeFilterDate(undefined)
                                    }}
                                              style={{position:"absolute", right:"20px",transform:"translateY(calc(-100% - 10px))",color:"#82868b"}}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={2}/>
                    <Col lg={2}>
                        <FormGroup>
                            <Select
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={statusType}
                                placeholder={'Trạng thái'}
                                value={statusType?.find(type => type.value === data.status)}
                                onChange={handleChangeStatus}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <DataTable
                    columns={columns}
                    noHeader
                    persistTableHead
                    data={purchaseList}
                    sortIcon={<ChevronDown />}
                    className='datatable-custom-project p-0'
                    noDataComponent={<h3>Không tìm thấy dữ liệu</h3>}
                />
                <div className={'container-pagination px-lg-2 px-0'}>
                    {
                        CustomPagination()
                    }
                </div>
            </Card>
        </Fragment>
    )
}
export default Table