import React, { memo, useState, useEffect, Fragment } from "react";
import {
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { ChevronDown } from "react-feather";
import { injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { addCommas } from "@utils";
import moment from "moment";
import PaymentPackageService from "../../../services/payPackageService";
import "@styles/react/libs/tables/react-dataTable-component.scss";

function A500Packages({ intl, open, toggleSidebar }) {
  const DefaultFilter = {
    filter: {
      packageType: "A500FAC",
    },
    skip: 0,
    limit: 20,
    order: {
      key: "createdAt",
      value: "desc",
    },
  };

  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [items, setItems] = useState([]);

  const getData = () => {
    PaymentPackageService.findPaymentPackage(paramsFilter)
      .then((result) => {
        let arrData = [...result.data];
        for (let i = 0; i < arrData.length; i++) {
          arrData[i].isChecked = false;
        }
        setItems(arrData);
      })
      .catch(() => {
        toast.error(
          intl.formatMessage({ id: "an_error_occurred" }) +
            " " +
            intl.formatMessage({ id: "please_come_back_late" })
        );
      });
  } 

  useEffect(() => {
    getData(paramsFilter)
  }, []);

  const onHandleOpenSell = (row) => {
    const paymentServicePackageId = row.paymentServicePackageId
    PaymentPackageService.activePackagesList(paymentServicePackageId)
      .then(() => {
        toast.success(
          intl.formatMessage({ id: "active_show" }) +
            " " +
            intl.formatMessage({ id: "actionSuccess" }).toLowerCase()
        );
        getData(paramsFilter)
        setParamsFilter(paramsFilter)
      })
      .catch((error) => {
        toast.error(
          intl.formatMessage({ id: "active_show" }) +
            " " +
            intl.formatMessage({ id: "actionFailed" }).toLowerCase()
        );
      });
  };

  const onHandleHidden = (row) => {
    const paymentServicePackageId = row.paymentServicePackageId
    PaymentPackageService.deactivatePackagesByIdList(paymentServicePackageId)
      .then(() => {
        toast.success(
          intl.formatMessage({ id: "deactive_hidden" }) +
            " " +
            intl.formatMessage({ id: "actionSuccess" }).toLowerCase()
        );
        getData(paramsFilter)
        setParamsFilter(paramsFilter)
      })
      .catch((error) => {
        toast.error(
          intl.formatMessage({ id: "deactive_hidden" }) +
            " " +
            intl.formatMessage({ id: "actionFailed" }).toLowerCase()
        );
      });
  };

  const PackageColumn = [
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
      name: intl.formatMessage({ id: "price_machine" }),
      selector: "packagePrice",
      minWidth: "150px",
      cell: (row) => {
        return (
          <>
            {addCommas(row.packagePrice)} {intl.formatMessage({ id: "USDT" })}
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
      name: intl.formatMessage({ id: " " }),
      width: "150px",
      cell: (row) => {
        const { isHidden, paymentServicePackageId } = row;
        return (
          <div>
            <Button
              type="radio"
              color="primary"
              checked={row.isHidden === 0}
              value={isHidden}
              onClick={e => onHandleOpenSell(row)}
              outline={isHidden === 0 ? false : true}
            >
              {intl.formatMessage({ id: "open_sell" })}
            </Button>
          </div>
        );
      },
    },
    {
      name: intl.formatMessage({ id: " " }),
      width: "150px",
      cell: (row) => {
        const { isHidden, paymentServicePackageId } = row;
        return (
          <div>
            <Button
              type="radio"
              color="danger"
              className="ml-2"
              checked={row.isHidden === 1}
              value={isHidden}
              onClick={e => onHandleHidden(row)}
              outline={isHidden === 1 ? false : true}
            >
              {intl.formatMessage({ id: "hidden" })}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className={`modal-dialog modal-xl `}
    >
      <ModalHeader toggle={toggleSidebar}>
        {intl.formatMessage({ id: "hidden_package" })}
      </ModalHeader>
      <ModalBody>
        <Card className="p-1">
          <DataTable
            noHeader
            highlightOnHover
          persistTableHead
            paginationServer
            noDataComponent={<span className="mt-2">{intl.formatMessage({ id: "table_empty" })}</span>}
            className="react-dataTable"
            columns={PackageColumn}
            sortIcon={<ChevronDown size={10} />}
            data={items}
          />
        </Card>
      </ModalBody>
    </Modal>
  );
}

export default injectIntl(memo(A500Packages));
