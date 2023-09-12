import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  Input,
  Label,
  Row,
  Col,
  Button,
  FormGroup,
  FormFeedback,
  Form,
  Spinner,
  Media,
  CustomInput,
} from "reactstrap";
import { injectIntl } from "react-intl";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Sidebar from "@components/sidebar";
import OrganizationService from "../../../services/organizationService";
import PlaceholderImage from "../../../assets/images/placeholder/placeholder.png";

const EditMembership = ({ intl, open, toggleSidebar, item, onReloadData }) => {
  const [loading, setLoading] = useState(false);
  const [membershipData, setMembershipData] = useState(item || {});
  const [featuredImg, setFeaturedImg] = useState(
    membershipData.appUserMembershipImage
  );
  const [imgPath, setImgPath] = useState(null);

  const membershipSchema = yup.object().shape({
    appUserMembershipTitle: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .matches(".*\\S+.*", intl.formatMessage({ id: "please_input" })),
    appUserMembershipInvitationRequired: yup
      .string()
      .matches(/^[0-9.]*$/, intl.formatMessage({ id: "please_input_number" }))
      .required(intl.formatMessage({ id: "please_input" })),
    appUserMembershipAssetRequired: yup
      .string()
      .matches(/^[0-9.]*$/, intl.formatMessage({ id: "please_input_number" }))
      .required(intl.formatMessage({ id: "please_input" })),
    appUserMembershipAssetF1Required: yup
      .string()
      .matches(/^[0-9.]*$/, intl.formatMessage({ id: "please_input_number" }))
      .required(intl.formatMessage({ id: "please_input" })),
    appUserMembershipBonusPrize: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .matches(".*\\S+.*", intl.formatMessage({ id: "please_input" })),
    appUserMembershipBonusPrizeType: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .matches(".*\\S+.*", intl.formatMessage({ id: "please_input" })),
    appUserMembershipBonusPrizeName: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .matches(".*\\S+.*", intl.formatMessage({ id: "please_input" })),
  });

  const { register, errors, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(membershipSchema),
    defaultValues: {
      appUserMembershipTitle: React.useMemo(() => {
        return item.appUserMembershipTitle;
      }, [item]),
      appUserMembershipInvitationRequired: React.useMemo(() => {
        return item.appUserMembershipInvitationRequired;
      }, [item]),
      appUserMembershipAssetRequired: React.useMemo(() => {
        return item.appUserMembershipAssetRequired;
      }, [item]),
      appUserMembershipAssetF1Required: React.useMemo(() => {
        return item.appUserMembershipAssetF1Required;
      }, [item]),
      appUserMembershipBonusPrize: React.useMemo(() => {
        return item.appUserMembershipBonusPrize;
      }, [item]),
      appUserMembershipBonusPrizeType: React.useMemo(() => {
        return item.appUserMembershipBonusPrizeType;
      }, [item]),
      appUserMembershipBonusPrizeName: React.useMemo(() => {
        return item.appUserMembershipBonusPrizeName;
      }, [item]),
    },
  });

  useEffect(() => {
    if (item && Object.keys(item).length > 0) {
      setMembershipData(item);
    }
  }, [item]);


  const onClickSave = (data) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const params = {
      id: membershipData.appUsermembershipId,
      data: {
        appUserMembershipTitle: data.appUserMembershipTitle,
        appUserMembershipInvitationRequired:
          data.appUserMembershipInvitationRequired,
        appUserMembershipAssetRequired: data.appUserMembershipAssetRequired,
        appUserMembershipAssetF1Required: data.appUserMembershipAssetF1Required,
        appUserMembershipBonusPrize: data.appUserMembershipBonusPrize,
        appUserMembershipBonusPrizeType: data.appUserMembershipBonusPrizeType,
        appUserMembershipBonusPrizeName: data.appUserMembershipBonusPrizeName
      },
    };
    OrganizationService.updateById(params)
      .then(() => {
        toast.success(intl.formatMessage({ id: "update_membership_success" }));
        onReloadData();
        toggleSidebar();
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "update_membership_failed" }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={`${intl.formatMessage({ id: "update_membership" })}`}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onClickSave)}>
        <Row>
          <Col sm="12">
            <FormGroup>
              <Label for="appUserMembershipTitle" className="mb-1">
                {intl.formatMessage({ id: "title_member" })}
              </Label>
              <Input
                name="appUserMembershipTitle"
                id="appUserMembershipTitle"
                innerRef={register({ required: true })}
                invalid={errors.appUserMembershipTitle && true}
                placeholder={intl.formatMessage({
                  id: "input_membership_type",
                })}
              />
              {errors && errors.appUserMembershipTitle && (
                <FormFeedback>
                  {errors.appUserMembershipTitle.message}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="appUserMembershipInvitationRequired" className="mb-1">
                {intl.formatMessage({ id: "invite_require" })}
              </Label>
              <Input
                name="appUserMembershipInvitationRequired"
                id="appUserMembershipInvitationRequired"
                innerRef={register({ required: true })}
                invalid={errors.appUserMembershipInvitationRequired && true}
                placeholder={intl.formatMessage({
                  id: "input"
                }) + intl.formatMessage({
                  id: "invite_require"
                }).toLowerCase()}
              />
              {errors && errors.appUserMembershipInvitationRequired && (
                <FormFeedback>
                  {errors.appUserMembershipInvitationRequired.message}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="appUserMembershipAssetRequired" className="mb-1">
                {intl.formatMessage({ id: "asset_require" })}
              </Label>
              <Input
                name="appUserMembershipAssetRequired"
                id="appUserMembershipAssetRequired"
                innerRef={register({ required: true })}
                invalid={errors.appUserMembershipAssetRequired && true}
                placeholder={intl.formatMessage({
                  id: "input"
                }) + intl.formatMessage({
                  id: "asset_require"
                }).toLowerCase()}
              />
              {errors && errors.appUserMembershipAssetRequired && (
                <FormFeedback>
                  {errors.appUserMembershipAssetRequired.message}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="appUserMembershipAssetF1Required" className="mb-1">
                {intl.formatMessage({ id: "asset_f1_require" })}
              </Label>
              <Input
                name="appUserMembershipAssetF1Required"
                id="appUserMembershipAssetF1Required"
                innerRef={register({ required: true })}
                invalid={errors.appUserMembershipAssetF1Required && true}
                placeholder={intl.formatMessage({
                  id: "input"
                }) + intl.formatMessage({
                  id: "asset_f1_require"
                }).toLowerCase()}
              />
              {errors && errors.appUserMembershipAssetF1Required && (
                <FormFeedback>
                  {errors.appUserMembershipAssetF1Required.message}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="appUserMembershipBonusPrizeName" className="mb-1">
                {intl.formatMessage({ id: "bonus_name" })}
              </Label>
              <Input
                name="appUserMembershipBonusPrizeName"
                id="appUserMembershipBonusPrizeName"
                innerRef={register({ required: true })}
                invalid={errors.appUserMembershipBonusPrizeName && true}
                placeholder={
                  intl.formatMessage({
                    id: "input",
                  }) +
                  intl
                    .formatMessage({
                      id: "bonus_name",
                    })
                    .toLowerCase()
                }
              />
              {errors && errors.appUserMembershipBonusPrizeName && (
                <FormFeedback>
                  {errors.appUserMembershipBonusPrizeName.message}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="appUserMembershipBonusPrize" className="mb-1">
                {intl.formatMessage({ id: "bonus_prize" })}
              </Label>
              <Input
                name="appUserMembershipBonusPrize"
                id="appUserMembershipBonusPrize"
                innerRef={register({ required: true })}
                invalid={errors.appUserMembershipBonusPrize && true}
                placeholder={
                  intl.formatMessage({
                    id: "input",
                  }) +
                  intl
                    .formatMessage({
                      id: "bonus_prize",
                    })
                    .toLowerCase()
                }
              />
              {errors && errors.appUserMembershipBonusPrize && (
                <FormFeedback>
                  {errors.appUserMembershipBonusPrize.message}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="appUserMembershipBonusPrizeType" className="mb-1">
                {intl.formatMessage({ id: "bonus_type" })}
              </Label>
              <Input
                name="appUserMembershipBonusPrizeType"
                id="appUserMembershipBonusPrizeType"
                innerRef={register({ required: true })}
                invalid={errors.appUserMembershipBonusPrizeType && true}
                placeholder={
                  intl.formatMessage({
                    id: "input",
                  }) +
                  intl
                    .formatMessage({
                      id: "bonus_type",
                    })
                    .toLowerCase()
                }
              />
              {errors && errors.appUserMembershipBonusPrizeType && (
                <FormFeedback>
                  {errors.appUserMembershipBonusPrizeType.message}
                </FormFeedback>
              )}
            </FormGroup>
            <div className="d-flex my-3">
              <Button.Ripple
                className="d-flex align-items-center"
                color="primary"
                type="submit"
              >
                <span className="mr-50">
                  {intl.formatMessage({ id: "submit" })}
                </span>
                {loading && <Spinner color="white" size="sm" />}
              </Button.Ripple>
            </div>
          </Col>
        </Row>
      </Form>
    </Sidebar>
  );
};

export default injectIntl(EditMembership);
