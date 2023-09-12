import { Fragment, useState } from "react";
import {
  Input,
  Label,
  Button,
  Form,
  Card,
  FormGroup,
  Col,
  Media,
  CustomInput,
  Spinner,
} from "reactstrap";
import { injectIntl } from "react-intl";
import { useHistory } from "react-router";
import CustomerMessageService from "../../../services/customerMessageService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "react-feather";
import "../manager-user/style.scss"

const InsertMessage = ({ intl }) => {
  const history = useHistory();
  const [enteredType, setEnteredType] = useState("GENERAL");
  const [featuredImg, setFeaturedImg] = useState(null);
  const [imgPath, setImgPath] = useState(null);
  const [loading, setLoading] = useState(false);

  const categoriesChangeHandler = (value) => {
    setEnteredType(value);
  };

  const { register, errors, handleSubmit } = useForm({
    defaultValues: {},
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
      CustomerMessageService.uploadImage(params)
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
    const messageTitle = data.groupCustomerMessageTitle
    const messageContent = data.groupCustomerMessageContent
    const params = {
      groupCustomerMessageType: enteredType,
      groupCustomerMessageTitle: messageTitle,
      groupCustomerMessageContent: messageContent,
    };
    if (messageTitle.length > 150) {
      toast.warn(intl.formatMessage({ id: "title_over_character" }));
      return setLoading(false)
    }
    if (messageContent.length > 1000) {
      toast.warn(intl.formatMessage({ id: "content_over_character" }));
      return setLoading(false)
    }
    if (imgPath) {
      params.groupCustomerMessageImage = imgPath;
    }
    CustomerMessageService.insertMessage(params)
      .then(() => {
        history.goBack();
        toast.success(intl.formatMessage({ id: "add_notify_success" }));
      })
      .catch(() => {
        toast.success(intl.formatMessage({ id: "add_notify_failed" }));
      })
      .finally(() => {
        setLoading(false);
      });

    // CustomerMessageService.insertMessage(params)
    //   .then(() => {
    //     history.goBack();
    //     toast.success(
    //       intl.formatMessage({ id: "add_notify_success" })
    //     );
    //   })
    //   .catch(() => {
    //     toast.success(
    //       intl.formatMessage({ id: "add_notify_failed" })
    //     );
    //   });
  };

  const onClickGoBack = () => {
    history.goBack();
  };

  return (
    <Fragment>
      <div onClick={onClickGoBack} className="cursor-pointer mb-2">
        <ChevronLeft />
        {intl.formatMessage({ id: "Go-back" })}
      </div>
      <Card className="col-lg-8">
        <h2 className="ml-2 my-2 mt-3">
          {intl.formatMessage({ id: "add_notify" })}
        </h2>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <FormGroup className="container">
            <Label>{intl.formatMessage({ id: "type" })}</Label>
            <Input
              type="select"
              value={enteredType}
              onChange={categoriesChangeHandler}
            >
              <option value="GENERAL">
                {intl.formatMessage({ id: "general" })}
              </option>
            </Input>
          </FormGroup>
          <Col className="mb-2" sm="12">
            <div className="border rounded p-2">
              <h4 className="mb-1">{intl.formatMessage({ id: "image" })}</h4>
              <Media className="flex-column flex-md-row">
                {featuredImg && (
                  <img
                    className="rounded mr-2 mb-1 mb-md-0"
                    src={featuredImg}
                    alt={intl.formatMessage({ id: "picture_new" })}
                    width="170"
                    height="110"
                  />
                )}
                <Media body>
                  <small className="text-muted">
                    {intl.formatMessage({ id: "required_image_size" })}
                  </small>
                  <p className="my-100"></p>
                  <div className="d-inline-block">
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
                </Media>
              </Media>
            </div>
          </Col>
          <FormGroup className="container">
            <Label>{intl.formatMessage({ id: "title" }) + intl.formatMessage({ id: "title_character" })}</Label>
            <Input
              type="text"
              id="groupCustomerMessageTitle"
              name="groupCustomerMessageTitle"
              innerRef={register({ required: true, maxLength: 150 })}
              invalid={errors.groupCustomerMessageTitle && true}
              placeholder={intl.formatMessage({ id: "input_title" })}
            />
            {errors.groupCustomerMessageTitle && <span className="text-danger">{intl.formatMessage({id:"title_over_character"})}</span>}
          </FormGroup>
          <FormGroup className="container">
            <Label>{intl.formatMessage({ id: "content" }) + intl.formatMessage({ id: "content_character" })}</Label>
            <Input
              type="textarea"
              rows="10"
              id="groupCustomerMessageContent"
              name="groupCustomerMessageContent"
              innerRef={register({ required: true, maxLength: 1000 })}
              invalid={errors.groupCustomerMessageContent && true}
              placeholder={intl.formatMessage({ id: "input_content" })}
            />
            {errors.groupCustomerMessageContent && <span className="text-danger">{intl.formatMessage({id:"content_over_character"})}</span>}
          </FormGroup>
          
          <div className="my-2 ml-1">
            <Button color="primary" type="submit">
              {intl.formatMessage({ id: "add" })}
              {loading && <Spinner className="ml-1" color="white" size="sm" />}
            </Button>
          </div>
        </Form>
      </Card>
    </Fragment>
  );
};
export default injectIntl(InsertMessage);
