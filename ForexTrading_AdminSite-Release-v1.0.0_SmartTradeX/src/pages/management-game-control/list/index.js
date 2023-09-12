// @ts-nocheck
// ** React Imports
import { Fragment, useState, useEffect, memo } from "react";
// ** Store & Actions
import { toast } from "react-toastify";
import _ from "lodash";
import "./styles/styles.scss";
import { useForm } from "react-hook-form";
// import "@styles/react/libs/tables/react-dataTable-component.scss";
import Service from "../../../services/request";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import {
  Card,
  Input,
  Label,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  Form,
} from "reactstrap";
import moment from "moment";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { FormattedMessage, useIntl } from "react-intl";

const unitOptions = [
  { value: "BTC-USD", label: "BTC" },
  { value: "ETH-USD", label: "ETH" },
  { value: "YFI-USD", label: "YFI" },
  { value: "BNB-USD", label: "BNB" },
  { value: "LTC-USD", label: "LTC" },
  { value: "DASH-USD", label: "DASH" },
  { value: "SOL-USD", label: "SOL" },
  { value: "AXS-USD", label: "AXS" },
  { value: "PAXG-USD", label: "PAXG" },
  { value: "XRP-USD", label: "XRP" },
];

const DefaultFilter = {
  filter: {
    gameRecordUnit: "BTC-USD",
  },
  skip: 0,
  limit: 20,
  order: {
    key: "createdAt",
    value: "desc",
  },
};
const List_Search_Filter = ["username", "email", "referUser", "phoneNumber"];
const GamePlay = () => {
  const intl = useIntl();

  const getIntlText = (value) => {
    return intl.formatMessage({
      id: value,
    });
  };

  const formatColumn = (columns) => {
    return columns.map((column) => ({
      ...column,
      // name: column.name ? getIntlText(column.name) : "",
      name: column.name,
    }));
  };
  // ** Store Vars
  const serverSideColumns = [
    {
      name: "STT(ID)",
      selector: "gameRecordId",
      sortable: true,
    },
    {
      name: "kỲ CHƠI",
      selector: "gameRecordSection",
      sortable: true,
      minWidth: "150px",
      cell: (row) => {
        const { gameRecordSection } = row;

        return (
          <div>
            {moment(gameRecordSection, "YYYYMMDDHHmm").format("YYYYMMDDHHmm")}
          </div>
        );
      },
    },
    {
      name: "LÊN/XUỐNG",
      selector: "gameRecordStatus",
      sortable: true,
      cell: (row) => {
        const { gameRecordTypeUp } = row;

        return (
          <div
            className={
              gameRecordTypeUp ? "gameRecordTypeUp" : "gameRecordTypeDonw"
            }
          >
            {gameRecordTypeUp ? "L" : "X"}
          </div>
        );
      },
    },
    {
      name: "CHẴN/LẺ",
      selector: "gameRecordStatus",
      sortable: true,
      cell: (row) => {
        const { gameRecordTypeOdd } = row;

        return (
          <div
            className={
              gameRecordTypeOdd ? "gameRecordTypeOdd" : "gameRecordTypeEven"
            }
          >
            {gameRecordTypeOdd ? "L" : "C"}
          </div>
        );
      },
    },
    {
      name: "GIÁ TRỊ",
      selector: "gameRecordPrice",
      sortable: true,
      minWidth: '120px',
      cell: (row) => {
        const { gameRecordPrice } = row;

        return (
          <div>
            {/* {`${gameRecordPrice.charAt(
              gameRecordPrice.length - 2
            )}${gameRecordPrice.charAt(gameRecordPrice.length - 1)}`} */}
            {gameRecordPrice}
          </div>
        );
      },
    },
    {
      name: "GHI CHÚ",
      selector: "gameRecordNote",
      sortable: true,
      minWidth: '120px',
      cell: (row) => {
        const { gameRecordNote } = row;

        return <div>{gameRecordNote}</div>;
      },
    },
    {
      name: "HÀNH ĐỘNG",
      selector: "action",
      width: "39%",
      cell: (row) => {
        const {
          gameRecordTypeUp,
          gameRecordTypeDown,
          gameRecordTypeOdd,
          gameRecordTypeEven,
          gameRecordId,
        } = row;

        return (
          <>
            <Form>
              <FormGroup row className="custom-form-group">
                <Col sm={3}>
                  <FormGroup>
                    <Label>
                      <Input
                        onChange={(e) => { }}
                        type="radio"
                        name="gameRecordTypeDown"
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        onChange={(e) => {
                          handleUpdateData({
                            id: gameRecordId,
                            data: {
                              gameRecordTypeUp: 1,
                              gameRecordTypeDown: 0,
                            },
                          });
                        }}
                        checked={gameRecordTypeUp === 1 ? true : false}
                      />
                      <div className="label-green">
                        <span>
                          {/* <FormattedMessage id="UP" defaultMessage="Up" /> */}
                          <span>Lên</span>
                        </span>
                      </div>
                    </Label>
                  </FormGroup>
                </Col>
                <Col sm={3}>
                  <FormGroup>
                    <Label className="custom-label">
                      <Input
                        type="radio"
                        name="gameRecordTypeUp"
                        onChange={(e) => {
                          handleUpdateData({
                            id: gameRecordId,
                            data: {
                              gameRecordTypeUp: 0,
                              gameRecordTypeDown: 1,
                            },
                          });
                        }}
                        checked={gameRecordTypeDown === 1 ? true : false}
                      />
                      <div className="label-red">
                        <span>
                          {/* <FormattedMessage id="DOWN" defaultMessage="Down" /> */}
                          Xuống
                        </span>
                      </div>
                    </Label>
                  </FormGroup>
                </Col>
                <Col sm={3}>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        onChange={(e) => {
                          handleUpdateData({
                            id: gameRecordId,
                            data: {
                              gameRecordTypeOdd: 1,
                              gameRecordTypeEven: 0,
                            },
                          });
                        }}
                        type="radio"
                        name="gameRecordTypeEven"
                        checked={gameRecordTypeOdd === 1 ? true : false}
                      />
                      <div className="label-green">
                        <span>
                          {/* <FormattedMessage id="ODD" defaultMessage="Odd" /> */}
                          Lẻ
                        </span>
                      </div>
                    </Label>
                  </FormGroup>
                </Col>
                <Col sm={3}>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        onChange={(e) => {
                          handleUpdateData({
                            id: gameRecordId,
                            data: {
                              gameRecordTypeOdd: 0,
                              gameRecordTypeEven: 1,
                            },
                          });
                        }}
                        type="radio"
                        name="gameRecordTypeEven"
                        checked={gameRecordTypeEven === 1 ? true : false}
                      />{" "}
                      <div className="label-red">
                        <span>
                          {/* <FormattedMessage id="EVEN" defaultMessage="Even" /> */}
                          Chẵn
                        </span>
                      </div>
                    </Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            </Form>
          </>
        );
      },
    },
  ];
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  // ** States

  const [modal, setModal] = useState(false);
  const [modalMany, setModalMany] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [total, setTotal] = useState(20);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sectionList, setSectionList] = useState([]);
  // ** React hook form vars
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {},
  });
  const [userData, setUserData] = useState({});

  function getData(params, isNoLoading) {
    const newParams = {
      ...params,
    };
    if (!isNoLoading) {
      setIsLoading(true);
    }
    Object.keys(newParams.filter).forEach((key) => {
      if (!newParams.filter[key] || newParams.filter[key] === "") {
        delete newParams.filter[key];
      }
    });
    const token = window.localStorage.getItem("accessToken");

    if (token) {
      const newToken = token.replace(/"/g, "");

      Service.send({
        method: "POST",
        path: "/GameRecord/find",
        data: newParams,
        query: null,
        headers: {
          Authorization: `Bearer ` + newToken,
        },
      }).then((res) => {
        if (res) {
          const { statusCode, data, message } = res;
          setParamsFilter(newParams);
          if (statusCode === 200) {
            setTotal(data.total);
            setItems(data.data);
          } else {
            toast.warn(message || getIntlText("SOMETHING_WRONG"));
          }
        } else {
          setTotal(1);
          setItems([]);
        }
        if (!isNoLoading) {
          setIsLoading(false);
        }
      });
    } else {
      window.localStorage.clear();
    }
  }

  function handleFetchSection() {
    Service.send({
      method: "POST",
      path: "/Game/gameSectionList",
      data: {},
      query: null,
    }).then((res) => {
      if (res) {
        const { statusCode, data } = res;
        if (statusCode === 200) {
          setSectionList(data.data);
        }
      }
    });
  }

  function handleUpdateData(item, messageSuccess) {
    Service.send({
      method: "POST",
      path: "/GameRecord/updateById",
      data: item,
      query: null,
    }).then((res) => {
      if (res) {
        const { statusCode, message } = res;
        if (statusCode === 200) {
          toast.success(
            messageSuccess ? getIntlText(messageSuccess) : "Cập nhật thành công"
          );
          getData(paramsFilter);
        } else {
          toast.warn(message || getIntlText("SOMETHING_WRONG"));
        }
      }
    });
  }

  function getTime(params) {
    const newDate = new Date();
    const listTime = [];
    for (let index = 1; index <= 60; index++) {
      listTime.push(moment(newDate).add(index, "minutes").format("HH:mm:00"));
    }
    return listTime;
  }
  function handleAddData(item, messageSuccess) {
    Service.send({
      method: "POST",
      path: "Game/insert",
      data: item,
      query: null,
    }).then((res) => {
      if (res) {
        const { statusCode, message } = res;
        if (statusCode === 200) {
          toast.success(
            messageSuccess
              ? getIntlText(messageSuccess)
              : getIntlText("ADD_GAME_CONTROL")
          );
          getData(paramsFilter);
        } else {
          toast.warn(message || getIntlText("SOMETHING_WRONG"));
        }
      }
    });
  }

  function handleAddDataMany(item, messageSuccess) {
    Service.send({
      method: "POST",
      path: "/GameRecord/insertMany",
      data: item,
      query: null,
    }).then((res) => {
      if (res) {
        const { statusCode, message } = res;
        if (statusCode === 200) {
          toast.success(
            messageSuccess
              ? getIntlText(messageSuccess)
              : getIntlText("ADD_MANY_GAMES_CONTROL")
          );
          getData(paramsFilter);
        } else {
          toast.warn(message || getIntlText("SOMETHING_WRONG"));
        }
      }
    });
  }

  const getDataSearch = _.debounce((params) => {
    getData(params, true);
  }, 2000);

  // ** Get data on mount
  useEffect(() => {
    getData(paramsFilter);
  }, []);

  // ** Function to handle filter

  // ** Function to handle Pagination and get data
  const handlePagination = (page) => {
    const newParams = {
      ...paramsFilter,
      skip: page.selected * paramsFilter.limit,
    };
    getData(newParams);
    setCurrentPage(page.selected + 1);
  };

  // ** Function to handle per page
  const handlePerPage = (e) => {
    const newParams = {
      ...paramsFilter,
      limit: parseInt(e.target.value),
      skip: 0,
    };
    getData(newParams);
    setCurrentPage(1);
    setRowsPerPage(parseInt(e.target.value));
  };

  const handleChangeSearchField = (filed) => {
    const newParams = {
      ...paramsFilter,
      skip: 0,
    };
    List_Search_Filter.forEach((text) => {
      delete newParams.filter[text];
    });
    newParams.filter[filed] = "";
    getData(newParams);
  };

  const handleFilterChange = (name, value) => {
    const newParams = {
      ...paramsFilter,
      filter: {
        ...paramsFilter.filter,
        [name]: value,
      },
      skip: 0,
    };
    getData(newParams);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(total / rowsPerPage).toFixed(0));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
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

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOnchange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <Fragment>
      <Card className="accountAdmin">
        <Row className="mx-0 mt-1 mb-50">
          <Col sm="3">
            <Input
              onChange={(e) => {
                const { name, value } = e.target;
                handleFilterChange(name, value);
              }}
              type="select"
              value={
                paramsFilter.filter
                  ? paramsFilter.filter.gameRecordUnit || ""
                  : ""
              }
              name="gameRecordUnit"
              bsSize="md"
            >
              {unitOptions.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
            </Input>
          </Col>
          <Col />
          <Col sm="2">
            <Button.Ripple
              style={{ width: "100%", height: "40px" }}
              color="primary"
              size="sm"
              onClick={() => {
                setModalMany(true);
                setUserData({
                  gameRecordUnit: "ETH-USD",
                  gameRecordCount: 10,
                  gameRecordSection: moment().format("HH:mm") + ":00",
                });
              }}
            >
              {/* <FormattedMessage id="RECORDS" defaultMessage="Records" /> */}
              <span>Tạo mới</span>
            </Button.Ripple>
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          paginationServer
          // className="react-dataTable"
          className="datatable-custom-project p-0"
          columns={formatColumn(serverSideColumns)}
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          data={items}
          progressPending={isLoading}
        />
        <Modal
          isOpen={modalMany}
          toggle={() => setModalMany(false)}
          className={`modal-dialog-centered `}
        >
          <ModalHeader toggle={() => setModalMany(false)}>
            <span>Thêm nhiều điều khiển game</span>
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={handleSubmit(() => {
                handleAddDataMany(userData);
                setModalMany(false);
              })}
            >
              <FormGroup style={{ marginBottom: "12px" }}>
                <Label for="gameRecordSection">Kỳ chơi</Label>
                <Input
                  type="select"
                  name="gameRecordSection"
                  innerRef={register({ required: true })}
                  invalid={errors.gameRecordSection && true}
                  value={userData.gameRecordSection}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    handleOnchange(name, value);
                  }}
                >
                  {getTime().map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>

              <FormGroup style={{ marginBottom: "12px" }}>
                <Label>Số lượng</Label>
                <Input
                  type="select"
                  name="gameRecordCount"
                  innerRef={register({ required: true })}
                  invalid={errors.gameRecordCount && true}
                  value={userData.gameRecordCount}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    handleOnchange(name, value);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                </Input>
              </FormGroup>

              <FormGroup style={{ marginBottom: "12px" }}>
                <Label>Đơn vị</Label>
                <Input
                  type="select"
                  name="gameRecordUnit"
                  innerRef={register({ required: true })}
                  invalid={errors.gameRecordUnit && true}
                  value={userData.gameRecordUnit}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    handleOnchange(name, value);
                  }}
                >
                  {unitOptions.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>

              <FormGroup className="d-flex mb-0">
                <Button.Ripple className="mr-1" color="primary" type="submit">
                  Xác nhận
                </Button.Ripple>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Card>
    </Fragment>
  );
};

export default memo(GamePlay);
