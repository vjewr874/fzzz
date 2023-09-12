import { Button } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import HistoryInfo from "../components/history-info/HistoryInfo";
import History from "../../../services/history";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

const userData = JSON.parse(window.localStorage.getItem("userData"));
const listPermissionUser = userData.permissions.split(",");

const Detail = () => {
  const history = useHistory();
  const { type, id } = useParams();
  const [title, setTitle] = useState("");
  const [dataDetailHistory, setDataDetailHistory] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  useEffect(() => {
    handleChangeTypeHistory();
  }, []);
  const handleIsOpenModal = (trueFalse) => {
    setIsOpenModal(trueFalse);
  };

  function getDetailHistory(api) {
    History.detailHistory({ id: id }, api).then((res) => {
      if (res) {
        const { statusCode, data, message } = res;
        if (statusCode === 200) {
          setDataDetailHistory(data);
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
        setDataDetailHistory([]);
      }
    });
  }
  function handleChangeTypeHistory() {
    switch (type) {
      case "PaymentDepositTransaction":
        setTitle("Chi tiết nạp tiền");
        getDetailHistory("/PaymentDepositTransaction/findById");
        break;
      case "PaymentWithdrawTransaction":
        setTitle("Chi tiết rút tiền");
        getDetailHistory("/PaymentWithdrawTransaction/findById");
        break;
      case "WalletRecord":
        setTitle("Chi tiết giao dịch");
        // getDetailHistory("/WalletRecord/findById")
        break;
      case "PaymentBonusTransaction":
        setTitle("Chi tiết rút hoa hồng");
        getDetailHistory("/PaymentBonusTransaction/findById");
        break;
      case "PaymentExchangeTransaction":
        setTitle("Chi tiết yêu cầu bán");
        getDetailHistory("/PaymentExchangeTransaction/findById");
        break;
      default:
        return null;
    }
  }

  const isPermissionApprove = (typePermission) => {
    return listPermissionUser.includes(
      `${typePermission === "PaymentDepositTransaction"
        ? "APPROVE_DEPOSIT"
        : typePermission === "PaymentWithdrawTransaction"
          ? "APPROVE_WITHDRAW"
          : typePermission === "PaymentBonusTransaction"
            ? "APPROVE_WITHDRAW"
            : ""
      }`
    );
  };


  const handleApproveRefuseRequest = (
    id,
    typeCheck,
    paymentNote,
    paymentRef,
    validateImage
  ) => {
    if (
      type === "PaymentDepositTransaction" ||
      type === "PaymentWithdrawTransaction"
    ) {
      if (
        paymentNote === null ||
        paymentNote === undefined ||
        paymentNote === ""
      ) {
        toast.warn("Vui lòng nhập ghi chú");
        return;
      }
    }
    if (validateImage) {
      if (
        typeCheck === "approve" &&
        (paymentRef === "" || paymentRef === undefined || paymentRef === null)
      ) {
        toast.warn("Vui lòng chọn ảnh giao dịch");
        return;
      }
    }

    // if (validateImage && typeCheck==="approve"){
    //     if (typeCheck==="approve" && (paymentRef===""||paymentRef===undefined || paymentRef===null)){
    //         toast.warn("Vui lòng chọn ảnh giao dịch")
    //         return
    //     }
    // }

    let API = "";
    if (typeCheck === "approve" && type === "PaymentDepositTransaction") {
      API += "/PaymentDepositTransaction/approveDepositTransaction";
    }
    if (typeCheck === "refuse" && type === "PaymentDepositTransaction") {
      API += "/PaymentDepositTransaction/denyDepositTransaction";
    }
    if (typeCheck === "approve" && type === "PaymentWithdrawTransaction") {
      API += "/PaymentWithdrawTransaction/approveWithdrawTransaction";
    }
    if (typeCheck === "refuse" && type === "PaymentWithdrawTransaction") {
      API += "/PaymentWithdrawTransaction/denyWithdrawTransaction";
    }
    if (typeCheck === "approve" && type === "PaymentBonusTransaction") {
      API += "/PaymentBonusTransaction/approveBonusTransaction";
    }
    if (typeCheck === "refuse" && type === "PaymentBonusTransaction") {
      API += "/PaymentBonusTransaction/denyBonusTransaction";
    }
    if (typeCheck === "approve" && type === "PaymentExchangeTransaction") {
      API += "/PaymentExchangeTransaction/approveExchangeTransaction";
    }
    if (typeCheck === "refuse" && type === "PaymentExchangeTransaction") {
      API += "/PaymentExchangeTransaction/denyExchangeTransaction";
    }
    setIsOpenModal(false);
    setIsLoadingSubmit(true);
    History.approveRefuseRequest(
      {
        id,
        paymentRef: paymentRef || undefined,
        paymentNote: paymentNote || undefined,
      },
      API
    ).then((res) => {
      setIsLoadingSubmit(false);
      if (res) {
        const { statusCode } = res;
        if (statusCode === 200) {
          toast.success("Thành công!");
          handleChangeTypeHistory();
          setIsOpenModal(false);
        } else {
          toast.warn("Đã có lỗi xảy ra!");
        }
      }
    });
  };

  return (
    <div className={"detail-historyList"}>
      {isLoadingSubmit ? <Loader /> : null}
      <HistoryInfo
        title={title}
        data={dataDetailHistory}
        nameStaff={dataDetailHistory?.staffName}
        id={id}
        type={type}
        handleApproveRefuseRequest={handleApproveRefuseRequest}
        handleIsOpenModal={handleIsOpenModal}
        isOpenModal={isOpenModal}
        isPermissionApprove={isPermissionApprove}
      />
      <div className={"d-flex justify-content-end align-items-center"}>
        <Button
          color={"primary"}
          className={"mr-2"}
          // onClick={() => history.push('/history/list')}
          onClick={() => history.go(-1)}
        >
          Trở lại
        </Button>
      </div>
    </div>
  );
};
export default Detail;
