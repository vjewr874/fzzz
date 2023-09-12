import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { MoreVertical, Edit, Check, X, Lock, Eye } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { convertTimeDate } from "../../../ultils/convertDate";
import {
  currencyFormat,
  currencyFormatUSD,
} from "../../../ultils/currentFormacy";
import React from "react";
import { WALLET_RECORD_TYPES } from "../../../constants/historyList";
import _ from "lodash";

const statusObj = {
  active: "light-success",
  notActive: "light-danger",
};

const renderWalletTypeName = (type) => {
  var tmp = _.find(WALLET_RECORD_TYPES, { value: type });
  return tmp ? tmp.label : "UNDEFINED";
};

function handleChangeTypeHistory(type) {
  switch (type) {
    case "PaymentDepositTransaction":
      return "paymentDepositTransactionId";
    case "PaymentWithdrawTransaction":
      return "paymentWithdrawTransactionId";
    case "WalletRecord":
      return "WalletRecordId";
    case "PaymentBonusTransaction":
      return "paymentBonusTransactionId";
    case "PaymentExchangeTransaction":
      return "exchangePaymentMappingOrderId";
    case "BetRecords":
      return "betRecordId";
    default:
      return null;
  }
}

export const columnsDeposit = (
  typeHistory,
  handleApproveRefuseRequest,
  handleIsOpenModal,
  isPermissionApprove,
  history,
  setTypeApprove
) => [
    {
      name: "ID",
      minWidth: "70px",
      maxWidth: "160px",
      cell: (row) =>
        typeHistory !== "WalletRecord" ? (
          <Link
            to={`/history/detail/${typeHistory}/${row?.[handleChangeTypeHistory(typeHistory)]
              }`}
            className="user-name text-truncate mb-0"
          >
            <span>{row?.[handleChangeTypeHistory(typeHistory)]}</span>
          </Link>
        ) : (
          <span>{row?.[handleChangeTypeHistory(typeHistory)]}</span>
        ),
    },
    {
      name: "TÀI KHOẢN",
      minWidth: "200px",
      selector: "firstName",
      // cell: row => (row?.username||"")
      cell: (row) => (
        <Link
          to={`/customer/detail/${row?.appUserId}`}
          className="user-name text-truncate mb-0"
        >
          <span>{row?.username}</span>
        </Link>
      ),
    },
    {
      name: "TÊN NGƯỜI DÙNG",
      minWidth: "200px",
      cell: (row) => (
        <Link
          to={`/customer/detail/${row?.appUserId}`}
          className="user-name text-truncate mb-0"
        >
          <span>{row?.firstName || row?.customerName}</span>
        </Link>
      ),
    },
    {
      name: "ĐIỆN THOẠI",
      minWidth: "200px",
      selector: "phoneNumber",
      // cell: row =>  row?.phoneNumber || ''
      cell: (row) => (
        <Link
          to={`/customer/detail/${row?.appUserId}`}
          className="user-name text-truncate mb-0"
        >
          <span>{row?.phoneNumber || row?.customerPhone}</span>
        </Link>
      ),
    },
    {
      name: "SỐ TIỀN",
      minWidth: "200px",
      selector: "paymentAmount",
      cell: (row) => <div>{currencyFormatUSD(row?.paymentAmount || "")}</div>,
    },
    {
      name: "PHƯƠNG THỨC THANH TOÁN",
      minWidth: "250px",
      selector: "paymentMethodName",
      cell: (row) =>
        row?.paymentType === "USER_DEPOSIT"
          ? "User Nạp"
          : row?.paymentType === "AUTO_DEPOSIT"
            ? "Hoa hồng chuyển vào ví chính"
            : "" || "",
    },

    {
      name: "TRẠNG THÁI",
      minWidth: "200px",
      selector: "paymentStatus",
      center: true,
      cell: (row) => (
        <Badge
          className="text-capitalize"
          color={
            statusObj[
            row?.paymentStatus === "Completed"
              ? "active"
              : row?.paymentStatus === "Canceled"
                ? "notActive"
                : ""
            ]
          }
        >
          {row?.paymentStatus === "Completed"
            ? "Đã duyệt"
            : row?.paymentStatus === "Canceled"
              ? "Từ chối"
              : row?.paymentStatus === "New"
                ? "Chưa duyệt"
                : ""}
        </Badge>
      ),
    },
    // {
    //     name: 'GHI CHÚ',
    //     minWidth: '250px',
    //     cell: row => (
    //         <div className={"d-flex"} style={{overflow: "hidden"}}>
    //             {/*<Edit size={14} className='mr-50'/>*/}
    //             <span
    //                 style={{
    //                     whiteSpace: "nowrap",
    //                     WebkitLineClamp: 1,
    //                     WebkitBoxOrient: "vertical",
    //                     textOverflow: "ellipsis",
    //                 }}
    //             >{row?.paymentNote ? row?.paymentNote : "___"}</span>
    //         </div>
    //     )
    // },
    {
      name: "THỜI GIAN",
      minWidth: "160px",
      selector: "createdAt",
      cell: (row) => convertTimeDate(row?.createdAt),
    },
    {
      name: "HÀNH ĐỘNG",
      minWidth: "150px",
      right: true,
      cell: (row) => (
        <>
          {row?.paymentStatus === "New" && isPermissionApprove(typeHistory) && (
            <div>
              <Check
                color={"#18A957"}
                size={20}
                style={{ marginRight: "12px", cursor: "pointer" }}
                onClick={() => {
                  // (handleApproveRefuseRequest(row?.[handleChangeTypeHistory(typeHistory)], "approve"))
                  setTypeApprove("approve");
                  handleIsOpenModal(
                    true,
                    row?.[handleChangeTypeHistory(typeHistory)]
                  );
                }}
              />
              <X
                color={"#E74160"}
                size={20}
                style={{ marginRight: "12px", cursor: "pointer" }}
                onClick={() =>
                // (handleApproveRefuseRequest(row?.[handleChangeTypeHistory(typeHistory)], "refuse"))
                {
                  setTypeApprove("refuse");
                  handleIsOpenModal(
                    true,
                    row?.[handleChangeTypeHistory(typeHistory)]
                  );
                }
                }
              />
            </div>
          )}
          <Eye
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() =>
              history.push(
                `/history/detail/${typeHistory}/${row?.[handleChangeTypeHistory(typeHistory)]
                }`
              )
            }
          />
        </>
      ),
    },
  ];

