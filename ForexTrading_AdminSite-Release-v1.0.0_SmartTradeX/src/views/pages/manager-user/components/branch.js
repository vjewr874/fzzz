import React, { memo, useState, useEffect, Fragment } from "react";
import { Card, Row, UncontrolledTooltip, Col, Input } from "reactstrap";
import { ChevronDown, Plus } from "react-feather";
import { injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import UserService from "../../../../services/userService";

function Branch({ intl, item }) {
  const DefaultFilter = {
    filter: {
      appUserId : item.appUserId
    },
    skip: 0,
    limit: 20,
    order: {
      key: "createdAt",
      value: "desc",
    },
  };

  const [total, setTotal] = useState(20);
  const [data, setData] = useState([]);

  // search
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);

  const getData = (params) => {
    UserService.getListReferralByUserId(params)
      .then((result) => {
        setTotal(result.count);
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
  }, []);

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

  const NewsColumn = [
    {
      name: intl.formatMessage({ id: "username" }),
      selector: "username",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "branch" }),
      minWidth: "150px",
      cell: (row) => {
        const { memberReferIdF1, memberReferIdF2, memberReferIdF3} = row
        switch (item.appUserId) {
          case memberReferIdF1:
            return <>F1</>;
          case memberReferIdF2:
            return <>F2</>;
          case memberReferIdF3:
            return <>F3</>;
          default:
            break;
        }
      }
    },
    {
      name: intl.formatMessage({ id: "level" }),
      selector: "appUserMembershipTitle",
      minWidth: "250px",
      cell: (row) => {
        return <div>{row.appUserMembershipTitle ? row.appUserMembershipTitle : intl.formatMessage({id:"new_member"})}</div>
      }
    },
    // {
    //   name: intl.formatMessage({ id: "total_fac" }),
    //   selector: "totalProfitClaimed",
    //   minWidth: "250px",
    //   cell: (row) => {
    //     return <div>{row.totalProfitClaimed ? parseFloat(Number(row.totalProfitClaimed).toFixed(6)).toLocaleString() : ""}</div>;
    //   },
    // },
    // {
    //   name: intl.formatMessage({ id: "total_usdt" }),
    //   selector: "totalProfitActual",
    //   maxWidth: "250px",
    //   cell: (row) => {
    //     return <div>{row.totalpackagePaymentAmount ? parseFloat(Number(row.totalpackagePaymentAmount).toFixed(6)).toLocaleString() : ""}</div>;
    //   },
    // },
  ];


  return (
    <Fragment>
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
    </Fragment>
  );
}

export default injectIntl(memo(Branch));
