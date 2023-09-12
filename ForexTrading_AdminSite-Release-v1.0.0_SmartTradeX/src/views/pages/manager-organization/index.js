import React, { memo, useState, useEffect, Fragment } from "react";
import { Card, Row, Button, UncontrolledTooltip } from "reactstrap";
import { ChevronDown, Edit, Trash } from "react-feather";
import { injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import moment from "moment";
import PlaceholderImage from "../../../assets/images/placeholder/placeholder.png";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import OrganizationService from "../../../services/organizationService";
import AddMembership from "./addMembership";
import EditMembership from "./editMembership";

function ManagerOrganization({ intl }) {
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [sidebarAddOpen, setSidebarAddOpen] = useState(false);

  const toggleSidebar = () => {
    if (sidebarOpen) {
      setEditItem(null);
    }
    setSidebarOpen(!sidebarOpen);
  };
  const toggleSidebarAdd = () => {
    setSidebarAddOpen(!sidebarAddOpen);
  };

  // search
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);

  const history = useHistory();

  const getData = (params) => {
    OrganizationService.findOrganization(params)
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

  const onDelete = (row) => {
    const newParams = {
      id: row.appUsermembershipId,
    };
    OrganizationService.deleteById(newParams)
      .then((result) => {
        toast.success(intl.formatMessage({ id: "delete_membership_success" }));
        getData(paramsFilter);
      })
      .catch((error) => {
        toast.error(intl.formatMessage({ id: "delete_membership_failed" }));
      });
  };

  const onReloadData = () => {
    let newParam = { ...paramsFilter };
    newParam.skip = 0;
    setParamsFilter(newParam);
    getData(newParam);
  };

  const NewsColumn = [
    {
      name: "ID",
      selector: "appUsermembershipId",
      width: "80px",
    },
    {
      name: intl.formatMessage({ id: "title_member" }),
      selector: "appUserMembershipTitle",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "asset_require" }),
      selector: "appUserMembershipAssetRequired",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "asset_f1_require" }),
      selector: "appUserMembershipAssetF1Required",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "invite_require" }),
      selector: "appUserMembershipInvitationRequired",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "bonus_prize" }),
      selector: "appUserMembershipBonusPrize",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "bonus_type" }),
      selector: "appUserMembershipBonusType",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "action" }),
      selector: "action",
      maxWidth: "150px",
      cell: (row) => {
        return (
          <>
            <span
              className="cursor-pointer text-secondary"
              onClick={(event) => {
                event.preventDefault();
                let newItem = { ...row };
                setEditItem(newItem);
                toggleSidebar();
              }}
            >
              <Edit size={15} id="edit" />
              <UncontrolledTooltip placement="top" target={"edit"}>
                {intl.formatMessage({ id: "edit" })}
              </UncontrolledTooltip>
            </span>
            <span
              className="ml-3 cursor-pointer text-secondary"
              onClick={(event) => {
                event.preventDefault();
                onDelete(row);
              }}
            >
              <Trash size={15} id="delete" />
              <UncontrolledTooltip placement="top" target={"delete"}>
                {intl.formatMessage({ id: "delete" })}
              </UncontrolledTooltip>
            </span>
          </>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Card className="p-1">
        <Row className="mb-1 px-1 justify-content-start">
          <Button
            onClick={(e) => toggleSidebarAdd(e)}
            color="primary"
            className="mb-1 mb-sm-0"
          >
            {intl.formatMessage({ id: "add" })}
          </Button>
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
        <EditMembership
          onReloadData={onReloadData}
          item={editItem}
          open={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
      <AddMembership
        onReloadData={onReloadData}
        open={sidebarAddOpen}
        toggleSidebar={toggleSidebarAdd}
      />
    </Fragment>
  );
}

export default injectIntl(memo(ManagerOrganization));
