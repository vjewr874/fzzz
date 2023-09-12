import React, { memo, useState, useEffect, Fragment } from "react";
import { Card, Col, Input, Row, UncontrolledTooltip } from "reactstrap";
//icon
import { ChevronDown } from "react-feather";

//translate
import { injectIntl } from "react-intl";

//services
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import UserService from "../../../../services/userService";
import PaymentPackageService from "../../../../services/payPackageService";
import DetailModal from "../../manager-transaction/detailModal";

const DefaultFilter = {
  filter: {},
  skip: 0,
  limit: 20,
};
function PackageOwnerUser({ intl, active }) {
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [packageOwnerData, setPackageOwnerData] = useState([]);
  const [total, setTotal] = useState(20);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
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
    PaymentPackageService.countAllUserPackage(newParams)
      .then((result) => {
        setTotal(result.length);
        setPackageOwnerData(result);
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

  const PackageOwnerHistoryColumn = [
    {
      name: intl.formatMessage({ id: "id" }),
      selector: "appUserId",
      width: "90px",
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
              {row.appUserId}
            </span>
            <UncontrolledTooltip placement="right" target={"detailUser"}>
              {intl.formatMessage({ id: "click_to_see_detail" })}
            </UncontrolledTooltip>
          </>
        );
      },  
    },
    {
      name: intl.formatMessage({ id: "package_owner" }),
      selector: "totalPackageCount",
      maxWidth: "300px",
    },
    {
      name: intl.formatMessage({ id: "account" }),
      selector: "username",
      minWidth: "200px",
    },
    {
      name: intl.formatMessage({ id: "fullname" }),
      selector: "firstName",
      minWidth: "200px",
    },
    {
      name: intl.formatMessage({ id: "email" }),
      selector: "email",
      minWidth: "200px",
    },
    {
      name: intl.formatMessage({ id: "phoneNumber" }),
      selector: "phoneNumber",
      maxWidth: "200px",
    },
    {
      name: intl.formatMessage({ id: "memberLevelName" }),
      selector: "memberLevelName",
      maxWidth: "120px",
    },
  ];

  return (
    <Fragment>
      <Card className="p-1">
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
          columns={PackageOwnerHistoryColumn}
          paginationComponent={CustomPagination}
          sortIcon={<ChevronDown size={10} />}
          data={packageOwnerData}
        />
      </Card>
      <DetailModal open={sidebarDetailOpen} toggleSidebar={toggleDetailOpen} arrData={idData}/>
    </Fragment>
  );
}

export default injectIntl(memo(PackageOwnerUser));
