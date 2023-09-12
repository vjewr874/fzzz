import React, { memo, useState, useEffect, Fragment } from "react";
import { Card, Row, UncontrolledTooltip, Col, Input } from "reactstrap";
import { BarChart, ChevronDown, DollarSign } from "react-feather";
import { injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import moment from "moment";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import PaymentPackageService from "../../../../services/payPackageService";
import ChangeComplete from "./changeComplete";
import DetailModal from "../../manager-transaction/detailModal";
import { addCommas } from "@utils";


function CompletePackage({ intl, active }) {
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [idData, setIdData] = useState([]);
  const [sidebarDetailOpen, setSidebarDetailOpen] = useState(false);
  const toggleDetailOpen = () => {
    setSidebarDetailOpen(!sidebarDetailOpen);
  };
  const toggleSidebar = () => {
    if (sidebarOpen) {
      setEditItem(null);
    }
    setSidebarOpen(!sidebarOpen);
  };
  // search
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);

  const getData = (params) => {
    PaymentPackageService.historyCompleteServicePackage(params)
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
      name: intl.formatMessage({ id: "wallet_receive_after" }) + "",
      selector: "packagePaymentAmount",
      maxWidth: "250px",
      cell: (row) => {
        const _packagePaymentAmount = row.packagePaymentAmount - row.packagePaymentAmount * 7 / 100;
        return (
          <>
            {addCommas(_packagePaymentAmount)}
          </>
        );
      },
    },
    // {
    //   name: intl.formatMessage({ id: "package_price" }),
    //   selector: "packagePrice",
    //   minWidth: "150px",
    // },
    // {
    //   name: intl.formatMessage({ id: "percentCompleted" }),
    //   selector: "percentCompleted",
    //   minWidth: "150px",
    // },
    
    // {
    //   name: intl.formatMessage({ id: "action" }),
    //   selector: "action",
    //   maxWidth: "150px",
    //   cell: (row) => {
    //     return (
    //       <>
    //         <span
    //           className="full-width cursor-pointer text-secondary ml-2"
    //           onClick={(event) => {
    //             event.preventDefault();
    //             let newItem = { ...row };
    //             setEditItem(newItem);
    //             toggleSidebar();
    //           }}
    //         >
    //           <DollarSign size={15} id="reward" />
    //           <UncontrolledTooltip placement="top" target={"reward"}>
    //             {intl.formatMessage({ id: "change_price_complete" })}
    //           </UncontrolledTooltip>
    //         </span>
    //       </>
    //     );
    //   },
    // },
  ];

  const onReloadData = () => {
    let newParam = { ...paramsFilter };
    newParam.skip = 0;
    setParamsFilter(newParam);
    getData(newParam);
  };

  return (
    <Fragment>
      <Card>
      <span className="align-middle d-sm-none">
        <h4 className="my-2">
          {intl.formatMessage({ id: "complete_package" })}
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
      {sidebarOpen && editItem && (
        <ChangeComplete
          onReloadData={onReloadData}
          item={editItem}
          open={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
      <DetailModal open={sidebarDetailOpen} toggleSidebar={toggleDetailOpen} arrData={idData}/>
    </Fragment>
  );
}

export default injectIntl(memo(CompletePackage));
