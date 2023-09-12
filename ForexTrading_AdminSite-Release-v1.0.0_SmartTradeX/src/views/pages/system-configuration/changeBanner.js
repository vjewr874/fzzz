import React, { Fragment, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Col,
  CustomInput,
  FormGroup,
  Media,
  Spinner,
} from "reactstrap";
import SystemConfigurationService from "../../../services/systemService";
import PlaceholderImage from "../../../assets/images/placeholder/placeholder.png";

function ChangeBanner({ intl, dataConfig }) {
  const [featuredImgFirst, setFeaturedImgFirst] = useState(null);
  const [featuredImgSecond, setFeaturedImgSecond] = useState(null);
  const [featuredImgThird, setFeaturedImgThird] = useState(null);
  const [featuredImgFourth, setFeaturedImgFourth] = useState(null);
  const [featuredImgFifth, setFeaturedImgFifth] = useState(null);
  const [loading, setLoading] = useState(false);

  const [imgFirstPath, setImgFirstPath] = useState(
    null || dataConfig.bannerImage1
  );
  const [imgSecondPath, setImgSecondPath] = useState(
    null || dataConfig.bannerImage2
  );
  const [imgThirdPath, setImgThirdPath] = useState(
    null || dataConfig.bannerImage3
  );
  const [imgFourthPath, setImgFourthPath] = useState(
    null || dataConfig.bannerImage3
  );
  const [imgFifthPath, setImgFifthPath] = useState(
    null || dataConfig.bannerImage3
  );

  useEffect(() => {
    if (dataConfig && Object.keys(dataConfig).length > 0) {
      setFeaturedImgFirst(dataConfig.bannerImage1);
      setFeaturedImgSecond(dataConfig.bannerImage2);
      setFeaturedImgThird(dataConfig.bannerImage3);
      setFeaturedImgFourth(dataConfig.bannerImage4);
      setFeaturedImgFifth(dataConfig.bannerImage5);
    }
  }, [dataConfig]);

  const changeFirstImage = (e) => {
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
      setFeaturedImgFirst(reader.result);
      let baseString = reader.result;
      const params = {
        imageData: baseString.replace("data:" + file.type + ";base64,", ""),
        imageFormat: file.type.replace("image/", ""),
      };
      SystemConfigurationService.uploadMediaFile(params)
        .then((result) => {
          setImgFirstPath(result);
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

  const changeSecondImage = (e) => {
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
      setFeaturedImgSecond(reader.result);
      let baseString = reader.result;
      const params = {
        imageData: baseString.replace("data:" + file.type + ";base64,", ""),
        imageFormat: file.type.replace("image/", ""),
      };
      SystemConfigurationService.uploadMediaFile(params)
        .then((result) => {
          setImgSecondPath(result);
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

  const changeThirdImage = (e) => {
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
      setFeaturedImgThird(reader.result);
      let baseString = reader.result;
      const params = {
        imageData: baseString.replace("data:" + file.type + ";base64,", ""),
        imageFormat: file.type.replace("image/", ""),
      };
      SystemConfigurationService.uploadMediaFile(params)
        .then((result) => {
          setImgThirdPath(result);
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

  const changeFourthImage = (e) => {
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
      setFeaturedImgFourth(reader.result);
      let baseString = reader.result;
      const params = {
        imageData: baseString.replace("data:" + file.type + ";base64,", ""),
        imageFormat: file.type.replace("image/", ""),
      };
      SystemConfigurationService.uploadMediaFile(params)
        .then((result) => {
          setImgFourthPath(result);
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

  const changeFifthImage = (e) => {
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
      setFeaturedImgFifth(reader.result);
      let baseString = reader.result;
      const params = {
        imageData: baseString.replace("data:" + file.type + ";base64,", ""),
        imageFormat: file.type.replace("image/", ""),
      };
      SystemConfigurationService.uploadMediaFile(params)
        .then((result) => {
          setImgFifthPath(result);
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

  const changeImage = () => {
    if (loading) {
        return;
      }
      setLoading(true);
    const params = {
      bannerImage1: imgFirstPath,
      bannerImage2: imgSecondPath,
      bannerImage3: imgThirdPath,
      bannerImage4: imgFourthPath,
      bannerImage5: imgFifthPath,
    };
    SystemConfigurationService.updateConfigs(params)
      .then((result) => {
        toast.success(intl.formatMessage({ id: "update_banner_success" }));
      })
      .catch((error) => {
        toast.error(intl.formatMessage({ id: "an_error_occurred" }));
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <Card className="col-12 col-sm-12 col-lg-9">
        <span className="align-middle d-sm-none">
          <h3 className="my-2">{intl.formatMessage({ id: "banner" })}</h3>
        </span>
        <CardBody className="mt-2">
          <Col className="mb-2 border rounded p-1" sm="12">
            <h4 className="mb-1">
              {intl.formatMessage({ id: "image_first_banner" })}
            </h4>
            <Media className="flex-column flex-md-row">
              <img
                className="rounded mr-2 mb-1 mb-md-0"
                src={featuredImgFirst || PlaceholderImage}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = PlaceholderImage;
                }}
                alt="featured img"
                width="170"
                height="110"
              />
              <Media body className="ml-md-2">
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
                      onChange={changeFirstImage}
                      accept=".jpg, .png, .gif"
                    />
                  </FormGroup>
                </div>
                <p className="my-100"></p>
                <Button.Ripple color="primary" onClick={() => changeImage()}>
                  {intl.formatMessage({ id: "update" })}{" "}
                  {loading && <Spinner color="white" size="sm" />}
                </Button.Ripple>
              </Media>
            </Media>
          </Col>
          <Col className="mb-2 border rounded p-1" sm="12">
            <h4 className="mb-1">
              {intl.formatMessage({ id: "image_second_banner" })}
            </h4>
            <Media className="flex-column flex-md-row">
              <img
                className="rounded mr-2 mb-1 mb-md-0"
                src={featuredImgSecond || PlaceholderImage}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = PlaceholderImage;
                }}
                alt="featured img"
                width="170"
                height="110"
              />
              <Media body className="ml-md-2">
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
                      onChange={changeSecondImage}
                      accept=".jpg, .png, .gif"
                    />
                  </FormGroup>
                </div>
                <p className="my-100"></p>
                <Button.Ripple color="primary" onClick={() => changeImage()}>
                  {intl.formatMessage({ id: "update" })}{" "}
                  {loading && <Spinner color="white" size="sm" />}
                </Button.Ripple>
              </Media>
            </Media>
          </Col>
          <Col className="mb-2 border rounded p-1" sm="12">
            <h4 className="mb-1">
              {intl.formatMessage({ id: "image_third_banner" })}
            </h4>
            <Media className="flex-column flex-md-row">
              <img
                className="rounded mr-2 mb-1 mb-md-0"
                src={featuredImgThird || PlaceholderImage}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = PlaceholderImage;
                }}
                alt="featured img"
                width="170"
                height="110"
              />
              <Media body className="ml-md-2">
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
                      onChange={changeThirdImage}
                      accept=".jpg, .png, .gif"
                    />
                  </FormGroup>
                </div>
                <p className="my-100"></p>
                <Button.Ripple color="primary" onClick={() => changeImage()}>
                  {intl.formatMessage({ id: "update" })}{" "}
                  {loading && <Spinner color="white" size="sm" />}
                </Button.Ripple>
              </Media>
            </Media>
          </Col>
          <Col className="mb-2 border rounded p-1" sm="12">
            <h4 className="mb-1">
              {intl.formatMessage({ id: "image_fourth_banner" })}
            </h4>
            <Media className="flex-column flex-md-row">
              <img
                className="rounded mr-2 mb-1 mb-md-0"
                src={featuredImgFourth || PlaceholderImage}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = PlaceholderImage;
                }}
                alt="featured img"
                width="170"
                height="110"
              />
              <Media body className="ml-md-2">
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
                      onChange={changeFourthImage}
                      accept=".jpg, .png, .gif"
                    />
                  </FormGroup>
                </div>
                <p className="my-100"></p>
                <Button.Ripple color="primary" onClick={() => changeImage()}>
                  {intl.formatMessage({ id: "update" })}{" "}
                  {loading && <Spinner color="white" size="sm" />}
                </Button.Ripple>
              </Media>
            </Media>
          </Col>
          <Col className="mb-2 border rounded p-1" sm="12">
            <h4 className="mb-1">
              {intl.formatMessage({ id: "image_fifth_banner" })}
            </h4>
            <Media className="flex-column flex-md-row">
              <img
                className="rounded mr-2 mb-1 mb-md-0"
                src={featuredImgFifth || PlaceholderImage}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = PlaceholderImage;
                }}
                alt="featured img"
                width="170"
                height="110"
              />
              <Media body className="ml-md-2">
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
                      onChange={changeFifthImage}
                      accept=".jpg, .png, .gif"
                    />
                  </FormGroup>
                </div>
                <p className="my-100"></p>
                <Button.Ripple color="primary" onClick={() => changeImage()}>
                  {intl.formatMessage({ id: "update" })}{" "}
                  {loading && <Spinner color="white" size="sm" />}
                </Button.Ripple>
              </Media>
            </Media>
          </Col>
        </CardBody>
      </Card>
    </Fragment>
  );
}

export default injectIntl(ChangeBanner);
