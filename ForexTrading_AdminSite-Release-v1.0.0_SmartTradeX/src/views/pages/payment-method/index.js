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
import { formatToPrice } from "./../../../helper/common"
import {
  Card, Input, Label, Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, InputGroup,
  InputGroupButtonDropdown, Modal, ModalHeader, ModalBody,
  Button, FormGroup, Form
} from 'reactstrap'
import moment from 'moment'
import PaymentMethodService from '../../../services/payMethodService';
import { injectIntl } from 'react-intl';

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'New', label: 'New' },
  { value: 'Waiting', label: 'Waiting' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Deleted', label: 'Deleted' },
  { value: 'Canceled', label: 'Canceled' },
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
  "paymentMethodName",
  "paymentMethodReceiverName",
  "paymentMethodReferName",
  "paymentMethodReceiverName",
]
const DataTableServerSide = ({ intl }) => {
  // ** Store Vars
  const serverSideColumns = [
    {
      name: intl.formatMessage({ id: 'id' }),
      selector: 'paymentMethodId',
      sortable: true,
      maxWidth: '60px'
    },
    {
      name: intl.formatMessage({ id: 'payment_method_name' }),
      selector: 'paymentMethodName',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: intl.formatMessage({ id: 'bank' }),
      selector: 'paymentMethodReferName',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: intl.formatMessage({ id: 'identity_number' }),
      selector: 'paymentMethodIdentityNumber',
      sortable: true,
      minWidth: '250px'
    },
    {
      name: intl.formatMessage({ id: 'name_bank' }),
      selector: 'paymentMethodReceiverName',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: intl.formatMessage({ id: 'action' }),
      selector: 'action',
      maxWidth: '150px',
      cell: (row) => {
        const {
          paymentMethodId,
          paymentMethodName,
          paymentMethodIdentityNumber,
          paymentMethodReferName,
          paymentMethodReceiverName
        } = row
        return (
          <UncontrolledDropdown>
            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault(); setModal(true); setUserData({
                  paymentMethodId,
                  paymentMethodName,
                  paymentMethodIdentityNumber,
                  paymentMethodReferName,
                  paymentMethodReceiverName
                })
              }}>
                <Edit className='mr-50' size={15} /> <span className='align-middle'>{intl.formatMessage({ id: "edit" })}</span>
              </DropdownItem>
              <DropdownItem href='/' onClick={e => {
                e.preventDefault();
                handleUpdateData({
                  id: paymentMethodId,
                  data: {
                    isDeleted: true
                  }
                })
              }}>
                <Delete className='mr-50' size={15} /> <span className='align-middle'>{intl.formatMessage({ id: "delete" })}</span>
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
  const [searchField, setSearchField] = useState('paymentMethodName')
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
    PaymentMethodService.findPaymentMethod(newParams)
      .then((result) => {
        setItems(result.data);
        setTotal(result.count);
      })
      .catch(() => {
        toast.error(
          intl.formatMessage({ id: "an_error_occurred" }) +
          " " +
          intl.formatMessage({ id: "please_come_back_late" })
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateData(item, messageSuccess) {

    PaymentMethodService.updateById(item)
      .then(() => {
        toast.success(
          intl.formatMessage({ id: "update_payment_method_success" })
        );
        getData(paramsFilter)
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "update_payment_method_failed" }));
      })
  }

  function handleAddPaymentData(item) {

    PaymentMethodService.insertPaymentMethod(item)
      .then(() => {
        toast.success(
          intl.formatMessage({ id: "insert_payment_method_success" })
        );
        onReloadData();
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "insert_payment_method_failed" }));
      })
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

  const onReloadData = () => {
    let newParam = { ...paramsFilter };
    newParam.skip = 0;
    setParamsFilter(newParam);
    getData(newParam);
  };

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
      <Card className="p-1">
        <Row className='mx-0 mb-1'>
          <Button.Ripple color='primary'
            size="md"
            onClick={() => {
              setModal(true);
              setUserData({

              })
            }}>
            {intl.formatMessage({ id: "add" })}
          </Button.Ripple>
        </Row>
        <DataTable
          noHeader
          pagination
          paginationServer
          highlightOnHover
          persistTableHead
          noDataComponent={<span className="mt-2">{intl.formatMessage({ id: "table_empty" })}</span>}
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
          {userData.paymentMethodId ? "Xoá" : "Thêm"} Phương thức thanh toán
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit((data) => {
            if (userData.paymentMethodId) {
              handleUpdateData({
                id: userData.paymentMethodId,
                data
              })
            } else {
              handleAddPaymentData(data)
            }

            setModal(false)
          })}>
            <FormGroup>
              <Label for='paymentMethodName'>{intl.formatMessage({ id: "payment_method_name" })}</Label>
              <Input
                id='paymentMethodName'
                type="select"
                name='paymentMethodName'
                innerRef={register({ required: true })}
                invalid={errors.paymentMethodName && true}
                placeholder='123456789'
                value={userData.paymentMethodName || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              >
                <option value="ATM / Bank">ATM/Bank</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for='paymentMethodReferName'>{intl.formatMessage({ id: "bank" })}</Label>
              <Input
                id='paymentMethodReferName'
                name='paymentMethodReferName'
                type="select"
                innerRef={register({ required: true })}
                invalid={errors.paymentMethodReferName && true}
                placeholder='BANK'
                value={userData.paymentMethodReferName || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              >
                <option value="Vietcom Bank">Vietcom Bank</option>
                <option value="Exim Bank">Exim Bank</option>
                <option value="Vietin Bank">Vietin Bank</option>
                <option value="SacomBank">SacomBank</option>
                <option value="Vietnam Prosperity Joint-Stock Commercial Bank">Vietnam Prosperity Joint-Stock Commercial Bank</option>
                <option value="Techcom">Techcom</option>
                <option value="BIDV Bank">BIDV Bank</option>
                <option value="MB Bank">MB Bank</option>
                <option value="KienLong Bank">KienLong Bank</option>
                <option value="HD Bank">HD Bank</option>
                <option value="SHB Bank">SHB Bank</option>
                <option value="SCB Bank">SCB Bank</option>
                <option value="ACB Bank">ACB Bank</option>
                <option value="AB Bank">AB Bank</option>
                <option value="Agri Bank">Agri Bank</option>
                <option value="Bac A Bank">Bac A Bank</option>
                <option value="BaoViet Bank">BaoViet Bank</option>
                <option value="DONGA Bank">DONGA Bank</option>
                <option value="GP Bank">GP Bank</option>
                <option value="INDOVINA Bank">INDOVINA Bank</option>
                <option value="LienViet Post Bank">LienViet Post Bank</option>
                <option value="Maritime">Maritime</option>
                <option value="Nam A Bank">Nam A Bank</option>
                <option value="Navi Bank">Navi Bank</option>
                <option value="NCB">NCB</option>
                <option value="OCB (PHUONG DONG)">OCB (PHUONG DONG)</option>
                <option value="PG Bank">PG Bank</option>
                <option value="PVCOM Bank">PVCOM Bank</option>
                <option value="SaiGon Bank">SaiGon Bank</option>
                <option value="SaA Bank">SaA Bank</option>
                <option value="ShinHan Bank">ShinHan Bank</option>
                <option value="Tien Phong Bank">Tien Phong Bank</option>
                <option value="United Overseas Bank">United Overseas Bank</option>
                <option value="VIB Bank">VIB Bank</option>
                <option value="VietABank">VietABank</option>
                <option value="VPBANK">VPBANK</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for='paymentMethodIdentityNumber'>{intl.formatMessage({ id: "identity_number" })}</Label>
              <Input
                id='paymentMethodIdentityNumber'
                name='paymentMethodIdentityNumber'
                innerRef={register({ required: true })}
                invalid={errors.paymentMethodIdentityNumber && true}
                placeholder='1234789'
                value={userData.paymentMethodIdentityNumber || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            {/* <FormGroup>
              <Label for='paymentMethodReferName'>Payment Method Refer Name</Label>
              <Input
                id='paymentMethodReferName'
                name='paymentMethodReferName'
                innerRef={register({ required: true })}
                invalid={errors.paymentMethodReferName && true}
                placeholder='Citi Bank'
                value={userData.paymentMethodReferName || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup> */}
            <FormGroup>
              <Label for='paymentMethodReceiverName'>{intl.formatMessage({ id: "name_bank" })}</Label>
              <Input
                name='paymentMethodReceiverName'
                id='paymentMethodReceiverName'
                innerRef={register({ required: true })}
                invalid={errors.paymentMethodReceiverName && true}
                value={userData.paymentMethodReceiverName || ""}
                placeholder='Nguyen Van A'
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>

            <FormGroup className='d-flex mb-0'>
              <Button.Ripple className='mr-1' color='primary' type='submit'>
                {intl.formatMessage({ id: 'submit' })}
              </Button.Ripple>

            </FormGroup>
          </Form>
        </ModalBody>

      </Modal>

    </Fragment >
  )
}

export default injectIntl(memo(DataTableServerSide))
