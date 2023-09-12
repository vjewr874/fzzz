import React, { memo, useState, useEffect, Fragment } from "react";
import {
  Card,
  Row,
  Badge,
  UncontrolledTooltip,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Col,
  Input,
} from "reactstrap";
import { ChevronDown, Plus, Check } from "react-feather";
import { injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import PaymentPackageService from "../../../services/payPackageService";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import Reward from "./reward";
import Popup from "./popup";
import moment from "moment";

function ManagerFactory({ intl }) {
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
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [sidebarReward, setSidebarReward] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [tranItem, setTranItem] = useState(null);
  const toggleReward = () => {
    setSidebarReward(!sidebarReward);
  };
  const togglePopup = () => {
    setOpenPopup(!openPopup)
  }

  // search
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);

  const getData = (params) => {
    const newParams = {
      ...params,
    };
    PaymentPackageService.findUserBuyPackage(newParams)
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
    getData(paramsFilter);
  }, []);

  const onClickStatus = (value) => {
    let newParams = {
      ...paramsFilter,
      filter: {
        ...paramsFilter.filter,
      },
      skip: 0,
    };
    if (value !== null) {
      newParams.filter.packageActivityStatus = value;
    } else {
      delete newParams.filter.packageActivityStatus;
    }
    switch (value) {
      case null:
        setStatus("all");
        break;
      case 0:
        setStatus("completed");
        break;
      case 3:
        setStatus("canceled");
        break;
      case 1:
        setStatus("mining");
        break;
      case 2:
        setStatus("standingby");
        break;
      default:
        break;
    }
    setParamsFilter(newParams);
    getData(newParams, false);
  };

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

  const getDescriptionStatus = (id) => {
    switch (id) {
      case 0:
        return intl.formatMessage({ id: "package_activity_completed" });
        case 1:
        return intl.formatMessage({ id: "package_activity_mining" });
      case 2:
        return intl.formatMessage({ id: "package_activity_standingby" });
        case 3:
        return intl.formatMessage({ id: "package_activity_canceled" });
      default:
        return "N/A";
    }
  };

  const getTypeColorStatus = (id) => {
    switch (id) {
      case 2:
        return "warning";
      case 1:
        return "secondary";
      default:
        return;
    }
  };

  const NewsColumn = [
    {
      name: "ID",
      selector: "paymentServicePackageUserId",
      width: "80px",
    },
    {
      name: intl.formatMessage({ id: "name_machine" }),
      selector: "packageName",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "package_type" }),
      selector: "packageType",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "account" }),
      selector: "username",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "duration_machine" }),
      selector: "packageDuration",
      minWidth: "100px",
      cell: (row) => {
        const { packageExpireDate } = row
        const today = moment();
        const endPackageDate = moment(packageExpireDate);
        return (
          <div>
            {endPackageDate.diff(today, 'days') > 0 ? endPackageDate.diff(today, 'days') : 0}
          </div>
        )
      }
    },
    {
      name: intl.formatMessage({ id: "profitClaimed" }),
      selector: "profitClaimed",
      minWidth: "100px",
    },
    {
      name: intl.formatMessage({ id: "profitActual" }),
      selector: "profitActual",
      minWidth: "100px",
    },
    {
      name: intl.formatMessage({ id: "profitBonus" }),
      selector: "profitBonus",
      minWidth: "100px",
    },
    {
      name: intl.formatMessage({ id: "profitBonusClaimed" }),
      selector: "profitBonusClaimed",
      minWidth: "100px",
    },
    {
      name: intl.formatMessage({ id: "status" }),
      selector: "packageActivityStatus",
      maxWidth: "200px",
      cell: (row) => {
        const { packageActivityStatus } = row;
        const typeColor = getTypeColorStatus(packageActivityStatus);
        return (
          <Badge color={typeColor}>{getDescriptionStatus(packageActivityStatus)}</Badge>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "action" }),
      selector: "action",
      maxWidth: "150px",
      cell: (row) => {
        const { paymentServicePackageUserId } = row;
        return (
          <>
            <span
              className="full-width cursor-pointer text-secondary"
              onClick={(event) => {
                event.preventDefault();
                let newItem = { ...row };
                setTranItem(newItem);
                toggleReward();
              }}
            >
              <Plus size={15} id="reward" />
              <UncontrolledTooltip placement="top" target={"reward"}>
                {intl.formatMessage({ id: "reward" })}
              </UncontrolledTooltip>
            </span>
            <span
              className="full-width cursor-pointer text-secondary"
              onClick={(event) => {
                event.preventDefault();
                let newItem = { ...row };
                setTranItem(newItem);
                togglePopup();
              }}
            >
              <Check size={15} id="delete" />
              <UncontrolledTooltip placement="top" target={"delete"}>
                {intl.formatMessage({ id: "complete" })}
              </UncontrolledTooltip>
            </span>
          </>
        );
      },
    },
  ];


  const handleLocalizeStatus = (value) => {

    switch (value) {
      case "all":
        return intl.formatMessage({ id: "all_status" });
      case "mining":
        return intl.formatMessage({ id: "package_activity_mining" });
      case "standingby":
        return intl.formatMessage({ id: "package_activity_standingby" });
      case "completed":
        return intl.formatMessage({ id: "package_activity_completed" });
      case "canceled":
        return intl.formatMessage({ id: "package_activity_canceled" });
      default:
        return "";
    }
  };

  

  const getDataSearch = (params) => {
    getData(params);
  };
  const handleFilter = (e) => {
    const { value } = e.target;
    if (value === "") {
      delete paramsFilter.searchText
      delete paramsFilter.filter.packageActivityStatus
      setStatus("all");
      getData(paramsFilter);
      setParamsFilter(paramsFilter);
    } else {
      let newParams = {
        ...paramsFilter,
        filter: {
          ...paramsFilter.filter,
        },
        searchText: value,
        skip: 0,
      };
      switch (status) {
        case "all":
          break;
        case "completed":
          newParams.filter.packageActivityStatus = 0;
          break;
        case "mining":
          newParams.filter.packageActivityStatus = 1;
          break;
        case "standingby":
          newParams.filter.packageActivityStatus = 2;
          break;
        case "canceled":
          newParams.filter.packageActivityStatus = 3;
          break;
        default:
          break;
      }
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

  const onReloadData = () => {
    setParamsFilter(paramsFilter);
    getData(paramsFilter);
  };

  return (
    <Fragment>
      <Card className="p-1">
        <Row className="px-0 justify-content-between">
          <Col sm={12} lg={4} className="d-flex mb-1">
            <UncontrolledDropdown>
              <DropdownToggle color="primary" caret outline>
                {handleLocalizeStatus(status)}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  className="full-width"
                  value="all"
                  onClick={() => onClickStatus(null)}
                >
                  {intl.formatMessage({ id: "all_status" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="mining"
                  onClick={() => onClickStatus(1)}
                >
                  {intl.formatMessage({ id: "package_activity_mining" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="standingby"
                  onClick={() => onClickStatus(2)}
                >
                  {intl.formatMessage({ id: "package_activity_standingby" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="completed"
                  onClick={() => onClickStatus(0)}
                >
                  {intl.formatMessage({ id: "package_activity_completed" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="canceled"
                  onClick={() => onClickStatus(3)}
                >
                  {intl.formatMessage({ id: "package_activity_canceled" })}
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
      {tranItem && sidebarReward && <Reward
        item={tranItem}
        open={sidebarReward}
        toggleSidebar={toggleReward}
        onReloadData={onReloadData}
      />}
      {tranItem && openPopup && <Popup
        item={tranItem}
        open={openPopup}
        toggleSidebar={togglePopup}
        onReloadData={onReloadData}
      />}
    </Fragment>
  );
}

export default injectIntl(memo(ManagerFactory));
