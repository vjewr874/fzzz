import React, { useState } from "react";
import { Button, Card, Col, FormGroup, Input, Label, Row } from "reactstrap";
import "flatpickr/dist/themes/material_blue.css";
import "./styles/customer-info.scss";
import Avatar from "@components/avatar";
import ModalUpdatePasswordCustomer from "../../../../components/Modal/management-customer/ModalUpdatePasswordCustomer";
import { Lock, RefreshCw } from "react-feather";
import { currencyFormatUSD } from "../../../../ultils/currentFormacy";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import defaultAvatar from "../../../../assets/images/new_image/avatar_default.jpg";
import { useEffect } from "react";
const userData = JSON.parse(window.localStorage.getItem("userData"));
const listPermissionUser = userData.permissions.split(",");

const listbanks = [
  {
    value: 'Agribank',
    label: 'Agribank',
  },
  {
    value: 'CB',
    label: 'CB',
  },
  {
    value: 'Oceanbank',
    label: 'Oceanbank',
  },
  {
    value: 'GPBank',
    label: 'GPBank',
  },
  {
    value: 'BIDV',
    label: 'BIDV',
  },
  {
    value: 'VietinBank',
    label: 'VietinBank',
  },
  {
    value: 'Vietcombank',
    label: 'Vietcombank',
  },
  {
    value: 'VPBank',
    label: 'VPBank',
  },
  {
    value: 'MB',
    label: 'MB',
  },
  {
    value: 'Techcombank',
    label: 'Techcombank',
  },
  {
    value: 'ACB',
    label: 'ACB',
  },
  {
    value: 'SHB',
    label: 'SHB',
  },
  {
    value: 'HDBank',
    label: 'HDBank',
  },
  {
    value: 'SCB',
    label: 'SCB',
  },
  {
    value: 'Sacombank',
    label: 'Sacombank',
  },
  {
    value: 'TPBank',
    label: 'TPBank',
  },
  {
    value: 'VIB',
    label: 'VIB',
  },
  {
    value: 'MSB',
    label: 'MSB',
  },
  {
    value: 'SeABank',
    label: 'SeABank',
  },
  {
    value: 'OCB',
    label: 'OCB',
  },
  {
    value: 'Eximbank',
    label: 'Eximbank',
  },
  {
    value: 'LienVietPostBank',
    label: 'LienVietPostBank',
  },
  {
    value: 'PVcombank',
    label: 'PVcombank',
  },
  {
    value: 'Bac A Bank',
    label: 'Bac A Bank',
  },
  {
    value: 'Đông Á Bank',
    label: 'Đông Á Bank',
  },
  {
    value: 'BaoViet Bank',
    label: 'BaoViet Bank',
  },
  {
    value: 'ABBANK',
    label: 'ABBANK',
  },
  {
    value: 'Nam A Bank',
    label: 'Nam A Bank',
  },
  {
    value: 'VietBank',
    label: 'VietBank',
  },
  {
    value: 'Viet A Bank',
    label: 'Viet A Bank',
  },
  {
    value: 'NCB',
    label: 'NCB',
  },
  {
    value: 'BanVietBank',
    label: 'BanVietBank',
  },
  {
    value: 'Kienlongbank',
    label: 'Kienlongbank',
  },
  {
    value: 'Saigonbank',
    label: 'Saigonbank',
  },
  {
    value: 'PG Bank',
    label: 'PG Bank',
  },
  {
    value: 'Shinhan Bank',
    label: 'Shinhan Bank',
  },
  {
    value: 'HSBC',
    label: 'HSBC',
  },
  {
    value: 'Woori Bank',
    label: 'Woori Bank',
  },
  {
    value: 'CIMB Bank',
    label: 'CIMB Bank',
  },
  {
    value: 'Public Bank',
    label: 'Public Bank',
  },
  {
    value: 'Hong Leong Bank',
    label: 'Hong Leong Bank',
  },
  {
    value: 'UOB',
    label: 'UOB',
  },
  {
    value: 'ANZ',
    label: 'ANZ',
  },
]
const CustomerInfo = (props) => {
  const [nameBank, setNameBank] = useState(undefined)
  const [nameNetwork, setNameNetwork] = useState(undefined)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleIsOpenModal = (trueFalse) => {
    setIsOpenModal(trueFalse);
  };
  useEffect(() => {
    setNameBank(props?.lotteryInfo?.tennganhang)
    setNameNetwork(props?.lotteryInfo?.cryptoNetwork)
  }, [props?.lotteryInfo])
  useEffect(() => { }, [props?.lotteryInfo])
  const isPermissionApprove = () => {
    return listPermissionUser.includes("EDIT_USERS");
  };
  function handleChangeData(data) {
    setNameBank(data.value)
  }
  function handleChangeNetWork(data) {
    setNameNetwork(data.value)
    console.log(data.value);
  }
  return (
    <div className={"detail-customerInfo"}>
      <Card className={"p-2"}>
        <h3 className={"detail-title mb-3"}>{props?.title}</h3>
        <div className={"d-flex"}>
          <div className={"container-avatar"}>
            <Avatar
              img={
                props?.lotteryInfo?.userAvatar
                  ? props?.lotteryInfo?.userAvatar
                  : defaultAvatar
              }
              imgHeight={"88"}
              imgWidth={"88"}
              width="88"
              height="88"
              style={{ marginBottom: "14px", cursor: "auto" }}
            />
            <p className={"content-avatar"}>Số dư trong tài khoản</p>
            <p className={"money-avatar"}>
              Ví chính:{" "}
              {currencyFormatUSD(
                props?.lotteryInfo?.wallets.find(
                  (wallet) => wallet.walletType === "PointWallet"
                ).balance
              )}
            </p>
          </div>
          <Row className={"w-100 detail-input"}>
            <Col lg={4} sm={6} xs={12}>
              <FormGroup>
                <Label>Tài khoản</Label>
                <Input
                  value={props?.lotteryInfo?.username || ""}
                  disabled={true}
                />
              </FormGroup>
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  id={"email"}
                  defaultValue={props?.lotteryInfo?.email || ""}
                  disabled={props?.disabled}
                />
              </FormGroup>
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <FormGroup>
                <Label>Số điện thoại</Label>
                <Input
                  value={props?.lotteryInfo?.phoneNumber || ""}
                  disabled={true}
                />
              </FormGroup>
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <FormGroup>
                <Label>Ngày sinh</Label>
                <Flatpickr
                  value={props?.lotteryInfo?.birthDay || ""}
                  id="birthDay"
                  className={`form-control ${!props?.disabled ? "form-control__date" : ""
                    } custom-flatpickr-pj`}
                  disabled={props?.disabled}
                />
              </FormGroup>
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <FormGroup>
                <Label>Tên người dùng</Label>
                <Input
                  id={"name"}
                  defaultValue={props?.lotteryInfo?.firstName || ""}
                  disabled={props.disabled}
                />
              </FormGroup>
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <FormGroup>
                <Label>CMND / CCCD</Label>
                <Input
                  id={"identity"}
                  type={"number"}
                  defaultValue={props?.lotteryInfo?.identityNumber || ""}
                  disabled={props.disabled}
                />
              </FormGroup>
            </Col>

            <Col lg={4} sm={6} xs={12}>
              <FormGroup>
                <Label>Tên tài khoản ngân hàng</Label>
                <Input
                  id={"tentaikhoan"}
                  defaultValue={props?.lotteryInfo?.tentaikhoan || ""}
                  disabled={props.disabled}
                />
              </FormGroup>
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <FormGroup>
                <Label>Số tài khoản ngân hàng</Label>
                <Input
                  id={"sotaikhoan"}
                  defaultValue={props?.lotteryInfo?.sotaikhoan || ""}
                  disabled={props.disabled}
                />
              </FormGroup>
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <FormGroup>
                <Label>Tên ngân hàng</Label>
                {/* <Input
                  id={"tennganhang"}
                  defaultValue={props?.lotteryInfo?.tennganhang || ""}
                  disabled={props.disabled}
                /> */}
                <Select
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={listbanks}
                  placeholder={"Ngân hàng"}
                  value={
                    listbanks?.find(
                      (item) => item.value === nameBank
                    ) || ""
                  }
                  onChange={(value) => handleChangeData(value)}
                />
              </FormGroup>
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <FormGroup>
                <Label>Địa chỉ ví</Label>
                <Input
                  id={"cryptoWalletAddress"}
                  defaultValue={props?.lotteryInfo?.cryptoWalletAddress || ""}
                  disabled={props.disabled}
                />
              </FormGroup>
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <FormGroup>
                <Label>Mạng</Label>
                <Select
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={[{
                    label: "TRC20",
                    value: "TRC20"
                  }]}
                  placeholder={"Mạng"}
                  value={
                    [{
                      label: "TRC20",
                      value: "TRC20"
                    }].find(
                      (item) => item.value === nameNetwork
                    ) || ""
                  }
                  onChange={(value) => handleChangeNetWork(value)}
                />
              </FormGroup>
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <FormGroup>
                <Label>Đơn vị</Label>
                <Input
                  id={"cryptoUnit"}
                  defaultValue={props?.lotteryInfo?.cryptoUnit || ""}
                  disabled={props.disabled}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
        <Row
          className={"m-0 mt-3  detail-input"}
          style={{
            borderTop: "2px solid #ebe9f1",
            borderBottom: "2px solid #ebe9f1",
          }}
        >
          <Col lg={12}>
            <Card className={"py-1 mb-0"}>
              <h4>Giao dịch</h4>
              <Row className={"mt-2"}>
                <Col lg={3}>
                  <FormGroup>
                    <Label>Tổng nạp</Label>
                    <Input
                      value={currencyFormatUSD(
                        props?.lotteryInfo?.totalTodayDeposit || ""
                      )}
                      disabled={true}
                    />
                  </FormGroup>
                </Col>
                <Col lg={3}>
                  <FormGroup>
                    <Label>Tổng rút</Label>
                    <Input
                      value={currencyFormatUSD(
                        props?.lotteryInfo?.totalTodayWithdraw || ""
                      )}
                      disabled={true}
                    />
                  </FormGroup>
                </Col>
                <Col lg={3}>
                  <FormGroup>
                    <Label>Tổng đặt</Label>
                    <Input
                      value={currencyFormatUSD(
                        props?.lotteryInfo?.totalBet || ""
                      )}
                      disabled={true}
                    />
                  </FormGroup>
                </Col>
                <Col lg={3}>
                  <FormGroup>
                    <Label>Tổng đặt hôm nay</Label>
                    <Input
                      value={currencyFormatUSD(
                        props?.lotteryInfo?.totalTodayBet || ""
                      )}
                      disabled={true}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <div className={"d-flex align-items-center mt-3 justify-content-end"}>
          {isPermissionApprove() && (
            <Button
              color="primary"
              outline
              className={"mr-2"}
              onClick={() =>
                props.handleChangeUser(
                  document.getElementById("email").value,
                  document.getElementById("birthDay").value,
                  document.getElementById("name").value,
                  document.getElementById("identity").value,
                  document.getElementById("tentaikhoan").value,
                  document.getElementById("sotaikhoan").value,
                  nameBank,
                  document.getElementById("cryptoWalletAddress").value,
                  nameNetwork,
                  document.getElementById("cryptoUnit").value,
                )
              }
            >
              Cập nhật
            </Button>
          )}
          <Button
            color="success"
            outline
            className={"mr-2"}
            onClick={() => props.handleActiveUser(props?.lotteryInfo?.active)}
          >
            <Lock
              size={20}
              style={{ marginTop: "-2px", marginRight: "13px" }}
            />
            {props?.lotteryInfo?.active === 1
              ? "Khoá tài khoản"
              : props?.lotteryInfo?.active === 0
                ? "Mở tài khoản"
                : ""}

            {/*<div className="button-content">*/}
            {/*        <Lock size={20}/>*/}
            {/*        <p>{props?.lotteryInfo?.active===1 ?"Khoá tài khoản": props?.lotteryInfo?.active===0 ?"Mở tài khoản":""}</p>*/}
            {/*    </div>*/}
          </Button>
          <Button color="danger" outline onClick={() => setIsOpenModal(true)}>
            <RefreshCw
              size={20}
              style={{ marginTop: "-2px", marginRight: "13px" }}
            />
            Đổi mật khẩu
          </Button>
        </div>
      </Card>
      <ModalUpdatePasswordCustomer
        isOpenModal={isOpenModal}
        handleIsOpenModal={handleIsOpenModal}
        handleUpdatePasswordCustomer={props?.handleUpdatePasswordCustomer}
      />
    </div>
  );
};
export default CustomerInfo;
