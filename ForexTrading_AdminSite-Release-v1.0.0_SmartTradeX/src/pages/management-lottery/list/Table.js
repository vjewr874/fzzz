import React, {Fragment, useEffect, useState} from "react";
import DataTable from 'react-data-table-component'
import {ChevronDown, Plus} from "react-feather"
import {columns} from "./columns"
import {Card, Col, FormGroup, Input, Row} from "reactstrap"
import Service from "../../../services/request"
import {toast} from "react-toastify"
import {useHistory} from "react-router-dom"
import Pagination from "../../../components/Pagination/Pagination";
import Select from "react-select";
import {PRODUCT_CHANNEL} from "../../../constants/province";

const productChannels = [{label: 'Chọn tất cả', value: undefined},...PRODUCT_CHANNEL]
const productTypes = [{label: 'Tất cả', value: undefined}, {label: 'Vé thường', value: "SINGLE"}, {label: 'Vé cặp nguyên', value: "BATCH"}]
const Table = (props) => {
    const history = useHistory()
    const [lotteryList,  setLotteryList] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const rowPerPage = 10
    const [totalRecords, setTotalRecords] = useState(0)
    const [productChannel, setProductChannel] = useState(null)
    const [filterSearch, setFilterSearch]=useState("")
    const [productType, setProductType]=useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const params = {
            skip: currentPage,
            limit: rowPerPage
        }
        getLotteryList(params)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getLotteryList = (params, isNoLoading) => {
        if (!isNoLoading) {
            setIsLoading(true)
        }
        Service.send({
            method: 'POST', path: '/Product/find', data: params, headers: {
            }
        }).then(res => {
            if (res) {
                const { statusCode, data, message } = res
                if (statusCode === 200) {
                    setLotteryList(data.data)
                    setTotalRecords(data?.total)
                } else {
                    toast.warn(message || 'Đã có lỗi xảy ra!')
                }
            } else {
                setLotteryList([])
            }
            if (!isNoLoading) {
                setIsLoading(false)
            }
        })
        setLotteryList([
            {

            }
        ])
    }
    const handlePagination = page => {
        const params = {
            skip: page?.selected*rowPerPage,
            limit: rowPerPage,
            filter: {
                productType:productType||undefined,
                productChannel:productChannel||undefined
            },
            searchText:filterSearch||undefined,
        }
        setCurrentPage(page?.selected*rowPerPage)
        getLotteryList(params)
    }
    const CustomPagination = () => {
        return (
            <Pagination
                handlePagination={handlePagination}
                currentPage={currentPage}
                rowsPerPage={rowPerPage}
                total={totalRecords}
            />
            )
    }
    const handleChangeChannel = (value) => {
        setProductChannel(value?.value)
        const param={
            skip:0,
            limit:rowPerPage,
            filter:{
                productChannel:value.value||undefined,
                productType:productType||undefined
            },
            searchText:filterSearch||undefined,
        }
        setCurrentPage(0)
        getLotteryList(param)
    }
    const handleChangeProductType = (value) => {
        setProductType(value?.value)
        const param={
            skip:0,
            limit:rowPerPage,
            filter:{
                productChannel:productChannel||undefined,
                productType:value?.value||undefined
            },
            searchText:filterSearch||undefined,
        }
        setCurrentPage(0)
        getLotteryList(param)
    }
    const handleChangeSearch=(e)=>{
        const param={
            skip:0,
            limit:rowPerPage,
            filter:{
                productType:productType||undefined,
                productChannel:productChannel||undefined
            },
            searchText:e.target.value||undefined,
        }
        setCurrentPage(0)
        setFilterSearch(e.target.value)
        getLotteryList(param)
    }
    const handleChangeNameChannel=(nameChannel)=>{
        return (PRODUCT_CHANNEL.find(channel=>(channel.value===nameChannel)).label)

    }
    return (
        <Fragment>
            <Card className={'p-2'}>
                <div className={'container-header'}>
                    <Row style={{marginBottom:"20px"}}>
                        <Col lg={3}>
                            <FormGroup>
                                <Input placeholder={"Tìm kiếm"}
                                    onChange={handleChangeSearch}
                                    className={"custom-input-pj"}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup>
                                <Select
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={productChannels}
                                    placeholder={'Chọn tên đài'}
                                    value={productChannels?.find(channel => channel.value === productChannel) || ''}
                                    onChange={(value) => handleChangeChannel(value)}
                                    isDisabled={props?.disabled}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup>
                                <Select
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={productTypes}
                                    placeholder={'Chọn loai vé'}
                                    onChange={(value) => handleChangeProductType(value)}
                                    isDisabled={props?.disabled}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={1}/>
                        <Col lg={2} >
                            <div className={'containerBtn text-right' }>
                                <button className={'btn btn-primary'} onClick={() => {
                                    history.push('/lottery/create')
                                }}>
                                    <Plus size={17} style={{marginTop:"-2px",marginRight:"10px"}}/>
                                    Tạo mới
                                </button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <DataTable
                    columns={columns(handleChangeNameChannel)}
                    noHeader
                    persistTableHead
                    data={lotteryList}
                    sortIcon={<ChevronDown />}
                    className='datatable-custom-project p-0'
                    noDataComponent={<h3>Không tìm thấy dữ liệu</h3>}
                    progressPending={isLoading}

                />
                <div>
                    <CustomPagination/>
                </div>
            </Card>
        </Fragment>
    )
}
export default Table