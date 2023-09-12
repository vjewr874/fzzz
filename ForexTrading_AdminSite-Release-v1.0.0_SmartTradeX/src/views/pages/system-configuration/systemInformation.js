import React, { Fragment } from "react";
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
import "./style.scss";

function SystemInformation({ intl, dataConfig }) {
  const InputSchema = yup.object().shape({
    hotlineNumber: yup
      .string()
      .matches(/^[0-9]+$/, intl.formatMessage({ id: "not_special_character" }))
      .required(intl.formatMessage({ id: "please_input" })),
    telegramGroupUrl: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .transform((value, originalValue) =>
        /\s/.test(originalValue) ? null : value
      )
      .typeError(intl.formatMessage({ id: "please_not_use_whitespace" })),
    totalSystemUser: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .transform((_, originalValue) => {
        return /^[0-9]*$/g.test(originalValue) ? originalValue : null
      })
      .typeError(intl.formatMessage({ id: "not_valid_number" })),
    totalActiveUser: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .transform((_, originalValue) => {
        return /^[0-9]*$/g.test(originalValue) ? originalValue : null
      })
      .typeError(intl.formatMessage({ id: "not_valid_number" })),
    totalBetAmount: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .transform((_, originalValue) => {
        return /^[0-9]*$/g.test(originalValue) ? originalValue : null
      })
      .typeError(intl.formatMessage({ id: "not_valid_number" })),
    // address: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" }))
    //   .matches(".*\\S+.*", intl.formatMessage({ id: "please_input" })),
    // appStoreUrl: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" }))
    //   .transform((value, originalValue) =>
    //     /\s/.test(originalValue) ? null : value
    //   )
    //   .typeError(intl.formatMessage({ id: "please_not_use_whitespace" })),
    // playStoreUrl: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" }))
    //   .transform((value, originalValue) =>
    //     /\s/.test(originalValue) ? null : value
    //   )
    //   .typeError(intl.formatMessage({ id: "please_not_use_whitespace" })),
    // fbMessengerUrl: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" }))
    //   .transform((value, originalValue) =>
    //     /\s/.test(originalValue) ? null : value
    //   )
    //   .typeError(intl.formatMessage({ id: "please_not_use_whitespace" })),
    // zaloUrl: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" }))
    //   .transform((value, originalValue) =>
    //     /\s/.test(originalValue) ? null : value
    //   )
    //   .typeError(intl.formatMessage({ id: "please_not_use_whitespace" })),
    // websiteUrl: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" }))
    //   .transform((value, originalValue) =>
    //     /\s/.test(originalValue) ? null : value
    //   )
    //   .typeError(intl.formatMessage({ id: "please_not_use_whitespace" })),
    // supportChatUrlEN: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" }))
    //   .transform((value, originalValue) =>
    //     /\s/.test(originalValue) ? null : value
    //   )
    //   .typeError(intl.formatMessage({ id: "please_not_use_whitespace" })),
    // USDTWalletAddress: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" }))
    //   .transform((value, originalValue) =>
    //     /\s/.test(originalValue) ? null : value
    //   )
    //   .typeError(intl.formatMessage({ id: "please_not_use_whitespace" })),
    // supportChatUrlVI: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" }))
    //   .transform((value, originalValue) =>
    //     /\s/.test(originalValue) ? null : value
    //   )
    //   .typeError(intl.formatMessage({ id: "please_not_use_whitespace" })),
    // supportChatUrlCN: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" }))
    //   .transform((value, originalValue) =>
    //     /\s/.test(originalValue) ? null : value
    //   )
    //   .typeError(intl.formatMessage({ id: "please_not_use_whitespace" })),
    // supportChatUrlPL: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" }))
    //   .transform((value, originalValue) =>
    //     /\s/.test(originalValue) ? null : value
    //   )
    //   .typeError(intl.formatMessage({ id: "please_not_use_whitespace" })),
    // supportEmail: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" }))
    //   .email(intl.formatMessage({ id: "error-email" })),
  });

  const { register, errors, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(InputSchema),
    defaultValues: {
      hotlineNumber: dataConfig.hotlineNumber,
      telegramGroupUrl: dataConfig.telegramGroupUrl,
      totalActiveUser: dataConfig.totalActiveUser,
      totalSystemUser: dataConfig.totalSystemUser,
      totalBetAmount: dataConfig.totalBetAmount
      // address: dataConfig.address,
      // appStoreUrl: dataConfig.appStoreUrl,
      // playStoreUrl: dataConfig.playStoreUrl,
      // fbMessengerUrl: dataConfig.fbMessengerUrl,
      // zaloUrl: dataConfig.zaloUrl,
      // USDTWalletAddress: dataConfig.USDTWalletAddress,
      // websiteUrl: dataConfig.websiteUrl,
      // supportEmail: dataConfig.supportEmail,
      // supportChatUrlEN: dataConfig.supportChatUrlEN,
      // supportChatUrlVI: dataConfig.supportChatUrlVI,
      // supportChatUrlCN: dataConfig.supportChatUrlCN,
      // supportChatUrlPL: dataConfig.supportChatUrlPL,
    },
  });

  const updateInformation = (data) => {
    const params = {
      hotlineNumber: data.hotlineNumber,
      telegramGroupUrl: data.telegramGroupUrl,
      totalActiveUser: data.totalActiveUser,
      totalSystemUser: data.totalSystemUser,
      totalBetAmount: data.totalBetAmount
      // address: data.address,
      // appStoreUrl: data.appStoreUrl,
      // playStoreUrl: data.playStoreUrl,
      // fbMessengerUrl: data.fbMessengerUrl,
      // zaloUrl: data.zaloUrl,
      // USDTWalletAddress: data.USDTWalletAddress,
      // websiteUrl: data.websiteUrl,
      // supportEmail: data.supportEmail,
      // supportChatUrlEN: data.supportChatUrlEN,
      // supportChatUrlVI: data.supportChatUrlVI,
      // supportChatUrlCN: data.supportChatUrlCN,
      // supportChatUrlPL: data.supportChatUrlPL,
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
      <Card className="col-12 col-sm-12 col-lg-8">
        <span className="align-middle d-sm-none">
          <h3 className="my-2">
            {intl.formatMessage({ id: "system_information" })}
          </h3>
        </span>
        <CardBody className="mt-1">
          <Form onSubmit={handleSubmit(updateInformation)}>
            {/* <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "address" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="address"
                  name="address"
                  innerRef={register({ required: true })}
                  invalid={errors.address && true}
                />
                {errors && errors.address && (
                  <FormFeedback>{errors.address.message}</FormFeedback>
                )}
              </Col>
            </Row> */}
            <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "hotline" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="hotlineNumber"
                  name="hotlineNumber"
                  innerRef={register({ required: true })}
                  invalid={errors.hotlineNumber && true}
                />
                {errors && errors.hotlineNumber && (
                  <FormFeedback>{errors.hotlineNumber.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "number_user" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="totalSystemUser"
                  name="totalSystemUser"
                  innerRef={register({ required: true })}
                  invalid={errors.totalSystemUser && true}
                />
                {errors && errors.totalSystemUser && (
                  <FormFeedback>{errors.totalSystemUser.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "number_active_user" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="totalActiveUser"
                  name="totalActiveUser"
                  innerRef={register({ required: true })}
                  invalid={errors.totalActiveUser && true}
                />
                {errors && errors.totalActiveUser && (
                  <FormFeedback>{errors.totalActiveUser.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "sum_buy" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="totalBetAmount"
                  name="totalBetAmount"
                  innerRef={register({ required: true })}
                  invalid={errors.totalBetAmount && true}
                />
                {errors && errors.totalBetAmount && (
                  <FormFeedback>{errors.totalBetAmount.message}</FormFeedback>
                )}
              </Col>
            </Row>

            {/* <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "email" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="supportEmail"
                  name="supportEmail"
                  innerRef={register({ required: true })}
                  invalid={errors.supportEmail && true}
                />
                {errors && errors.supportEmail && (
                  <FormFeedback>{errors.supportEmail.message}</FormFeedback>
                )}
              </Col>
            </Row> */}
            {/* <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "diachiviUSDT" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="USDTWalletAddress"
                  name="USDTWalletAddress"
                  innerRef={register({ required: true })}
                  invalid={errors.USDTWalletAddress && true}
                />
                {errors && errors.USDTWalletAddress && (
                  <FormFeedback>
                    {errors.USDTWalletAddress.message}
                  </FormFeedback>
                )}
              </Col>
            </Row> */}
            {/* <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "appstore_link" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="appStoreUrl"
                  name="appStoreUrl"
                  innerRef={register({ required: true })}
                  invalid={errors.appStoreUrl && true}
                />
                {errors && errors.appStoreUrl && (
                  <FormFeedback>{errors.appStoreUrl.message}</FormFeedback>
                )}
              </Col>
            </Row> */}
            {/* <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "playstore_link" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="playStoreUrl"
                  name="playStoreUrl"
                  innerRef={register({ required: true })}
                  invalid={errors.playStoreUrl && true}
                />
                {errors && errors.playStoreUrl && (
                  <FormFeedback>{errors.playStoreUrl.message}</FormFeedback>
                )}
              </Col>
            </Row> */}
            {/* <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "facebook_link" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="fbMessengerUrl"
                  name="fbMessengerUrl"
                  innerRef={register({ required: true })}
                  invalid={errors.fbMessengerUrl && true}
                />
                {errors && errors.fbMessengerUrl && (
                  <FormFeedback>{errors.fbMessengerUrl.message}</FormFeedback>
                )}
              </Col>
            </Row> */}
            <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "telegram_link" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="telegramGroupUrl"
                  name="telegramGroupUrl"
                  innerRef={register({ required: true })}
                  invalid={errors.telegramGroupUrl && true}
                />
                {errors && errors.telegramGroupUrl && (
                  <FormFeedback>{errors.telegramGroupUrl.message}</FormFeedback>
                )}
              </Col>
            </Row>
            {/* <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "zalo_link" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="zaloUrl"
                  name="zaloUrl"
                  innerRef={register({ required: true })}
                  invalid={errors.zaloUrl && true}
                />
                {errors && errors.zaloUrl && (
                  <FormFeedback>{errors.zaloUrl.message}</FormFeedback>
                )}
              </Col>
            </Row> */}
            {/* <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "website_link" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="websiteUrl"
                  name="websiteUrl"
                  innerRef={register({ required: true })}
                  invalid={errors.websiteUrl && true}
                />
                {errors && errors.websiteUrl && (
                  <FormFeedback>{errors.websiteUrl.message}</FormFeedback>
                )}
              </Col>
            </Row> */}
            {/* <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "tawk_support_en" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="supportChatUrlEN"
                  name="supportChatUrlEN"
                  innerRef={register({ required: true })}
                  invalid={errors.supportChatUrlEN && true}
                />
                {errors && errors.supportChatUrlEN && (
                  <FormFeedback>{errors.supportChatUrlEN.message}</FormFeedback>
                )}
              </Col>
            </Row> */}
            {/* <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "tawk_support_vi" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="supportChatUrlVI"
                  name="supportChatUrlVI"
                  innerRef={register({ required: true })}
                  invalid={errors.supportChatUrlVI && true}
                />
                {errors && errors.supportChatUrlVI && (
                  <FormFeedback>{errors.supportChatUrlVI.message}</FormFeedback>
                )}
              </Col>
            </Row> */}
            {/* <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "tawk_support_cn" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="supportChatUrlCN"
                  name="supportChatUrlCN"
                  innerRef={register({ required: true })}
                  invalid={errors.supportChatUrlCN && true}
                />
                {errors && errors.supportChatUrlCN && (
                  <FormFeedback>{errors.supportChatUrlCN.message}</FormFeedback>
                )}
              </Col>
            </Row> */}
            {/* <Row className={"pb-1 align-items-center"}>
              <Col xs={12} sm={12} lg={3}>
                <Label>{intl.formatMessage({ id: "tawk_support_pl" })}</Label>
              </Col>
              <Col xs={12} sm={12} lg={9}>
                <Input
                  id="supportChatUrlPL"
                  name="supportChatUrlPL"
                  innerRef={register({ required: true })}
                  invalid={errors.supportChatUrlPL && true}
                />
                {errors && errors.supportChatUrlPL && (
                  <FormFeedback>{errors.supportChatUrlPL.message}</FormFeedback>
                )}
              </Col>
            </Row> */}
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

export default injectIntl(SystemInformation);
