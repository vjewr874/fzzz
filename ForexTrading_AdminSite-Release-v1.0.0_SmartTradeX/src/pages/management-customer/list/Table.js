import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { columns } from "./columns";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import Customer from "../../../services/customer";
import Select from "react-select";
import ModalManageCustomer from "../../../components/Modal/management-customer/ModalManageCustomer";
import Service from "../../../services/request";
import Loader from "../../../components/Loader";
const statusCustomers = [
  {
    label: "Trạng thái",
    value: undefined,
  },
  {
    label: "Hoạt động",
    value: 1,
  },
  {
    label: "Đã khoá",
    value: 0,
  },
];
const typeVipChoose = [
  { value: 1, label: "Thành Viên" },
  { value: 2, label: "Hộ Kinh Doanh" },
  { value: 3, label: "Công Ty" },
  { value: 4, label: "Doanh nghiệp" },
  { value: 5, label: "Tập đoàn" },
];
const Table = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [lotteryList, setLotteryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    searchParams?.get("skip") ? +searchParams?.get("skip") : 0
  );
  const rowPerPage = 10;
  const [totalRecords, setTotalRecords] = useState(0);
  const [filterSearchText, setFilterSearchText] = useState(
    searchParams?.get("searchText") ? searchParams?.get("searchText") : ""
  );
  const [statusCustomer, setStatusCustomer] = useState(
    searchParams?.get("active") ? +searchParams?.get("active") : undefined
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModalUpgradeLevel, setIsOpenModalUpgradeLevel] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [userIdModal, setUserIdModal] = useState(null);
  const [userDataAll, setUserDataAll] = useState({});
  const [typeVip, setTypeVip] = useState(1);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  useEffect(() => {
    const params = {
      skip: currentPage,
      limit: rowPerPage,
      searchText: filterSearchText || undefined,
      filter:
        {
          active: statusCustomer,
        } || undefined,
    };
    getCustomerList(params);
  }, []);

  const checkParams = (filterParams) => {
    const params = {};
    if (filterParams.skip) {
      params.skip = filterParams.skip;
    }
    if (filterParams.searchText) {
      params.searchText = filterParams.searchText;
    }
    if (filterParams.filter.active?.toString()) {
      params.active = filterParams.filter.active.toString();
    }
    const urlSearchParams = new URLSearchParams(params);
    history.replace({
      pathname: location.pathname,
      search: urlSearchParams.toString(),
    });
  };

  const handleIsOpenModal = (trueFalse, title, id) => {
    setIsOpenModal(trueFalse);
    setTitleModal(title);
    setUserIdModal(id);
  };

  const getCustomerList = (params, isNoLoading) => {
    if (!isNoLoading) {
      setIsLoading(true);
    }
    Customer.listCustomer(params).then((res) => {
      if (res) {
        const { statusCode, data, message } = res;
        if (statusCode === 200) {
          setLotteryList(data.data);
          setTotalRecords(data?.total);
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
        setLotteryList([]);
      }
      if (!isNoLoading) {
        setIsLoading(false);
      }
    });
    setLotteryList([{}]);
  };
  const handlePagination = (page) => {
    const params = {
      skip: page?.selected * rowPerPage,
      limit: rowPerPage,
      searchText: filterSearchText || undefined,
      filter:
        {
          active: statusCustomer,
        } || undefined,
    };
    checkParams(params);
    setCurrentPage(page?.selected * rowPerPage);
    getCustomerList(params);
  };
  const CustomPagination = () => {
    return (
      <Pagination
        handlePagination={handlePagination}
        currentPage={currentPage}
        rowsPerPage={rowPerPage}
        total={totalRecords}
      />
    );
  };

  const handleChangeSearch = (e) => {
    const param = {
      skip: 0,
      limit: rowPerPage,
      searchText: e.target.value || undefined,
      filter:
        {
          active: statusCustomer,
        } || undefined,
    };
    setCurrentPage(0);
    setFilterSearchText(e.target.value);
    checkParams(param);
    getCustomerList(param);
  };

  const handleChangeStatusCustomer = (value) => {
    setStatusCustomer(value.value);
    const param = {
      skip: 0,
      limit: rowPerPage,
      filter:
        {
          active: value.value,
        } || undefined,
      searchText: filterSearchText || undefined,
    };
    checkParams(param);
    setCurrentPage(0);
    getCustomerList(param);
  };

  const handleIncreaseDecreasePoint = (value) => {
    setIsOpenModal(false);
    const params = {
      appUserId: userIdModal,
      paymentAmount: value.paymentAmount,
      walletType: value.typeWallet,
    };
    setIsLoadingSubmit(true);
    Customer.changeIncreaseDecreasePoint(params, value.type).then((res) => {
      setIsLoadingSubmit(false);
      if (res) {
        const { statusCode, message } = res;
        if (statusCode === 200) {
          toast.success("Thành công!");
          getCustomerList({
            skip: currentPage,
            limit: rowPerPage,
            searchText: filterSearchText || undefined,
            filter:
              {
                active: statusCustomer,
              } || undefined,
          });
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
        setLotteryList([]);
      }
    });
  };

  function handleActiveUser(value, id) {
    if (value === 0) {
      value = 1;
    } else value = 0;

    const params = {
      id: id,
      data: {
        active: value,
      },
    };
    setIsLoadingSubmit(true);
    Customer.updateDetailCustomer(params).then((res) => {
      setIsLoadingSubmit(false);
      if (res) {
        const { statusCode, message } = res;
        if (statusCode === 200) {
          getCustomerList({
            skip: currentPage,
            limit: rowPerPage,
            filter:
              {
                active: statusCustomer,
              } || undefined,
            searchText: filterSearchText || undefined,
          });
          toast.success("Thành công");
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
      }
    });
  }

  function handleUpgradeVip() {
    setIsLoadingSubmit(true);
    setIsOpenModalUpgradeLevel(false);
    Service.send({
      method: "POST",
      path: "/AppUsers/updateUserById",
      data: {
        id: userDataAll.appUserId,
        data: {
          appUserMembershipId: typeVip,
        },
      },
      query: null,
    }).then((res) => {
      setIsLoadingSubmit(false);
      if (res) {
        const { statusCode, message } = res;
        if (statusCode === 200) {
          toast.success("Nâng cấp VIP thành công!");
          setIsOpenModalUpgradeLevel(false);
          getCustomerList({
            skip: currentPage,
            limit: rowPerPage,
            searchText: filterSearchText || undefined,
            filter:
              {
                active: statusCustomer,
              } || undefined,
          });
        } else {
          toast.warn(message || "Something was wrong!");
        }
      }
    });
  }
  return (
    <Fragment>
      {isLoadingSubmit ? <Loader /> : null}
      <Card className={"p-2"}>
        <div className={"container-header"}>
          <Row className={"justify-content-between mb-1"}>
            <Col lg={4} md={4} xs={12}>
              <FormGroup>
                <Input
                  className={"custom-input-pj"}
                  placeholder={"Tìm kiếm"}
                  onChange={handleChangeSearch}
                  defaultValue={filterSearchText}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={2} xs={12}>
              <FormGroup>
                <Select
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={statusCustomers}
                  placeholder={"Trạng thái"}
                  value={
                    statusCustomers?.find(
                      (item) => item.value === statusCustomer
                    ) || ""
                  }
                  onChange={(value) => handleChangeStatusCustomer(value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
        <DataTable
          columns={columns(
            handleIsOpenModal,
            handleActiveUser,
            setIsOpenModalUpgradeLevel,
            setUserDataAll
          )}
          noHeader
          persistTableHead
          data={lotteryList}
          sortIcon={<ChevronDown />}
          className="datatable-custom-project"
          noDataComponent={<h3>Không tìm thấy dữ liệu</h3>}
          progressPending={isLoading}
        />
        <div>
          <CustomPagination />
        </div>
      </Card>
      <ModalManageCustomer
        isOpen={isOpenModal}
        handleIsOpenModal={handleIsOpenModal}
        title={titleModal}
        handleIncreaseDecreasePoint={handleIncreaseDecreasePoint}
      />
      <Modal
        isOpen={isOpenModalUpgradeLevel}
        toggle={() => setIsOpenModalUpgradeLevel(false)}
        className={`modal-dialog-centered `}
      >
        <ModalHeader toggle={() => setIsOpenModalUpgradeLevel(false)}>
          Nâng cấp vip
        </ModalHeader>
        <ModalBody>
          <Form
          //     onSubmit={handleSubmit((data) => {
          //     handleUpgradeVip({
          //         id: userDataAll.appUserId,
          //         data:{
          //             appUserMembershipId:typeVip
          //         }
          //     })
          //     setIsOpenModalUpgradeLevel(false)
          // })}
          >
            <FormGroup style={{ marginBottom: "16px" }}>
              <Label for="pointAmount">Loại thành viên</Label>
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={typeVipChoose}
                placeholder={"Trạng thái"}
                value={
                  typeVipChoose?.find((item) => item.value === typeVip) || ""
                }
                onChange={(value) => setTypeVip(value.value)}
              />
            </FormGroup>

            <FormGroup className="d-flex mb-0">
              <Button
                className="mr-1"
                color="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleUpgradeVip();
                }}
              >
                Xác nhận
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};
export default Table;
