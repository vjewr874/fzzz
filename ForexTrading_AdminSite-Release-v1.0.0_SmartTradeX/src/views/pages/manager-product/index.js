import React, { memo, useState, useEffect, Fragment } from "react";
import {
  Card,
  Row,
  Badge,
  Button,
  UncontrolledTooltip,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Col,
} from "reactstrap";
import { ChevronDown, Edit, Trash } from "react-feather";
import { injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { addCommas } from "@utils";
import moment from "moment";
import PaymentPackageService from "../../../services/payPackageService";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import EditProduct from "./editProduct";
import A1000Packages from "./A1000Packages";
import A500Packages from "./A500Packages";

function ManagerProduct({ intl }) {
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
  const [transData, setTransData] = useState([]);
  const [sidebarEdit, setSidebarEdit] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [typePackage, setTypePackage] = useState("all");
  const [status, setStatus] = useState("all");

  const toggleActive = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleHidden = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleEdit = () => {
    setSidebarEdit(!sidebarEdit);
  };

  // search
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);

  const getData = (params) => {
    PaymentPackageService.findPaymentPackage(params)
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

  const onDeleteProduct = (row) => {
    const newParams = {
      id: row.paymentServicePackageId,
    };
    PaymentPackageService.deleteById(newParams)
      .then((result) => {
        toast.success(intl.formatMessage({ id: "delete_product_success" }));
        getData(paramsFilter);
      })
      .catch((error) => {
        toast.error(intl.formatMessage({ id: "delete_product_failed" }));
      });
  };

  const getDescriptionStatus = (id) => {
    switch (id) {
      case 1:
        return intl.formatMessage({ id: "new" });
      case 2:
        return intl.formatMessage({ id: "hot" });
      case 3:
        return intl.formatMessage({ id: "normal" });
      case 4:
        return intl.formatMessage({ id: "sold" });
      default:
        return "N/A";
    }
  };

  const getTypeColorStatus = (id) => {
    switch (id) {
      case 1:
        return "warning";
      case 2:
        return "danger";
      case 3:
        return "success";
      case 4:
        return "light-dark";
      default:
        return;
    }
  };

  const NewsColumn = [
    {
      name: "ID",
      selector: "paymentServicePackageId",
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
      name: intl.formatMessage({ id: "duration_machine" }),
      selector: "packageDuration",
      minWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "price_machine" })  +
      " (" +
      intl.formatMessage({ id: "USDT" }) +
      ")",
      selector: "packagePrice",
      minWidth: "150px",
      cell: (row) => {
        return (
          <>
            {addCommas(Number(row.packagePrice))}
          </>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "createdAt" }),
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
      name: intl.formatMessage({ id: "status" }),
      selector: "packageStatus",
      maxWidth: "200px",
      cell: (row) => {
        const { packageStatus } = row;
        const typeColor = getTypeColorStatus(packageStatus);
        return (
          <Badge color={typeColor}>{getDescriptionStatus(packageStatus)}</Badge>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "action" }),
      selector: "action",
      maxWidth: "150px",
      cell: (row) => {
        const { paymentServicePackageId } = row;
        return (
          <>
            <span
              className="full-width cursor-pointer text-secondary"
              onClick={(event) => {
                event.preventDefault();
                let newItem = { ...row };
                setTransData(newItem);
                toggleEdit();
              }}
            >
              <Edit size={15} id="edit" />
              <UncontrolledTooltip placement="top" target={"edit"}>
                {intl.formatMessage({ id: "edit" })}
              </UncontrolledTooltip>
            </span>
            <span
              className="full-width cursor-pointer text-secondary"
              onClick={(event) => {
                event.preventDefault();
                onDeleteProduct(row);
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

  const handleLocalizeTypePackage = (value) => {
    switch (value) {
      case "all":
        return intl.formatMessage({ id: "all_machine" });
      case "A1000FAC":
        return intl.formatMessage({ id: "A1000_machine" });
      case "A100FAC":
        return intl.formatMessage({ id: "A100_machine" });
      case "A500FAC":
        return intl.formatMessage({ id: "A500_machine" });
      default:
        return "";
    }
  };

  const onClickTypePackage = (value) => {
    let newParams = {
      ...paramsFilter,
      filter: {
        ...paramsFilter.filter,
      },
      skip: 0,
    };
    if (value !== null) {
      newParams.filter.packageType = value;
    } else {
      delete newParams.filter.packageType;
    }
    switch (value) {
      case null:
        setTypePackage("all");
        break;
      case "A1000FAC":
        setTypePackage("A1000FAC");
        break;
      case "A100FAC":
        setTypePackage("A100FAC");
        break;
      case "A500FAC":
        setTypePackage("A500FAC");
        break;
      default:
        break;
    }
    setParamsFilter(newParams);
    getData(newParams, false);
  };

  const handleLocalizeStatus = (value) => {
    switch (value) {
      case "all":
        return intl.formatMessage({ id: "all_status" });
      case "new":
        return intl.formatMessage({ id: "new" });
      case "hot":
        return intl.formatMessage({ id: "hot" });
      case "normal":
        return intl.formatMessage({ id: "normal" });
      case "sold":
        return intl.formatMessage({ id: "sold" });
      default:
        return "";
    }
  };

  const onClickStatus = (value) => {
    let newParams = {
      ...paramsFilter,
      filter: {
        ...paramsFilter.filter,
      },
      skip: 0,
    };
    if (value !== null) {
      newParams.filter.packageStatus = value;
    } else {
      delete newParams.filter.packageStatus;
    }
    switch (value) {
      case null:
        setStatus("all");
        break;
      case 1:
        setStatus("new");
        break;
      case 2:
        setStatus("hot");
        break;
      case 3:
        setStatus("normal");
        break;
      case 4:
        setStatus("sold");
        break;
      default:
        break;
    }
    setParamsFilter(newParams);
    getData(newParams, false);
  };

  return (
    <Fragment>
      <Card className="p-1">
        <Row className="justify-content-start">
        <Col className="d-flex mb-1" sm={12} lg={4}>
          <Button
            onClick={(event) => {
              event.preventDefault();
              toggleActive();
            }}
            color="primary"
            className="mb-1 mb-sm-0"
          >
            {intl.formatMessage({ id: "active_package" })}
          </Button>

          <Button
            onClick={(event) => {
              event.preventDefault();
              toggleHidden();
            }}
            color="primary"
            className="mb-1 mb-sm-0 ml-2"
          >
            {intl.formatMessage({ id: "hidden_package" })}
          </Button>
          </Col>

          <Col className="d-flex mb-1 justify-content-end" sm={12} lg={8}>
          <UncontrolledDropdown className="mx-2">
            <DropdownToggle color="primary" caret outline>
              {handleLocalizeTypePackage(typePackage)}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                className="full-width"
                value="all"
                onClick={() => onClickTypePackage(null)}
              >
                {intl.formatMessage({ id: "all_machine" })}
              </DropdownItem>
              <DropdownItem
                className="full-width"
                value="A1000FAC"
                onClick={() => onClickTypePackage("A1000FAC")}
              >
                {intl.formatMessage({ id: "A1000_machine" })}
              </DropdownItem>
              <DropdownItem
                className="full-width"
                value="A500FAC"
                onClick={() => onClickTypePackage("A500FAC")}
              >
                {intl.formatMessage({ id: "A500_machine" })}
              </DropdownItem>
              <DropdownItem
                className="full-width"
                value="A100FAC"
                onClick={() => onClickTypePackage("A100FAC")}
              >
                {intl.formatMessage({ id: "A100_machine" })}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/* <UncontrolledDropdown>
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
                onClick={() => onClickStatus(1)}
              >
                {intl.formatMessage({ id: "new" })}
              </DropdownItem>
              <DropdownItem
                className="full-width"
                value="hot"
                onClick={() => onClickStatus(2)}
              >
                {intl.formatMessage({ id: "hot" })}
              </DropdownItem>
              <DropdownItem
                className="full-width"
                value="normal"
                onClick={() => onClickStatus(3)}
              >
                {intl.formatMessage({ id: "normal" })}
              </DropdownItem>
              <DropdownItem
                className="full-width"
                value="sold"
                onClick={() => onClickStatus(4)}
              >
                {intl.formatMessage({ id: "sold" })}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
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
      {sidebarEdit && transData && (
        <EditProduct
          item={transData}
          open={sidebarEdit}
          toggleSidebar={toggleEdit}
          onReloadData={onReloadData}
        />
      )}
      <A1000Packages
        open={sidebarActive}
        toggleSidebar={toggleActive}
      />
      <A500Packages
        open={sidebarHidden}
        toggleSidebar={toggleHidden}
      />
    </Fragment>
  );
}

export default injectIntl(memo(ManagerProduct));
