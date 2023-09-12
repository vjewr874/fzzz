import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import "@styles/react/libs/editor/editor.scss";
import "./styles/NotificationInfo.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import NotificationList from "../../../../services/notification";
import { Plus, Trash2 } from "react-feather";
import { convertFileToBase64 } from "../../../../helper/common";
import SystemConfig from "../../../../services/systemConfig";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Loader from "../../../../components/Loader";

const ObjectCreates = [
  { label: "Tất cả", value: "ALL" },
  {
    label: "Cá nhân",
    value: "PERSON",
  },
];
const MessageCategories = [
  {
    label: "FIREBASE_PUSH",
    value: "FIREBASE_PUSH",
  },
];
const NotificationInfo = (props) => {
  const [titleName, setTitleName] = useState(null);
  // const [infoNotify,setInfoNotify]=useState(null)
  const [notificationContent, setNotificationContent] = useState(
    EditorState.createEmpty()
  );
  // const [dateCreated,setDateCreated]=useState(null)
  // const [infoTopic,setInfoTopic]=useState(null)
  const [userIdToCreate, setUserIdToCreate] = useState("");
  const [ObjectCreate, setObjectCreate] = useState(ObjectCreates[0].value);
  const messageCategory = MessageCategories[0].value;
  const [image, setImage] = useState(null);
  const history = useHistory();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  useEffect(() => {
    // getCustomerList()
    setTitleName(props?.notificationInfo?.groupCustomerMessageTitle);
    // setInfoNotify(props?.notificationInfo?.groupCustomerMessageContent)
    setImage(props?.notificationInfo?.groupCustomerMessageImage);
    if (
      props?.notificationInfo?.groupCustomerMessageContent !== undefined &&
      props?.notificationInfo?.groupCustomerMessageContent !== null
    ) {
      setNotificationContent(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(props?.notificationInfo?.groupCustomerMessageContent)
              .contentBlocks,
            htmlToDraft(props?.notificationInfo?.groupCustomerMessageContent)
              .entityMap
          )
        )
      );
    }
  }, [props?.notificationInfo]);

  const handleChangeInput = (e, name) => {
    switch (name) {
      case "userIdToCreate":
        setUserIdToCreate(e.target.value);
        break;
      case "titleName":
        setTitleName(e.target.value);
        break;
      // case "infoNotify":
      //     setInfoNotify(e.target.value)
      //     break
      // case "dateCreated":
      //     setDateCreated(e.target.value)
      //     break
      // case "infoTopic":
      //     setInfoTopic(e.target.value)
      //     break
    }
  };
  function createNotification(dataCreate, api) {
    NotificationList.createNotification(dataCreate, api).then((res) => {
      setTimeout(() => setIsLoadingSubmit(false), 500);
      if (res) {
        const { statusCode, message } = res;
        if (statusCode === 200) {
          toast.success("Tạo mới thành công");
          history.push("/notification/list");
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
      }
    });
  }

  const handleSubmit = () => {
    const notificationContentConvert = draftToHtml(
      convertToRaw(notificationContent.getCurrentContent())
    ).toString();

    if (!titleName) {
      toast.warn("Vui lòng nhập tiêu đề");
    } else if (notificationContentConvert == "<p></p>") {
      toast.warn("Vui lòng nhập nội dung thông báo");
    } else {
      if (ObjectCreate === "ALL") {
        const params = {
          groupCustomerMessageCategories: messageCategory || undefined,
          groupCustomerMessageContent: notificationContentConvert || undefined,
          groupCustomerMessageTitle: titleName || undefined,
          groupCustomerMessageImage: image || undefined,
          groupCustomerMessageType: "GENERAL",
        };
        setIsLoadingSubmit(true);
        createNotification(params, "/GroupCustomerMessage/insert");
      }
      if (ObjectCreate === "PERSON") {
        const params = {
          customerMessageType: "USER",
          customerMessageContent: notificationContentConvert || undefined,
          customerMessageTitle: titleName || undefined,
          customerMessageImage: image || undefined,
          customerId: userIdToCreate || undefined,
        };
        setIsLoadingSubmit(true);
        createNotification(params, "/CustomerMessage/insertNotification");
      }
    }
  };
  function handleChangeImage(e) {
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
        setIsLoadingSubmit(true);
        SystemConfig.uploadImage(dataImage).then((r) => {
          setIsLoadingSubmit(false);
          setImage(r);
        });
      }
    });
  }
  function handleRemoveImage() {
    setImage(null);
  }

  // useEffect(() => {
  //     if (props?.job?.description !== undefined && props?.job?.description !== null) {
  //         setInfoNotify(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(props?.job?.description).contentBlocks, htmlToDraft(props?.job?.description).entityMap)))
  //     }
  // }, [props?.job?.description])
  // function saveEditorState(data) {
  //
  // }

  // console.log(draftToHtml(convertToRaw(notificationContent.getCurrentContent())).toString())
  return (
    <div className={"notification-info"}>
      {isLoadingSubmit ? <Loader /> : null}
      <Card className="p-2">
        <h3 className={"detail-title mb-2"}>{props?.title}</h3>
        <Row>
          <Col>
            <Row className="detail-content">
              <Col sm={12}>
                {!props?.disabled && (
                  <div>
                    <FormGroup>
                      <Label className={"label"}>Đối tượng</Label>
                      <Select
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        options={ObjectCreates}
                        placeholder={"Chọn loại đối tượng"}
                        value={
                          ObjectCreates?.find(
                            (obj) => obj.value === ObjectCreate
                          ) || ""
                        }
                        onChange={(value) => setObjectCreate(value.value)}
                        isDisabled={props?.disabled}
                      />
                    </FormGroup>

                    {ObjectCreate === "PERSON" && (
                      <FormGroup>
                        <Label>Người dùng (ID)</Label>
                        <Input
                          className={"custom-input-pj"}
                          type={"number"}
                          onChange={(e) =>
                            handleChangeInput(e, "userIdToCreate")
                          }
                          value={userIdToCreate || ""}
                          disabled={props?.disabled}
                        />
                      </FormGroup>
                    )}
                  </div>
                )}

                <FormGroup>
                  <Label>Tiêu đề</Label>
                  <Input
                    className={"custom-input-pj"}
                    type={"text"}
                    onChange={(e) => handleChangeInput(e, "titleName")}
                    value={titleName || ""}
                    disabled={props?.disabled}
                  />
                </FormGroup>

                {/*{props.disabled &&*/}
                {/*    // <div>*/}
                {/*    //     <FormGroup>*/}
                {/*    //         <Label>*/}
                {/*    //             Tóm tắt thông báo*/}
                {/*    //         </Label>*/}
                {/*    //         <Input*/}
                {/*    //             className={"custom-input-pj"}*/}
                {/*    //             type={'text'}*/}
                {/*    //             onChange={(e) => handleChangeInput(e, 'infoTopic')}*/}
                {/*    //             value={infoTopic || ''}*/}
                {/*    //             disabled={props?.disabled}*/}
                {/*    //         />*/}
                {/*    //     </FormGroup>*/}
                {/*    //     <FormGroup>*/}
                {/*    //         <Label>*/}
                {/*    //             Ngày tạo*/}
                {/*    //         </Label>*/}
                {/*    //         <Input*/}
                {/*    //             className={"custom-input-pj"}*/}
                {/*    //             type={'text'}*/}
                {/*    //             // onChange={(e) => handleChangeInput(e, 'quantity')}*/}
                {/*    //             value={convertDateVN(dateCreated) || ''}*/}
                {/*    //             disabled={props?.disabled}*/}
                {/*    //         />*/}
                {/*    //     </FormGroup>*/}
                {/*    // </div>*/}
                {/*// <FormGroup>*/}
                {/*//     <Label className={"label"}>*/}
                {/*//         Nội dung thông báo*/}
                {/*//     </Label>*/}
                {/*//     <Input*/}
                {/*//         placeholder={"Nội dung thông báo"}*/}
                {/*//         className={"custom-input-pj"}*/}
                {/*//         type={'textarea'}*/}
                {/*//         onChange={(e) => handleChangeInput(e, 'infoNotify')}*/}
                {/*//         rows="8"*/}
                {/*//         value={infoNotify||''}*/}
                {/*//         disabled={props?.disabled}*/}
                {/*//     />*/}
                {/*// </FormGroup>*/}
                {/*}*/}
              </Col>
            </Row>
          </Col>
          <Col sm={1} className={"d-flex justify-content-center"}>
            <div style={{ width: "1px", backgroundColor: "#999999" }} />
          </Col>
          <Col className={"content-detail-message"}>
            <p className={"banner"}>Banner</p>
            <ul className={"guild"}>
              <li>Chiều ngang: 305px: Chiều dọc: 154px</li>
              <li>
                Định dạng hình ảnh: PNG, JPG. Dung lượng hình không được quá
                1.0MB.
              </li>
            </ul>
            {image && (
              <div className={"container-input-file-customer"}>
                {!props?.disabled && (
                  <Trash2
                    className={"icon-remove"}
                    onClick={() => handleRemoveImage()}
                  />
                )}
                <img
                  src={image}
                  alt=""
                  width={"100%"}
                  height={"100%"}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            {!image && (
              <div className={"container-input-file-customer"}>
                <div className={"text-center"}>
                  <div>
                    <Plus />
                  </div>
                  {props?.disabled ? "Không có hình" : "Tải ảnh lên"}
                </div>
                <Input
                  type="file"
                  id="exampleCustomFileBrowser"
                  name="customFile"
                  accept=".jpg, .png, .gif"
                  className={"input-file"}
                  disabled={props?.disabled}
                  onChange={handleChangeImage}
                />
              </div>
            )}
            {/*{*/}
            {/*    !props?.disabled && <FormGroup>*/}
            {/*    <Label className={"label"}>*/}
            {/*        Nội dung thông báo*/}
            {/*    </Label>*/}
            {/*    <Input*/}
            {/*        placeholder={"Nội dung thông báo"}*/}
            {/*        className={"custom-input-pj"}*/}
            {/*        type={'textarea'}*/}
            {/*        onChange={(e) => handleChangeInput(e, 'infoNotify')}*/}
            {/*        rows="8"*/}
            {/*        value={infoNotify || ''}*/}
            {/*        disabled={props?.disabled}*/}
            {/*    />*/}
            {/*</FormGroup>}*/}
          </Col>
        </Row>
        <CardBody>
          <label style={{ fontSize: "16px", fontWeight: 500, color: "black" }}>
            Nội dung thông báo
          </label>
          <Editor
            editorClassName="rounded-0"
            toolbarClassName="rounded-0 editor"
            editorState={notificationContent}
            onEditorStateChange={(data) => setNotificationContent(data)}
            readOnly={props?.disabled}
          />
        </CardBody>
      </Card>
      <div className={"d-flex justify-content-end align-items-center"}>
        <Button
          color={"primary"}
          className={"mr-2"}
          onClick={() => history.push("/notification/list")}
        >
          Trở lại
        </Button>
        {!props?.disabled && (
          <Button
            color={"primary"}
            type={"button"}
            onClick={() => handleSubmit()}
          >
            Tạo
          </Button>
        )}
      </div>
    </div>
  );
};
export default NotificationInfo;
