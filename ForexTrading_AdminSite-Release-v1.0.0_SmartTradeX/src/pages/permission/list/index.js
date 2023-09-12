// ** React Imports
import React, { Fragment, useState, useEffect, memo } from 'react'
// ** Store & Actions
import '../../../components/Pagination/style/pagination.scss'
import "../index.scss"
import { toast } from 'react-toastify';
import {Edit, Plus} from 'react-feather'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Service from '../../../services/request'
import ReactPaginate from 'react-paginate'
import { ChevronDown, } from 'react-feather'
import DataTable from 'react-data-table-component'
import {
  Input,Row, Col, Card
} from 'reactstrap'
// import moment from 'moment'
import {convertTimeDate} from "../../../ultils/convertDate";


const DefaultFilter = {
  filter: {

  },
  skip: 0,
  limit: 10,
  order: {
    key: "createdAt",
    value: "desc"
  }
}

const Index = () => {
  // ** Store Vars
  const history = useHistory()
  const serverSideColumns = [
    {
      name: 'ID',
      selector: 'roleId',
      minWidth: '100px',
      cell: (row)=>row?.roleId
    },
    {
      name: 'TÊN PHÂN QUYỀN',
      selector: 'roleName',
      minWidth: '200px',
    },
    {
      name: 'THỜI GIAN',
      selector: 'createdAt',
      minWidth: '200px',
      cell: (row) => (
        convertTimeDate(row?.createdAt ||"")
      )
      //   const { createdAt } = row
      //
      //   return (
      //     <div>
      //       {moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}
      //     </div>
      //   )
      // }
    },
    {
      name: 'NGÀY CẬP NHẬT',
      selector: 'updatedAt',
      minWidth: '200px',
      cell: (row) => (
          convertTimeDate(row?.updatedAt ||"")
      )
    },

    {
      name: 'HÀNH ĐỘNG',
      selector: 'action',
      minWidth: '110px',
      right:true,
      cell: (row) => {
        const {
          roleId
        } = row
        return (
          <div>
            <Edit onClick={() => { history.push(`/permission/edit/${roleId}`, { data: row }) }} className='mr-50' size={15} />
          </div >
        )
      }
    }
  ]
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter)
  const [currentPage, setCurrentPage] = useState(1)
  // const [rowsPerPage, setRowsPerPage] = useState(10)
  const rowsPerPage=10
  const [total, setTotal] = useState(20)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchField,] = useState('roleName')


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
        method: 'POST', path: '/Role/getList', data: newParams, query: null, headers: {
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
    setSearchValue()
    const newParams = {
      ...paramsFilter,
      filter: {
        ...paramsFilter.filter,
        [searchField]: value,
      },
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
  // const handlePerPage = e => {
  //
  //   const newParams = {
  //     ...paramsFilter,
  //     limit: parseInt(e.target.value),
  //     skip: 0
  //   }
  //   getData(newParams)
  //   setCurrentPage(1)
  //   setRowsPerPage(parseInt(e.target.value))
  // }



  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(total / rowsPerPage).toFixed(0))

    return count>1?(
        <div style={{marginTop:"16px"}} className='d-flex align-items-center justify-content-between' id={'pagination'}>
          <div className='d-flex align-items-center w-100 description-desktop'>
            {/*<Label for='rows-per-page' className={'mb-0'}>Hiển thị từ {indexStartItem()} - {totalItemPage()}/{total}</Label>*/}
          </div>
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
        </div>
    ):""
  }



  return (
    <Fragment>
      {/*<Row className='mx-0 mt-1 mb-50'>*/}
      {/*  <Col sm='6'>*/}
      {/*    <div className='d-flex align-items-center'>*/}
      {/*      <Label for='sort-select'>show</Label>*/}
      {/*      <Input*/}
      {/*        className='dataTable-select'*/}
      {/*        type='select'*/}
      {/*        bsSize='sm'*/}
      {/*        id='sort-select'*/}
      {/*        value={rowsPerPage}*/}
      {/*        onChange={e => handlePerPage(e)}*/}
      {/*      >*/}

      {/*        <option value={20}>20</option>*/}
      {/*        <option value={50}>50</option>*/}
      {/*        <option value={100}>100</option>*/}
      {/*      </Input>*/}
      {/*      <Label for='sort-select'>entries</Label>*/}
      {/*    </div>*/}
      {/*  </Col>*/}

      {/*  <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='5'>*/}
      {/*    <Label className='mr-1' for='search-input'>*/}
      {/*      Search*/}
      {/*      </Label>*/}
      {/*    <Input*/}
      {/*      className='dataTable-filter'*/}
      {/*      type='text'*/}
      {/*      bsSize='sm'*/}
      {/*      id='search-input'*/}
      {/*      value={searchValue}*/}
      {/*      onChange={(e) => { handleFilter(e) }}*/}
      {/*    />*/}

      {/*  </Col>*/}
      {/*  <Col sm="1">*/}
      {/*    <Button.Ripple color='primary'*/}
      {/*      size="sm"*/}
      {/*      onClick={() => {*/}
      {/*        history.push('/permission/add')*/}
      {/*      }}>*/}
      {/*      Add*/}
      {/*</Button.Ripple>*/}
      {/*  </Col>*/}
      {/*</Row>*/}

      <div id={"permission"}>
        <Card className={"p-2"}>
          <div className="container-header">
            <Row className={"justify-content-between"}>
              <Col lg={4} xs={6}>
                  <Input
                      className='dataTable-filter'
                      type='text'
                      id='search-input'
                      value={searchValue}
                      placeholder={"Tìm kiếm"}
                      onChange={(e) => { handleFilter(e) }}
                  />
              </Col>
              <Col lg={2} xs={4} style={{textAlign:"right"}}>
                <button className={'btn btn-primary'}
                  onClick={() => {
                  history.push('/permission/add')
                  }}
                >
                  <Plus size={17} style={{marginTop:"-2px",marginRight:"10px"}}/>
                  Tạo mới
                </button>
              </Col>
            </Row>
          </div>

          <DataTable
              noHeader
              pagination
              paginationServer
              className='datatable-custom-project'
              columns={serverSideColumns}
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={CustomPagination}
              data={items}
              progressPending={isLoading}
          />

        </Card>
      </div>


      {/*<DataTable*/}
      {/*  noHeader*/}
      {/*  pagination*/}
      {/*  paginationServer*/}
      {/*  className='datatable-custom-project'*/}
      {/*  columns={serverSideColumns}*/}
      {/*  sortIcon={<ChevronDown size={10} />}*/}
      {/*  paginationComponent={CustomPagination}*/}
      {/*  data={items}*/}
      {/*  progressPending={isLoading}*/}
      {/*/>*/}

    </Fragment >
  )
}

export default memo(Index)
