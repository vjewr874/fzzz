import { useState } from "react";
// ** Store & Actions
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
import PlaceholderImage from "../../../assets/images/placeholder/placeholder.png";
import OrganizationService from "../../../services/organizationService";

const AddMembership = ({ intl, open, toggleSidebar, onReloadData }) => {
  const [loading, setLoading] = useState(false);
  const [featuredImg, setFeaturedImg] = useState(null);
  const [imgPath, setImgPath] = useState(null);

  const membershipSchema = yup.object().shape({
    appUserMembershipTitle: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .matches(".*\\S+.*", intl.formatMessage({ id: "please_input" })),
    appUserMembershipDescription: yup
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
    mode: "onchange",
    resolver: yupResolver(membershipSchema),
  });

  const onChange = (e) => {
    const reader = new FileReader();
    const files = e.target.files;
    if (files.length == 0) {
      return;
    }
    const file = files[0];
    if (file.size > 10048576) {
      toast.warn(intl.formatMessage({ id: "required_image_size" }));
      return;
    }
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      setFeaturedImg(reader.result);
      let baseString = reader.result;
      const params = {
        imageData: baseString.replace("data:" + file.type + ";base64,", ""),
        imageFormat: file.type.replace("image/", ""),
      };
      OrganizationService.uploadMediaFile(params)
        .then((result) => {
          setImgPath(result);
        })
        .catch((error) => {
          toast.error(intl.formatMessage({ id: "an_error_occurred" }));
        })
        .finally(() => {
          e.target.value = "";
        });
    };
    reader.onerror = function (error) {
      toast.error(error, intl.formatMessage({ id: "an_error_occurred" }));
    };
  };

  const submitHandler = (data) => {
    if (loading) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const params = {
        appUserMembershipTitle: data.appUserMembershipTitle,
        appUserMembershipDescription: data.appUserMembershipDescription,
        appUserMembershipInvitationRequired:
          data.appUserMembershipInvitationRequired,
        appUserMembershipAssetRequired: data.appUserMembershipAssetRequired,
        appUserMembershipAssetF1Required: data.appUserMembershipAssetF1Required,
        appUserMembershipBonusPrize: data.appUserMembershipBonusPrize,
        appUserMembershipBonusPrizeType: data.appUserMembershipBonusPrizeType,
        appUserMembershipBonusPrizeName: data.appUserMembershipBonusPrizeName
      };
      if (imgPath) {
        params.appUserMembershipImage = imgPath;
      } else {
        toast.warn(intl.formatMessage({ id: "required_image" }));
        setLoading(false);
      }
      OrganizationService.insertOrganization(params)
        .then(() => {
          toast.success(
            intl.formatMessage({ id: "insert_membership_success" })
          );
          onReloadData();
          toggleSidebar();
        })
        .catch(() => {
          toast.error(intl.formatMessage({ id: "insert_membership_failed" }));
        })
        .finally(() => {
          setLoading(false);
        });
    }, 7000);
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={`${intl.formatMessage({ id: "insert_membership" })}`}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(submitHandler)}>
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
              <Label for="appUserMembershipDescription" className="mb-1">
                {intl.formatMessage({ id: "description_member" })}
              </Label>
              <Input
                name="appUserMembershipDescription"
                id="appUserMembershipDescription"
                innerRef={register({ required: true })}
                invalid={errors.appUserMembershipDescription && true}
                placeholder={
                  intl.formatMessage({
                    id: "input",
                  }) +
                  intl
                    .formatMessage({
                      id: "description_member",
                    })
                    .toLowerCase()
                }
              />
              {errors && errors.appUserMembershipDescription && (
                <FormFeedback>
                  {errors.appUserMembershipDescription.message}
                </FormFeedback>
              )}
            </FormGroup>
            <div className="border rounded p-1 mb-1">
              <h4 className="mb-1">
                {intl.formatMessage({ id: "image_member" })}
              </h4>
              <Media className="flex-column flex-md-row">
                <img
                  className="rounded mr-2 mb-1 mb-md-0"
                  src={featuredImg || PlaceholderImage}
                  alt="Upload"
                  width="170"
                  height="110"
                />
                <Media body>
                  <small className="text-muted">
                    {intl.formatMessage({ id: "required_image_size" })}
                  </small>
                  <p className="my-100"></p>
                </Media>
              </Media>
              <div className="d-inline-block mt-2">
                <FormGroup className="mb-0">
                  <CustomInput
                    type="file"
                    id="exampleCustomFileBrowser"
                    name="customFile"
                    onChange={onChange}
                    accept=".jpg, .png, .gif"
                  />
                </FormGroup>
              </div>
            </div>
            <FormGroup>
              <Label for="appUserMembershipInvitationRequired" className="mb-1">
                {intl.formatMessage({ id: "invite_require" })}
              </Label>
              <Input
                name="appUserMembershipInvitationRequired"
                id="appUserMembershipInvitationRequired"
                innerRef={register({ required: true })}
                invalid={errors.appUserMembershipInvitationRequired && true}
                placeholder={
                  intl.formatMessage({
                    id: "input",
                  }) +
                  intl
                    .formatMessage({
                      id: "invite_require",
                    })
                    .toLowerCase()
                }
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
                placeholder={
                  intl.formatMessage({
                    id: "input",
                  }) +
                  intl
                    .formatMessage({
                      id: "asset_require",
                    })
                    .toLowerCase()
                }
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
                placeholder={
                  intl.formatMessage({
                    id: "input",
                  }) +
                  intl
                    .formatMessage({
                      id: "asset_f1_require",
                    })
                    .toLowerCase()
                }
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

export default injectIntl(AddMembership);
