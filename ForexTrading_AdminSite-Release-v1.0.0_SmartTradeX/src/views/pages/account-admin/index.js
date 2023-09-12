// @ts-nocheck
// ** React Imports
// @ts-ignore
import { Fragment, useState, useEffect, memo } from 'react'
// ** Store & Actions
import { toast } from 'react-toastify';
import { MoreVertical, Edit, Lock } from 'react-feather'
import _ from 'lodash'
import './index.scss'
import { useForm } from 'react-hook-form'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Service from '../../../services/request'
import ReactPaginate from 'react-paginate'
import { ChevronDown, } from 'react-feather'
import DataTable from 'react-data-table-component'
// @ts-ignore
import Role from './role'
import {
  Card, Input, Label, Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, InputGroup,
  InputGroupButtonDropdown, Modal, ModalHeader, ModalBody,
  Button, FormGroup, Form, Nav, TabContent, NavItem, NavLink, TabPane
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
const DataTableServerSide = () => {
  const [active, setActive] = useState('1')
  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  // ** Store Vars
  const serverSideColumns = [
    {
      name: 'ID',
      selector: 'staffId',
      sortable: true,
      maxWidth: '60px'
    },
    {
      name: 'Tài khoản',
      selector: 'username',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Họ và tên',
      selector: 'username',
      sortable: true,
      maxWidth: '200px',
      cell: (row) => {
        const { firstName, lastName } = row

        return (
          <div>
            {firstName} {lastName}
          </div>
        )
      }
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'SĐT',
      selector: 'phoneNumber',
      sortable: true,

    },
    // {
    //   name: 'Thời gian hoạt động cuối cùng',
    //   selector: 'salary',
    //   sortable: true,
    //   maxWidth: '200px',
    //   cell: (row) => {
    //     const { lastActiveAt } = row

    //     return (
    //       <div>
    //         {moment(lastActiveAt).format("YYYY-MM-DD HH:mm:ss")}
    //       </div>
    //     )
    //   }
    // },
    {
      name: 'Vai trò',
      selector: 'roleName',
      sortable: true,
    },
    {
      name: 'Tác vụ',
      selector: 'action',
      cell: (row) => {
        const {
          lastName,
          firstName,
          phoneNumber,
          active,
          twoFACode,
          telegramId,
          roleId,
          email,
          staffId
        } = row
        return (
          <UncontrolledDropdown>
            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault(); setModal(true); setUserData({
                  staffId,
                  firstName,
                  lastName,
                  phoneNumber,
                  twoFACode,
                  telegramId,
                  roleId,
                  email,
                  active
                })
              }}>
                <Edit className='mr-50' size={15} /> <span className='align-middle'>Sửa</span>
              </DropdownItem>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault()
                const newData = {
                  id: staffId,
                  data: {
                    firstName,
                    lastName,
                    phoneNumber,

                    roleId,
                    email,
                    active: 0
                  }
                }
                handleUpdateData(newData, 'Action Lock Successful!')
              }}>
                <Lock className='mr-50' size={15} /> <span className='align-middle'>Khoá</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
      }
    }
  ]
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter)
  // ** States
  const [listRoles, setListRoles] = useState([])
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [total, setTotal] = useState(20)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
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
   
      // @ts-ignore
      Service.send({
        method: 'POST', path: 'Staff/getListStaff', data: newParams, query: null,
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
        getListRole()
      })
   
  }

  function getListRole() {
  
      // @ts-ignore
      Service.send({
        method: 'POST', path: 'Role/getList', data: {
          filter: {

          },
          skip: 0,
          limit: 20,
          order: {
            key: "createdAt",
            value: "desc"
          }
        }, query: null
      }).then(res => {
        if (res) {
          const { statusCode, data, message } = res
          if (statusCode === 200) {
            const newData = data.data.filter(item=> item.roleId !== 1)
            setListRoles(newData)
          } else {
            toast.warn(message || 'Đã có lỗi xảy ra!')
          }
        }

      })
    

  }

  function handleUpdateData(item, messageSuccess) {
 
      // @ts-ignore
      Service.send({
        method: 'POST', path: 'Staff/updateStaffById', data: item, query: null,
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


  function handleAddData(item, messageSuccess) {
    const token = window.localStorage.getItem('accessToken')

    if (token) {
      const newToken = token.replace(/"/g, "");

      // @ts-ignore
      Service.send({
        method: 'POST', path: 'Staff/insertStaff', data: item, query: null, headers: {
          Authorization: `Bearer ` + newToken
        }
      }).then(res => {
        if (res) {
          const { statusCode, message } = res
          if (statusCode === 200) {
            toast.success(messageSuccess || 'Action Add User successful!')
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

  return (
    <>
     <Card className="accountAdmin">
       {/*   <Nav tabs>
          <NavItem>
            <NavLink
              active={active === '1'}
              onClick={() => {
                toggle('1')
              }}
            >
              Nhân viên
          </NavLink>
          </NavItem>
        </Nav>
        <TabContent className='py-50' activeTab={active}> 
          <TabPane tabId='1'>*/}
            <Row className='mx-0 mt-1 mb-50'>
             
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
                  bsSize='lg'
                  id='search-input'
                  value={searchValue}
                  onChange={(e) => { handleFilter(e) }}
                />
            

            </Col>
        
              <Col sm="2">
                <Button.Ripple
                  Ripple 
                  color='primary'
                  size="lg"
                  onClick={() => {
                    setModal(true)
                    setUserData({})
                  }}>
                  Thêm
               </Button.Ripple>
              </Col>
              <Col sm='4'>
            
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
            <Modal
              isOpen={modal}
              toggle={() => setModal(false)}
              className={`modal-dialog-centered `}
            >
              <ModalHeader toggle={() => setModal(false)}>
                {userData.staffId ? 'Sửa' : 'Thêm'} Thông Tin
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit((data) => {
                  if (userData.staffId) {
                    if(data){
                      delete data['username']
                      delete data['password']
                    }
                    handleUpdateData({
                      id: userData.staffId,
                      data
                    })
                  } else {
                    handleAddData(data)
                  }

                  setModal(false)
                })}>

                  {
                    // @ts-ignore
                    !userData.staffId  ? (
                      <>
                        <FormGroup>
                          <Label for='username'>Tài khoản</Label>
                          <Input
                            id='username'
                            name='username'
                            innerRef={register({ required: true })}
                            invalid={errors.username && true}
                            placeholder='Bruce01'
                            // @ts-ignore
                            value={userData.username || ''}
                            onChange={(e) => {
                              const { name, value } = e.target
                              handleOnchange(name, value)
                            }}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for='password'>Mật khẩu</Label>
                          <Input

                            id='password'
                            name='password'
                            innerRef={register({ required: true })}
                            invalid={errors.password && true}
                            placeholder='****'
                            // @ts-ignore
                            value={userData.password || ''}
                            type="password"
                            onChange={(e) => {
                              const { name, value } = e.target
                              handleOnchange(name, value)
                            }}
                          />
                        </FormGroup>
                      </>
                    ) : null
                  }
                  <FormGroup>
                    <Label for='firstName'>Họ</Label>
                    <Input
                      id='firstName'
                      name='firstName'
                      innerRef={register({ required: true })}
                      invalid={errors.firstName && true}
                      placeholder='Bruce'
                      // @ts-ignore
                      value={userData.firstName || ''}
                      onChange={(e) => {
                        const { name, value } = e.target
                        handleOnchange(name, value)
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='lastName'>Tên</Label>
                    <Input

                      id='lastName'
                      name='lastName'
                      innerRef={register({ required: true })}
                      invalid={errors.lastName && true}
                      placeholder='Wayne'
                      // @ts-ignore
                      value={userData.lastName || ''}
                      onChange={(e) => {
                        const { name, value } = e.target
                        handleOnchange(name, value)
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='email'>Email</Label>
                    <Input

                      id='email'
                      name='email'
                      innerRef={register({ required: true })}
                      invalid={errors.email && true}
                      placeholder='Wayne@gmail.com'
                      // @ts-ignore
                      value={userData.email || ''}
                      type="email"
                      onChange={(e) => {
                        const { name, value } = e.target
                        handleOnchange(name, value)
                      }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for='phoneNumber'>Số điên thoại</Label>
                    <Input
                      innerRef={register({ required: true })}
                      invalid={errors.lastNameBasic && true}
                      name='phoneNumber'
                      placeholder='+84943881692'
                      options={{ phone: true, phoneRegionCode: 'VI' }}
                      // @ts-ignore
                      value={userData.phoneNumber || ''}
                      onChange={(e) => {
                        const { name, value } = e.target
                        handleOnchange(name, value)
                      }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label >Vai trò</Label>
                    <Input
                      type='select'
                      name='roleId'
                      innerRef={register({ required: true })}
                      invalid={errors.roleId && true}
                      // @ts-ignore
                      value={userData.roleId}
                      onChange={(e) => {
                        const { name, value } = e.target
                        handleOnchange(name, value)
                      }}
                    >
                      {listRoles.map(item => (
                        <option value={item.roleId}>{item.roleName}</option>
                      ))}
                    </Input>
                  </FormGroup>
                  {
                    // @ts-ignore
                    userData.staffId ? (
                      <>
                        <FormGroup>
                          <Label >Trạng thái</Label>
                          <Input
                            type='select'
                            name='active'
                            innerRef={register({ required: true })}
                            invalid={errors.active && true}
                            // @ts-ignore
                            value={userData.active || 1}
                            onChange={(e) => {
                              const { name, value } = e.target
                              handleOnchange(name, value)
                            }}
                          >
                            <option value={1}>Hoạt động</option>
                            <option value={0}>Khoá</option>
                          </Input>
                        </FormGroup>
                      
                      </>
                    ) : null
                  }
                  <FormGroup className='d-flex mb-0'>
                    <Button.Ripple className='mr-1' color='primary' type='submit'>
                      Lưu
               
                   </Button.Ripple>

                  </FormGroup>
                </Form>
              </ModalBody>

            </Modal>

          {/* </TabPane>
         

        </TabContent> */}
      </Card>
    </>
  )
}

export default memo(DataTableServerSide)
