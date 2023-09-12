import React, { memo, useState, useEffect, Fragment } from "react";
import { Card, Col, Input, Row } from "reactstrap";
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
import moment from "moment";
import PaymentPackageService from "../../../../services/payPackageService";

const DefaultFilter = {
  filter: {
    packageCategory:"Normal" 
  },
  skip: 0,
  limit: 20,
  order: {
    key: "createdAt",
    value: "desc",
  },
};
function BuyPackageHistory({ intl, active }) {
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [buyPackageData, setBuyPackageData] = useState([]);
  const [total, setTotal] = useState(20);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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
    PaymentPackageService.findUserBuyPackage(newParams)
      .then((result) => {
        setTotal(result.total);
        setBuyPackageData(result.data);
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

  const BuyPackageHistoryColumn = [
    {
      name: intl.formatMessage({ id: "time" }),
      selector: "createdAt",
      maxWidth: "200px",
      cell: (row) => {
        const { createdAt } = row;
        return (
          <div>{(moment(createdAt)).format("HH:mm DD/MM/YYYY")}</div>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "account" }),
      selector: "username",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "title_member" }),
      selector: "companyName",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "packageName" }),
      selector: "packageName",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "packageType" }),
      selector: "packageType",
      maxWidth: "250px",
    },
    {
      name: intl.formatMessage({ id: "packagePrice" }) + "",
      selector: "packagePrice",
      maxWidth: "200px",
      cell: (row) => {
        return (
          <>
            {addCommas(row.packagePrice)}
          </>
        );
      },
    },
    // {
    //   name: intl.formatMessage({ id: "category" }),
    //   selector: "packageCategory",
    //   maxWidth: "250px",
    // },
  ];

  return (
    <Fragment>
      <Card>
      <span className="align-middle d-sm-none">
        <h4 className="my-2">
          {intl.formatMessage({ id: "buy_package" })}
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
          columns={BuyPackageHistoryColumn}
          paginationComponent={CustomPagination}
          sortIcon={<ChevronDown size={10} />}
          data={buyPackageData}
        />
      </Card>
    </Fragment>
  );
}

export default injectIntl(memo(BuyPackageHistory));
