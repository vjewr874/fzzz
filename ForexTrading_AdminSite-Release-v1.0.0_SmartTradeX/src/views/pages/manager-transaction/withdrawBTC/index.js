import React, { memo, useState, useEffect, Fragment } from "react";
import {
  Card,
  Input,
  Row,
  Col,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
  Button,
} from "reactstrap";
//icon
import {
  CheckCircle,
  ChevronDown, Copy, Eye, XOctagon,
} from "react-feather";

//translate
import { injectIntl } from "react-intl";

//services
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { toPlainString } from "@utils";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import WithdrawHistory from "../../../../services/withdrawHistoryService";
import moment from "moment";
import DetailWithdrawBTCHistory from "./detailWithdrawBTC";


const DefaultFilter = {
  filter: {
    "walletType": "BTCWallet"
  },
  skip: 0,
  limit: 20,
  order: {
    key: "createdAt",
    value: "desc",
  },
};
function WithdrawBTC({ intl, active }) {
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [exchangeData, setExchangeData] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(20);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("allStatus");
  const [idData, setIdData] = useState([]);
  const [sidebarDetailOpen, setSidebarDetailOpen] = useState(false);
  const toggleDetailOpen = () => {
    setSidebarDetailOpen(!sidebarDetailOpen);
  };

  function getData(params) {
    if (loading) {
      return;
    }
    setLoading(true);
    const newParams = {
      ...params,
    };
    Object.keys(newParams.filter).forEach((key) => {
      if (!newParams.filter[key] || newParams.filter[key] === "") {
        delete newParams.filter[key];
      }
    });
    WithdrawHistory.findWithdrawHistory(newParams)
      .then((result) => {
        setTotal(result.total);
        setExchangeData(result.data);
      })
      .catch((err) => {
        toast.warn(
          intl.formatMessage(
            { id: "actionFailed" },
            { action: intl.formatMessage({ id: "update" }, err) }
          )
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getData(paramsFilter);
  }, [active]);

  const handlePagination = (page) => {
    const newParams = {
      ...paramsFilter,
      skip: page.selected * paramsFilter.limit,
    };
    getData(newParams);
    setParamsFilter(newParams);
  };

  const handleValue = (status) => {
    switch (status) {
      case "Completed":
        return intl.formatMessage({ id: "Completed" });
      case "New":
        return intl.formatMessage({ id: "New" });
      case "Canceled":
        return intl.formatMessage({ id: "Canceled" });
      default:
        return intl.formatMessage({ id: "allStatus" });
    }
  };
  const handleChangeStatus = (id) => {
    let newParams = {
      ...paramsFilter,
      filter: {
        ...paramsFilter.filter,
      },
      skip: 0,
    };
    if (id !== "allStatus") {
      newParams.filter.paymentStatus = id;
    } else {
      newParams.filter.paymentStatus = null;
    }
    switch (id) {
      case "allStatus":
        setStatus("allStatus");
        break;
      case "Completed":
        setStatus("Completed");
        break;
      case "New":
        setStatus("New");
        break;
      case "Canceled":
        setStatus("Canceled");
        break;
      default:
        break;
    }
    setParamsFilter(newParams);
    getData(newParams, false);
  };
  
  const CustomPagination = () => {
    const count = Number(Math.ceil(total / paramsFilter.limit).toFixed(0));
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={paramsFilter.skip / paramsFilter.limit}
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
    );
  };
  //searchType
  const getDataSearch = (params) => {
    getData(params);
  };
  const handleFilter = (e) => {
    const { value } = e.target;
    if (value === "") {
        getDataSearch(DefaultFilter);
        setParamsFilter(DefaultFilter);
      } else {
        let newParams = {
          filter: {
            ...paramsFilter.filter,
          },
          searchText: value,
          skip: 0,
        };
        switch (status) {
          case "allStatus":
            newParams.filter.paymentStatus = null;
            break;
          case "Completed":
            newParams.filter.paymentStatus = "Completed";
            break;
          case "New":
            newParams.filter.paymentStatus = "New";
            break;
          case "Canceled":
            newParams.filter.paymentStatus = "Canceled";
            break;
          default:
            break;
        }
        setParamsFilter(newParams);
        getDataSearch(newParams);
      }
  };
  const onKeydown = (e) => {
    if (e.key === "Enter") {
      handleFilter(e);
    }
  };
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getPaymentStatusDescription = (status) => {
    switch (status) {
      case "Completed":
        return intl.formatMessage({ id: "Completed" });
      case "New":
        return intl.formatMessage({ id: "New" });
      case "Canceled":
        return intl.formatMessage({ id: "Canceled" });
      default:
        return "N/A";
    }
  };

  const getPaymentStatusColorType = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "New":
        return "warning";
      case "Canceled":
        return "danger";
      default:
        return "warning";
    }
  };

  function handleApprove(row) {
    const params = {
      id: row.paymentWithdrawTransactionId,
    };
    WithdrawHistory.approveWithdrawTransaction(params)
      .then(() => {
        getData(paramsFilter);
        toast.success(
          intl.formatMessage({ id: "update_approve_withdraw_success" })
        );
      })
      .catch((err) => {
        toast.success(intl.formatMessage({ id: "actionFailed" }), err);
      });
  }

  const handleRefused = (row) => {
    const params = {
      id: row.paymentWithdrawTransactionId,
    };
    WithdrawHistory.denyWithdrawTransaction(params)
      .then((result) => {
        getData(paramsFilter);
        toast.warn(
          intl.formatMessage({ id: "update_deny_withdraw_success" })
        );
      })
      .catch((err) => {
        toast.warn(intl.formatMessage({ id: "actionFailed" }, err));
      });
  };

  const elements = (row) => {
    if (row.paymentStatus === "New") {
      return (
        <div className="d-flex mt-50">
          <CheckCircle
            className="text-success"
            cursor="pointer"
            size={17}
            id={"approveBTC"}
            onClick={() => handleApprove(row)}
          />
          <UncontrolledTooltip placement="top" target={"approveBTC"}>
            {intl.formatMessage({ id: "approve_withdraw" })}
          </UncontrolledTooltip>

          <XOctagon
            className="ml-50 text-danger"
            cursor="pointer"
            size={17}
            id={"cancelBTC"}
            onClick={() => handleRefused(row)}
          />
          <UncontrolledTooltip placement="top" target={"cancelBTC"}>
            {intl.formatMessage({ id: "deny_withdraw" })}
          </UncontrolledTooltip>
        </div>
      );
    } else {
      return (
        <div className="d-flex mt-50">
          <CheckCircle color="transparent" size={17} />
          <XOctagon className="ml-50 " color="transparent" size={17} />
        </div>
      );
    }
  };

  const WithdrawHistoryColumn = [
    {
      name: "ID",
      selector: "paymentWithdrawTransactionId",
      width: "80px",
    },
    {
      name: intl.formatMessage({ id: "account" }),
      selector: "username",
      minWidth: "150px",
    },
    // {
    //   name: "Email",
    //   selector: "email",
    //   minWidth: "200px",
    // },
    {
      name: intl.formatMessage({ id: "title_member" }),
      selector: "companyName",
      minWidth: "200px",
    },
    {
      name: intl.formatMessage({ id: "phoneNumber" }),
      selector: "phoneNumber",
      maxWidth: "200px",
    },
    {
      name: intl.formatMessage({ id: "payment_amount" })+ " (" + intl.formatMessage({ id: "BTC" }) + ")",
      maxWidth: "150px",
      cell: (row) => {
        return <div>{row.paymentAmount ? parseFloat(Number(row.paymentAmount).toFixed(6)) : ""}</div>;
      },
    },
    {
      name: intl.formatMessage({ id: "diachiviBTC" }),
      minWidth: "250px",
      cell: (row) => {
        const { diachiviBTC } = row;
        return (
          <div>
            <Button
              className="mr-1 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(diachiviBTC);
                toast.success(intl.formatMessage({ id: "copied" }));
              }}
              outline
              color="primary"
            >
              <Copy size={15} id="copy" className="text-primary" />
              {/* <UncontrolledTooltip placement="top" target={"copy"}>
                {intl.formatMessage({ id: "copy" })}
              </UncontrolledTooltip> */}
            </Button>
            <span>{diachiviBTC.substring(0, 3) + " ... " + diachiviBTC.substring(diachiviBTC.length - 5)}</span>
          </div>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "time" }),
      selector: "createdAt",
      maxWidth: "200px",
      cell: (row) => {
        const { createdAt } = row;
        return <div>{(moment(createdAt)).format("HH:mm DD/MM/YYYY")}</div>;
      },
    },
    {
      name: intl.formatMessage({ id: "status" }),
      selector: "paymentStatus",
      maxWidth: "150px",
      cell: (row) => {
        return (
          <Badge color={getPaymentStatusColorType(row.paymentStatus)}>
            {getPaymentStatusDescription(row.paymentStatus)}
          </Badge>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "action" }),
      selector: "action",
      maxWidth: "150px",
      cell: (row) => {
        const { paymentWithdrawTransactionId } = row;
        return (
          <div className="d-flex align-items-center">
            <div className="mb-50">{elements(row)}</div>
            <span
              className="full-width ml-2 cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                WithdrawHistory.findDetailWithdrawHistory(
                  paymentWithdrawTransactionId
                ).then((data) => {
                  setIdData(data);
                  toggleDetailOpen();
                });
              }}
            >
              <Eye size={15} id={"detail"}/>{" "}
              <UncontrolledTooltip placement="top" target={"detail"}>
            {intl.formatMessage({ id: "detail" })}
          </UncontrolledTooltip>
            </span>
          </div>
        );
      },
    },
  ];

  const onReloadData = () => {
    let newParam = { ...paramsFilter };
    setParamsFilter(newParam);
    getData(newParam);
  };

  return (
    <Fragment>
      <Card>
      <span className="align-middle d-sm-none">
        <h4 className="my-2">
          {intl.formatMessage({ id: "withdraw_history_btc" })}
        </h4>
      </span>
        <Row>
        <Col sm={12} lg={8}>
            <UncontrolledDropdown className="mb-1">
              <DropdownToggle color="primary" caret outline>
                {handleValue(status)}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  className="full-width"
                  value="allStatus"
                  onClick={() => handleChangeStatus("allStatus")}
                >
                  {intl.formatMessage({ id: "allStatus" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="Completed"
                  onClick={() => handleChangeStatus("Completed")}
                >
                  {intl.formatMessage({ id: "Completed" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="New"
                  onClick={() => handleChangeStatus("New")}
                >
                  {intl.formatMessage({ id: "New" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="Canceled"
                  onClick={() => handleChangeStatus("Canceled")}
                >
                  {intl.formatMessage({ id: "Canceled" })}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
          <Col className="mb-1" sm={12} lg={4}>
            <Input
              value={search}
              onChange={onChangeSearch}
              onKeyDown={onKeydown}
              placeholder={intl.formatMessage({ id: "search" })}
            />
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          paginationServer
          highlightOnHover
          persistTableHead
          noDataComponent={<span className="mt-2">{intl.formatMessage({ id: "table_empty" })}</span>}
          className="react-dataTable"
          columns={WithdrawHistoryColumn}
          paginationComponent={CustomPagination}
          sortIcon={<ChevronDown size={10} />}
          data={exchangeData}
        />
      </Card>
      <DetailWithdrawBTCHistory onReloadData={onReloadData} open={sidebarDetailOpen} toggleSidebar={toggleDetailOpen} arrData={idData}/>
    </Fragment>
  );
}

export default injectIntl(memo(WithdrawBTC));
