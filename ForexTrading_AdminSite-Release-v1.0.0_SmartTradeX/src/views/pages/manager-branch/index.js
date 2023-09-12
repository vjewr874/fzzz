import React, { memo, useState, useEffect, Fragment } from "react";
import { Card, Row, UncontrolledTooltip, Col, Input } from "reactstrap";
import { ChevronDown, Plus } from "react-feather";
import { injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import moment from "moment";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import UserService from "../../../services/userService";

function ManagerBranch({ intl }) {
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
    UserService.findAllUsersFollowingReferId(params)
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
  };
}
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
      name: intl.formatMessage({ id: "username" }),
      selector: "username",
      minWidth: "200px",
    },
    {
      name: intl.formatMessage({ id: "title_member" }),
      selector: "companyName",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "level" }),
      selector: "appUserMembershipTitle",
      minWidth: "250px",
    },
    {
      name: intl.formatMessage({ id: "member_invite" }),
      selector: "referUser",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "time" }),
      maxWidth: "150px",
      cell: (row) => {
        const { createdAt } = row;
        return (
          <div>
            {createdAt === null
              ? "N/A"
              : (moment(createdAt)).format("DD/MM/YYYY")}
          </div>
        );
      },
    },
  ];


  return (
    <Fragment>
      <Card className="p-1">
        <Row className="mb-1 px-1 justify-content-end">
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

export default injectIntl(memo(ManagerBranch));
