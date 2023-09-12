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
import { toPlainString } from "@utils";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import WalletRecordHistory from "../../../../services/walletRecordService";
import moment from "moment";

const DefaultFilter = {
  filter: {
    walletType: "BTCWallet",
  },
  skip: 0,
  limit: 20,
  order: {
    key: "createdAt",
    value: "desc",
  },
};
function RewardBTC({ intl, active }) {
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [rewardData, setRewardData] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(20);
  const [loading, setLoading] = useState(false);

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
    WalletRecordHistory.findWalletRecordHistory(newParams)
      .then((result) => {
        setTotal(result.total);
        setRewardData(result.data);
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
      name: intl.formatMessage({ id: "title_member" }),
      selector: "companyName",
      maxWidth: "250px",
    },
    {
      name: intl.formatMessage({ id: "account" }),
      selector: "username",
      minWidth: "200px",
    },
    // {
    //   name: intl.formatMessage({ id: "title_member" }),
    //   selector: "companyName",
    //   minWidth: "200px",
      
    // },
    {
      name: intl.formatMessage({ id: "machine_code" }),
      selector: "WalletRecordRef",
      maxWidth: "300px",
    },
    {
      name: intl.formatMessage({ id: "wallet_receive_after" }) + " (" + intl.formatMessage({ id: "BTC" }) + ")",
      maxWidth: "300px",
      cell: (row) => {
        return <div>{row.paymentAmount ? parseFloat(Number(row.paymentAmount).toFixed(6)) : ""}</div>;
      }
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
          {intl.formatMessage({ id: "reward_history_btc" })}
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
          data={rewardData}
        />
      </Card>
    </Fragment>
  );
}

export default injectIntl(memo(RewardBTC));
