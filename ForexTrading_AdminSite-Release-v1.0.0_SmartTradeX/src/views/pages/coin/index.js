// @ts-nocheck
// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'
// ** Store & Actions
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { MoreVertical, Edit, Delete } from 'react-feather'
import _ from 'lodash'
import './index.scss'
import { useForm } from 'react-hook-form'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Service from '../../../services/request'
import ReactPaginate from 'react-paginate'
import { ChevronDown, } from 'react-feather'
import DataTable from 'react-data-table-component'
import { formatToPrice, formatToUSDPrice } from "./../../../helper/common"
import FileUploaderBasic from '../../forms/form-elements/file-uploader/FileUploaderBasic'
import {
  Card, Input, Label, Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Modal, ModalHeader, ModalBody,
  Button, FormGroup, Form
} from 'reactstrap'
import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'

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
    value: "walletBalanceUnitCode",
    label: "Mã Coin"
  },
  {
    label: "Tên Coin",
    value: "walletBalanceUnitDisplayName"
  },
  {
   value: "originalPrice",
   label: "Giá gốc"
  }
]
const CoinTableServerSide = () => {
  // ** Store Vars
  const serverSideColumns = [
    {
      name: 'ID',
      selector: 'walletBalanceUnitId',
      sortable: true,
      maxWidth: '60px'
    },
    {
      name: 'Tên',
      selector: 'walletBalanceUnitDisplayName',
      sortable: true,
      minWidth: '200px',
      cell: (row) => {
        const { walletBalanceUnitDisplayName, walletBalanceUnitAvatar } = row
        return (
          <div>
            {walletBalanceUnitAvatar? <img height={15} width={15} style={{marginRight: "10px", borderRadius: "100px"}} src={walletBalanceUnitAvatar} alt="test"/> :null}    {walletBalanceUnitDisplayName} 
          </div>
        )
      }
    },
    {
      name: 'Mã',
      selector: 'walletBalanceUnitCode',
      sortable: true,
      minWidth: '200px'
    },
    // {
    //   name: 'Giá đại lý bán',
    //   selector: 'agencySellPrice',
    //   sortable: true,
    //   maxWidth: '200px',
    //   cell: (row) => {
    //     const { agencySellPrice } = row
    //     return (
    //       <div>
    //         {formatToPrice(agencySellPrice)}
    //       </div>
    //     )
    //   }
    // },
    {
      name: 'Giá người dùng bán	',
      selector: 'userSellPrice',
      sortable: true,
      maxWidth: '200px',
      cell: (row) => {
        const { userSellPrice } = row
        return (
          <div>
            {formatToUSDPrice(userSellPrice)}
          </div>
        )
      }
    },
   
    {
      name: 'Tác vụ',
      selector: 'action',
      cell: (row) => {
        const {
          walletBalanceUnitId,
          // agencySellPrice,
          convertPrice,
          originalPrice,
          userSellPrice,
          walletBalanceUnitCode,
          walletBalanceUnitDisplayName,
          walletBalanceUnitAvatar
        } = row
        return (
          <UncontrolledDropdown>
            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault(); setModal(true); setUserData({
                  walletBalanceUnitId,
                  // agencySellPrice,
                  convertPrice,
                  originalPrice,
                  userSellPrice,
                  walletBalanceUnitCode,
                  walletBalanceUnitDisplayName,
                  walletBalanceUnitAvatar
                })
              }}>
                <Edit className='mr-50' size={15} /> <span className='align-middle'>Sửa</span>
              </DropdownItem>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault();
                handleDeleteData({
                  id: walletBalanceUnitId
                
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
        method: 'POST', path: 'WalletBalanceUnit/find', data: newParams, query: null, headers: {
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
        method: 'POST', path: 'WalletBalanceUnit/updateById', data: item, query: null
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

  function uploadMediaFile(item) {
   
    Service.send({
      method: 'POST', path: 'Upload/uploadMediaFile', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, message, data } = res
        if (statusCode === 200) {
           setTimeout(()=>{
            toast.success( 'Tác vụ thành công!')
            setUserData({
              ...userData,
              walletBalanceUnitAvatar: data
            })
           }, 2000)
           
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      }
    })
  
}

  function handleDeleteData(item, messageSuccess) {
   
    Service.send({
      method: 'POST', path: 'WalletBalanceUnit/deleteById', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, message } = res
        if (statusCode === 200) {
          toast.success(messageSuccess || 'Action delete successful!')
          getData(paramsFilter)
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      }
    })
  
}

  function handleAddPaymentData(item) {
   
    Service.send({
      method: 'POST', path: 'WalletBalanceUnit/insert', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, message } = res
        if (statusCode === 200) {
          toast.success( 'Action successful!')
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
    getData(paramsFilter)
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
    <Fragment>
      <Card>

        <Row className='mx-0 mt-1 mb-50'>
          
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
          
          <Col sm='7'>
           
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
          {userData.walletBalanceUnitId ? "Sửa" : "Thêm"} Coin
          </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit((data) => {
            const newData = data
            if(userData.walletBalanceUnitAvatar ){
              newData.walletBalanceUnitAvatar = userData.walletBalanceUnitAvatar
            }
            if(userData.walletBalanceUnitId){
              handleUpdateData({
                id: userData.walletBalanceUnitId,
                data: newData
              })
            }else{
              handleAddPaymentData(newData)
            }
            
            setModal(false)
          })}>
          
            <FormGroup>
              <Label for='walletBalanceUnitDisplayName'>Tên coin</Label>
              <Input
                id='walletBalanceUnitDisplayName'
                name='walletBalanceUnitDisplayName'
                innerRef={register({ required: true })}
                invalid={errors.walletBalanceUnitDisplayName && true}
                placeholder='Tên coin'
                value={userData.walletBalanceUnitDisplayName || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='walletBalanceUnitCode'>Mã coin</Label>
              <Input
                id='walletBalanceUnitCode'
                name='walletBalanceUnitCode'
                innerRef={register({ required: true })}
                invalid={errors.walletBalanceUnitCode && true}
                placeholder='BTC'
                value={userData.walletBalanceUnitCode || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            {/* <FormGroup>
              <Label for='originalPrice'>Giá góc</Label>
              <Input
                id='originalPrice'
                name='originalPrice'
                innerRef={register({ required: true })}
                invalid={errors.originalPrice && true}
                placeholder='Giá góc'
                value={userData.originalPrice || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup> */}
            {/* <FormGroup>
              <Label for='agencySellPrice'>Giá đại lý bán</Label>
              <Input
                name='agencySellPrice'
                id='agencySellPrice'
                innerRef={register({ required: true })}
                invalid={errors.agencySellPrice && true}
                value={userData.agencySellPrice || ""}
                placeholder='Giá đại lý bán'
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup> */}
            <FormGroup>
              <Label for='userSellPrice'>Giá người dùng bán	</Label>
              <Input
                name='userSellPrice'
                id='userSellPrice'
                innerRef={register({ required: true })}
                invalid={errors.userSellPrice && true}
                value={userData.userSellPrice || ""}
                placeholder='Giá người dùng bán	'
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='avatar'>Ảnh	</Label>
              <FileUploaderBasic  setPreviewArr={(arrayItem)=>{
                
                uploadMediaFile({
                  imageData: arrayItem[0].booksImageUrl.replace("data:image/png;base64", ""),
                  imageFormat: "png"
                })
              }} previewArr={userData.walletBalanceUnitAvatar  && userData.walletBalanceUnitAvatar !=="" ? [ {booksImageUrl: userData.walletBalanceUnitAvatar }] : []} />
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

export default memo(CoinTableServerSide)
