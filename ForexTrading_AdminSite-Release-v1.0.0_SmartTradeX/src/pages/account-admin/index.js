// @ts-nocheck
// ** React Imports
// @ts-ignore
import React, { useState, useEffect, memo } from "react";
// ** Store & Actions
import { toast } from "react-toastify";
import { MoreVertical, Lock, FileText, Archive } from "react-feather";
import { useForm } from "react-hook-form";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import Service from "../../services/request";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
// @ts-ignore
import {
  Card,
  Input,
  Label,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  Form,
  Badge,
} from "reactstrap";

import "../../components/Pagination/style/pagination.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ModalDeleteAccount from "../../components/Modal/account-admin/ModalDeleteAccount";
import Select from "react-select";
import Loader from "../../components/Loader";
const statusOptions = [
  { value: "", label: "Tất cả trạng thái" },
  { value: 1, label: "Hoạt động" },
  { value: 0, label: "Khoá" },
];

const DefaultFilter = {
  filter: {
    active: undefined,
  },
  skip: 0,
  limit: 10,
  order: {
    key: "createdAt",
    value: "desc",
  },
};
const statusObj = {
  active: "light-success",
};

const DataTableServerSide = () => {
  // const [active, setActive] = useState('1')
  // const toggle = tab => {
  //   if (active !== tab) {
  //     setActive(tab)
  //   }
  // }
  // ** Store Vars
  const serverSideColumns = [
    {
      name: "ID",
      minWidth: "100px",
      selector: "staffId",
      maxWidth: "100px",
      cell: (row) => (
        <Link
          to={`/account-admin/detail/${row?.staffId}`}
          className="user-name text-truncate mb-0"
        >
          <span>{row?.staffId}</span>
        </Link>
      ),
    },
    {
      name: "TÀI KHOẢN",
      minWidth: "150px",
      cell: (row) => row.username,
    },
    {
      name: "HỌ VÀ TÊN",
      selector: "username",
      minWidth: "150px",
      cell: (row) => {
        const { firstName } = row;
        return (
          <div>
            {firstName || ''}
          </div>
        );
      },
    },
    // {
    //   name: 'Email',
    //   sortable: true,
    //   minWidth: '200px',
    //   cell:row => row.email
    // },
    {
      name: "SỐ ĐIỆN THOẠI",
      selector: "phoneNumber",
      cell: (row) => row.phoneNumber || '',
      minWidth: "150px",
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
      name: "VAI TRÒ",
      selector: "roleName",
      minWidth: "150px",
    },
    {
      name: "TRẠNG THÁI",
      minWidth: "150px",
      center: true,
      cell: (row) => (
        <Badge
          className="text-capitalize"
          color={statusObj[row?.active === "1" ? "active" : ""]}
        >
          {row?.active === "1"
            ? "Hoạt động"
            : row?.active === "0"
            ? "Đã khoá"
            : ""}
        </Badge>
      ),
    },
    {
      name: "HÀNH ĐỘNG",
      minWidth: "150px",
      maxWidth: "150px",
      right: true,
      cell: (row) => (
        <>
          <Lock
            color={
              row?.active === "0"
                ? "#E74160"
                : row?.active === "1"
                ? "#18A957"
                : ""
            }
            size={28}
            style={{ paddingRight: "8px", cursor: "pointer" }}
            onClick={() => handleActiveUser(row.active, row.staffId)}
          />
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag={Link}
                to={`/account-admin/detail/${row.staffId}`}
                className="w-100"
              >
                <FileText size={14} className="mr-50" />
                <span className="align-middle">Chi tiết</span>
              </DropdownItem>

              <DropdownItem
                tag={Link}
                to={`/account-admin/edit/${row.staffId}`}
                className="w-100"
              >
                <Archive size={14} className="mr-50" />
                <span className="align-middle">Chỉnh sửa</span>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setIsOpenModal(true);
                  handleDataToDelete(row?.staffId, row?.username);
                }}
                className="w-100"
              >
                <Archive size={14} className="mr-50" />
                <span className="align-middle">Xoá</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      ),
    },
  ];
  const history = useHistory();
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  // ** States
  const [listRoles, setListRoles] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [total, setTotal] = useState(20);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [searchValue, setSearchValue] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState({
    id: null,
    name: null,
  });
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterStatusId, setFilterStatusId] = useState(null);
  const [filterRoles, setFilterRoles] = useState(null);
  const [filterRolesId, setFilterRolesId] = useState(null);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  // const [searchField, setSearchField] = useState( {
  //   value: "username",
  //   label: "Tài khoản"
  // },)

  // ** React hook form vars
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {},
  });
  const [userData, setUserData] = useState({});

  function getData(params, isNoLoading) {
    const newParams = {
      ...params,
    };
    if (!isNoLoading) {
      setIsLoading(true);
    }
    Object?.keys(newParams?.filter).forEach((key) => {
      if (!newParams?.filter[key] || newParams?.filter[key] === "") {
        delete newParams?.filter[key];
      }
    });

    // @ts-ignore
    Service.send({
      method: "POST",
      path: "/Staff/getListStaff",
      data: newParams,
      query: null,
    }).then((res) => {
      if (res) {
        const { statusCode, data, message } = res;
        setParamsFilter(newParams);
        if (statusCode === 200) {
          setTotal(data.total);
          setItems(data.data);
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
        setTotal(1);
        setItems([]);
      }
      if (!isNoLoading) {
        setIsLoading(false);
      }
      getListRole();
    });
  }

  function getListRole() {
    // @ts-ignore
    Service.send({
      method: "POST",
      path: "/Role/getList",
      data: {
        filter: {},
        skip: 0,
        limit: 10,
        order: {
          key: "createdAt",
          value: "desc",
        },
      },
      query: null,
    }).then((res) => {
      if (res) {
        const { statusCode, data, message } = res;
        if (statusCode === 200) {
          const newData = data.data.filter((item) => item.roleId !== 1);
          setListRoles([{ roleId: undefined, roleName: "All" }, ...newData]);
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      }
    });
  }

  function handleUpdateData(item, messageSuccess) {
    // @ts-ignore
    Service.send({
      method: "POST",
      path: "/Staff/updateStaffById",
      data: item,
      query: null,
    }).then((res) => {
      if (res) {
        const { statusCode, message } = res;
        if (statusCode === 200) {
          toast.success(messageSuccess || "Tác vụ thành công!");
          getData(paramsFilter);
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      }
    });
  }

  const handleDataToDelete = (id, name) => {
    dataToDelete.id = id;
    dataToDelete.name = name;
    setDataToDelete({ ...dataToDelete });
  };
  function handleAddData(item, messageSuccess) {
    const token = window.localStorage.getItem("accessToken");

    if (token) {
      const newToken = token.replace(/"/g, "");

      // @ts-ignore
      Service.send({
        method: "POST",
        path: "/Staff/insertStaff",
        data: item,
        query: null,
        headers: {
          Authorization: `Bearer ` + newToken,
        },
      }).then((res) => {
        if (res) {
          const { statusCode, message } = res;
          if (statusCode === 200) {
            toast.success(messageSuccess || "Action Add User successful!");
            getData(paramsFilter);
          } else {
            toast.warn(message || "Đã có lỗi xảy ra!");
          }
        }
      });
    }
  }

  // ** Get data on mount
  useEffect(() => {
    getData(paramsFilter);
  }, []);

  function handleActiveUser(value, id) {
    if (value === "0") {
      value = 1;
    } else value = 0;

    const params = {
      id: id,
      data: {
        active: value,
      },
    };
    setIsLoadingSubmit(true);
    Service.send({
      method: "POST",
      path: "/Staff/updateStaffById",
      data: params,
      headers: {},
    }).then((res) => {
      setTimeout(() => setIsLoadingSubmit(false), 500);
      if (res) {
        const { statusCode, message } = res;
        if (statusCode === 200) {
          toast.success("Cập nhật thành công");
          getData(paramsFilter);
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
        setItems([]);
      }
    });
  }
  // ** Function to handle Pagination and get data
  const handlePagination = (page) => {
    const newParams = {
      ...paramsFilter,
      skip: page.selected * paramsFilter.limit,
    };
    getData(newParams);
    setCurrentPage(page.selected + 1);
  };

  function handledFilterStatus(e) {
    setFilterStatus(e.label);
    setFilterStatusId(e.value);
    const newParams = {
      ...paramsFilter,
      filter: {
        active: e.value + "",
        roleId: filterRolesId || undefined,
      },
    };
    getData(newParams);
  }
  function handledFilterRoles(e) {
    setFilterRolesId(e.roleId);
    setFilterRoles(e.roleName);
    const newParams = {
      ...paramsFilter,
      filter: {
        active: filterStatusId || undefined,
        roleId: e.roleId,
      },
    };
    getData(newParams);
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(total / rowsPerPage).toFixed(0));

    return count > 1 ? (
      <div id={"pagination"}>
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          breakLabel="..."
          pageCount={count || 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          activeClassName="active"
          forcePage={currentPage !== 0 ? currentPage - 1 : 0}
          onPageChange={(page) => handlePagination(page)}
          pageClassName={"page-item"}
          nextLinkClassName={"page-link"}
          nextClassName={"page-item next"}
          previousClassName={"page-item prev"}
          previousLinkClassName={"page-link"}
          pageLinkClassName={"page-link"}
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName={
            "pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
          }
        />
      </div>
    ) : (
      ""
    );
  };

  const handleOnchange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const deleteAccountId = (id) => {
    setIsLoadingSubmit(true);
    Service.send({
      method: "POST",
      path: "/Staff/deleteStaffById",
      data: { id },
      headers: {},
    }).then((res) => {
      setTimeout(() => setIsLoadingSubmit(false), 500);
      if (res) {
        const { statusCode, message } = res;
        if (statusCode === 200) {
          toast.success("Xoá thành công");
          getData(paramsFilter);
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
        setItems([]);
      }
    });
  };
  return (
    <>
      {isLoadingSubmit ? <Loader /> : null}
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
        <Row className="mx-0 mt-1 mb-50">
          <Col lg="3" className={" mb-1"}>
            <Select
              className="react-select"
              classNamePrefix="select"
              options={statusOptions}
              placeholder={"Trạng thái"}
              value={statusOptions?.find((item) => item.label === filterStatus)}
              onChange={(e) => {
                handledFilterStatus(e);
              }}
            />
            {/*  <Input onChange={(e) => {*/}
            {/*  const { name, value } = e.target*/}
            {/*    console.log(e.target)*/}
            {/*  handleFilterChange(name, value)*/}
            {/*}} type='select' value={paramsFilter.filter ? (paramsFilter.filter.active || '') : ''} name='active'>*/}
            {/*  {*/}
            {/*    statusOptions.map(item => {*/}
            {/*      return <option value={item.value}>{item.label}</option>*/}
            {/*    })*/}
            {/*  }*/}
            {/*</Input>*/}
          </Col>
          <Col lg={3} className={" mb-1"}>
            <Select
              getOptionValue={(option) => option?.roleId}
              getOptionLabel={(option) => option?.roleName}
              className="react-select"
              classNamePrefix="select"
              options={listRoles}
              placeholder={"Vai trò"}
              value={listRoles?.find((item) => item.roleName === filterRoles)}
              onChange={(e) => {
                handledFilterRoles(e);
              }}
            />
          </Col>
          {/*<Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='3'>*/}
          {/*  <Label className='mr-1' for='search-input'>*/}
          {/*    Tìm*/}
          {/*  </Label>*/}
          {/* */}

          {/*    <Input*/}
          {/*      className='dataTable-filter'*/}
          {/*      type='text'*/}
          {/*      id='search-input'*/}
          {/*      value={searchValue}*/}
          {/*      onChange={(e) => { handleFilter(e) }}*/}
          {/*    />*/}

          {/*</Col>*/}
          <Col lg={4} className={" mb-1"} />
          <Col lg="2" className={"text-right mb-1"}>
            <Button
              color="primary"
              onClick={() => {
                history.push("/account-admin/create");
              }}
            >
              Tạo mới
            </Button>
          </Col>
          <Col sm="4"></Col>
        </Row>
        <DataTable
          noHeader
          pagination
          paginationServer
          className="datatable-custom-project mt-0 p-1"
          columns={serverSideColumns}
          noDataComponent={<h3>Không tìm thấy dữ liệu</h3>}
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
            {userData.staffId ? "Sửa" : "Thêm"} Thông Tin
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={handleSubmit((data) => {
                if (userData.staffId) {
                  if (data) {
                    delete data["username"];
                    delete data["password"];
                  }
                  handleUpdateData({
                    id: userData.staffId,
                    data,
                  });
                } else {
                  handleAddData(data);
                }

                setModal(false);
              })}
            >
              {
                // @ts-ignore
                !userData.staffId ? (
                  <>
                    <FormGroup>
                      <Label for="username">Tài khoản</Label>
                      <Input
                        id="username"
                        name="username"
                        innerRef={register({ required: true })}
                        invalid={errors.username && true}
                        placeholder="Bruce01"
                        // @ts-ignore
                        value={userData.username || ""}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          handleOnchange(name, value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Mật khẩu</Label>
                      <Input
                        id="password"
                        name="password"
                        innerRef={register({ required: true })}
                        invalid={errors.password && true}
                        placeholder="****"
                        // @ts-ignore
                        value={userData.password || ""}
                        type="password"
                        onChange={(e) => {
                          const { name, value } = e.target;
                          handleOnchange(name, value);
                        }}
                      />
                    </FormGroup>
                  </>
                ) : null
              }
              <FormGroup>
                <Label for="firstName">Họ</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  innerRef={register({ required: true })}
                  invalid={errors.firstName && true}
                  placeholder="Bruce"
                  // @ts-ignore
                  value={userData.firstName || ""}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    handleOnchange(name, value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Tên</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  innerRef={register({ required: true })}
                  invalid={errors.lastName && true}
                  placeholder="Wayne"
                  // @ts-ignore
                  value={userData.lastName || ""}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    handleOnchange(name, value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  innerRef={register({ required: true })}
                  invalid={errors.email && true}
                  placeholder="Wayne@gmail.com"
                  // @ts-ignore
                  value={userData.email || ""}
                  type="email"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    handleOnchange(name, value);
                  }}
                />
              </FormGroup>

              <FormGroup>
                <Label for="phoneNumber">Số điên thoại</Label>
                <Input
                  innerRef={register({ required: true })}
                  invalid={errors.lastNameBasic && true}
                  name="phoneNumber"
                  placeholder="+84943881692"
                  options={{ phone: true, phoneRegionCode: "VI" }}
                  // @ts-ignore
                  value={userData.phoneNumber || ""}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    handleOnchange(name, value);
                  }}
                />
              </FormGroup>

              <FormGroup>
                <Label>Vai trò</Label>
                <Input
                  type="select"
                  name="roleId"
                  innerRef={register({ required: true })}
                  invalid={errors.roleId && true}
                  // @ts-ignore
                  value={userData.roleId}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    handleOnchange(name, value);
                  }}
                >
                  {listRoles.map((item, index) => (
                    <option value={item.roleId} key={index}>
                      {item.roleName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              {
                // @ts-ignore
                userData.staffId ? (
                  <>
                    <FormGroup>
                      <Label>Trạng thái</Label>
                      <Input
                        type="select"
                        name="active"
                        innerRef={register({ required: true })}
                        invalid={errors.active && true}
                        // @ts-ignore
                        value={userData.active || 1}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          handleOnchange(name, value);
                        }}
                      >
                        <option value={1}>Hoạt động</option>
                        <option value={0}>Khoá</option>
                      </Input>
                    </FormGroup>
                  </>
                ) : null
              }
              <FormGroup className="d-flex mb-0">
                <Button className="mr-1" color="primary" type="submit">
                  Lưu
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        <ModalDeleteAccount
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          deleteAccountId={deleteAccountId}
          dataToDelete={dataToDelete}
        />
        {/* </TabPane>
         

        </TabContent> */}
      </Card>
    </>
  );
};

export default memo(DataTableServerSide);
