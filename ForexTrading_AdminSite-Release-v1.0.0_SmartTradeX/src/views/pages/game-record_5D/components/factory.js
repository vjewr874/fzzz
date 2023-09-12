import React, { memo, useState, useEffect, Fragment } from "react";
import {
  Card,
  Row,
  Badge,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { ChevronDown } from "react-feather";
import { injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import PaymentPackageService from "../../../../services/payPackageService";
import "@styles/react/libs/tables/react-dataTable-component.scss";

function Factory({ intl, open, item, toggleSidebar }) {
  const DefaultFilter = {
    filter: {
      appUserId: item.appUserId
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
  const [status, setStatus] = useState("all");
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
        setStatus("new");
        break;
      case 2:
        setStatus("normal");
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
        return intl.formatMessage({ id: "new" });
      case 2:
        return intl.formatMessage({ id: "normal" });
      default:
        return "N/A";
    }
  };

  const getTypeColorStatus = (id) => {
    switch (id) {
      case 0:
        return "warning";
      case 2:
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
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "profitClaimed" }),
      selector: "profitClaimed",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "profitActual" }),
      selector: "profitActual",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "profitBonus" }),
      selector: "profitBonus",
      minWidth: "150px",
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
  ];


  const handleLocalizeStatus = (value) => {
    switch (value) {
      case "all":
        return intl.formatMessage({ id: "all_status" });
      case "new":
        return intl.formatMessage({ id: "new" });
      case "normal":
        return intl.formatMessage({ id: "normal" });
      default:
        return "";
    }
  };


  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className={`modal-dialog modal-xl `}
    >
      <ModalHeader toggle={toggleSidebar}>
        {intl.formatMessage({ id: "list_package_current" })}{item.companyName}
      </ModalHeader>
      <ModalBody>
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
                  value="new"
                  onClick={() => onClickStatus(0)}
                >
                  {intl.formatMessage({ id: "new" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="normal"
                  onClick={() => onClickStatus(2)}
                >
                  {intl.formatMessage({ id: "normal" })}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
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
      </ModalBody>
    </Modal>
  );
}

export default injectIntl(memo(Factory));
