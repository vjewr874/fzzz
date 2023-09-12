// @ts-nocheck
// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'
// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { MoreVertical, Edit, Lock, ChevronDown, Shield, Layers, Gift, CreditCard } from 'react-feather'
import _ from 'lodash'
import './index.scss'
import { useForm } from 'react-hook-form'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Service from '../../../services/request'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { useHistory } from 'react-router-dom'
import {
  Card, Input, Label, Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Modal, ModalHeader, ModalBody,
  Button, FormGroup, Form
} from 'reactstrap'
import moment from 'moment'
const statusOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 1, label: 'Hoạt động' },
  { value: 0, label: 'Khoá' },
]


const DefaultFilter = {
  filter: {
    active: 1
  },
  skip: 0,
  limit: 20,
  order: {
    key: "createdAt",
    value: "desc"
  }
}
const List_Search_Filter = [
  {
    value: "username",
    label: "Tài khoản"
  },
  {
    label: "email",
    value: "email"
  },
  {
   value: "referUser",
   label: "Người giới thiệu"
  },
  {
    value: "phoneNumber",
    label: "Số điện thoại"
  }
]
const UserTableServerSide = () => {
  const history = useHistory()
  // ** Store Vars
  const serverSideColumns = [
    {
      name: 'ID',
      selector: 'appUserId',
      sortable: true,
      maxWidth: '60px'
    },
    {
      name: 'Tài Khoản',
      selector: 'username',
      sortable: true,
      minWidth: '100px'
    },
    // {
    //   name: 'Email',
    //   selector: 'email',
    //   sortable: true,
    //   minWidth: '100px'
    // },
    {
      name: 'Người giới thiệu',
      selector: 'referUser',
      sortable: true,
      minWidth: '100px'
    },

    {
      name: 'SĐT',
      selector: 'phoneNumber',
      sortable: true,
      minWidth: '10px'
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
      name: 'Ngày tạo',
      selector: 'salary',
      sortable: true,
      minWidth: '100px',
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
      name: 'Tác vụ',
      selector: 'action',
      cell: (row) => {
        const {
          appUserId,
          firstName,
          lastName,
          phoneNumber,
          limitWithdrawDaily,
          username,
        } = row
        return (
          <UncontrolledDropdown>
            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
              <MoreVertical size={15} />
            </DropdownToggle>
           
            <DropdownMenu right>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault()
                setUserDataAll({appUserId})
                setModalModalPassword(true)
                setSecondModalModalPassword(false)
              }}>
                <Shield className='mr-50' size={15} /> <span className='align-middle'>Đổi mật khẩu</span>
              </DropdownItem>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault()
                setUserDataAll({appUserId})
                setModalModalPassword(false)
                setSecondModalModalPassword(true)
              }}>
                <Layers className='mr-50' size={15} /> <span className='align-middle'>Đổi mật khẩu giao dịch</span>
              </DropdownItem>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault(); 
                history.push("/pages/form-user", {
                  appUserId,           
                })
              }}>
                <Edit className='mr-50' size={15} /> <span className='align-middle'>Sửa</span>
              </DropdownItem>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault()
                const newData = {
                  id: appUserId,
                  data: {
                    firstName,
                    lastName,
                    phoneNumber,
                    limitWithdrawDaily,
                    active: 0
                  }
                }
                handleUpdateData(newData, 'Action Lock Successful!')
              }}>
                <Lock className='mr-50' size={15} /> <span className='align-middle'>Khoá</span>

              </DropdownItem>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault()
                setUserData({
                  gift: true,
                  amount: '',
                  paymentNote: '',
                  appUserId
                })
                setModal(true)
               
              }}>
                <Gift className='mr-50' size={15} /> <span className='align-middle'>Tặng tiền</span>

              </DropdownItem>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault()
                setUserData({
                  gift: false,
                  amount: '',
                  paymentNote: '',
                  appUserId
                })
                setModal(true)
               
              }}>
                <CreditCard className='mr-50' size={15} /> <span className='align-middle'>Giảm tiền</span>

              </DropdownItem>
            
            </DropdownMenu>
          </UncontrolledDropdown>
        )
      }
    }
  ]
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter)
 
  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [total, setTotal] = useState(20)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [userDataAll, setUserDataAll] = useState({})
  const [modalPassword, setModalModalPassword] = useState(false)
  const [modalSecondPassword, setSecondModalModalPassword] = useState(false)
  const [searchField, setSearchField] = useState( {
    value: "username",
    label: "Tài khoản"
  },)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  // ** React hook form vars
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {}
  })
  const [userData, setUserData] = useState({})

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
        method: 'POST', path: 'AppUsers/find', data: newParams, query: null, headers: {
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

  function handleUpdateData(item, messageSuccess) {
    const token = window.localStorage.getItem('accessToken')

    if (token) {
      const newToken = token.replace(/"/g, "");

      Service.send({
        method: 'POST', path: 'AppUsers/updateUserById', data: item, query: null, headers: {
          Authorization: `Bearer ` + newToken
        }
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
      })
    }
  }

  const getDataSearch = _.debounce((params) => {
    getData(params, true)
  }, 2000);

  // ** Get data on mount
  useEffect(() => {
    getData(paramsFilter)
  }, [])

  // ** Function to handle filter
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

  const handleOnchange = (name, value) => {
    setUserData(
      {
        ...userData,
        [name]: value
      }
    )
  }

  function handleUpdatePassWord(item) {
    Service.send({
      method: 'POST', path: 'AppUsers/adminChangePasswordUser', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, message } = res
        if (statusCode === 200) {
          toast.success('Tác vụ thành công')
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      }
    })
  }


  function handleUpdateSecondPassWord(item) {
    Service.send({
      method: 'POST', path: 'AppUsers/adminChangeSecondaryPasswordUser', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, message } = res
        if (statusCode === 200) {
          toast.success('Tác vụ thành công')
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      }
    })
  }

  function handleAddpointforuser(item) {
    Service.send({
      method: 'POST', path: 'PaymentDepositTransaction/addPointForUser', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, message } = res
        if (statusCode === 200) {
          toast.success(`Tác vụ thành công`)
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
        setModal(false)
        getData(paramsFilter)
      }
    })
  }

  return (
    <Fragment>
      <Card>

        <Row className='mx-0 mt-1 mb-50'>
          <Col sm='5'></Col>
          <Col sm='2'>
            <Input onChange={(e) => {
              const { name, value } = e.target
              handleFilterChange(name, value)
            }} type='select' value={paramsFilter.filter ? (paramsFilter.filter.memberLevelName || '') : ''} name='memberLevelName' bsSize='lg' >
               <option value="">Tất cả cấp độ</option>
               <option value="Agency">Đại lý</option>
               <option value="Member">Thành viên</option>
            </Input>
          </Col>
          <Col sm='2'>
            <Input onChange={(e) => {
              const { name, value } = e.target
              handleFilterChange(name, value)
            }} type='select' value={paramsFilter.filter ? (paramsFilter.filter.active || '') : ''} name='active' bsSize='lg' >
              {
                statusOptions.map(item => {
                  return <option value={item.value}>{item.label}</option>
                })
              }
            </Input>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='3'>
            <Label className='mr-1' for='search-input'>
              Tìm
            </Label>
          

              <Input
                className='dataTable-filter'
                type='text'
                size="lg"
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
        isOpen={modalPassword}
        toggle={() => setModalModalPassword(false)}
        className={`modal-dialog-centered `}

      >
        <ModalHeader toggle={() => setModalModalPassword(false)}>
         Đổi mật khẩu
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit((data) => {
            handleUpdatePassWord({
              id: userDataAll.appUserId,
              password: userDataAll.newPassword
            })
            setModalModalPassword(false)
          })}>
            
            <FormGroup>
              <Label for='newPassword'>Mật khẩu mới</Label>
              <Input
                id='newPassword'
                name='newPassword'
                innerRef={register({ required: true })}
                invalid={errors.firstName && true}
                placeholder='Đổi mật khẩu'
                value={userDataAll.newPassword || ''}
                type="Mật khẩu mới"
                onChange={(e) => {
                  const { value } = e.target
                  setUserDataAll({
                    ...userDataAll,
                    newPassword: value
                  })
                }}
              />
            </FormGroup>
        

          
            <FormGroup className='d-flex mb-0'>
              <Button.Ripple className='mr-1' color='primary' type='submit'>
                Submit
            </Button.Ripple>

            </FormGroup>
          </Form>
        </ModalBody>

      </Modal>
      
      <Modal
        isOpen={modalSecondPassword}
        toggle={() => setSecondModalModalPassword(false)}
        className={`modal-dialog-centered `}

      >
        <ModalHeader toggle={() => setSecondModalModalPassword(false)}>
         Sửa mật khẩu giao dịch
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit((data) => {
            handleUpdateSecondPassWord({
              id: userDataAll.appUserId,
              password: userDataAll.newPassword
            })
            setSecondModalModalPassword(false)
          })}>
            
            <FormGroup>
              <Label for='newPassword'>Mật khẩu giao dịch</Label>
              <Input
                id='newPassword'
                name='newPassword'
                innerRef={register({ required: true })}
                invalid={errors.firstName && true}
                placeholder='Mật khẩu giao dịch mới'
                value={userDataAll.newPassword || ''}
            
                onChange={(e) => {
                  const { value } = e.target
                  setUserDataAll({
                    ...userDataAll,
                    newPassword: value
                  })
                }}
              />
            </FormGroup>
        

          
            <FormGroup className='d-flex mb-0'>
              <Button.Ripple className='mr-1' color='primary' type='submit'>
                Submit
            </Button.Ripple>

            </FormGroup>
          </Form>
        </ModalBody>

      </Modal>
      
      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
        className={`modal-dialog-centered `}

      >
        <ModalHeader toggle={() => setModal(false)}>
         {userData.gift ? "Tặng tiền" : "Giảm tiền"}
        </ModalHeader>
        <ModalBody>
         
   
        
            <FormGroup>
              <Label for='amount'>Số tiền</Label>
              <Input              
                name='amount'
                placeholder=''
                value={userData.amount || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
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
                 handleAddpointforuser({ 
                  id: userData.appUserId,
                  paymentNote: userData.paymentNote,
                  amount: +userData.amount * ( userData.gift ? 1 : -1 )
                })
              }} className='mr-1' color='primary' type='submit'>
                Xác nhận
            </Button.Ripple>
          
            </FormGroup>
        
        </ModalBody>

      </Modal>
    

    </Fragment >
  )
}

export default memo(UserTableServerSide)
