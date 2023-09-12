import React, { memo } from "react";
import { injectIntl } from "react-intl";
import { Fragment } from "react";
import {
  Calendar,
  DollarSign,
  User,
  Star,
  Flag,
  Phone,
  UserCheck,
} from "react-feather";
import {
  CardBody,
  CardText,
  Button,
  Row,
  FormGroup,
  ModalBody,
  Modal,
  ModalHeader,
} from "reactstrap";
import moment from "moment";
import { addCommas } from "@utils";
import WithdrawHistory from "../../../../services/withdrawHistoryService";
import { toast } from "react-toastify";

function DetailWithdrawBTCHistory({
  intl,
  open,
  toggleSidebar,
  arrData,
  onReloadData,
}) {

  const getPaymentStatusDescription = (status) => {
    switch (status) {
      case "Completed":
        return intl.formatMessage({ id: "Completed" });
      case "New":
        return intl.formatMessage({ id: "New" });
      case "Canceled":
        return intl.formatMessage({ id: "Canceled" });
      default:
        return "N/A";
    }
  };

  const elements = () => {
    switch (arrData.paymentStatus) {
      case "New":
        return (
          <div>
            <Button.Ripple
              className="mr-3"
              color="primary"
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                handleApprove()
              }}
              outline
            >
              <span className="mr-1">
                {intl.formatMessage({ id: "approve_withdraw" })}
              </span>
            </Button.Ripple>
            <Button.Ripple
              color="danger"
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                handleRefused()
              }}
              outline
            >
              <span className="mr-1">
                {intl.formatMessage({ id: "deny_withdraw" })}
              </span>
            </Button.Ripple>
          </div>
        );
      default:
        return;
    }
  };

  function handleApprove() {
    const params = {
      id: arrData.paymentWithdrawTransactionId,
    };
    WithdrawHistory.approveWithdrawTransaction(params)
      .then(() => {
        onReloadData();
        toast.success(
          intl.formatMessage({ id: "update_approve_withdraw_success" })
        );
      })
      .catch((err) => {
        toast.success(intl.formatMessage({ id: "actionFailed" }), err);
      });
  }

  const handleRefused = () => {
    const params = {
      id: arrData.paymentWithdrawTransactionId,
    };
    WithdrawHistory.denyWithdrawTransaction(params)
      .then((result) => {
        onReloadData();
        toast.warn(
          intl.formatMessage({ id: "update_approve_withdraw_success" })
        );
      })
      .catch((err) => {
        toast.warn(intl.formatMessage({ id: "actionFailed" }, err));
      });
  };

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={toggleSidebar}
        className={`modal-dialog modal-lg `}
      >
        <ModalHeader toggle={toggleSidebar}>
          {intl.formatMessage({ id: "detail_user" })} {arrData.firstName}
        </ModalHeader>
        <ModalBody>
          <CardBody>
            <h2>{intl.formatMessage({ id: "historyWithdrawByUser" })}</h2>
            <div className="my-2">
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Star className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({
                      id: "paymentWithdrawTransactionId",
                    })}
                    :
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.paymentWithdrawTransactionId === null
                      ? ""
                      : arrData.paymentWithdrawTransactionId}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <User className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "username" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.username === null ? "" : arrData.username}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Star className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "fullname" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.firstName === null ? "" : arrData.firstName}{" "}
                    {arrData.lastName === null ? "" : arrData.lastName}
                  </CardText>
                </div>
              </Row>

              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <User className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "Email" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.email === null ? "" : arrData.email}
                  </CardText>
                </div>
              </Row>

              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Phone className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "phoneNumber" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.phoneNumber === null ? "" : arrData.phoneNumber}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
              <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                <User className="mr-1" size={14} />
                <CardText tag="span" className="font-weight-bold">
                  {intl.formatMessage({ id: "diachiviBTC" })}:
                </CardText>
              </div>
              <div className="col-sm-7 col-md-6 col-lg-6">
                <CardText>
                  {arrData.diachiviBTC === null
                    ? ""
                    : arrData.diachiviBTC}
                </CardText>
              </div>
            </Row>
            <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <UserCheck className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "code_transaction" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.paymentRef === null ? "" : arrData.paymentRef}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <UserCheck className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "memberLevelName" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.appUserMembershipTitle === null
                      ? intl.formatMessage({ id: "new_member" })
                      : arrData.appUserMembershipTitle}
                  </CardText>
                </div>
              </Row>

              {/* <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <UserCheck className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "paymentPICId" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.paymentPICId === null ? "" : arrData.paymentPICId}
                  </CardText>
                </div>
              </Row> */}

              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Calendar className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "createdAt" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.createdAt === null
                      ? ""
                      : moment
                          .utc(moment(arrData.createdAt))
                          .format("HH:mm DD/MM/YYYY")}
                  </CardText>
                </div>
              </Row>
              {arrData.paymentStatus !== "New" && (
                <Row className="mx-auto mb-1">
                  <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                    <Calendar className="mr-1" size={14} />
                    <CardText tag="span" className="font-weight-bold">
                      {intl.formatMessage({ id: "paymentApproveDate" })}:
                    </CardText>
                  </div>
                  <div className="col-sm-7 col-md-6 col-lg-6">
                    <CardText>
                      {arrData.paymentApproveDate === null
                        ? ""
                        : moment
                            .utc(moment(arrData.paymentApproveDate))
                            .format("HH:mm DD/MM/YYYY")}
                    </CardText>
                  </div>
                </Row>
              )}
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Flag className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "status" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.paymentStatus
                      ? getPaymentStatusDescription(arrData.paymentStatus)
                      : ""}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <DollarSign className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "payment_amount" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6 d-flex">
                  <CardText>
                    {arrData.paymentAmount
                      ? parseFloat(Number(arrData.paymentAmount).toFixed(6))
                      : ""}
                  </CardText>
                  <CardText tag="span" className="ml-1">
                    {intl.formatMessage({ id: "BTC" })}
                  </CardText>
                </div>
              </Row>
            </div>

            <FormGroup className="mt-3">{elements()}</FormGroup>
          </CardBody>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
export default injectIntl(memo(DetailWithdrawBTCHistory));
