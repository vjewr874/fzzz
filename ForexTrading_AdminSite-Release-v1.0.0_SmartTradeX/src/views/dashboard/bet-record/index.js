// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'
// ** Store & Actions
import { toast } from 'react-toastify';
import _ from 'lodash'
import Service from '../../../services/request'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import { formatToPrice } from "./../../../helper/common"
import {
  Card, Input, Label, Row, Col, DropdownMenu, DropdownItem, DropdownToggle, InputGroup,
  InputGroupButtonDropdown
} from 'reactstrap'
import { injectIntl } from 'react-intl';

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'new', label: 'New' },
  { value: 'waiting', label: 'Waiting' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'deleted', label: 'Deleted' },
  { value: 'canceled', label: 'Canceled' },
]

const DefaultFilter = {
  filter: {
    status: ''
  },
  skip: 0,
  limit: 10,
  order: {
    key: "createdAt",
    value: "desc"
  }
}
const List_Search_Filter = [
  "userName",
  "email",
  "phoneNumber",
]
const DataTableServerSide = ({intl, item}) => {
  // ** Store Vars
  // const { items } = item
  const [items, setItems] = useState({})

  useEffect(() => {
    setItems(item)
  }, [item])
  
  const serverSideColumns = [
    
    {
      name: 'Tên Coin',
      selector: 'walletBalanceUnitDisplayName',
      sortable: true,
      minWidth: '200px',
      cell: (row) => {
        const { walletBalanceUnitAvatar, walletBalanceUnitDisplayName } = row

        return (
          <div style={{display: 'flex', alignItems: 'center'}}>
          {walletBalanceUnitAvatar? <img height={15} width={15} style={{marginRight: "10px", borderRadius: "100px"}} src={walletBalanceUnitAvatar} alt="test"/> :null} {walletBalanceUnitDisplayName}
          </div>
        )
      }
    },
    {
      name: intl.formatMessage({id:"coin_unit"}),
      selector: 'walletBalanceUnitCode',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: intl.formatMessage({id:"amount"}),
      selector: 'totalCount',
      sortable: true,
      minWidth: '200px'
    },
    
    {
      name: intl.formatMessage({id:"sum"}),
      selector: 'salary',
      sortable: true,
      maxWidth: '200px',
      cell: (row) => {
        const { totalSum } = row

        return (
          <div>
            {totalSum ? formatToPrice(totalSum) : 0}
          </div>
        )
      }
    },
   
  ]
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter)

  // ** States

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [total, setTotal] = useState(20)
  
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchField, setSearchField] = useState('username')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [totalSum, settotalSum] = useState(0)

  // ** React hook form vars

  function getData(params, isNoLoading) {
    // const newParams = {
    //   ...params
    // }

    // if (!isNoLoading) {
    //   setIsLoading(true)
    // }
    // Object.keys(newParams.filter).forEach(key => {
    //   if (!newParams.filter[key] || newParams.filter[key] === '') {
    //     delete newParams.filter[key]
    //   }
    // })
    // const token = window.localStorage.getItem('accessToken')

    // if (token) {
    //   const newToken = token.replace(/"/g, "");

    //   Service.send({
    //     method: 'POST', path: 'BetRecords/staffFind', data: newParams, query: null, headers: {
    //       Authorization: `Bearer ` + newToken
    //     }
    //   }).then(res => {
    //     if (res) {
    //       const { statusCode, data, message } = res
    //       setParamsFilter(newParams)
    //       if (statusCode === 200) {
    //         setTotal(20)
    //         setItems(data.data)

    //         settotalSum(data.totalSum)

    //       } else {
    //         toast.warn(message || 'Something was wrong!')
    //       }
    //     } else {
    //       setTotal(1)
    //       setItems([])
    //     }
    //     if (!isNoLoading) {
    //       setIsLoading(false)
    //     }
    //   })
    // } else {
    //   window.localStorage.clear()
    // }
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
    List_Search_Filter.forEach(text => {
      delete newParams.filter[text]
    })
    newParams.filter[filed] = ''
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

  return (
    <Fragment>
      <Card>
      <Row className='mx-0 mt-1 mb-50'>
          <Col sm='6'>
          <h2 for='sort-select'>{intl.formatMessage({id:"analytic_coin"})}</h2>
          </Col>
         
        </Row>
     
        <DataTable
          noHeader
       
          paginationServer
          className='react-dataTable'
          columns={serverSideColumns}
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          data={items}
          progressPending={isLoading}
        />
      </Card>


    </Fragment >
  )
}

export default injectIntl(memo(DataTableServerSide))
