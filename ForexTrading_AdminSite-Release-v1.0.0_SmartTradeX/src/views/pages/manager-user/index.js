import React from "react";
import { Fragment, memo, useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import {
  Card,
  Input,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  UncontrolledTooltip,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { ChevronDown, Cpu, Lock, MinusCircle, PlusCircle, Unlock } from "react-feather";
import { MoreVertical, Edit } from "react-feather";
import moment from "moment";
import { useHistory } from "react-router-dom";
import UserService from "../../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import _ from "lodash";
import { xoa_dau } from "../../../helper/common";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import Bonus from "./components/bonus";
import Decrease from "./components/decrease";
import Factory from "./components/factory";

function UserPage({ intl }) {
  const DefaultFilter = {
    filter: {},
    skip: 0,
    limit: 20,
    order: {
      key: "createdAt",
      value: "desc",
    },
  };

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(20);
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [lockUser, setLockUser] = useState(1);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("all");
  const [verify, setVerify] = useState("all");
  const history = useHistory();
  const [sidebarBonus, setSidebarBonus] = useState(false);
  const [sidebarDecrease, setSidebarDecrease] = useState(false);
  const [sidebarFactory, setSidebarFactory] = useState(false);
  const [tranItem, setTranItem] = useState(null);
  const toggleBonus = () => {
    setSidebarBonus(!sidebarBonus);
  };
  const toggleDecrease = () => {
    setSidebarDecrease(!sidebarDecrease);
  };
  const toggleFactory = () => {
    setSidebarFactory(!sidebarFactory);
  };
  function getData(params, isLoading) {
    const newParams = {
      ...params,
    };
    UserService.getUser(newParams)
      .then((result) => {
        setItems(result.data);
        setTotal(result.total);
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
  }, []);

  const onClickLockUser = (row) => {
    const params = {
      id: row.appUserId,
      data: {
        active: row.active === 0 ? 1 : 0,
      },
    };
    UserService.updateUserById(params)
      .then(() => {
        setLockUser((prevState) => {
          let newLockUser = prevState.lockUser === 0 ? 1 : 0;
          return newLockUser;
        });
        getData(paramsFilter);
      })
      .catch(() => {
        toast.error(
          intl.formatMessage({ id: "update" }) +
          " " +
          intl.formatMessage({ id: "status" }) +
          " " +
          intl.formatMessage({ id: "actionFailed" })
        );
      });
  };

  const getTypeColorVerified = (id) => {
    switch (id) {
      case 1:
        return "success";
      case 2:
        return "warning";
      case 3:
        return "danger";
      default:
        return "light-dark";
    }
  };

  const getDescriptionVerified = (id) => {
    switch (id) {
      case 1:
        return intl.formatMessage({ id: "verified" });
      case 2:
        return intl.formatMessage({ id: "loading" });
      case 3:
        return intl.formatMessage({ id: "reject" });
      default:
        return intl.formatMessage({ id: "unverified" });
    }
  };

  const onClickLock = (row) => {
    if (row.active === 1) {
      return (
        <div>
          <Unlock
            size={17}
            id={"inactive"}
            className="text-success"
            cursor="pointer"
            onClick={() => onClickLockUser(row)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Lock
            size={17}
            id={"active"}
            className="text-danger"
            cursor="pointer"
            onClick={() => onClickLockUser(row)}
          />
        </div>
      );
    }
  };

  const serverSideColumns = [
    {
      name: intl.formatMessage({ id: "id" }),
      selector: "appUserId",
      sortable: true,
      width: "80px",
      cell: (row) => {
        const { appUserId } = row;
        return (
          <>
            <span
              href="/"
              id="id"
              className="text-dark cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                UserService.findDetailUserById(appUserId)
                  .then((data) => {
                    history.push("/pages/edit-user", {
                      item: data,
                    });
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
            <UncontrolledTooltip placement="top" target="id">
              {intl.formatMessage({ id: "click_to_see_detail" })}
            </UncontrolledTooltip>
          </>
        );
      },
    },
    // {
    //   name: intl.formatMessage({ id: "title_member" }),
    //   selector: "companyName",
    //   maxWidth: "200px",
    // },
    {
      name: intl.formatMessage({ id: "username" }),
      selector: "username",
      minWidth: "200px",
      cell: (row) => {
        const { appUserId } = row;
        return (
          <>
            <span
              href="/"
              id="detail"
              className="text-dark cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                UserService.findDetailUserById(appUserId)
                  .then((data) => {
                    history.push("/pages/edit-user", {
                      item: data,
                    });
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
              {row.username}
            </span>
            <UncontrolledTooltip placement="right" target="detail">
              {intl.formatMessage({ id: "click_to_see_detail" })}
            </UncontrolledTooltip>
          </>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "phoneNumber" }),
      selector: "phoneNumber",
      minWidth: "200px",
    },
    {
      name: intl.formatMessage({ id: "member_level" }),
      selector: "appUserMembershipTitle",
      maxWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: "active" }),
      selector: "active",
      maxWidth: "150px",
      cell: (row) => {
        const { active } = row;
        const typeColor = active === 1 ? "success" : "danger";
        return (
          <Badge color={typeColor}>
            {intl.formatMessage({ id: active === 1 ? "active" : "inactive" })}
          </Badge>
        );
      },
    },
    {
      name: intl.formatMessage({ id: "createdAt" }),
      selector: "createdAt",
      maxWidth: "150px",
      cell: (row) => {
        const { createdAt } = row;
        return <div>{(moment(createdAt)).format("HH:mm DD/MM/YYYY")}</div>;
      },
    },
    // {
    //   name: intl.formatMessage({ id: "verify-user" }),
    //   selector: "isVerified",
    //   maxWidth: "150px",
    //   cell: (row) => {
    //     const { isVerified } = row;
    //     const typeColor = getTypeColorVerified(isVerified);
    //     return (
    //       <Badge color={typeColor}>{getDescriptionVerified(isVerified)}</Badge>
    //     );
    //   },
    // },
    {
      name: intl.formatMessage({ id: "refer_user" }),
      maxWidth: "150px",
      selector: "referUser"
    },
    {
      name: intl.formatMessage({ id: "action" }),
      maxWidth: "130px",
      cell: (row) => {
        const { appUserId } = row;
        return (
          <UncontrolledDropdown size="sm">
            <div className="d-flex">
              <span className="mt-1">{onClickLock(row)}</span>
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
                href="/"
                className="full-width"
                onClick={(event) => {
                  event.preventDefault();
                  UserService.findDetailUserById(appUserId)
                    .then((data) => {
                      history.push("/pages/edit-user", {
                        item: data,
                      });
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
                <Edit size={15} />
                <span className="ml-1">
                  {intl.formatMessage({ id: "edit" }) +
                    " / " +
                    intl.formatMessage({ id: "verify-user" })}
                </span>
              </DropdownItem>
              <DropdownItem
                className="full-width"
                onClick={(event) => {
                  event.preventDefault();
                  UserService.findDetailUserById(appUserId).then(data => setTranItem(data))
                  toggleBonus();
                }}
              >
                <PlusCircle size={15} />{" "}
                <span className="ml-1">
                  {intl.formatMessage({ id: "bonus_user" })}
                </span>
              </DropdownItem>
              <DropdownItem
                className="full-width"
                onClick={(event) => {
                  event.preventDefault();
                  UserService.findDetailUserById(appUserId).then(data => setTranItem(data))
                  toggleDecrease();
                }}
              >
                <MinusCircle size={15} />{" "}
                <span className="ml-1">
                  {intl.formatMessage({ id: "decrease_user" })}
                </span>
              </DropdownItem>
              {/* <DropdownItem
                className="full-width"
                onClick={(event) => {
                  event.preventDefault();
                  UserService.findDetailUserById(appUserId).then(data => setTranItem(data))
                  toggleFactory();
                }}
              >
                <Cpu size={15} />{" "}
                <span className="ml-1">
                  {intl.formatMessage({ id: "factory" })}
                </span>
              </DropdownItem> */}
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];

  const handleLocalizeActive = (value) => {
    switch (value) {
      case "all":
        return intl.formatMessage({ id: "all_status" });
      case "active":
        return intl.formatMessage({ id: "active" });
      case "inactive":
        return intl.formatMessage({ id: "inactive" });
      default:
        return "";
    }
  };

  const handleLocalizeVerify = (value) => {
    switch (value) {
      case "all":
        return intl.formatMessage({ id: "all_verify" });
      case "unverified":
        return intl.formatMessage({ id: "unverified" });
      case "loading":
        return intl.formatMessage({ id: "loading" });
      case "verified":
        return intl.formatMessage({ id: "verified" });
      case "reject":
        return intl.formatMessage({ id: "reject" });
      default:
        return "";
    }
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
    let convertValue = xoa_dau(value);
    if (convertValue === "") {
      getDataSearch(DefaultFilter);
      setParamsFilter(DefaultFilter);
      setActive("all");
      setVerify("all")
    } else {
      let newParams = {
        ...paramsFilter,
        filter: {
          ...paramsFilter.filter,
        },
        searchText: convertValue,
        skip: 0,
      };
      switch (active) {
        case "active":
          newParams.filter.active = 1;
          break;
        case "inactive":
          newParams.filter.active = 0;
          break;
        default:
          break;
      }
      switch (verify) {
        case "unverified":
          newParams.filter.isVerified = 0;
          break;
        case "loading":
          newParams.filter.isVerified = 2;
          break;
        case "verified":
          newParams.filter.isVerified = 1;
          break;
        case "reject":
          newParams.filter.isVerified = 3;
          break;
        default:
          break;
      }
      setParamsFilter(newParams);
      getDataSearch(newParams, false);
    }
  };

  const onClickActive = (id) => {
    let newParams = {
      ...paramsFilter,
      filter: {
        ...paramsFilter.filter,
      },
      skip: 0,
    };
    if (id !== null) {
      newParams.filter.active = id;
    } else {
      delete newParams.filter.active;
    }
    switch (id) {
      case null:
        setActive("all");
        break;
      case 1:
        setActive("active");
        break;
      case 0:
        setActive("inactive");
        break;
      default:
        break;
    }
    setParamsFilter(newParams);
    getData(newParams, false);
  };

  const onClickVerify = (id) => {
    let newParams = {
      ...paramsFilter,
      filter: {
        ...paramsFilter.filter,
      },
      skip: 0,
    };
    if (id !== null) {
      newParams.filter.isVerified = id;
    } else {
      delete newParams.filter.isVerified;
    }
    switch (id) {
      case null:
        setVerify("all");
        break;
      case 0:
        setVerify("unverified");
        break;
      case 1:
        setVerify("verified");
        break;
      case 2:
        setVerify("loading");
        break;
      case 3:
        setVerify("reject");
        break;
      default:
        break;
    }
    setParamsFilter(newParams);
    getData(newParams, false);
  };

  const onKeydown = (e) => {
    if (e.key === "Enter") {
      handleFilter(e);
    }
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
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
          >
            <UncontrolledDropdown className="mr-2">
              <DropdownToggle color="primary" caret outline>
                {handleLocalizeActive(active)}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  className="full-width"
                  value="all"
                  onClick={() => onClickActive(null)}
                >
                  {intl.formatMessage({ id: "all_status" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="active"
                  onClick={() => onClickActive(1)}
                >
                  {intl.formatMessage({ id: "active" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="inactive"
                  onClick={() => onClickActive(0)}
                >
                  {intl.formatMessage({ id: "inactive" })}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/* <UncontrolledDropdown>
              <DropdownToggle color="primary" caret outline>
                {handleLocalizeVerify(verify)}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  className="full-width"
                  value="all"
                  onClick={() => onClickVerify(null)}
                >
                  {intl.formatMessage({ id: "all_verify" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="unverified"
                  onClick={() => onClickVerify(0)}
                >
                  {intl.formatMessage({ id: "unverified" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="verified"
                  onClick={() => onClickVerify(1)}
                >
                  {intl.formatMessage({ id: "verified" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="loading"
                  onClick={() => onClickVerify(2)}
                >
                  {intl.formatMessage({ id: "loading" })}
                </DropdownItem>
                <DropdownItem
                  className="full-width"
                  value="reject"
                  onClick={() => onClickVerify(3)}
                >
                  {intl.formatMessage({ id: "reject" })}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Col>

          <Col className="d-flex flex-grow-1 mb-1" sm={12} md={5} lg={4}>
            <Input
              value={search}
              onKeyDown={onKeydown}
              onChange={onChangeSearch}
              placeholder={intl.formatMessage({ id: "search" })}
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
          columns={serverSideColumns}
          paginationComponent={CustomPagination}
          sortIcon={<ChevronDown size={10} />}
          data={items}
        />
      </Card>
      {tranItem && sidebarBonus && <Bonus item={tranItem} open={sidebarBonus} toggleSidebar={toggleBonus} />}
      {tranItem && sidebarDecrease && <Decrease item={tranItem} open={sidebarDecrease} toggleSidebar={toggleDecrease} />}
      {tranItem && sidebarFactory && <Factory item={tranItem} open={sidebarFactory} toggleSidebar={toggleFactory} />}
    </Fragment>
  );
}

export default injectIntl(memo(UserPage));
