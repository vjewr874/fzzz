import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  FormGroup,
  Label,
} from "reactstrap";
import "./style/system-configuration.scss";
import { Plus, Trash2 } from "react-feather";
import SystemConfig from "../../services/systemConfig";
import { convertFileToBase64 } from "../../helper/common";
import Cleave from "cleave.js/react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
const SystemConfiguration = () => {
  const [data, setData] = useState(null);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  useEffect(() => {
    getInfoSystem();
  }, []);

  function getInfoSystem() {
    SystemConfig.showSystemConfig().then((r) => {
      setData(r?.data?.data[0]);
    });
  }
  function handleRemoveImage(position) {
    switch (position) {
      case "1":
        data.bannerImage1 = null;
        data.linkBannerImage1 = null;
        setData({ ...data });
        break;
      case "2":
        data.bannerImage2 = null;
        data.linkBannerImage2 = null;
        setData({ ...data });
        break;
      case "3":
        data.bannerImage3 = null;
        data.linkBannerImage3 = null;
        setData({ ...data });
        break;
      case "4":
        data.bannerImage4 = null;
        data.linkBannerImage4 = null;
        setData({ ...data });
        break;
      case "5":
        data.bannerImage5 = null;
        data.linkBannerImage5 = null;
        setData({ ...data });
        break;
      default:
        break;
    }
  }
  function handleChangeImage(e, position) {
    setIsLoadingSubmit(true);
    const file = e?.target?.files[0];
    convertFileToBase64(file).then((dataUrl) => {
      const newData = dataUrl.replace(/,/gi, "").split("base64");
      if (newData[1]) {
        const dataImage = {
          imageData: newData[1],
          imageFormat: file.type.replace("image/", ""),
        };
        if (file.size > 10048576) {
          return;
        }
        SystemConfig.uploadImage(dataImage).then((r) => {
          setIsLoadingSubmit(false);
          switch (position) {
            case "1":
              data.bannerImage1 = r;
              setData({ ...data });
              break;
            case "2":
              data.bannerImage2 = r;
              setData({ ...data });
              break;
            case "3":
              data.bannerImage3 = r;
              setData({ ...data });
              break;
            case "4":
              data.bannerImage4 = r;
              setData({ ...data });
              break;
            case "5":
              data.bannerImage5 = r;
              setData({ ...data });
              break;
            default:
              break;
          }
        });
      }
    });
  }
  const handleChangeLink = (position, value) => {
    switch (position) {
      case 1:
        data.linkBannerImage1 = value;
        setData({ ...data });
        break;
      case 2:
        data.linkBannerImage2 = value;
        setData({ ...data });
        break;
      case 3:
        data.linkBannerImage3 = value;
        setData({ ...data });
        break;
      case 4:
        data.linkBannerImage4 = value;
        setData({ ...data });
        break;
      case 5:
        data.linkBannerImage5 = value;
        setData({ ...data });
        break;
      default:
        break;
    }
  };
  function updateConfig() {
    const dataUpdate = {
      data: {
        bannerImage1: data?.bannerImage1 || "",
        bannerImage2: data?.bannerImage2 || "",
        bannerImage3: data?.bannerImage3 || "",
        bannerImage4: data?.bannerImage4 || "",
        bannerImage5: data?.bannerImage5 || "",
        linkBannerImage1: data.linkBannerImage1 || "",
        linkBannerImage2: data.linkBannerImage2 || "",
        linkBannerImage3: data.linkBannerImage3 || "",
        linkBannerImage4: data.linkBannerImage4 || "",
        linkBannerImage5: data.linkBannerImage5 || "",
        telegramGroupUrl: data.telegramGroupUrl || "",
        supportChatUrlVI: data.supportChatUrlVI || "",
        supportChatUrlCN: data.supportChatUrlCN || "",
        supportChatUrlEN: data.supportChatUrlEN || "",
        fbMessengerUrl: data.fbMessengerUrl || ""
      },
    };
    if (parseInt(data?.ticketPrice) > 0 && parseInt(data?.storedFee) > 0) {
      setIsLoadingSubmit(true);
      SystemConfig.updateSystemConfig(dataUpdate).then((r) => {
        setTimeout(() => setIsLoadingSubmit(false), 500);
        if (r?.statusCode === 200) {
          getInfoSystem();
          toast.success("Cập nhật thành công");
        } else {
          toast.warn("Lỗi rồi. Vui lòng liên hệ với chúng tôi");
        }
      });
    } else {
      toast.warn("Vui lòng nhập giá trị hợp lệ");
    }
  }
  // function handleChangeLinkSupport(e) {
  //   data.supportChatUrlVI = e.target.rawValue;
  //   setData({ ...data });
  // }
  function handleChangeLinkSupport(type, value) {
    switch (type) {
      case "vi":
        data.supportChatUrlVI = value;
        setData({ ...data });
        break;
      case "cn":
        data.supportChatUrlCN = value;
        setData({ ...data });
        break;
      case "en":
        data.supportChatUrlEN = value;
        setData({ ...data });
        break;
      case "telegram":
        data.telegramGroupUrl = value;
        setData({ ...data });
        break;
      case "messenger":
        data.fbMessengerUrl = value;
        setData({ ...data });
        break;
      default:
        break;
    }
  }
  return (
    <Card className={"system-config-contain"}>
      {isLoadingSubmit ? <Loader /> : null}
      <CardHeader>Cấu hình hệ thống</CardHeader>
      <CardBody>
        <div className={"container-config"}>
          <div className={"title"}>Banner</div>
          <div className={"info-image"}>
            <div className={"container-image px-1"}>
              <Row className={"container-input"}>
                <Col lg={3}>
                  {data?.bannerImage1 && (
                    <>
                      <div className={"container-input-file "}>
                        <Trash2
                          className={"icon-remove"}
                          onClick={() => handleRemoveImage("1")}
                        />
                        <img
                          src={data?.bannerImage1}
                          alt=""
                          width={"100%"}
                          height={"100%"}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <FormGroup className={"mb-3"}>
                        <Label>Link Banner 1</Label>
                        <Input
                          placeholder={"Nhập link"}
                          value={data.linkBannerImage1 || ""}
                          onChange={(e) => handleChangeLink(1, e.target.value)}
                        />
                      </FormGroup>
                    </>
                  )}
                  {!data?.bannerImage1 && (
                    <div className={"container-input-file"}>
                      <div className={"text-center"}>
                        <div>
                          <Plus />
                        </div>
                        Tải ảnh lên
                      </div>
                      <Input
                        type="file"
                        id="exampleCustomFileBrowser"
                        name="customFile"
                        accept=".jpg, .png, .gif"
                        className={"input-file"}
                        onChange={(e) => handleChangeImage(e, "1")}
                      />
                    </div>
                  )}
                </Col>
                <Col lg={3}>
                  {data?.bannerImage2 && (
                    <>
                      <div className={"container-input-file"}>
                        <Trash2
                          className={"icon-remove"}
                          onClick={() => handleRemoveImage("2")}
                        />
                        <img
                          src={data?.bannerImage2}
                          alt=""
                          width={"100%"}
                          height={"100%"}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <FormGroup className={"mb-3"}>
                        <Label>Link Banner 2</Label>
                        <Input
                          placeholder={"Nhập link"}
                          value={data.linkBannerImage2 || ""}
                          onChange={(e) => handleChangeLink(2, e.target.value)}
                        />
                      </FormGroup>
                    </>
                  )}
                  {!data?.bannerImage2 && (
                    <div className={"container-input-file"}>
                      <div className={"text-center"}>
                        <div>
                          <Plus />
                        </div>
                        Tải ảnh lên
                      </div>
                      <Input
                        type="file"
                        id="exampleCustomFileBrowser"
                        name="customFile"
                        accept=".jpg, .png, .gif"
                        className={"input-file"}
                        onChange={(e) => handleChangeImage(e, "2")}
                      />
                    </div>
                  )}
                </Col>
                <Col lg={3}>
                  {data?.bannerImage3 && (
                    <>
                      <div className={"container-input-file"}>
                        <Trash2
                          className={"icon-remove"}
                          onClick={() => handleRemoveImage("3")}
                        />
                        <img
                          src={data?.bannerImage3}
                          alt=""
                          width={"100%"}
                          height={"100%"}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <FormGroup className={"mb-3"}>
                        <Label>Link Banner 3</Label>
                        <Input
                          placeholder={"Nhập link"}
                          value={data.linkBannerImage3 || ""}
                          onChange={(e) => handleChangeLink(3, e.target.value)}
                        />
                      </FormGroup>
                    </>
                  )}
                  {!data?.bannerImage3 && (
                    <div className={"container-input-file"}>
                      <div className={"text-center"}>
                        <div>
                          <Plus />
                        </div>
                        Tải ảnh lên
                      </div>
                      <Input
                        type="file"
                        id="exampleCustomFileBrowser"
                        name="customFile"
                        accept=".jpg, .png, .gif"
                        className={"input-file"}
                        onChange={(e) => handleChangeImage(e, "3")}
                      />
                    </div>
                  )}
                </Col>
                <Col lg={3}>
                  {data?.bannerImage4 && (
                    <>
                      <div className={"container-input-file"}>
                        <Trash2
                          className={"icon-remove"}
                          onClick={() => handleRemoveImage("4")}
                        />
                        <img
                          src={data?.bannerImage4}
                          alt=""
                          width={"100%"}
                          height={"100%"}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <FormGroup className={"mb-3"}>
                        <Label>Link Banner 4</Label>
                        <Input
                          placeholder={"Nhập link"}
                          value={data.linkBannerImage4 || ""}
                          onChange={(e) => handleChangeLink(4, e.target.value)}
                        />
                      </FormGroup>
                    </>
                  )}
                  {!data?.bannerImage4 && (
                    <div className={"container-input-file"}>
                      <div className={"text-center"}>
                        <div>
                          <Plus />
                        </div>
                        Tải ảnh lên
                      </div>
                      <Input
                        type="file"
                        id="exampleCustomFileBrowser"
                        name="customFile"
                        accept=".jpg, .png, .gif"
                        className={"input-file"}
                        onChange={(e) => handleChangeImage(e, "4")}
                      />
                    </div>
                  )}
                </Col>
                <Col lg={3}>
                  {data?.bannerImage5 && (
                    <>
                      <div className={"container-input-file"}>
                        <Trash2
                          className={"icon-remove"}
                          onClick={() => handleRemoveImage("5")}
                        />
                        <img
                          src={data?.bannerImage5}
                          alt=""
                          width={"100%"}
                          height={"100%"}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <FormGroup className={"mb-3"}>
                        <Label>Link Banner 5</Label>
                        <Input
                          placeholder={"Nhập link"}
                          value={data.linkBannerImage5 || ""}
                          onChange={(e) => handleChangeLink(5, e.target.value)}
                        />
                      </FormGroup>
                    </>
                  )}
                  {!data?.bannerImage5 && (
                    <div className={"container-input-file"}>
                      <div className={"text-center"}>
                        <div>
                          <Plus />
                        </div>
                        Tải ảnh lên
                      </div>
                      <Input
                        type="file"
                        id="exampleCustomFileBrowser"
                        name="customFile"
                        accept=".jpg, .png, .gif"
                        className={"input-file"}
                        onChange={(e) => handleChangeImage(e, "5")}
                      />
                    </div>
                  )}
                </Col>
              </Row>
              <p className={"guide-content"}>
                Định dạng hình ảnh: PNG, JPG. Dung lượng hình không được quá
                1.0MB.
              </p>
            </div>
          </div>
          <hr className={"hr-style"} />
          <div className={"container-input__setting"}>
            <h3>Telegram</h3>
            <div>
              <Cleave
                className={"form-control form-control__common"}
                onChange={(e) =>
                  handleChangeLinkSupport("telegram", e.target.value)
                }
                value={data?.telegramGroupUrl}
              />
            </div>
            <h3>Telegram</h3>
            <div>
              <Cleave
                className={"form-control form-control__common"}
                onChange={(e) =>
                  handleChangeLinkSupport("messenger", e.target.value)
                }
                value={data?.fbMessengerUrl}
              />
            </div>
            <h3>Link Hỗ trợ tại Việt Nam</h3>
            <div>
              <Cleave
                className={"form-control form-control__common"}
                onChange={(e) => handleChangeLinkSupport("vi", e.target.value)}
                value={data?.supportChatUrlVI}
              />
            </div>
            <h3>Link Hỗ trợ tại Trung Quốc</h3>
            <div>
              <Cleave
                className={"form-control form-control__common"}
                onChange={(e) => handleChangeLinkSupport("cn", e.target.value)}
                value={data?.supportChatUrlCN}
              />
            </div>
            <h3>Link Hỗ trợ tại Quốc gia khác</h3>
            <div>
              <Cleave
                className={"form-control form-control__common"}
                onChange={(e) => handleChangeLinkSupport("en", e.target.value)}
                value={data?.supportChatUrlEN}
              />
            </div>
          </div>
          <div className={"text-right"}>
            <Button
              className={"btn-save"}
              color={"primary"}
              onClick={() => updateConfig()}
            >
              Lưu
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default SystemConfiguration;
