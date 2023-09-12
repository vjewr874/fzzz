import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { injectIntl } from "react-intl";
import {
  Calendar,
  Phone,
  Star,
  User,
  Trello,
  TrendingUp,
  Type,
} from "react-feather";
import moment from "moment";

const DetailModal = ({ intl, open, toggleSidebar, arrData }) => {
  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className={`modal-dialog-centered `}
    >
      <ModalHeader toggle={toggleSidebar}>
        {intl.formatMessage({ id: "detail_user" })} {arrData.firstName}
      </ModalHeader>
      <ModalBody>
        <div className="my-1">
          <Row className="mx-auto mb-1">
            <Col sm="5">
              <User className="mr-1" size={14} />
              <CardText tag="span" className="font-weight-bold">
                {intl.formatMessage({ id: "username" })}:
              </CardText>
            </Col>
            <Col sm="7">
              <CardText>
                {arrData.username === null ? "" : arrData.username}
              </CardText>
            </Col>
          </Row>
          <Row className="mx-auto mb-1">
            <Col sm="5">
              <Star className="mr-1" size={14} />
              <CardText tag="span" className="font-weight-bold">
                {intl.formatMessage({ id: "fullname" })}:
              </CardText>
            </Col>
            <Col sm="7">
              <CardText>
                {arrData.firstName === null ? "" : arrData.firstName}{" "}
                {arrData.lastName === null ? "" : arrData.lastName}
              </CardText>
            </Col>
          </Row>

          <Row className="mx-auto mb-1">
            <Col sm="5">
              <User className="mr-1" size={14} />
              <CardText tag="span" className="font-weight-bold">
                {intl.formatMessage({ id: "Email" })}:
              </CardText>
            </Col>
            <Col sm="7">
              <CardText>{arrData.email === null ? "" : arrData.email}</CardText>
            </Col>
          </Row>

          <Row className="mx-auto mb-1">
            <Col sm="5">
              <Phone className="mr-1" size={14} />
              <CardText tag="span" className="font-weight-bold">
                {intl.formatMessage({ id: "phoneNumber" })}:
              </CardText>
            </Col>
            <Col sm="7">
              <CardText>
                {arrData.phoneNumber === null ? "" : arrData.phoneNumber}
              </CardText>
            </Col>
          </Row>
          <Row className="mx-auto mb-1">
            <Col sm="5">
              <Calendar className="mr-1" size={14} />
              <CardText tag="span" className="font-weight-bold">
                {intl.formatMessage({ id: "createdAt" })}:
              </CardText>
            </Col>
            <Col sm="7">
              <CardText>
                {arrData.createdAt === null
                  ? ""
                  : moment
                      .utc(moment(arrData.createdAt))
                      .format("HH:mm DD/MM/YYYY")}
              </CardText>
            </Col>
          </Row>
          <Row className="mx-auto mb-1">
            <Col sm="5">
              <Trello className="mr-1" size={14} />
              <CardText tag="span" className="font-weight-bold">
                {intl.formatMessage({ id: "identity_number" })}:
              </CardText>
            </Col>
            <Col sm="7">
              <CardText>
                {arrData.sotaikhoan === null ? "" : arrData.sotaikhoan}
              </CardText>
            </Col>
          </Row>
          <Row className="mx-auto mb-1">
            <Col sm="5">
              <Type className="mr-1" size={14} />
              <CardText tag="span" className="font-weight-bold">
                {intl.formatMessage({ id: "name_bank" })}:
              </CardText>
            </Col>
            <Col sm="7">
              <CardText>
                {arrData.tentaikhoan === null ? "" : arrData.tentaikhoan}
              </CardText>
            </Col>
          </Row>
          <Row className="mx-auto mb-1">
            <Col sm="5">
              <TrendingUp className="mr-1" size={14} />
              <CardText tag="span" className="font-weight-bold">
                {intl.formatMessage({ id: "bank" })}:
              </CardText>
            </Col>
            <Col sm="7">
              <CardText>
                {arrData.tennganhang === null ? "" : arrData.tennganhang}
              </CardText>
            </Col>
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default injectIntl(DetailModal);
