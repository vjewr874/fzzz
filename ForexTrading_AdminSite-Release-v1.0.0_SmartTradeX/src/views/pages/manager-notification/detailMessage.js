import React from "react";
import { injectIntl } from "react-intl";
import { Fragment } from "react";
import {
  Calendar,
  Star,
  MessageSquare,
  Tag,
  Image,
} from "react-feather";
import {
  CardBody,
  CardText,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import moment from "moment";
import PlaceholderImage from "../../../assets/images/placeholder/placeholder.png";

function DetailMessage({ intl, open, toggleSidebar, arrData }) {
  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={toggleSidebar}
        className={`modal-dialog modal-lg `}
      >
        <ModalHeader toggle={toggleSidebar}>
          
        </ModalHeader>
        <ModalBody>
          <CardBody>
            <h2>{intl.formatMessage({ id: "detail_message" })}</h2>
            <div className="my-2">
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Star className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({
                      id: "id",
                    })}
                    :
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.groupCustomerMessageId === null
                      ? ""
                      : arrData.groupCustomerMessageId}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Tag className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "title" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.groupCustomerMessageTitle === null
                      ? ""
                      : arrData.groupCustomerMessageTitle}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <MessageSquare className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "content" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.groupCustomerMessageContent === null
                      ? ""
                      : arrData.groupCustomerMessageContent}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Image className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "image" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <img
                    src={arrData.groupCustomerMessageImage || PlaceholderImage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = PlaceholderImage;
                    }}
                    s
                    alt="IMG"
                    width="50"
                    height="50"
                  />
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Calendar className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "send_at" })}:
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
            </div>
          </CardBody>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
export default injectIntl(DetailMessage);