export const columnsWithdraw = (
  typeHistory,
  handleApproveRefuseRequest,
  handleIsOpenModal,
  isPermissionApprove,
  history,
  setTypeApprove
) => [
    {
      name: "ID",
      minWidth: "70px",
      maxWidth: "160px",
      cell: (row) =>
        typeHistory !== "WalletRecord" ? (
          <Link
            to={`/history/detail/${typeHistory}/${row?.[handleChangeTypeHistory(typeHistory)]
              }`}
            className="user-name text-truncate mb-0"
          >
            <span>{row?.[handleChangeTypeHistory(typeHistory)]}</span>
          </Link>
        ) : (
          <span>{row?.[handleChangeTypeHistory(typeHistory)]}</span>
        ),
    },
    {
      name: "TÀI KHOẢN",
      minWidth: "200px",
      selector: "firstName",
      // cell: row => (row?.username||"")
      cell: (row) => (
        <Link
          to={`/customer/detail/${row?.appUserId}`}
          className="user-name text-truncate mb-0"
        >
          <span>{row?.username}</span>
        </Link>
      ),
    },
    {
      name: "TÊN NGƯỜI DÙNG",
      minWidth: "200px",
      cell: (row) => (
        <Link
          to={`/customer/detail/${row?.appUserId}`}
          className="user-name text-truncate mb-0"
        >
          <span>{row?.firstName || row?.customerName}</span>
        </Link>
      ),
    },
    {
      name: "ĐIỆN THOẠI",
      minWidth: "200px",
      selector: "phoneNumber",
      // cell: row =>  row?.phoneNumber || ''
      cell: (row) => (
        <Link
          to={`/customer/detail/${row?.appUserId}`}
          className="user-name text-truncate mb-0"
        >
          <span>{row?.phoneNumber || row?.customerPhone}</span>
        </Link>
      ),
    },
    {
      name: "SỐ TIỀN",
      minWidth: "200px",
      selector: "paymentAmount",
      cell: (row) => <div>{currencyFormatUSD(row?.paymentAmount || "")}</div>,
    },
    {
      name: "NGÂN HÀNG",
      minWidth: "350px",
      cell: (row) => (
        <div style={{ overflow: "hidden" }}>
          {row?.tentaikhoan && <><span style={{
            whiteSpace: "nowrap",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}>Tên TKNH : {row?.tentaikhoan}</span><br /></>}
          {row?.sotaikhoan && <><span style={{
            whiteSpace: "nowrap",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}>Số TKNH : {row?.sotaikhoan}</span><br /></>}
          {row?.tennganhang && <><span style={{
            whiteSpace: "nowrap",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}>Tên NH : {row?.tennganhang}</span><br /></>}
        </div>
      )
    },
    {
      name: "VÍ ĐIỆN TỬ",
      minWidth: "350px",
      cell: (row) => (
        <div style={{ overflow: "hidden" }}>
          {row?.cryptoWalletAddress && <><span style={{
            whiteSpace: "nowrap",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}>Địa chỉ ví : {row?.cryptoWalletAddress}</span><br /></>}
          {row?.cryptoUnit && <><span style={{
            whiteSpace: "nowrap",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}>Đơn vị : {row?.cryptoUnit}</span><br /></>}
          {row?.cryptoNetwork && <><span style={{
            whiteSpace: "nowrap",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}>Mạng : {row?.cryptoNetwork}</span><br /></>}
        </div>
      )
    },
    {
      name: "TRẠNG THÁI",
      minWidth: "150px",
      selector: "paymentStatus",
      center: true,
      cell: (row) => (
        <Badge
          className="text-capitalize"
          color={
            statusObj[
            row?.paymentStatus === "Completed"
              ? "active"
              : row?.paymentStatus === "Canceled"
                ? "notActive"
                : ""
            ]
          }
        >
          {row?.paymentStatus === "Completed"
            ? "Đã duyệt"
            : row?.paymentStatus === "Canceled"
              ? "Từ chối"
              : row?.paymentStatus === "New"
                ? "Chưa duyệt"
                : ""}
        </Badge>
      ),
    },
    // {
    //     name: 'GHI CHÚ',
    //     minWidth: '250px',
    //     cell: row => (
    //         <div className={"d-flex"} style={{overflow: "hidden"}}>
    //             {/*<Edit size={14} className='mr-50'/>*/}
    //             <span
    //                 style={{
    //                     whiteSpace: "nowrap",
    //                     WebkitLineClamp: 1,
    //                     WebkitBoxOrient: "vertical",
    //                     textOverflow: "ellipsis",
    //                 }}
    //             >{row?.paymentNote ? row?.paymentNote : "___"}</span>
    //         </div>
    //     )
    // },
    {
      name: "THỜI GIAN",
      minWidth: "160px",
      selector: "createdAt",
      cell: (row) => convertTimeDate(row?.createdAt),
    },
    {
      name: "HÀNH ĐỘNG",
      minWidth: "150px",
      right: true,
      cell: (row) => (
        <>
          {row?.paymentStatus === "New" && isPermissionApprove(typeHistory) && (
            <div>
              <Check
                color={"#18A957"}
                size={20}
                style={{ marginRight: "12px", cursor: "pointer" }}
                onClick={() => {
                  setTypeApprove("approve");
                  handleIsOpenModal(
                    true,
                    row?.[handleChangeTypeHistory(typeHistory)]
                  );
                }}
              />
              <X
                color={"#E74160"}
                size={20}
                style={{ marginRight: "12px", cursor: "pointer" }}
                onClick={() => {
                  setTypeApprove("refuse");
                  handleIsOpenModal(
                    true,
                    row?.[handleChangeTypeHistory(typeHistory)]
                  );
                }}
              />
            </div>
          )}
          <Eye
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() =>
              history.push(
                `/history/detail/${typeHistory}/${row?.[handleChangeTypeHistory(typeHistory)]
                }`
              )
            }
          />
        </>
      ),
    },
  ];

export const columnsBetRecords = (
  typeHistory,
  // handleApproveRefuseRequest,
  // handleIsOpenModal,
  // isPermissionApprove,
  history
) => [
    {
      name: "ID",
      minWidth: "70px",
      maxWidth: "160px",
      cell: (row) => <span>{row?.[handleChangeTypeHistory(typeHistory)]}</span>,
    },
    {
      name: "TÀI KHOẢN",
      minWidth: "250px",
      selector: "firstName",
      // cell: row => (row?.username||"")
      cell: (row) => (
        <Link
          to={`/customer/detail/${row?.appUserId}`}
          className="user-name text-truncate mb-0"
        >
          <span>{row?.username}</span>
        </Link>
      ),
    },
    {
      name: "LỢI NHUẬN",
      minWidth: "150px",
      selector: "paymentAmount",
      cell: (row) => <span>{currencyFormatUSD(row?.betRecordWin || 0)}</span>,
    },
    {
      name: "LOẠI TIỀN",
      minWidth: "150px",
      selector: "paymentAmount",
      cell: (row) => <span>{row?.betRecordUnit}</span>,
    },
    {
      name: "TĂNG/GIẢM",
      minWidth: "150px",
      selector: "paymentAmount",
      center: true,
      cell: (row) =>
        row?.betRecordType === "BetUp"
          ? "Tăng"
          : row?.betRecordType === "BetDown"
            ? "Giảm"
            : "",
    },
    {
      name: "KẾT QUẢ",
      minWidth: "150px",
      selector: "paymentStatus",
      center: true,
      cell: (row) => (
        // <Badge className='text-capitalize'
        //        color={statusObj[row?.paymentStatus === "Completed" ? "active" : row?.paymentStatus === "Canceled" ? "notActive" : ""]}>
        //     {
        //         (row?.paymentStatus === "Completed" ? 'Đã duyệt' : row?.paymentStatus === "Canceled" ? 'Từ chối' : row?.paymentStatus === "New" ? "Chưa duyệt" : "")}
        // </Badge>
        <Badge
          className="text-capitalize"
          color={
            statusObj[
            row?.betRecordResult === "win"
              ? "active"
              : row?.betRecordResult === "lose"
                ? "notActive"
                : ""
            ]
          }
        >
          {row?.betRecordResult === "win"
            ? "Thắng"
            : row?.betRecordResult === "lose"
              ? "Thua"
              : ""}
        </Badge>
      ),
    },
    {
      name: "THỜI GIAN",
      minWidth: "160px",
      selector: "createdAt",
      cell: (row) => convertTimeDate(row?.createdAt),
    },
  ];

export const columnsRequestTransaction = (
  typeHistory,
  handleApproveRefuseRequest,
  handleIsOpenModal,
  isPermissionApprove
) => [
    {
      name: "ID",
      minWidth: "70px",
      maxWidth: "160px",
      cell: (row) =>
        typeHistory !== "WalletRecord" ? (
          <Link
            to={`/history/detail/${typeHistory}/${row?.[handleChangeTypeHistory(typeHistory)]
              }`}
            className="user-name text-truncate mb-0"
          >
            <span>{row?.[handleChangeTypeHistory(typeHistory)]}</span>
          </Link>
        ) : (
          <span>{row?.[handleChangeTypeHistory(typeHistory)]}</span>
        ),
    },
    {
      name: "TÀI KHOẢN",
      minWidth: "200px",
      selector: "firstName",
      // cell: row => (row?.username||"")
      cell: (row) => (
        <Link
          to={`/customer/detail/${row?.appUserId}`}
          className="user-name text-truncate mb-0"
        >
          <span>{row?.username}</span>
        </Link>
      ),
    },
    {
      name: "TÊN NGƯỜI DÙNG",
      minWidth: "200px",
      cell: (row) => (
        <Link
          to={`/customer/detail/${row?.appUserId}`}
          className="user-name text-truncate mb-0"
        >
          <span>{row?.firstName || row?.customerName}</span>
        </Link>
      ),
    },
    {
      name: "ĐIỆN THOẠI",
      minWidth: "200px",
      selector: "phoneNumber",
      // cell: row =>  row?.phoneNumber || ''
      cell: (row) => (
        <Link
          to={`/customer/detail/${row?.appUserId}`}
          className="user-name text-truncate mb-0"
        >
          <span>{row?.phoneNumber || row?.customerPhone}</span>
        </Link>
      ),
    },
    {
      name: "THU",
      minWidth: "200px",
      selector: "paymentAmountIn",
      center: true,
      cell: (row) => <div>{currencyFormatUSD(row?.paymentAmountIn || "")}</div>,
    },
    {
      name: "CHI",
      minWidth: "150px",
      selector: "paymentAmountOut",
      center: true,
      cell: (row) => <div>{currencyFormatUSD(row?.paymentAmountOut || "")}</div>,
    },
    {
      name: "THỜI GIAN",
      minWidth: "160px",
      selector: "createdAt",
      cell: (row) => convertTimeDate(row?.createdAt),
    },
    {
      name: "LOẠI GIAO DỊCH",
      minWidth: "200px",
      selector: "WalletRecordType",
      cell: (row) => <>{renderWalletTypeName(row.WalletRecordType)}</>,
    },
  ];
