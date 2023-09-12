// @ts-nocheck
// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'
// ** Store & Actions
import { toast } from 'react-toastify';
import { MoreVertical, Send, XOctagon, Edit } from 'react-feather'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Service from '../../../services/request'
import ReactPaginate from 'react-paginate'
import { ChevronDown, } from 'react-feather'
import DataTable from 'react-data-table-component'
import { formatToPrice } from "./../../../helper/common"
import {
  Card, Input, Label, Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, InputGroup, Modal, ModalBody, 
  ModalHeader, FormGroup, Button
} from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import moment from "moment"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/charts/apex-charts.scss'
const statusOptions = [
  { value: '', label: 'Tất cả' },
  { value: 'New', label: 'New' },
  { value: 'Waiting', label: 'Waiting' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Deleted', label: 'Deleted' },
  { value: 'Canceled', label: 'Canceled' },
 ]

const List_Search_Filter = [
  {
    value: "username",
    label: "Tài khoản"
  },
  {
    value: "firstName",
    label: "Họ"
  },
  {
    value: "lastName",
    label: "Tên"
  },
  {
    value: "email",
    label: "Email"
  },
  {
    value: "phoneNumber",
    label: "SĐT"
  },
  
]
const DataTableServerSide = () => {
  // ** Store Vars
  const serverSideColumns = [
    {
      name: 'ID',
      selector: 'paymentWithdrawTransactionId',
      sortable: true,
      maxWidth: '60px'
    },
    {
      name: 'Tài Khoản',
      selector: 'username',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Cấp độ',
      selector: 'memberLevelName',
      sortable: true,
      minWidth: '80px',
      cell: (row) => {
        const { memberLevelName } = row

        return (
          <div>
            {memberLevelName === "Agency" ? "Đại lý" : "Thành viên"}
          </div>
        )
      }
    },
    {
      name: 'SĐT',
      selector: 'phoneNumber',
      sortable: true,
      maxWidth: '200px'
    },
  
    {
      name: 'Tổng tiền',
      selector: 'paymentAmount',
      sortable: true,
      maxWidth: '200px',
      cell: (row) => {
        const { paymentAmount } = row

        return (
          <div>
          {formatToPrice(+(paymentAmount * configData.exchangeVNDPrice).toFixed())} vnd
          </div>
        )
      }
    },
    {
      name: 'Trạng thái',
      selector: 'paymentStatus',
      sortable: true,
      maxWidth: '200px',
      cell: (row) => {
        const { paymentStatus } = row
        const item = statusOptions.find(el=> el.value === paymentStatus)
        
        return (
          <div>
            {item ? item.label : ""}
          </div>
        )
      }
    },
    {
      name: 'Ngày tạo',
      selector: 'createdAt',
      sortable: true,
      maxWidth: '200px',
      cell: (row) => {
        const { createdAt } = row
        return (
          <div>
              {moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}
       
          </div>
        )
      }
    },
    {
      name: 'Ngày duyệt',
      selector: 'paymentApproveDate',
      sortable: true,
      maxWidth: '200px',
      cell: (row) => {
        const { paymentApproveDate } = row

        return (
          <div>
            {moment(paymentApproveDate).format("YYYY-MM-DD HH:mm:ss")}
       
          </div>
        )
      }
    },
    {
      name: 'Tác vụ',
      selector: 'action',
      cell: (row) => {
        const {
          paymentStatus,
          appUserId,
          paymentWithdrawTransactionId,
          paymentAmount,
          username
        } = row
        if(paymentStatus === "New"){
          return (
            <Edit onClick={()=>{
              handleFindById({ id: appUserId}, {
                paymentWithdrawTransactionId,
                paymentAmount,
                username
              })
            }}/>
         
          )
        }else{
          return ""
        }
    
      }
    }
  ]
  const [endDate, setEndPicker] = useState(moment().endOf('month').toDate())
  const [startDate, setStartPicker] = useState(moment().startOf('month').toDate())
  const DefaultFilter = {
    filter: {
     
    },
    skip: 0,
    startDate: startDate,
    endDate: endDate,
    limit: 20,
    order: {
      key: "createdAt",
      value: "desc"
    }
  }
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter)
  const [ configData, setConfigData] = useState({})
  // ** States
  const [isShowModal, setModalModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [total, setTotal] = useState(20)
  const [items, setItems] = useState([])
  const [itemsCoin, setItemsCoins] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchField, setSearchField] = useState({
    value: "username",
    label: "Tài khoản"
  })
  const [dropdownOpen, setDropdownOpen] = useState(false)
  // ** React hook form vars
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {}
  })
  const [userData, setUserData] = useState({})
  
  function systemConfigurationFind() {
    Service.send({
      method: 'POST', path: 'SystemConfiguration/find'
    }).then(res => {
      if (res) {
        const { statusCode, message, data } = res
        if (statusCode === 200) {
          if(data.data){
            setConfigData(data.data[0])
          }
        
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      }

    })
}

  function handleFindById(item, dataItem) {
    Service.send({
      method: 'POST', path: 'AppUsers/findById', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, data} = res
        if (statusCode === 200) {
          const {
            userId,
            firstName,
            lastName,
            phoneNumber,
            socmnd,
            sotaikhoan,
            tennganhang,
            tentaikhoan,
            cmndnguoi,
            cmndsau,
            cmndtruoc,
            active, 
            note
          } = data
       
          setUserData({
            ...dataItem,
            userId,
            firstName,
            lastName,
            phoneNumber,
            socmnd,
            sotaikhoan,
            tennganhang,
            tentaikhoan,
            cmndnguoi,
            cmndsau,
            cmndtruoc,
            note,
            active,
            
            
          })
          setModalModal(true)
        } 
      }
    })
  }

  function getData(params, isNoLoading) {
    const newParams = {
      ...params
    }
    if (!isNoLoading) {
      setIsLoading(true)
    }
    Object.keys(newParams.filter).forEach(key => {
      if (!newParams.filter[key] || newParams.filter[key] === '') {
        delete newParams.filter[key]
      }
    })
    const token = window.localStorage.getItem('accessToken')

    if (token) {
      const newToken = token.replace(/"/g, "");

      Service.send({
        method: 'POST', path: 'PaymentWithdrawTransaction/find', data: newParams, query: null, headers: {
          Authorization: `Bearer ` + newToken
        }
      }).then(res => {
        if (res) {
          const { statusCode, data, message } = res
          setParamsFilter(newParams)
          if (statusCode === 200) {
            setTotal(data.total)
            setItems(data.data)
          } else {
            toast.warn(message || 'Đã có lỗi xảy ra!')
          }
        } else {
          setTotal(1)
          setItems([])
        }
        if (!isNoLoading) {
          setIsLoading(false)
        }
      })
    } else {
      window.localStorage.clear()
    }
  }

  function handleApprove(item, messageSuccess) {
    Service.send({
      method: 'POST', path: 'PaymentWithdrawTransaction/approveWithdrawTransaction', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, message } = res
        if (statusCode === 200) {
          toast.success(messageSuccess || 'Tác vụ thành công!')
          getData(paramsFilter)
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      }
      setModalModal(false)
    })
  

}

