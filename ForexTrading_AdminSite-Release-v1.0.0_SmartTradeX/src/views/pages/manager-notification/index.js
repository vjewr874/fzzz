import { Fragment, useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import { ChevronDown, Eye} from "react-feather";
import {
  Row,
  Input,
  Card,
  Button,
  UncontrolledTooltip,
  Col,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import moment from "moment";
import PlaceholderImage from "../../../assets/images/placeholder/placeholder.png";
import CustomerMessageService from "../../../services/customerMessageService";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import DetailMessage from "./detailMessage";


const Notification = ({ intl }) => {
  const DefaultFilter = {
    filter: {},
    skip: 0,
    limit: 20,
    order: {
      key: "createdAt",
      value: "desc",
    },
  };

  const history = useHistory();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(20);
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [idData, setIdData] = useState([]);
  const [sidebarDetailOpen, setSidebarDetailOpen] = useState(false);
  const toggleDetailOpen = () => {
    setSidebarDetailOpen(!sidebarDetailOpen);
  };

  function getData(params, isLoading) {
    const newParams = {
      ...params,
    };
    if (isLoading) {
      setIsLoading(false);
    }
    Object.keys(newParams.filter).forEach((key) => {
      if (!newParams.filter[key] || newParams.filter[key] === "") {
        delete newParams.filter[key];
      }
    });
    CustomerMessageService.findMessage(newParams)
      .then((result) => {
        setItems(result.data);
        setTotal(result.total);
      })
      .catch((error) => {
        toast.error(
          intl.formatMessage({ id: "an_error_occurred" }) +
            " " +
            intl.formatMessage({ id: "actionFailed" })
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getData(paramsFilter);
  }, []);

  const notifySideColumns = [
    {
      name: intl.formatMessage({ id: "id" }),
      selector: "groupCustomerMessageId",
      maxWidth: "100px",
    },
    {
      name: intl.formatMessage({ id: "title" }),
      selector: "groupCustomerMessageTitle",
      minWidth: "250px",
    },
    {
      name: intl.formatMessage({ id: "content" }),
      selector: "groupCustomerMessageContent",
      maxWidth: "500px",
    },
    {
      name: intl.formatMessage({ id: "image" }),
      maxWidth: "150px",
      cell: (row) => {
        const { groupCustomerMessageImage } = row;
        return (
          <img
            src={groupCustomerMessageImage || PlaceholderImage}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = PlaceholderImage;
            }}s
            alt="IMG"
            width="50"
            height="50"
          />
        );
      },
    },
    {
      name: intl.formatMessage({ id: "send_at" }),
      selector: "createdAt",
      maxWidth: "150px",
      cell: (row) => {
        const { createdAt } = row;

        return <div>{(moment(createdAt)).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      name: intl.formatMessage({ id: "action" }),
      selector: "action",
      maxWidth: "150px",
      cell: (row) => {
        const { groupCustomerMessageId } = row;
        return (
          <div className="d-flex align-items-center">
            <span
              className="full-width ml-2 cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                CustomerMessageService.findDetailMessageById(
                  groupCustomerMessageId
                ).then((data) => {
                  setIdData(data);
                  toggleDetailOpen();
                });
              }}
            >
              <Eye size={15} id={"detail"}/>{" "}
              <UncontrolledTooltip placement="top" target={"detail"}>
            {intl.formatMessage({ id: "detail_message" })}
          </UncontrolledTooltip>
            </span>
          </div>
        );
      },
    },
  ];

  const handleClick = () => {
    history.push("/pages/insert-message");
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
  const getDataSearch = _.debounce((params, isLoading) => {
    getData(params, isLoading);
  }, 2000);
  const handleFilter = (e) => {
    const { value } = e.target;
    setIsLoading(true);
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
    setSearch(e.value);
  };

  return (
    <Fragment>
      <Card className="p-1">
        <Row className="pb-1 align-items-center justify-content-between">
          <Col sm="12" lg="8">
            <Button.Ripple
              className="mb-1 mb-sm-0"
              color="primary"
              onClick={handleClick}
            >
              {intl.formatMessage({ id: "add" })}
            </Button.Ripple>
          </Col>
          <Col sm="12" lg="4">
            <Input
              placeholder={intl.formatMessage({ id: "please-enter" })}
              onChange={onChangeSearch}
              onKeyDown={onKeydown}
              value={search}
            />
          </Col>
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
          columns={notifySideColumns}
          paginationComponent={CustomPagination}
          sortIcon={<ChevronDown size={10} />}
          data={items}
        />
      </Card>
      <DetailMessage
        open={sidebarDetailOpen}
        toggleSidebar={toggleDetailOpen}
        arrData={idData}
      />
    </Fragment>
  );
};
export default injectIntl(Notification);
