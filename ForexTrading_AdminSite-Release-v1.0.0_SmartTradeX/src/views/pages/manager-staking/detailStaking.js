import React from "react";
import { injectIntl } from "react-intl";
import { Fragment } from "react";
import { Calendar, Star, MessageSquare, Tag, Image, Key, Activity, Circle } from "react-feather";
import {
  CardBody,
  CardText,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import moment from "moment";

function DetailStaking({ intl, open, toggleSidebar, arrData }) {
  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={toggleSidebar}
        className={`modal-dialog modal-lg `}
      >
        <ModalHeader toggle={toggleSidebar}></ModalHeader>
        <ModalBody>
          <CardBody>
            <h2>{intl.formatMessage({ id: "detail" })}</h2>
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
                    {arrData.stakingPackageId === null
                      ? ""
                      : arrData.stakingPackageId}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Tag className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "stakingPackageName" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.stakingPackageName === null
                      ? ""
                      : arrData.stakingPackageName}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <MessageSquare className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "stakingPackageDescription" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.stakingPackageDescription === null
                      ? ""
                      : arrData.stakingPackageDescription}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Circle className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "packagePrice" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.stakingPackagePrice === null
                      ? ""
                      : arrData.stakingPackagePrice}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Key className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "period" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.stakingPeriod === null
                      ? ""
                      : arrData.stakingPeriod}
                  </CardText>
                </div>
              </Row>
              <Row className="mx-auto mb-1">
                <div className="d-flex col-sm-5 col-md-4 col-lg-3">
                  <Activity className="mr-1" size={14} />
                  <CardText tag="span" className="font-weight-bold">
                    {intl.formatMessage({ id: "stakingInterestRate" })}:
                  </CardText>
                </div>
                <div className="col-sm-7 col-md-6 col-lg-6">
                  <CardText>
                    {arrData.stakingInterestRate === null
                      ? ""
                      : arrData.stakingInterestRate}
                  </CardText>
                </div>
              </Row>
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
            </div>
          </CardBody>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
export default injectIntl(DetailStaking);
