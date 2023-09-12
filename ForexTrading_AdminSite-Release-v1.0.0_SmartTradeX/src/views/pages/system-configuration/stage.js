import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Card,
  CardBody,
} from "reactstrap";
import SystemConfigurationService from "../../../services/systemService";
import { toast } from "react-toastify";
import { injectIntl } from "react-intl";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import moment from "moment";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "./style.scss";

function Stage({ intl, dataConfig }) {
  const [picker1, setPicker1] = useState(
    dataConfig.stage1LastDate || null
  );
  const [picker2, setPicker2] = useState(
    dataConfig.stage2LastDate || null
  );
  const [picker3, setPicker3] = useState(
    dataConfig.stage3LastDate || null
  );
  const [picker4, setPicker4] = useState(
    dataConfig.stage4LastDate || null
  );
  const [picker5, setPicker5] = useState(
    dataConfig.stage5LastDate || null
  );
  const InputSchema = yup.object().shape({
    packageCurrentStage: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .matches(
        /^[0-9.]+$/,
        intl.formatMessage({ id: "not_special_character" })
      ),
  });

  const { register, errors, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(InputSchema),
    defaultValues: {
      packageCurrentStage: dataConfig.packageCurrentStage,
    },
  });

  const updateInformation = (data) => {
    const params = {
      packageCurrentStage: parseInt(data.packageCurrentStage),
      stage1LastDate: picker1,
      stage2LastDate: picker2,
      stage3LastDate: picker3,
      stage4LastDate: picker4,
      stage5LastDate: picker5

    };
    SystemConfigurationService.updateConfigs(params)
      .then(() => {
        toast.success(
          intl.formatMessage({ id: "update" }) +
            " " +
            intl.formatMessage({ id: "actionSuccess" })
        );
      })
      .catch(() => {
        toast.error(
          intl.formatMessage({ id: "update" }) +
            " " +
            intl.formatMessage({ id: "actionFailed" })
        );
      });
  };

  return (
    <Fragment>
      <Card className="col-12 col-sm-12 col-lg-6">
        <span className="align-middle d-sm-none">
          <h3 className="my-2">{intl.formatMessage({ id: "stage" })}</h3>
        </span>
        <CardBody className="mt-1">
          <Form onSubmit={handleSubmit(updateInformation)}>
            <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>
                  {intl.formatMessage({ id: "packageCurrentStage" })}
                </Label>
              </Col>
              <Col xs={12} sm={10} lg={9}>
                <Input
                  id="packageCurrentStage"
                  name="packageCurrentStage"
                  innerRef={register({ required: true })}
                  invalid={errors.packageCurrentStage && true}
                />
                {errors && errors.packageCurrentStage && (
                  <FormFeedback>
                    {errors.packageCurrentStage.message}
                  </FormFeedback>
                )}
              </Col>
            </Row>
            <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "day_start_stage_1" })}</Label>
              </Col>
              <Col xs={12} sm={10} lg={9}>
                <Flatpickr
                  value={picker1}
                  onChange={(date) => {
                    setPicker1(
                      moment(date[0]).format('YYYY/MM/DD')
                    );
                  }}
                  placeholder="From Date"
                  className="form-control invoice-edit-input date-picker"
                />
              </Col>
            </Row>
            <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "day_start_stage_2" })}</Label>
              </Col>
              <Col xs={12} sm={10} lg={9}>
              <Flatpickr
                  value={picker2}
                  onChange={(date) => {
                    setPicker2(
                      moment(date[0]).format('YYYY/MM/DD')
                    );
                  }}
                  placeholder="From Date"
                  className="form-control invoice-edit-input date-picker"
                />
              </Col>
            </Row>
            <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "day_start_stage_3" })}</Label>
              </Col>
              <Col xs={12} sm={10} lg={9}>
              <Flatpickr
                  value={picker3}
                  onChange={(date) => {
                    setPicker3(
                      moment(date[0]).format('YYYY/MM/DD')
                    );
                  }}
                  placeholder="From Date"
                  className="form-control invoice-edit-input date-picker"
                />
              </Col>
            </Row>
            <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "day_start_stage_4" })}</Label>
              </Col>
              <Col xs={12} sm={10} lg={9}>
              <Flatpickr
                  value={picker4}
                  onChange={(date) => {
                    setPicker4(
                      moment(date[0]).format('YYYY/MM/DD')
                    );
                  }}
                  placeholder="From Date"
                  className="form-control invoice-edit-input date-picker"
                />
              </Col>
            </Row>
            <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "day_start_stage_5" })}</Label>
              </Col>
              <Col xs={12} sm={10} lg={9}>
              <Flatpickr
                  value={picker5}
                  onChange={(date) => {
                    setPicker5(
                      moment(date[0]).format('YYYY/MM/DD')
                    );
                  }}
                  placeholder="From Date"
                  className="form-control invoice-edit-input date-picker"
                />
              </Col>
            </Row>
            <Row className={"justify-content-end pr-1"}>
              <Button.Ripple color="primary" type="submit">
                {intl.formatMessage({ id: "update" })}
              </Button.Ripple>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
}

export default injectIntl(Stage);
