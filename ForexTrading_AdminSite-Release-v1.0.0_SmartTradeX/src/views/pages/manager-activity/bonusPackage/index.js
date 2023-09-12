import React, { memo, useState, useEffect, Fragment } from "react";
import {
  Badge,
  Card,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
//icon
import { ChevronDown } from "react-feather";

//translate
import { injectIntl } from "react-intl";

//services
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import moment from "moment";
import DetailModal from "../../manager-transaction/detailModal";
import PaymentPackageService from "../../../../services/payPackageService";

const DefaultFilter = {
  filter: {
    packageCategory:"KYC"
  },
  skip: 0,
  limit: 20,
  order: {
    key: "createdAt",
    value: "desc",
  },
};
function BonusPackageHistory({ intl, active }) {
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [bonusPackageData, setBonusPackageData] = useState([]);
  const [total, setTotal] = useState(20);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("KYC");
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
        if (newParams.filter.packageCategory || newParams.filter.packageCategory === "") {
        } else {
        delete newParams.filter[key];
      }}
    });
    PaymentPackageService.findUserBuyPackage(newParams)
      .then((result) => {
        setTotal(result.total);
        setBonusPackageData(result.data);
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
      let newParams = {
        ...paramsFilter,
        skip: 0,
      };
      switch (category) {
        case "KYC":
          newParams.filter.packageCategory = "KYC";
          break;
        case "Rank":
          newParams.filter.packageCategory = "Rank";
          break;
        case "Bonus":
          newParams.filter.packageCategory = "Bonus";
          break;
        default:
          break;
      }
      getDataSearch(newParams);
      setParamsFilter(newParams);
    } else {
      let newParams = {
        ...paramsFilter,
        searchText: value,
        skip: 0,
      };
      switch (category) {
        case "KYC":
          newParams.filter.packageCategory = "KYC";
          break;
        case "Rank":
          newParams.filter.packageCategory = "Rank";
          break;
        case "Bonus":
          newParams.filter.packageCategory = "Bonus";
          break;
        default:
          break;
      }
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

  const handleLocalizeCategory = (value) => {
    switch (value) {
      case "Rank":
        return intl.formatMessage({ id: "bonus_ranking" });
      case "Bonus":
        return intl.formatMessage({ id: "bonus_normal" });
      case "KYC":
        return intl.formatMessage({ id: "bonus_kyc" });
      default:
        return "";
    }
  };

  const onClickCategory = (value) => {
    let newParams = {
      ...paramsFilter,
      filter: {
        ...paramsFilter.filter,
      },
      skip: 0,
    };
    if (value !== null) {
      newParams.filter.packageCategory = value;
    } else {
      delete newParams.filter["packageCategory"];
    }
    switch (value) {
      case "KYC":
        setCategory("KYC");
        break;
      case "Bonus":
        setCategory("Bonus");
        break;
      case "Rank":
        setCategory("Rank");
        break;
      default:
        break;
    }
    setParamsFilter(newParams);
    getData(newParams, false);
  };

  const getTypeColorCategory = (value) => {
    switch (value) {
      case "KYC":
        return "light-dark";
      case "Bonus":
        return "warning";
      case "Rank":
        return "success";
      default:
        return;
    }
  };

  const getDescriptionCategory = (value) => {
    switch (value) {
      case "KYC":
        return intl.formatMessage({ id: "bonus_kyc" });
      case "Bonus":
        return intl.formatMessage({ id: "bonus_normal" });
      case "Rank":
        return intl.formatMessage({ id: "ranking" });
      default:
        return;
    }
  };

  const BonusPackageHistoryColumn = [
    {
      name: intl.formatMessage({ id: "time" }),
      selector: "createdAt",
      maxWidth: "200px",
      cell: (row) => {
        const { createdAt } = row;
        return (
          <div>{(moment(createdAt)).format("HH:mm DD/MM/YYYY")}</div>
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
    // {
    //   name: intl.formatMessage({ id: "bonusPackageId" }),
    //   selector: "bonusPackageId",
    //   maxWidth: "200px",
    // },

    // {
    //   name: intl.formatMessage({ id: "bonusPackageDescription" }),
    //   selector: "bonusPackageDescription",
    //   minWidth: "200px",
    // },
    // {
    //   name: intl.formatMessage({ id: "packageType" }),
    //   selector: "packageType",
    //   maxWidth: "250px",
    // },
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
      name: intl.formatMessage({ id: "duration" }),
      selector: "packageDuration",
      minWidth: "150px",
      cell: (row) => {
        const { packageExpireDate } = row
        const today = moment();
        const endPackageDate = moment(packageExpireDate);
        return (
          <div>
            {endPackageDate.diff(today, 'days')}
          </div>
        )
      }
    },
    {
      name: intl.formatMessage({ id: "date_expire" }),
      minWidth: "150px",
      cell: (row) => {
        const { packageExpireDate } = row;
        if (packageExpireDate === null) {
          return "";
        }
        return (
          <div>
            {moment(packageExpireDate).format("DD/MM/YYYY")}
          </div>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "category" }),
      selector: "packageCategory",
      maxWidth: "250px",
      cell: (row) => {
        const { packageCategory } = row;
        const typeColor = getTypeColorCategory(packageCategory);
        return (
          <Badge color={typeColor}>{getDescriptionCategory(packageCategory)}</Badge>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Card>
      <span className="align-middle d-sm-none">
        <h4 className="my-2">
          {intl.formatMessage({ id: "bonus_package" })}
        </h4>
      </span>
        <Row>
          <Col sm={12} lg={8}>
            <UncontrolledDropdown>
              <DropdownToggle color="primary" caret outline>
                {handleLocalizeCategory(category)}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  className="full-width"
                  value="KYC"
                  onClick={() => onClickCategory("KYC")}
                >
                  {intl.formatMessage({ id: "bonus_kyc" })}
                </DropdownItem>
                {/* <DropdownItem
                  className="full-width"
                  value="Bonus"
                  onClick={() => onClickCategory("Bonus")}
                >
                  {intl.formatMessage({ id: "bonus_normal" })}
                </DropdownItem> */}
                <DropdownItem
                  className="full-width"
                  value="Rank"
                  onClick={() => onClickCategory("Rank")}
                >
                  {intl.formatMessage({ id: "bonus_ranking" })}
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
          paginationServer
          highlightOnHover
          persistTableHead
          noDataComponent={<span className="mt-2">{intl.formatMessage({ id: "table_empty" })}</span>}
          className="react-dataTable"
          columns={BonusPackageHistoryColumn}
          paginationComponent={CustomPagination}
          sortIcon={<ChevronDown size={10} />}
          data={bonusPackageData}
        />
      </Card>
      <DetailModal
        open={sidebarDetailOpen}
        toggleSidebar={toggleDetailOpen}
        arrData={idData}
      />
    </Fragment>
  );
}

export default injectIntl(memo(BonusPackageHistory));
