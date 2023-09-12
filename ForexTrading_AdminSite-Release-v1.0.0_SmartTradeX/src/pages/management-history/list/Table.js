import React, { Fragment, useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import DataTable from "react-data-table-component";
import {
  AlignJustify,
  Box,
  Calendar,
  ChevronDown,
  Database,
  Download,
  Share,
} from "react-feather";
import {
  columnsDeposit,
  columnsWithdraw,
  columnsBetRecords,
  columnsRequestTransaction,
} from "./columns";
import {
  Card,
  Col,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import Select from "react-select";
import ModalInputId from "../../../components/Modal/management-history/ModalInputId";
// import CustomPagination from "../../../components/Pagination/Pagination";
import {
  HISTORY_LIST,
  WALLET_RECORD_TYPES,
} from "../../../constants/historyList";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import History from "../../../services/history";
import moment from "moment";
// import StatisticalService from "../../../services/statisticalService";

const statusRequests = [
  {
    label: "Tất cả",
    value: undefined,
  },
  {
    label: "Đã duyệt",
    value: "Completed",
  },
  {
    label: "Từ chối",
    value: "Canceled",
  },
  {
    label: "Chưa duyệt",
    value: "New",
  },
];
const Table = (props) => {
  const history = useHistory();
  const historyTab = HISTORY_LIST;
  // const history = useHistory()
  const location = useLocation();
  const userData = JSON.parse(window.localStorage.getItem("userData"));
  const listPermissionUser = userData.permissions.split(",");
  const searchParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(
    searchParams?.get("skip") ? +searchParams?.get("skip") : 0
  );
  const rowPerPage = 10;
  const [totalRecords, setTotalRecords] = useState(0);
  // const [filterSearchText,setFilterSearchText]=useState(searchParams?.get('searchText') ? searchParams?.get('searchText') : "")
  const [activeTab, setActiveTab] = useState(
    searchParams?.get("activeTab") ? searchParams?.get("activeTab") : "0"
  );
  const [dataHistoryList, setDataHistoryList] = useState([]);
  const [apiList, setAPIList] = useState(
    searchParams?.get("typeHistory")
      ? getNewHistoryList().find(
          (item) => item.value === searchParams?.get("typeHistory")
        ).api_list
      : getNewHistoryList()[0].api_list
  );
  const [typeHistory, setTypeHistory] = useState(
    searchParams?.get("typeHistory")
      ? searchParams?.get("typeHistory")
      : historyTab[0].value
  );
  const [statusRequest, setStatusRequest] = useState("");
  const [filterSearchText, setFilterSearchText] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataFilter, setDataFilter] = useState({
    searchText: null,
    status: null,
  });
  // const [transactionPending, setTransactionPending] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userIdModal, setUserIdModal] = useState(null);
  const [defaultValue, setDefaultValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [typeApprove, setTypeApprove] = useState(undefined);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  function getNewHistoryList() {
    if (listPermissionUser.find((item) => item === "VIEW_TRANSACTION")) {
      return historyTab || [];
    } else {
      const newHistoryTab = [];
      historyTab.forEach((tab) => {
        if (listPermissionUser.find((item) => item === tab.permission)) {
          newHistoryTab.push(tab);
        }
      });
      return newHistoryTab || [];
    }
  }

  // useEffect(() => {
  //     StatisticalService.getPaymentPending()
  //         .then(res => {
  //             if (res) {
  //                 window.localStorage.removeItem("total")
  //                 window.localStorage.setItem("total", res.totalDepositRequest + res.totalPaymentBonusRequest + res.totalWithdrawRequest )
  //                 setTransactionPending(res)
  //             }
  //         })
  // }, [dataHistoryList])

  useEffect(() => {
    const params = {
      skip: currentPage,
      limit: rowPerPage,
      startDate: filterStartDate || undefined,
      endDate: endDate || undefined,
      filter:
        {
          paymentStatus:
            typeHistory === "PaymentExchangeTransaction" ||
            typeHistory === "WalletRecord"
              ? undefined
              : statusRequest || undefined,
        } || undefined,
    };
    getHistoryList(params, apiList);
  }, [apiList]);
  const handleIsOpenModal = (trueFalse, id) => {
    setIsOpenModal(trueFalse);
    setUserIdModal(id);
  };
  const getHistoryList = (params, apiList, isNoLoading) => {
    if (!isNoLoading) {
      setIsLoading(true);
    }
    History.listHistory(params, apiList).then((res) => {
      if (res) {
        const { statusCode, data, message } = res;
        if (statusCode === 200) {
          setDataHistoryList(data.data);
          setTotalRecords(data?.total);
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
        setDataHistoryList([]);
      }
      if (!isNoLoading) {
        setIsLoading(false);
      }
    });
  };
  const handlePagination = (page) => {
    const params = {
      skip: page.selected * rowPerPage,
      limit: rowPerPage,
      filter:
        {
          paymentStatus: statusRequest || undefined,
        } || undefined,
      searchText: filterSearchText || undefined,
      startDate: filterStartDate || undefined,
      endDate: endDate || undefined,
    };
    setCurrentPage(page.selected * rowPerPage);
    getHistoryList(params, apiList);
  };

  const handleApproveRefuseRequest = (
    id,
    typeCheck,
    paymentNote,
    paymentRef,
    validateImage
  ) => {
    // if (
    //   typeHistory === "PaymentDepositTransaction" ||
    //   typeHistory === "PaymentWithdrawTransaction"
    // ) {
    //   if (
    //     paymentNote === null ||
    //     paymentNote === undefined ||
    //     paymentNote === ""
    //   ) {
    //     toast.warn("Vui lòng nhập ghi chú");
    //     return;
    //   }
    // }
    // if (validateImage) {
    //   if (
    //     typeCheck === "approve" &&
    //     (paymentRef === "" || paymentRef === undefined || paymentRef === null)
    //   ) {
    //     toast.warn("Vui lòng chọn ảnh giao dịch");
    //     return;
    //   }
    // }
    let API = "";
    if (
      typeCheck === "approve" &&
      typeHistory === "PaymentDepositTransaction"
    ) {
      API += "/PaymentDepositTransaction/approveDepositTransaction";
    }
    if (typeCheck === "refuse" && typeHistory === "PaymentDepositTransaction") {
      API += "/PaymentDepositTransaction/denyDepositTransaction";
    }
    if (
      typeCheck === "approve" &&
      typeHistory === "PaymentWithdrawTransaction"
    ) {
      API += "/PaymentWithdrawTransaction/approveWithdrawTransaction";
    }
    if (
      typeCheck === "refuse" &&
      typeHistory === "PaymentWithdrawTransaction"
    ) {
      API += "/PaymentWithdrawTransaction/denyWithdrawTransaction";
    }
    if (typeCheck === "approve" && typeHistory === "PaymentBonusTransaction") {
      API += "/PaymentBonusTransaction/approveBonusTransaction";
    }
    if (typeCheck === "refuse" && typeHistory === "PaymentBonusTransaction") {
      API += "/PaymentBonusTransaction/denyBonusTransaction";
    }
    if (
      typeCheck === "approve" &&
      typeHistory === "PaymentExchangeTransaction"
    ) {
      API += "/PaymentExchangeTransaction/approveExchangeTransaction";
    }
    if (
      typeCheck === "refuse" &&
      typeHistory === "PaymentExchangeTransaction"
    ) {
      API += "/PaymentExchangeTransaction/denyExchangeTransaction";
    }
    setIsLoadingSubmit(true);
    setIsOpenModal(false);
    History.approveRefuseRequest(
      {
        id,
        paymentRef: paymentRef || undefined,
        paymentNote: paymentNote || undefined,
      },
      API
    ).then((res) => {
      setIsLoadingSubmit(false);
      if (res) {
        const { statusCode } = res;
        if (statusCode === 200) {
          toast.success("Thành công!");
          getHistoryList(
            {
              skip: currentPage,
              limit: rowPerPage,
            },
            apiList
          );
          setIsOpenModal(false);
        } else {
          toast.warn("Đã có lỗi xảy ra!");
        }
      }
    });
  };

  const isPermissionApprove = (typePermission) => {
    return listPermissionUser.includes(
      `${
        typePermission === "PaymentDepositTransaction"
          ? "APPROVE_DEPOSIT"
          : typePermission === "PaymentWithdrawTransaction"
          ? "APPROVE_WITHDRAW"
          : typePermission === "PaymentBonusTransaction"
          ? "APPROVE_WITHDRAW"
          : ""
      }`
    );
  };

  const handleChangStatusRequest = (value, filterStartDate, endDate) => {
    dataFilter.status = value.value;
    setDataFilter(dataFilter);

    setStatusRequest(value?.value);
    const params = {
      skip: 0,
      limit: rowPerPage,
      filter:
        {
          paymentStatus: value.value || undefined,
        } || undefined,
      searchText: filterSearchText || undefined,
      startDate: filterStartDate || undefined,
      endDate: endDate || undefined,
    };
    setCurrentPage(0);
    getHistoryList(params, apiList);
  };

  const handleChangeSearch = (e, filterStartDate, endDate) => {
    dataFilter.searchText = e.target.value;
    setDataFilter(dataFilter);
    const param = {
      skip: 0,
      limit: rowPerPage,
      searchText: e.target.value || undefined,
      filter:
        {
          paymentStatus: statusRequest || undefined,
        } || undefined,
      startDate: filterStartDate || undefined,
      endDate: endDate || undefined,
    };
    setCurrentPage(0);
    setFilterSearchText(e.target.value);
    // checkParams(param)
    getHistoryList(param, apiList);
  };
  const handleFilterStartDate = (value) => {
    if (value === undefined) {
      setFilterStartDate(undefined);
      setEndDate(undefined);
    } else {
      setFilterStartDate(moment(value[0]).format());
      setEndDate(
        moment(value[1]).add(24, "hours").subtract(1, "second").format()
      );
    }
    const param = {
      skip: 0,
      limit: rowPerPage,
      startDate: value ? `${moment(value[0]).format()}` : undefined,
      endDate: value
        ? `${moment(value[1]).add(24, "hours").subtract(1, "second").format()}`
        : undefined,
      searchText: dataFilter.searchText || undefined,
      filter:
        {
          paymentStatus: dataFilter.status || undefined,
        } || undefined,
    };
    getHistoryList(param, apiList);
  };

  const handleChangeWalletRecordType = (value, filterStartDate, endDate) => {
    dataFilter.status = value.value;
    setDataFilter(dataFilter);

    setStatusRequest(value?.value);
    const params = {
      skip: 0,
      limit: rowPerPage,
      filter:
        {
          WalletRecordType: value.value || undefined,
        } || undefined,
      searchText: filterSearchText || undefined,
      startDate: filterStartDate || undefined,
      endDate: endDate || undefined,
    };
    setCurrentPage(0);
    getHistoryList(params, apiList);
  };

  const checkParams = (filterParams) => {
    const params = {};
    if (filterParams.activeTab) {
      params.activeTab = filterParams.activeTab;
    }
    if (filterParams.typeHistory) {
      params.typeHistory = filterParams.typeHistory;
    }
    const urlSearchParams = new URLSearchParams(params);
    history.replace({
      pathname: location.pathname,
      search: urlSearchParams.toString(),
    });
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

  return (
    <Fragment>
      {isLoadingSubmit ? <Loader /> : null}
      <Card className={"p-2"}>
        <div className={"container-header"}>
          <Nav tabs>
            {getNewHistoryList().map((tab, index) => (
              <NavItem key={index}>
                <NavLink
                  active={activeTab === `${index}`}
                  onClick={() => {
                    toggle(`${index}`);
                    setAPIList(tab.api_list);
                    setCurrentPage(0);
                    setTypeHistory(tab.value);
                    checkParams({
                      activeTab: `${index}`,
                      typeHistory: tab.value,
                    });
                  }}
                >
                  {index === "0" ? (
                    <Download size={14} />
                  ) : index === "1" ? (
                    <Share size={14} />
                  ) : index === "2" ? (
                    <AlignJustify size={14} />
                  ) : index === "3" ? (
                    <Box size={14} />
                  ) : (
                    <Database size={14} />
                  )}
                  {tab.label}
                  {/*{ tab.type ? `(${transactionPending?.[tab.type] || 0})`: ""}*/}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </div>

        <div className={"container-content"}>
          <div className="mb-1">
            <Row className="justify-content-between">
              <Col lg={8}>
                <Row>
                  <Col lg={4}>
                    <FormGroup>
                      <Input
                        className={"custom-input-pj"}
                        placeholder={"Tìm kiếm"}
                        onChange={(e) =>
                          handleChangeSearch(e, filterStartDate, endDate)
                        }
                        defaultValue={filterSearchText}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup style={{ position: "relative" }}>
                      <Flatpickr
                        id="startDate"
                        placeholder={"Chọn ngày"}
                        options={{
                          mode: "range",
                        }}
                        className={`form-control ${
                          !props?.disabled ? "form-control__date" : ""
                        } custom-flatpickr-pj`}
                        onChange={(date) =>
                          handleFilterStartDate(date, filterStartDate, endDate)
                        }
                        disabled={props?.disabled}
                        value={defaultValue}
                      />
                      <Calendar
                        size={20}
                        onClick={() => {
                          setDefaultValue(!defaultValue);
                          handleFilterStartDate(undefined);
                        }}
                        style={{
                          position: "absolute",
                          right: "15px",
                          transform: "translateY(calc(-100% - 10px))",
                          color: "#82868b",
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col lg={1}></Col>
              <Col lg={3}>
                {typeHistory !== "WalletRecord" &&
                  typeHistory !== "PaymentExchangeTransaction" && (
                    <FormGroup>
                      <Select
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        options={statusRequests}
                        placeholder={"Trạng thái"}
                        value={
                          statusRequests?.find(
                            (item) => item.value === statusRequest
                          ) || ""
                        }
                        onChange={(value) =>
                          handleChangStatusRequest(
                            value,
                            filterStartDate,
                            endDate
                          )
                        }
                      />
                    </FormGroup>
                  )}
                {typeHistory === "WalletRecord" && (
                  <FormGroup>
                    <Select
                      isClearable={false}
                      className="react-select"
                      classNamePrefix="select"
                      options={WALLET_RECORD_TYPES}
                      placeholder={"Loại giao dịch"}
                      value={
                        WALLET_RECORD_TYPES?.find(
                          (item) => item.value === statusRequest
                        ) || ""
                      }
                      onChange={(value) =>
                        handleChangeWalletRecordType(
                          value,
                          filterStartDate,
                          endDate
                        )
                      }
                    />
                  </FormGroup>
                )}
              </Col>
            </Row>
          </div>
          <TabContent activeTab={activeTab}>
            {historyTab.map((value, index) => (
              <TabPane tabId={`${index}`} key={index}>
                <DataTable
                  // columns={columns(typeHistory,handleApproveRefuseRequest, handleIsOpenModal,isPermissionApprove)}
                  columns={
                    activeTab === "0"
                      ? columnsDeposit(
                          typeHistory,
                          handleApproveRefuseRequest,
                          handleIsOpenModal,
                          isPermissionApprove,
                          history,
                          setTypeApprove
                        )
                      : activeTab === "1"
                      ? columnsWithdraw(
                          typeHistory,
                          handleApproveRefuseRequest,
                          handleIsOpenModal,
                          isPermissionApprove,
                          history,
                          setTypeApprove
                        )
                      : activeTab === "2"
                      ? columnsBetRecords(
                          typeHistory,
                          handleApproveRefuseRequest,
                          handleIsOpenModal,
                          isPermissionApprove,
                          history
                        )
                      : columnsRequestTransaction(
                          typeHistory,
                          handleApproveRefuseRequest,
                          handleIsOpenModal,
                          isPermissionApprove
                        )
                  }
                  noHeader
                  persistTableHead
                  data={dataHistoryList}
                  sortIcon={<ChevronDown />}
                  className="datatable-custom-project p-0"
                  noDataComponent={<h3>Không tìm thấy dữ liệu</h3>}
                  progressPending={isLoading}
                />
                <div>
                  <CustomPagination />
                </div>
              </TabPane>
            ))}
          </TabContent>
        </div>
      </Card>
      <ModalInputId
        userIdModal={userIdModal}
        isOpenModal={isOpenModal}
        handleIsOpenModal={handleIsOpenModal}
        handleApproveRefuseRequest={handleApproveRefuseRequest}
        typeApprove={typeApprove}
        typeHistory={typeHistory}
      />
    </Fragment>
  );
};
export default Table;
