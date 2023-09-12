import React from "react";
import { useState, useEffect, Fragment } from "react";
import { Button, Card, Col, Input, Row, UncontrolledTooltip } from "reactstrap";
//icon
import { ChevronDown, Edit, Eye, Trash } from "react-feather";

//translate
import { injectIntl } from "react-intl";

//services
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import moment from "moment";
import StakingService from "../../../services/stakingService";
import EditStaking from "./editStaking";
import AddStaking from "./addStaking";
import DetailStaking from "./detailStaking";
import { addCommas } from "@utils";


function ManagerStaking({ intl }) {
  const DefaultFilter = {
    filter: {},
    skip: 0,
    limit: 20,
    order: {
      key: "createdAt",
      value: "desc",
    },
  };
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [stakingData, setStakingData] = useState([]);
  const [total, setTotal] = useState(20);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [transData, setTransData] = useState([]);
  const [sidebarEdit, setSidebarEdit] = useState(false);
  const [sidebarAdd, setSidebarAdd] = useState(false);
  const [sidebarDetailOpen, setSidebarDetailOpen] = useState(false);
  const toggleDetailOpen = () => {
    setSidebarDetailOpen(!sidebarDetailOpen);
  };

  const toggleAdd = () => {
    setSidebarAdd(!sidebarAdd);
  };

  const toggleEdit = () => {
    setSidebarEdit(!sidebarEdit);
  };

  function getData(params) {
    if (loading) {
      return;
    }
    setLoading(true);
    const newParams = {
      ...params,
    };
    StakingService.getStaking(newParams)
      .then((result) => {
        setTotal(result.total);
        setStakingData(result.data);
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

  const onDeleteStaking = (row) => {
    const newParams = {
      id: row.stakingPackageId,
    };
    StakingService.deleteById(newParams)
      .then((result) => {
        toast.success(intl.formatMessage({ id: "delete_staking_success" }));
        getData(paramsFilter);
      })
      .catch((error) => {
        toast.error(intl.formatMessage({ id: "delete_staking_failed" }));
      });
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

  const StakingHistoryColumn = [
    {
      name: intl.formatMessage({ id: "time" }),
      selector: "createdAt",
      maxWidth: "150px",
      cell: (row) => {
        const { createdAt } = row;
        return (
          <div>{(moment(createdAt)).format("YYYY/MM/DD")}</div>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "title_member" }),
      selector: "companyName",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "username" }),
      selector: "username",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "amount_staking" })  + " (" + intl.formatMessage({ id: "FAC" }) + ")",
      selector: "stackingAmount",
      maxWidth: "250px",
      cell: (row) => {
        const { stackingAmount } = row;
        return (
          stackingAmount ? <>
            {"+"} {addCommas(stackingAmount)}
          </> : ""
        );
      },
    },
    {
      name: intl.formatMessage({ id: "profit" }),
      selector: "stakingInterestRate",
      maxWidth: "120px",
    },
    {
      name: intl.formatMessage({ id: "period_staking" }),
      selector: "stakingPeriod",
      maxWidth: "120px",
    },
    {
      name: intl.formatMessage({ id: "day_expire" }),
      selector: "stakingEndDate",
      minWidth: "100px",
      cell: (row) => {
        const { stakingEndDate } = row;
        return (
          <div>
            {(moment(stakingEndDate)).format("YYYY/MM/DD")}
          </div>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "profit_estimate" }) + " (" + intl.formatMessage({ id: "FAC" }) + ")",
      selector: "profitEstimate",
      maxWidth: "150px",
      cell: (row) => {
        const {profitEstimate, stackingAmount}= row
        return (
          profitEstimate + stackingAmount ? <>
            {"+"} {addCommas(profitEstimate + stackingAmount)}
          </> : ""
        );
      },
    },
    {
      name: intl.formatMessage({ id: "profit_payment" }) + " (" + intl.formatMessage({ id: "FAC" }) + ")",
      selector: "profitClaimed",
      maxWidth: "150px",
      cell: (row) => {
        const {profitClaimed}= row
        return (
          profitClaimed ? <>
            {"+"} {addCommas(profitClaimed)}
          </> : 0
        );
      },
    },

    // {
    //   name: intl.formatMessage({ id: "action" }),
    //   selector: "action",
    //   maxWidth: "150px",
    //   cell: (row) => {
    //     const { stakingPackageId } = row;
    //     return (
    //       <>
    //         <span
    //           className="full-width cursor-pointer text-secondary"
    //           onClick={(event) => {
    //             event.preventDefault();
    //             StakingService.findById(stakingPackageId)
    //             .then((result) =>
    //             setTransData(result));
    //             toggleDetailOpen();
    //           }}
    //         >
    //           <Eye size={15} id="detail" />
    //           <UncontrolledTooltip placement="top" target={"detail"}>
    //             {intl.formatMessage({ id: "detail" })}
    //           </UncontrolledTooltip>
    //         </span>
    //         <span
    //           className="full-width cursor-pointer text-secondary"
    //           onClick={(event) => {
    //             event.preventDefault();
    //             let newItem = { ...row };
    //             setTransData(newItem);
    //             toggleEdit();
    //           }}
    //         >
    //           <Edit size={15} id="edit" />
    //           <UncontrolledTooltip placement="top" target={"edit"}>
    //             {intl.formatMessage({ id: "edit" })}
    //           </UncontrolledTooltip>
    //         </span>
    //         <span
    //           className="full-width cursor-pointer text-secondary"
    //           onClick={(event) => {
    //             event.preventDefault();
    //             onDeleteStaking(row);
    //           }}
    //         >
    //           <Trash size={15} id="delete" />
    //           <UncontrolledTooltip placement="top" target={"delete"}>
    //             {intl.formatMessage({ id: "delete" })}
    //           </UncontrolledTooltip>
    //         </span>
    //       </>
    //     );
    //   },
    // },
  ];

  const onReloadData = () => {
    let newParam = { ...paramsFilter };
    setParamsFilter(newParam);
    getData(newParam);
  };

  const onReloadAddData = () => {
    let newParam = { ...paramsFilter };
    newParam.skip = 0;
    setParamsFilter(newParam);
    getData(newParam);
  };

  return (
    <Fragment>
      <Card className="p-1">
        <Row className="mb-1 px-1 justify-content-end">
          {/* <Col className="px-0">
          <Button
            onClick={(event) => {
              event.preventDefault();
              toggleAdd();
            }}
            color="primary"
            className="mb-1 mb-sm-0"
          >
            {intl.formatMessage({ id: "add" })}
          </Button>
          </Col> */}
          <Col className="col-4 d-flex justify-content-end">
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
          columns={StakingHistoryColumn}
          paginationComponent={CustomPagination}
          sortIcon={<ChevronDown size={10} />}
          data={stakingData}
        />
      </Card>
      <AddStaking
        open={sidebarAdd}
        toggleSidebar={toggleAdd}
        onReloadData={onReloadAddData}
      />
      {sidebarEdit && transData && (
        <EditStaking
          item={transData}
          open={sidebarEdit}
          toggleSidebar={toggleEdit}
          onReloadData={onReloadData}
        />
      )}
      <DetailStaking
        open={sidebarDetailOpen}
        toggleSidebar={toggleDetailOpen}
        arrData={transData}
      />
    </Fragment>
  );
}

export default injectIntl(ManagerStaking);
