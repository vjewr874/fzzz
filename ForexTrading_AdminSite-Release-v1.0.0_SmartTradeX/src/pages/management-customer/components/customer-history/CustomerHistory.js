import { Card, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import DataTable from "react-data-table-component";
import CustomPagination from "../../../../components/Pagination/Pagination";
import React, { useEffect, useState } from "react";
import { columnsDetail } from "./column";
import { ChevronDown } from "react-feather";
import Service from "../../../../services/request";
import { toast } from "react-toastify";
import Pagination from "../../../../components/Pagination/Pagination";

const typesHistoryCustomer = [
  {
    label: "Danh sách nạp tiền",
    value: "paymentDepositTransaction",
    api: "/PaymentDepositTransaction/find",
  },
  {
    label: "Danh sách rút tiền",
    value: "paymentWithdrawTransaction",
    api: "/PaymentWithdrawTransaction/find",
  },
  {
    label: "Danh sách giao dịch",
    value: "WalletRecord",
    api: "/WalletRecord/find",
  },
  // {
  //     label:"Danh sách đơn mua",
  //     value:"productOrder",
  //     api:"/ProductOrder/find"
  // }
];
const CustomerHistory = (props) => {
  const [activeTab, setActiveTab] = useState("0");
  const [typeAPI, setTypeAPI] = useState(typesHistoryCustomer[0].api);
  const [typeList, setTypeList] = useState(typesHistoryCustomer[0].value);
  const [listData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const rowPerPage = 6;
  useEffect(() => {
    const data = {
      filter: {
        appUserId: props.IdUser,
      },
      skip: currentPage,
      limit: rowPerPage,
    };
    getDetailHistoryList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeAPI]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handlePagination = (page) => {
    const params = {
      skip: page.selected * rowPerPage,
      limit: rowPerPage,
      filter: {
        appUserId: props.IdUser,
      },
    };
    setCurrentPage(page.selected * rowPerPage);
    getDetailHistoryList(params);
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
  const getDetailHistoryList = (data) => {
    Service.send({
      method: "POST",
      path: typeAPI,
      data: data,
      headers: {},
    }).then((res) => {
      if (res) {
        const { statusCode, data, message } = res;
        if (statusCode === 200) {
          setListData(data.data);
          setTotalRecords(data?.total);
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
        setListData([]);
      }
    });
  };

  return (
    <div>
      <Card className={"p-2"}>
        <Nav tabs>
          {typesHistoryCustomer.map((value, index) => (
            <NavItem key={index}>
              <NavLink
                active={activeTab === `${index}`}
                onClick={() => {
                  toggle(`${index}`);
                  setTypeAPI(value.api);
                  setTypeList(value.value);
                  setCurrentPage(0);
                }}
              >
                {value.label}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeTab}>
          {typesHistoryCustomer.map((value, index) => (
            <TabPane tabId={`${index}`} key={index}>
              <DataTable
                columns={columnsDetail(typeList)}
                noHeader
                persistTableHead
                data={listData}
                sortIcon={<ChevronDown />}
                className="datatable-custom-project p-0"
                noDataComponent={<h3>Không tìm thấy dữ liệu</h3>}
              />
              <div>
                <CustomPagination />
              </div>
            </TabPane>
          ))}
        </TabContent>
      </Card>
    </div>
  );
};
export default CustomerHistory;
