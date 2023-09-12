import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Calendar, ChevronDown, Plus } from "react-feather";
import { columns } from "./columns";
import { Card, Col, FormGroup, Input, Row } from "reactstrap";
import Service from "../../../services/request";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import moment from "moment";
import ModaNotilDeleteById from "../../../components/Modal/Notification/ModaNotilDeleteById";
import ModalDeleteById from "../../../components/Modal/management-paymentMethod/ModalDeleteById";
import Loader from "../../../components/Loader";

const Table = (props) => {
  const history = useHistory();
  const [notificationList, setNotificationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const rowPerPage = 10;
  const [totalRecords, setTotalRecords] = useState(0);
  const [filterSearch, setFilterSearch] = useState("");
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dataFilter, setDataFilter] = useState({ searchText: null });
  const [defaultValue, setDefaultValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [dataToDelete, setDataToDelete] = useState({
    id: null,
    name: null,
  });
  useEffect(() => {
    const params = {
      skip: currentPage,
      limit: rowPerPage,
    };
    getNotificationList(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deletePaymentMethodId = (id) => {
    setIsLoadingSubmit(true);
    Service.send({
      method: "POST",
      path: "/CustomerMessage/staff/deleteGroupMessageById",
      data: { id },
      headers: {},
    }).then((res) => {
      setTimeout(() => setIsLoadingSubmit(false), 500);
      if (res) {
        const { statusCode, message } = res;
        if (statusCode === 200) {
          toast.success("Xoá thành công");
          getNotificationList({
            skip: currentPage,
            limit: rowPerPage,
          });
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
        getNotificationList([]);
      }
    });
  };
  const getNotificationList = (params, isNoLoading) => {
    if (!isNoLoading) {
      setIsLoading(true);
    }
    Service.send({
      method: "POST",
      path: "/GroupCustomerMessage/find",
      data: params,
      headers: {},
    }).then((res) => {
      if (res) {
        const { statusCode, data, message } = res;
        if (statusCode === 200) {
          setNotificationList(data.data);
          setTotalRecords(data?.total);
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
        setNotificationList([]);
      }
      if (!isNoLoading) {
        setIsLoading(false);
      }
    });
  };
  const handlePagination = (page) => {
    const params = {
      skip: page?.selected * rowPerPage,
      limit: rowPerPage,
      // filter: {
      //     producName:filterSearch||undefined,
      //     productChannel:productChannel||undefined
      // }
      searchText: filterSearch || undefined,
    };
    setCurrentPage(page?.selected * rowPerPage);
    getNotificationList(params);
  };
  const CustomPagination = () => {
    return (
      <Pagination
        handlePagination={handlePagination}
        currentPage={currentPage}
        rowsPerPage={rowPerPage}
        total={totalRecords}
      />
    );
  };

  const handleChangeSearch = (e) => {
    dataFilter.searchText = e.target.value;
    setDataFilter(dataFilter);
    const param = {
      skip: 0,
      limit: rowPerPage,
      // filter:{
      //     producName:e.target.value||undefined,
      //     productChannel:productChannel||undefined
      // }
      startDate: filterStartDate || undefined,
      searchText: e.target.value || undefined,
    };
    setCurrentPage(0);
    setFilterSearch(e.target.value);
    getNotificationList(param);
  };
  const handleFilterStartDate = (value) => {
    if (value === undefined) {
      setFilterStartDate(undefined);
      setEndDate(undefined);
    } else {
      setFilterStartDate(moment(value[0]).format());
      setEndDate(
        moment(value[1]).add(24, "hours").subtract(1, "second").format()
      );
    }
    setFilterStartDate(value ? moment(value[0]).format() : undefined);
    const param = {
      skip: 0,
      limit: rowPerPage,
      startDate: value ? `${moment(value[0]).format()}` : undefined,
      endDate: value
        ? `${moment(value[1]).add(24, "hours").subtract(1, "second").format()}`
        : undefined,
      searchText: dataFilter.searchText || undefined,
      // filter:{
      //     paymentStatus: statusRequest ||undefined
      // }||undefined,
    };
    getNotificationList(param);
  };
  const handleDataToDelete = (id, name) => {
    dataToDelete.id = id;
    dataToDelete.name = name;
    setDataToDelete({ ...dataToDelete });
  };
  return (
    <Fragment>
      {isLoadingSubmit ? <Loader /> : null}
      <Card className={"p-2"}>
        <div className={"container-header"}>
          <Row style={{ marginBottom: "1rem" }}>
            <Col lg={3}>
              <FormGroup>
                <Input
                  placeholder={"Tìm kiếm"}
                  onChange={handleChangeSearch}
                  className={"custom-input-pj"}
                />
              </FormGroup>
            </Col>
            <Col lg={3}>
              <FormGroup>
                <Flatpickr
                  style={{ position: "relative" }}
                  value={filterStartDate}
                  options={{
                    mode: "range",
                  }}
                  id="startDate"
                  placeholder={"Từ ngày"}
                  className={`form-control ${
                    !props?.disabled ? "form-control__date" : ""
                  } custom-flatpickr-pj`}
                  onChange={(date) => handleFilterStartDate(date)}
                  disabled={props?.disabled}
                />
                <Calendar
                  size={20}
                  onClick={() => {
                    setDefaultValue(!defaultValue);
                    handleFilterStartDate(undefined);
                  }}
                  style={{
                    position: "absolute",
                    right: "25px",
                    transform: "translateY(calc(-100% - 10px))",
                    color: "#82868b",
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg={3} />
            <Col lg={3}>
              <div
                className={"containerBtn text-right"}
                style={{ marginBottom: "1rem" }}
              >
                <button
                  className={"btn btn-primary"}
                  onClick={() => {
                    history.push("/notification/create");
                  }}
                >
                  <Plus
                    size={17}
                    style={{ marginTop: "-2px", marginRight: "10px" }}
                  />
                  Tạo mới
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <DataTable
          columns={columns(setIsOpenModal, handleDataToDelete)}
          noHeader
          persistTableHead
          data={notificationList}
          sortIcon={<ChevronDown />}
          className="datatable-custom-project p-0"
          noDataComponent={<h3>Không tìm thấy dữ liệu</h3>}
          progressPending={isLoading}
        />
        <div>
          <CustomPagination />
        </div>
      </Card>
      <ModaNotilDeleteById
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        deletePaymentMethodId={deletePaymentMethodId}
        dataToDelete={dataToDelete}
      />
    </Fragment>
  );
};
export default Table;
