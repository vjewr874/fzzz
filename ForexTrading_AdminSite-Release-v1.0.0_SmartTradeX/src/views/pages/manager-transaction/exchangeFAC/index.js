import React, { memo, useState, useEffect, Fragment } from "react";
import { Card, Input, Row, Col, UncontrolledTooltip } from "reactstrap";
//icon
import { ChevronDown } from "react-feather";

//translate
import { injectIntl } from "react-intl";

//services
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { addCommas } from "@utils";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import ExchangeHistory from "../../../../services/exchangeService";
import UserService from "../../../../services/userService";
import DetailModal from "../detailModal";
import moment from "moment";

const DefaultFilter = {
  filter: {
    walletTypeBefore: "FACWallet",
  },
  skip: 0,
  limit: 20,
  order: {
    key: "createdAt",
    value: "desc",
  },
};
function ExchangeFAC({ intl, active }) {
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [exchangeData, setExchangeData] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(20);
  const [loading, setLoading] = useState(false);
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
    ExchangeHistory.findExchangeHistory(newParams)
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
        ...paramsFilter,
        searchText: value,
        skip: 0,
      };
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

  const ExchangeHistoryColumn = [
    {
      name: "ID",
      selector: "paymentExchangeTransactionId",
      width: "90px",
    },
    {
      name: intl.formatMessage({ id: "account" }),
      minWidth: "200px",
      cell: (row) => {
        const { appUserId } = row;
        return (
          <>
            <span
              className="text-dark cursor-pointer"
              id="detailUser"
              onClick={(event) => {
                event.preventDefault();
                UserService.findDetailUserById(appUserId)
                  .then((data) => {
                    setIdData(data);
                    toggleDetailOpen();
                  })
                  .catch(() => {
                    toast.error(
                      intl.formatMessage({ id: "an_error_occurred" }) +
                        " " +
                        intl.formatMessage({ id: "please_come_back_late" })
                    );
                  });
              }}
            >
              {row.username}
            </span>
            <UncontrolledTooltip placement="right" target={"detailUser"}>
              {intl.formatMessage({ id: "click_to_see_detail" })}
            </UncontrolledTooltip>
          </>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "title_member" }),
      selector: "companyName",
      minWidth: "200px",
    },
    {
      name:
        intl.formatMessage({ id: "Số FAC" }) +
        " (" +
        intl.formatMessage({ id: "FAC" }) +
        ")",
      minWidth: "200px",
      cell: (row) => {
        return <>{addCommas(parseFloat(Number(row.paymentAmount).toFixed(2)))}</>;
      },
    },
    {
      name: intl.formatMessage({ id: "wallet_receive_after" })  +
      " (" +
      intl.formatMessage({ id: "USDT" }) +
      ")",
      minWidth: "200px",
      cell: (row) => {
        return (
          <>
            {"+"}{" "}
            {addCommas(
              parseFloat(Number(row.receiveWalletBalanceAfter - row.receiveWalletBalanceBefore).toFixed(2))
            )}
          </>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "time" }),
      selector: "createdAt",
      maxWidth: "270px",
      cell: (row) => {
        const { createdAt } = row;
        return (
          <div>{(moment(createdAt)).format("HH:mm DD/MM/YYYY")}</div>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Card>
      <span className="align-middle d-sm-none">
        <h4 className="my-2">
          {intl.formatMessage({ id: "exchange_history_fac" })}
        </h4>
      </span>
        <Row>
          <Col sm={12} lg={8} />
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
          columns={ExchangeHistoryColumn}
          paginationComponent={CustomPagination}
          sortIcon={<ChevronDown size={10} />}
          data={exchangeData}
        />
      </Card>
      <DetailModal
        open={sidebarDetailOpen}
        toggleSidebar={toggleDetailOpen}
        arrData={idData}
      />
    </Fragment>
  );
}

export default injectIntl(memo(ExchangeFAC));
