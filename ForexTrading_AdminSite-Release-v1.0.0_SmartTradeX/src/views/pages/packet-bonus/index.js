// @ts-nocheck
// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'
// ** Store & Actions
import { toast } from 'react-toastify';
import { MoreVertical, Edit, Delete } from 'react-feather'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Service from '../../../services/request'
import ReactPaginate from 'react-paginate'
import { ChevronDown, } from 'react-feather'
import DataTable from 'react-data-table-component'
import { formatToPrice, formatToUSDPrice } from "./../../../helper/common"
import {
  Card, Input, Label, Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, InputGroup,
   Modal, ModalHeader, ModalBody,
  Button, FormGroup, Form
} from 'reactstrap'
import moment from 'moment'
const statusOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 1, label: 'Mới' },
  { value: 2, label: 'Hot' },
  { value: 3, label: 'Bình thường' },
]

const DefaultFilter = {
  filter: {
   
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
    value: "packageUnitId",
    label: "Id"
  },
]
const PacketTableServerSide = () => {
  // ** Store Vars
  const serverSideColumns = [
    {
      name: 'ID',
      selector: 'paymentServicePackageId',
      sortable: true,
      maxWidth: '60px'
    },
    {
      name: 'Tên gói',
      selector: 'packageName',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Loại',
      selector: 'packageCategory',
      sortable: true,
      
      cell: (row) => {
        const { packageCategory } = row
       
        return (
          <div>
           {packageCategory ==="Bonus" ?  "Khuyến mãi" : "Thường"}
          </div>
        )
      }
    },
    {
      name: 'Trạng thái',
      selector: 'packageCategory',
      sortable: true,
      
      cell: (row) => {
        const { packageStatus } = row
       
        return (
          <div>
           {packageStatus === 1 ?  "Mới" : packageStatus === 2 ? "Hot" : "Bình thường"}
          </div>
        )
      }
    },
    {
      name: 'Mô tả',
      selector: 'packageDescription',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'SL Coin / ngày',
      selector: 'packagePerformance',
      sortable: true,
      
    },
    {
      name: 'Đơn vị',
      selector: 'packageUnitId',
      sortable: true,
      
      cell: (row) => {
        const { walletBalanceUnitAvatar, walletBalanceUnitDisplayName } = row

        return (
          <div>
        
           {walletBalanceUnitAvatar && walletBalanceUnitAvatar!=="" ? <img height={15} width={15} style={{marginRight: "10px", borderRadius: "100px"}} src={walletBalanceUnitAvatar} alt="test"/> :null} 
           {walletBalanceUnitDisplayName}
           
          </div>
        )
      }
    },
    {
      name: 'Gói',
      selector: 'referralPackageId',
      sortable: true,
      
      cell: (row) => {
         const { referralPackageId} = row
         const packet = itemsPacket.find(item=> item.paymentServicePackageId === referralPackageId)

        return (
          <div>
          {packet && packet.walletBalanceUnitDisplayName}

          </div>
        )
      }
    },
    {
      name: 'SL gói',
      selector: 'referralPackageCountRequired',
      sortable: true,
      
      cell: (row) => {
         const { referralPackageCountRequired } = row

        return (
          <div>
            {
              formatToPrice(referralPackageCountRequired)
            }
           
          </div>
        )
      }
    },
    {
      name: 'SL người giới thiệu',
      selector: 'referralUserCountRequired',
      sortable: true,
      minWidth: '200px',
      cell: (row) => {
         const { referralUserCountRequired } = row

        return (
          <div>
            {
              formatToPrice(referralUserCountRequired || 0)
            }
           
          </div>
        )
      }
    },
    {
      name: 'Độ bền (ngày)',
      selector: 'packageDuration',
      sortable: true,
      
    },
 
    {
      name: 'Tác vụ',
      selector: 'action',
      cell: (row) => {
        const {
          packageName,
          packageDescription,
          paymentServicePackageId,
          packagePrice,
          packageDiscountPrice,
          packagePerformance,
          packageUnitId,
          packageDuration,
          packageStatus,
          referralPackageCountRequired,
          referralUserCountRequired,
          referralPackageId
        } = row
        return (
          <UncontrolledDropdown>
            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault(); setModal(true); setUserData({
                  paymentServicePackageId,
                  packagePrice,
                  packageDiscountPrice,
                  packagePerformance,
                  packageUnitId,
                  packageDuration,
                  packageStatus,
                  packageName,
                  packageDescription,
                  referralPackageCountRequired,
                  referralUserCountRequired,
                  referralPackageId
                })
              }}>
                <Edit className='mr-50' size={15} /> <span className='align-middle'>Sửa</span>
              </DropdownItem>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault();
                handleDeleteData({
                  id: paymentServicePackageId
                
                })
              }}>
                <Delete className='mr-50' size={15} /> <span className='align-middle'>Xoá</span>
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
  const [itemsCoin, setItemsCoins] = useState([])
  const [itemsPacket, setItemsPacket] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchField, setSearchField] = useState({
    value: "walletBalanceUnitCode",
    label: "Mã Coin"
  })
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
        method: 'POST', path: 'PaymentServiceBonusPackage/find', data: newParams, query: null, headers: {
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
   
      Service.send({
        method: 'POST', path: 'PaymentServiceBonusPackage/updateById', data: item, query: null
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

  function handleDeleteData(item, messageSuccess) {
   
    Service.send({
      method: 'POST', path: 'PaymentServiceBonusPackage/deleteById', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, message } = res
        if (statusCode === 200) {
          toast.success(messageSuccess || 'Tác vụ thành công')
          getData(paramsFilter)
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      }
    })
  
}

  function handleAddPaymentData(item) {
   
    Service.send({
      method: 'POST', path: 'PaymentServiceBonusPackage/insert', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, message } = res
        if (statusCode === 200) {
          toast.success( 'Tác vụ thành công')
          getData(paramsFilter)
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      }
    })
  
}

  const getDataSearch = _.debounce((params) => {
    getData(params, true)
  }, 2000);

  // ** Get data on mount
  useEffect(() => {
    
    getDataCoin({
      filter: {},
      skip: 0,
      limit: 100,
      order: {
        key: "createdAt",
        value: "desc"
      }
    })
  }, [])


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
     
        getDataPackget({
          filter: {},
          skip: 0,
          limit: 100,
          order: {
            key: "createdAt",
            value: "desc"
          }
        })
      }) 
  }

  function getDataPackget(params) {
    const newParams = {
      ...params
    }
   
    Object.keys(newParams.filter).forEach(key => {
      if (!newParams.filter[key] || newParams.filter[key] === '') {
        delete newParams.filter[key]
      }
    })
      Service.send({
        method: 'POST', path: 'PaymentServicePackage/find', data: newParams, query: null
      }).then(res => {
        if (res) {
          const { statusCode, data, message } = res
          
          if (statusCode === 200) {
            
            setItemsPacket(data.data)
          } 
        }
        getData(paramsFilter)
      }) 
  }

  return (
    <Fragment>
      <Card>

        <Row className='mx-0 mt-1 mb-50'>
         
          <Col sm='2'>
            <Input onChange={(e) => {
              const { name, value } = e.target
              handleFilterChange(name, value)
            }} type='select' value={paramsFilter.filter ? (paramsFilter.filter.packageStatus || '') : ''} name='packageStatus' bsSize='lg' >
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
                bsSize='large'
                id='search-input'
                value={searchValue}
                onChange={(e) => { handleFilter(e) }}
              />
            

          </Col>
      
          <Col sm="2">
            <Button.Ripple color='primary'
              size="lg"
              onClick={() => {
                setModal(true);
                 setUserData({
                  
                })
              }}>
              Thêm
            </Button.Ripple>
          </Col>
          
          <Col sm='5'>
            
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
        isOpen={modal}
        toggle={() => setModal(false)}
        className={`modal-dialog-centered `}

      >
        <ModalHeader toggle={() => setModal(false)}>
          {userData.paymentServicePackageId ? "Sửa" : "Thêm"} Gói
          </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit((data) => {
          
                 
            
            if(userData.paymentServicePackageId){
              
            
              handleUpdateData({
                id: userData.paymentServicePackageId,
                data: {
                
                  packageDuration: userData.packageDuration,
                  packageName:  userData.packageName,
                  packagePerformance:  userData.packagePerformance,
                  referralPackageId: userData.referralPackageId,
                  referralPackageCountRequired: userData.referralPackageCountRequired,
                  referralUserCountRequired: userData.referralUserCountRequired,
                  packageStatus: userData.packageStatus,
                  packageUnitId: userData.packageUnitId,
                  packageDescription: userData.packageDescription
                }
              })
            }else{
              handleAddPaymentData({
                
                packageDuration: userData.packageDuration,
                packageName:  userData.packageName,
                packagePerformance:  userData.packagePerformance,
                referralPackageId: userData.referralPackageId,
                referralPackageCountRequired: userData.referralPackageCountRequired,
                referralUserCountRequired: userData.referralUserCountRequired,
                packageStatus: userData.packageStatus,
                packageUnitId: userData.packageUnitId,
                packageDescription: userData.packageDescription
                
              })
            }
            
            setModal(false)
          })}>
          
            <FormGroup>
              <Label for='packageName'>Tên gói</Label>
              <Input
                id='packageName'
                name='packageName'
                innerRef={register({ required: true })}
                invalid={errors.packageName && true}
                placeholder='Tên gói'
                value={userData.packageName || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='packageStatus'>Loại</Label>
              <Input
                id='packageStatus'
                name='packageStatus'
                innerRef={register({ required: true })}
                invalid={errors.packageStatus && true}
                type='select' 
                value={userData.packageStatus || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, +value)
                }}
              >
                 {
                  statusOptions.map((item, index) => {
                    if(index){
                      return <option value={+item.value}>{item.label}</option>
                    }else{
                      return ""
                    }
                
                  })
                }
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for='packageDescription'>Mô tả</Label>
              <Input
                type='textarea'
                id='packageDescription'
                name='packageDescription'    
                innerRef={register({ required: true })}
                invalid={errors.packageDescription && true}
                placeholder='Mô tả'
                value={userData.packageDescription || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='packageDuration'>Độ bền (ngày)</Label>
              <Input
                id='packageDuration'
                name='packageDuration'
                innerRef={register({ required: true })}
                invalid={errors.packageDuration && true}
                value={userData.packageDuration || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for='packageUnitId'>Đơn vị</Label>
              <Input
                id='packageUnitId'
                name='packageUnitId'
                innerRef={register({ required: true })}
                invalid={errors.packageUnitId && true}
                type='select' 
                value={userData.packageUnitId || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              >
                 {
                  itemsCoin.map(item => {
                  
                    return <option value={item.walletBalanceUnitId}>{item.walletBalanceUnitDisplayName}</option>
                   
                
                  })
                }
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for='referralPackageId'>Gói</Label>
              <Input
                id='referralPackageId'
                name='referralPackageId'
                innerRef={register({ required: true })}
                invalid={errors.referralPackageId && true}
                type='select' 
                value={userData.referralPackageId || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              >
                 {
                  itemsPacket.map(item => {
                  
                    return <option value={item.paymentServicePackageId}>{item.walletBalanceUnitDisplayName}</option>
                   
                
                  })
                }
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for='packagePerformance'>SL Coin / ngày</Label>
              <Input
                id='packagePerformance'
                name='packagePerformance'
                innerRef={register({ required: true })}
                invalid={errors.packagePerformance && true}
                value={userData.packagePerformance || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
         
            <FormGroup>
              <Label for='referralPackageCountRequired'>Số lượng gói</Label>
              <Input
                name='referralPackageCountRequired'
                id='referralPackageCountRequired'
                
                
                value={userData.referralPackageCountRequired || ""}

                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='referralUserCountRequired'>Số lượng người giới thiệu</Label>
              <Input
                name='referralUserCountRequired'
                id='referralUserCountRequired'
                
                
                value={userData.referralUserCountRequired || ""}

                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            <FormGroup className='d-flex mb-0'>
              <Button.Ripple className='mr-1' color='primary' type='submit'>
                Lưu
            </Button.Ripple>

            </FormGroup>
          </Form>
        </ModalBody>

      </Modal>

    </Fragment >
  )
}

export default memo(PacketTableServerSide)