function handleDeny(item, messageSuccess) {
  Service.send({
    method: 'POST', path: 'PaymentWithdrawTransaction/denyWithdrawTransaction', data: item, query: null
  }).then(res => {
    if (res) {
      const { statusCode, message } = res
      if (statusCode === 200) {
        toast.success(messageSuccess || 'Tác vụ thành công!')
        getData(paramsFilter)
      } else {
        toast.warn(message || 'Đã có lỗi xảy ra!')
      }
    }
    setModalModal(false)
  })


}

  const getDataSearch = _.debounce((params) => {
    getData(params, true)
  }, 2000);

  // ** Get data on mount
  useEffect(() => {
    getData(paramsFilter)
    systemConfigurationFind()
    
  }, [])

  const handleFilter = e => {
    const { value } = e.target
    setSearchValue(value)
    const newParams = {
      ...paramsFilter,  
      searchText: value,
      skip: 0
    }
    getDataSearch(newParams)

  }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {

    const newParams = {
      ...paramsFilter,
      skip: (page.selected) * paramsFilter.limit
    }
    getData(newParams)
    setCurrentPage(page.selected + 1)

  }

  // ** Function to handle per page
  const handlePerPage = e => {

    const newParams = {
      ...paramsFilter,
      limit: parseInt(e.target.value),
      skip: 0
    }
    getData(newParams)
    setCurrentPage(1)
    setRowsPerPage(parseInt(e.target.value))
  }


  const handleChangeSearchField = (filed) => {
    const newParams = {
      ...paramsFilter,
      skip: 0,
    }
    List_Search_Filter.forEach(item => {
      delete newParams.filter[item.value]
    })
    newParams.filter[filed.value] = ''
    setSearchValue('')
    setSearchField(filed)
    getData(newParams)
  }


  const handleFilterChange = (name, value) => {
    const newParams = {
      ...paramsFilter,
      filter: {
        ...paramsFilter.filter,
        [name]: value
      },
      skip: 0,
    }
    getData(newParams)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(total / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName={
          'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        }
      />
    )
  }

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleOnchange = (name, value) => {
    setUserData(
      {
        ...userData,
        [name]: value
      }
    )
  }

  function getDataCoin(params) {
    const newParams = {
      ...params
    }
   
    Object.keys(newParams.filter).forEach(key => {
      if (!newParams.filter[key] || newParams.filter[key] === '') {
        delete newParams.filter[key]
      }
    })
      Service.send({
        method: 'POST', path: 'WalletBalanceUnit/find', data: newParams, query: null
      }).then(res => {
        if (res) {
          const { statusCode, data, message } = res
          
          if (statusCode === 200) {
            
            setItemsCoins(data.data)
          } 
        }
      }) 
  }

  return (
    <Fragment>
      <Card>

        <Row className='mx-0 mt-1 mb-50'>
          {/* <Col sm='2'>
            <div className='d-flex align-items-center'>
              <Label for='sort-select'>Hiển thị</Label>
              <Input
                className='dataTable-select'
                type='select'
                bsSize='sm'
                id='sort-select'
                value={rowsPerPage}
                onChange={e => handlePerPage(e)}
              >

                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Input>
              <Label for='sort-select'>Mục</Label>
            </div>
          </Col> */}
          
          <Col  sm='3'>
            <div className='d-flex align-items-center'>
              <Label style={{minWidth: "70px"}} for='startDate'>Từ ngày</Label>
              <Flatpickr
                value={startDate}   
                size="sm"             
                className='form-control'
                onChange={date => {
                 
                  setStartPicker(date[0])
                 
                  const newParams = {
                    ...paramsFilter,  
                    startDate: date[0],
                    endDate: endDate,
                    skip: 0
                  }
                  getDataSearch(newParams)
             
                }}
              />
            </div>
           </Col>
           <Col sm='3'>
           <div className='d-flex align-items-center'>
            <Label style={{minWidth: "70px"}} for='endDate'>Đến ngày</Label>
            <Flatpickr
              value={endDate}               
              
              className='form-control'
              onChange={date => {
                setEndPicker(date[0])
                const newParams = {
                  ...paramsFilter,  
                  startDate: startDate,
                  endDate: date[0],
                  skip: 0
                }
                getDataSearch(newParams)
           
                
              }}
            />
            </div>
           </Col>
           <Col sm='2'>
           </Col>
          <Col sm='2'>
            <Input size="large" onChange={(e) => {
              const { name, value } = e.target
              handleFilterChange(name, value)
            }} type='select' value={paramsFilter.filter ? (paramsFilter.filter.paymentStatus || '') : ''} name='paymentStatus' bsSize='sm' >
              {
                statusOptions.map(item => {
                  return <option value={item.value}>{item.label}</option>
                })
              }
            </Input>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='2'>
            <Label className='mr-1' for='search-input'>
              Tìm
            </Label>
          

              <Input
                className='dataTable-filter'
                type='text'
                size="large"
                id='search-input'
                value={searchValue}
                onChange={(e) => { handleFilter(e) }}
              />
        

          </Col>
         
        
        </Row>
        <DataTable
          noHeader
          pagination
          paginationServer
          className='react-dataTable'
          columns={serverSideColumns}
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          data={items}
          progressPending={isLoading}
        />
      </Card>

    
      <Modal
        isOpen={isShowModal}
        toggle={() => setModalModal(false)}
        className={`modal-dialog-centered `}

      >
        <ModalHeader toggle={() => setModalModal(false)}>
         Thông tin giao dịch
        </ModalHeader>
        <ModalBody>
         
          <FormGroup>
              <Label for='username'>username</Label>
              <Input              
                name='username'
                placeholder=''
                value={userData.username || ''}
                
                disabled
              />
            </FormGroup>
        
            <FormGroup>
              <Label for='paymentAmount'>Số tiền</Label>
              <Input              
                name='paymentAmount'
                placeholder=''
                value={formatToPrice(userData.paymentAmount) || ''}
                
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for='username'>Tên tài khoản</Label>
              <Input              
                name='username'
                placeholder=''
                value={userData.tentaikhoan || ''}
                
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for='username'>Số tài khoản</Label>
              <Input              
                name='username'
                placeholder=''
                value={userData.sotaikhoan || ''}
                
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for='username'>Tên ngân hàng</Label>
              <Input              
                name='username'
                placeholder=''
                value={userData.tennganhang || ''}
                
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for='paymentNote'>Ghi chú</Label>
              <Input   
                type="textarea"          
                rows={3} 
                name='paymentNote'
                placeholder=''
                value={userData.paymentNote || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
                
              />
            </FormGroup>
          
            <FormGroup className='d-flex mb-0'>
              <Button.Ripple onClick={(e)=>{
                 e.preventDefault()
                 handleApprove({ id: userData.paymentWithdrawTransactionId,
                  paymentNote: userData.paymentNote
                })
              }} className='mr-1' color='primary' type='submit'>
                Đồng ý
            </Button.Ripple>
            <Button.Ripple onClick={(e)=>{
                 e.preventDefault()
                 handleDeny({ id: userData.paymentWithdrawTransactionId,
                
                  paymentNote: userData.paymentNote
                })
            }} className='mr-1'  type='submit'>
                Từ chối
            </Button.Ripple>
            </FormGroup>
        
        </ModalBody>

      </Modal>
    
    </Fragment >
  )
}

export default memo(DataTableServerSide)
