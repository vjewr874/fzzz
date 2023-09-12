import React from "react";
import { Fragment, memo, useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import {
  Card,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { ChevronDown, PlusCircle } from "react-feather";
import { MoreVertical } from "react-feather";
import { toast } from "react-toastify";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import UpdateRanking from "./components/updateRanking";
import ReactPaginate from "react-paginate";
import PrizeService from "../../../services/prizeService";
import UserService from "../../../services/userService";

function ManagerPrize({ intl }) {
  const DefaultFilter = {
    filter: {},
    skip: 0,
    limit: 20,
    order: {
      key: "ranking",
      value: "desc",
    },
  };

  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState([]);
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(20);
  const [sidebarUpdateRanking, setSidebarUpdateRanking] = useState(false);
  const [tranItem, setTranItem] = useState(null);
  const [sidebarDetailOpen, setSidebarDetailOpen] = useState(false);
  const toggleDetailOpen = () => {
    setSidebarDetailOpen(!sidebarDetailOpen);
  };
  const toggleUpdateRanking = () => {
    setSidebarUpdateRanking(!sidebarUpdateRanking);
  };

  function getUserData() {
    const newParams = {
      filter: {},
      skip: 0,
      limit: 20,
      order: {
        key: "createdAt",
        value: "desc",
      },
    };
    UserService.getUser(newParams)
      .then((result) => {
        setUserData(result.data);
      })
      .catch(() => {
        toast.error(
          intl.formatMessage({ id: "an_error_occurred" }) +
            " " +
            intl.formatMessage({ id: "please_come_back_late" })
        );
      });
  }

  function getData(params, isLoading) {
    const newParams = {
      ...params,
    };
    PrizeService.findPrize(newParams)
      .then((result) => {
        setItems(result.data);
        setTotal(result.total)
      })
      .catch(() => {
        toast.error(
          intl.formatMessage({ id: "an_error_occurred" }) +
            " " +
            intl.formatMessage({ id: "please_come_back_late" })
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getData(paramsFilter);
    getUserData()
  }, []);

  const serverSideColumns = [
    {
      name: intl.formatMessage({ id: "title_member" }),
      selector: "companyName",
      minWidth: "250px",
    },
    {
      name: intl.formatMessage({ id: "account" }),
      selector: "username",
      minWidth: "250px",
    },
    {
      name: intl.formatMessage({ id: "totalScore" }) + " (" + intl.formatMessage({ id: "FAC" }) + ")",
      selector: "totalScore",
      maxWidth: "300px",
      cell: (row) => {
        const { totalScore } = row;
        return <div>{totalScore ? parseFloat(Number(totalScore).toFixed(2)) : "0"}</div>;
      },
    },
    {
      name: intl.formatMessage({ id: "ranking" }),
      selector: "ranking",
      maxWidth: "300px",
    },
    {
      name: intl.formatMessage({ id: "action" }),
      maxWidth: "130px",
      cell: (row) => {
        const { LeaderBoardId } = row;
        return (
          <UncontrolledDropdown size="sm">
            <div className="d-flex">
              <div>
                <DropdownToggle
                  color="transparent"
                  size="default"
                  caret
                  className="hide-arrow"
                >
                  <MoreVertical size={20} />
                </DropdownToggle>
              </div>
            </div>
            <DropdownMenu right>
              <DropdownItem
                className="full-width"
                onClick={(event) => {
                  event.preventDefault();
                  let newItem = { ...row };
                  setTranItem(newItem);
                  toggleUpdateRanking();
                }}
              >
                <PlusCircle size={15} />{" "}
                <span className="ml-1">
                  {intl.formatMessage({ id: "updateRanking_user" })}
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];

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

  const onReloadData = () => {
    let newParam = { ...paramsFilter };
    setParamsFilter(newParam);
    getData(newParam);
  };

  return (
    <Fragment>
      <Card className="p-1">
        <Row>
          <Col
            sm={12}
            md={7}
            lg={8}
            className="d-flex justify-content-start mb-1"
          ></Col>
        </Row>

        <DataTable
          progressPending={isLoading}
          noHeader
          pagination
          paginationServer
          highlightOnHover
          persistTableHead
          noDataComponent={<span className="mt-2">{intl.formatMessage({ id: "table_empty" })}</span>}
          className="react-dataTable"
          columns={serverSideColumns}
          paginationComponent={CustomPagination}
          sortIcon={<ChevronDown size={10} />}
          data={items}
        />
      </Card>
      <UpdateRanking
        item={tranItem}
        onReloadData={onReloadData}
        open={sidebarUpdateRanking}
        toggleSidebar={toggleUpdateRanking}
      />
    </Fragment>
  );
}

export default injectIntl(memo(ManagerPrize));
