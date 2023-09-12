import React, { memo, useState, useEffect, Fragment } from "react";
import { Card, Row, UncontrolledTooltip, Col, Input } from "reactstrap";
import { ChevronDown, Plus } from "react-feather";
import { injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import moment from "moment";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import PaymentPackageService from "../../../../services/payPackageService";

function CancelPackage({ intl, active }) {
  const DefaultFilter = {
    filter: {},
    skip: 0,
    limit: 20,
    order: {
      key: "createdAt",
      value: "desc",
    },
  };

  const [total, setTotal] = useState(20);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // search
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);

  const getData = (params) => {
    PaymentPackageService.historyCancelServicePackage(params)
      .then((result) => {
        setTotal(result.total);
        setData(result.data);
      })
      .catch((err) => {
        toast.error(
          intl.formatMessage(
            { id: "actionFailed" },
            { action: intl.formatMessage({ id: "update" }, err) }
          )
        );
      });
  };

  useEffect(() => {
    getData(DefaultFilter);
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
        filter: {
          ...paramsFilter.filter,
        },
        searchText: value,
        skip: 0,
      };
      setParamsFilter(newParams);
      getDataSearch(newParams, false);
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

  const NewsColumn = [
    {
      name: intl.formatMessage({ id: "time" }),
      maxWidth: "250px",
      cell: (row) => {
        const { createdAt } = row;
        return (
          <div>
            {createdAt === null
              ? "N/A"
              : (moment(createdAt)).format("HH:mm DD/MM/YYYY")}
          </div>
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
    // {
    //   name: intl.formatMessage({ id: "package_price" }),
    //   selector: "packagePrice",
    //   minWidth: "250px",
    // },
    // {
    //   name: intl.formatMessage({ id: "percentCompleted" }),
    //   selector: "percentCompleted",
    //   minWidth: "250px",
    // },
    {
      name: intl.formatMessage({ id: "packageName" }),
      selector: "packageName",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "packageType" }),
      selector: "packageType",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "category" }),
      selector: "packageCategory",
      minWidth: "150px",
      cell: (row) => {
        const { packageCategory } = row;
        return (
          <div>
            {packageCategory === 'Rank'
              ? "Thưởng cấp bậc"
              : (packageCategory === 'KYC' ? "Thưởng KYC" : "Bình thường")}
          </div>
        );
      },
    },

    // {
    //   name: intl.formatMessage({ id: "duration" }),
    //   selector: "packageDuration",
    //   minWidth: "150px",
    // },
    {
      name: intl.formatMessage({ id: "date_expire" }),
      selector: "packageExpireDate",
      maxWidth: "250px",
      cell: (row) => {
        const { packageExpireDate } = row;
        if (packageExpireDate === null) {
          return "";
        }
        return (
          <div>
            {moment(packageExpireDate).format("DD/MM/YYYY")}
          </div>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Card>
      <span className="align-middle d-sm-none">
        <h4 className="my-2">
          {intl.formatMessage({ id: "cancel_package" })}
        </h4>
      </span>
        <Row className="mb-1 px-1 justify-content-end">
          <Col sm={12} lg={4}>
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
          highlightOnHover
          persistTableHead
          paginationServer
          noDataComponent={<span className="mt-2">{intl.formatMessage({ id: "table_empty" })}</span>}
          className="react-dataTable"
          columns={NewsColumn}
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          data={data}
        />
      </Card>
    </Fragment>
  );
}

export default injectIntl(memo(CancelPackage));
