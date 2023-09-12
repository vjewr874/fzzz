import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Media,
  Label,
  Row,
  Col,
  Input,
  FormGroup,
  Form,
  CardText,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { toast } from "react-toastify";
import "uppy/dist/uppy.css";
import "@uppy/status-bar/dist/style.css";
import "@styles/react/libs/file-uploader/file-uploader.scss";
import { Card } from "reactstrap";
import { useLocation } from "react-router-dom";
import { injectIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import UserService from "../../../services/userService";
import PlaceholderImage from "../../../assets/images/placeholder/placeholder.png";
import PlaceholderPerson from "../../../assets/images/placeholder/person1.jpg";
import { ChevronLeft, Lock, RotateCcw, Unlock } from "react-feather";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.scss";
import NoteUser from "./components/noteUser";
import moment from "moment";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const EditUser = ({ intl }) => {
  const history = useHistory();
  const { state } = useLocation();
  const [userData, setUserData] = useState(state.item || {});
  const [lockUser, setLockUser] = useState("1");
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const [rejectNote, setRejectNote] = useState(false);
  const [picker, setPicker] = useState(state.item.birthDay || "");


  const openNote = () => {
    setRejectNote(!rejectNote);
  };

  const SignupSchema = yup.object().shape({
    email: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .email(intl.formatMessage({ id: "error-email" })),
    firstName: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" })),
    lastName: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" })),
    // companyName: yup
    //   .string()
    //   .required(intl.formatMessage({ id: "please_input" })),
  });

  const { register, errors, handleSubmit, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });

  useEffect(() => {
    if (state && Object.keys(state).length > 0) {
      setUserData(state.item);
      setValue("firstName", state.item.firstName);
      setValue("lastName", state.item.lastName);
      setValue("phoneNumber", state.item.phoneNumber);
      setValue("email", state.item.email);
      setValue("diachiviUSDT", state.item.diachiviUSDT);
      setValue("diachiviBTC", state.item.diachiviBTC);
      setValue("companyName", "");
    }
  }, [state]);

  const handleOnchange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  function handleUpdatePassword(e) {
    e.preventDefault();
    const params = {
      id: userData.appUserId,
      password: password,
    };
    UserService.adminChangePasswordUser(params)
      .then(() => {
        toast.success(intl.formatMessage({ id: "reset_password_success" }));
        setModal(false);
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "reset_password_failed" }));
      });
  }

  const onClickLockUser = (e) => {
    e.preventDefault();
    const params = {
      id: userData.appUserId,
      data: {
        active: userData.active === 0 ? 1 : 0,
      },
    };
    UserService.updateUserById(params)
      .then(() => {
        setLockUser((prevState) => {
          let newLockUser = prevState.lockUser === 0 ? 1 : 0;
          return newLockUser;
        });
        setUserData({
          ...userData,
          active: userData.active === 0 ? 1 : 0,
        });
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "update_status_failed" }));
      });
  };

  const onClickSave = (data) => {
    const params = {
      id: userData.appUserId,
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        diachiviUSDT: userData.diachiviUSDT,
        diachiviBTC: userData.diachiviBTC,
        companyName: data.companyName,
        birthDay: picker
      },
    };
    if (data.email !== userData.email) {
      params.data.email = data.email;
    }
    if (userData.diachiviUSDT === null) {
      params.data.diachiviUSDT = undefined;
    }
    if (userData.diachiviBTC === null) {
      params.data.diachiviBTC = undefined;
    }
    UserService.updateUserById(params)
      .then(() => {
        toast.success(intl.formatMessage({ id: "update_info_user_success" }));
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "update_info_user_failed" }));
      });
  };

  const onClickGoBack = () => {
    history.goBack();
  };

  const onClickVerifyInfoUser = (e) => {
    e.preventDefault();
    const params = {
      id: userData.appUserId,
    };
    UserService.verifyInfoUser(params)
      .then(() => {
        const newUserData = { ...userData };
        newUserData.isVerified = 1;
        setUserData(newUserData);

        toast.success(intl.formatMessage({ id: "verify_user_success" }));
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "verify_user_failed" }));
      });
  };

  const changeReject = () => {
    const newUserData = { ...userData };
    newUserData.isVerified = 3;
    setUserData(newUserData);
  };

  // const onClickRejectInfoUser = (e) => {
  //   e.preventDefault();
  //   const params = {
  //     id: userData.appUserId,
  //   };
  //   UserService.rejectInfoUser(params)
  //     .then(() => {
  //       const newUserData = { ...userData };
  //       newUserData.isVerified = 3;
  //       setUserData(newUserData);
  //       toast.success(intl.formatMessage({ id: "reject_verify_user_success" }));
  //     })
  //     .catch(() => {
  //       toast.error(intl.formatMessage({ id: "reject_verify_user_failed" }));
  //     });
  // };
  

  const isChecked = (id) => {
    return userData.isVerified === id;
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const balanceFAC = () => {
    const [balances] = new Array(userData.wallets);
    const balanceAmountFAC = balances.find(
      (item) => item.walletType === "FACWallet"
    );
    return (
      <div>
        {balanceAmountFAC ? balanceAmountFAC.balance : ""}{" "}
        {intl.formatMessage({ id: "FAC" })}
      </div>
    );
  };
  const balanceUSDT = () => {
    const [balances] = new Array(userData.wallets);
    const balanceAmountUSDT = balances.find(
      (item) => item.walletType === "USDTWallet"
    );
    return (
      <div>
        {balanceAmountUSDT ? balanceAmountUSDT.balance : ""}{" "}
        {intl.formatMessage({ id: "USDT" })}
      </div>
    );
  };
  const balancePoint = () => {
    const [balances] = new Array(userData.wallets);
    const balanceAmountPoint = balances.find(
      (item) => item.walletType === "PointWallet"
    );
    return (
      <div>
        {balanceAmountPoint ? balanceAmountPoint.balance : ""}{" "}
        {intl.formatMessage({ id: "FAC" })}
      </div>
    );
  };
  const balanceBTC = () => {
    const [balances] = new Array(userData.wallets);
    const balanceAmountBTC = balances.find(
      (item) => item.walletType === "BTCWallet"
    );
    return (
      <div>
        {balanceAmountBTC ? balanceAmountBTC.balance : ""}{" "}
        {intl.formatMessage({ id: "BTC" })}
      </div>
    );
  };

  return (
    <Fragment>
      <div onClick={onClickGoBack} className="cursor-pointer mb-2">
        <ChevronLeft />
        {intl.formatMessage({ id: "Go-back" })}
      </div>
      <Card className="p-lg-1">
        <h3 className="my-2 ml-1">{intl.formatMessage({ id: "info-user" })}</h3>
        <Row className="p-1">
          <Col sm="7" md="8" lg="9">
            <Media className="my-1 mb-2 mx-0">
              <img
                alt="Avatar"
                className="img-thumbnail"
                effect="blur"
                src={userData.userAvatar || PlaceholderPerson}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = PlaceholderPerson;
                }}
                width="100"
                height="120"
              />
              <Media className="ml-2 mt-2" body>
                <h4>{userData.firstName}</h4>
              </Media>
            </Media>
          </Col>
        </Row>
        <Col sm="12">
          <Form className="mt-2" onSubmit={handleSubmit(onClickSave)}>
            <Row>
              <Col sm="6" lg="4">
                <FormGroup>
                  <Label for="username">
                    {intl.formatMessage({ id: "username" })}
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    innerRef={register({ required: true })}
                    placeholder={intl.formatMessage({ id: "username" })}
                    value={userData.username || ""}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      handleOnchange(name, value);
                    }}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col sm="6" lg="4">
                <FormGroup>
                  <Label for="firstName">
                    {intl.formatMessage({ id: "firstName" })}
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    innerRef={register({ required: true })}
                    invalid={errors.firstName && true}
                    placeholder={intl.formatMessage({ id: "firstName" })}
                  />
                  {errors && errors.firstName && (
                    <FormFeedback>{errors.firstName.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" lg="4">
                <FormGroup>
                  <Label for="lastName">
                    {intl.formatMessage({ id: "lastName" })}
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    innerRef={register({ required: true })}
                    invalid={errors.lastName && true}
                    placeholder={intl.formatMessage({ id: "lastName" })}
                  />
                  {errors && errors.lastName && (
                    <FormFeedback>{errors.lastName.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" lg="4">
                <FormGroup>
                  <Label for="email">
                    {intl.formatMessage({ id: "email" })}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    innerRef={register({ required: true })}
                    invalid={errors.email && false}
                    placeholder={intl.formatMessage({ id: "Email@mail.com" })}
                  />
                  {errors && errors.email && (
                    <FormFeedback>{errors.email.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" lg="4">
                <FormGroup>
                  <Label for="phoneNumber">
                    {intl.formatMessage({ id: "phoneNumber" })}
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    innerRef={register({ required: true })}
                    placeholder={intl.formatMessage({ id: "phoneNumber" })}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col sm="6" lg="4">
                <FormGroup>
                  <Label for="birthDay">
                    {intl.formatMessage({ id: "birthDay" })}
                  </Label>
                  <Flatpickr
                value={picker}
                onChange={(date) => {
                  setPicker(
                    moment(date[0]).startOf("day").format()
                  );
                }}
                placeholder="birthDay"
                className="form-control invoice-edit-input date-startDate mr-2"
              />
                </FormGroup>
              </Col>
              {/* <Col sm="6" lg="4">
                <FormGroup>
                  <Label for="companyName">
                    {intl.formatMessage({ id: "title_member" })}
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    invalid={errors.companyName && true}
                    innerRef={register({ required: true })}
                    placeholder={intl.formatMessage({ id: "title_member" })}
                  />
                  {errors && errors.companyName && (
                    <FormFeedback>{errors.companyName.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col> */}
              {/* <Col sm="6" lg="4">
                <FormGroup>
                  <Label for="diachiviUSDT">
                    {intl.formatMessage({ id: "diachiviUSDT" })}
                  </Label>
                  <Input
                    id="diachiviUSDT"
                    name="diachiviUSDT"
                    // invalid={errors.diachiviUSDT && true}
                    // innerRef={register({ required: true })}
                    placeholder={intl.formatMessage({ id: "diachiviUSDT" })}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      handleOnchange(name, value);
                    }}
                    value={userData.diachiviUSDT || ""}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" lg="4">
                <FormGroup>
                  <Label for="diachiviBTC">
                    {intl.formatMessage({ id: "diachiviBTC" })}
                  </Label>
                  <Input
                    id="diachiviBTC"
                    name="diachiviBTC"
                    // invalid={errors.diachiviBTC && true}
                    // innerRef={register({ required: true })}
                    placeholder={intl.formatMessage({ id: "diachiviBTC" })}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      handleOnchange(name, value);
                    }}
                    value={userData.diachiviBTC || ""}
                  />
                </FormGroup>
              </Col> */}
              <Row className="mx-0 my-1 mt-3 container">
                <Button
                  className="mb-1 mr-1 btn-sm-block"
                  type="submit"
                  color="primary"
                >
                  <span>{intl.formatMessage({ id: "update" })}</span>
                </Button>
                <Button
                  className="mb-1 mr-1 btn-sm-block"
                  type="button"
                  outline
                  color="primary"
                  onClick={(e) => {
                    onClickLockUser(e);
                  }}
                >
                  {userData.active === 1 ? (
                    <Unlock size={15} />
                  ) : (
                    <Lock size={15} />
                  )}
                  <span className="ml-1">
                    {intl.formatMessage({
                      id: userData.active === 1 ? "lock" : "unlock",
                    })}
                  </span>
                </Button>
                <Button
                  className="mb-1 btn-sm-block"
                  type="button"
                  outline
                  color="danger"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <RotateCcw size={15} />
                  <span className="ml-1">
                    {intl.formatMessage({
                      id: "reset_password",
                    })}
                  </span>
                </Button>
              </Row>
            </Row>
          </Form>
        </Col>
      </Card>
      <Card className="p-lg-1">
        <h3 className="my-2 ml-1">
          {intl.formatMessage({ id: "balance_account" })}
        </h3>
        <Row className="p-1">
          <div className="mx-2 d-flex col col-md-6 col-lg-4 justify-content-between">
            <CardText className="mr-3">
              {intl.formatMessage({ id: "balance" })}{" "}
              {intl.formatMessage({ id: "USDT" })} :
            </CardText>
            <CardText>{balanceUSDT()}</CardText>
          </div>
        </Row>
        <Row className="p-1">
          <div className="mx-2 d-flex col col-md-6 col-lg-4 justify-content-between">
            <CardText className="mr-3">
              {intl.formatMessage({ id: "balance" })}{" "}
              {intl.formatMessage({ id: "point" })} :
            </CardText>
            <CardText>{balancePoint()}</CardText>
          </div>
        </Row>
        <Row className="p-1">
          <div className="mx-2 d-flex col col-md-6 col-lg-4 justify-content-between">
            <CardText className="mr-3">
              {intl.formatMessage({ id: "balance" })}{" "}
              {intl.formatMessage({ id: "FAC" })} :
            </CardText>
            <CardText>{balanceFAC()}</CardText>
          </div>
        </Row>
        <Row className="p-1">
          <div className="mx-2 d-flex col col-md-6 col-lg-4 justify-content-between">
            <CardText className="mr-3">
              {intl.formatMessage({ id: "balance" })}{" "}
              {intl.formatMessage({ id: "BTC" })} :
            </CardText>
            <CardText>{balanceBTC()}</CardText>
          </div>
        </Row>
      </Card>
      <Card className="p-lg-1">
        <h3 className="my-2 ml-1">
          {intl.formatMessage({ id: "verify_info" })}
        </h3>
        <Col sm="12" className="mb-2">
          <Row>
            <CardText className="m-1">
              {intl.formatMessage({ id: "userId" })} :
            </CardText>
            <CardText className="m-1 font-weight-bold">{userData.identityNumber}</CardText>
          </Row>
          <Row>
            <Col sm="12" md="6" lg="6">
              <CardText className="m-1">
                {intl.formatMessage({ id: "front_side" })}
              </CardText>
              <Media className="mx-1 my-1">
                <img
                  alt="Identity"
                  className="img-thumbnail"
                  src={userData.imageBeforeIdentityCard || PlaceholderImage}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = PlaceholderImage;
                  }}
                  width="300"
                  height="170"
                />
              </Media>
            </Col>
            <Col sm="12" md="6" lg="6">
              <CardText className="m-1">
                {intl.formatMessage({ id: "back_side" })}
              </CardText>
              <Media className="mx-1 my-1">
                <img
                  alt="Identity"
                  className="img-thumbnail"
                  src={userData.imageAfterIdentityCard || PlaceholderImage}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = PlaceholderImage;
                  }}
                  width="300"
                  height="170"
                />
              </Media>
            </Col>
          </Row>

          <Label for="isVerified" className="mt-2 mb-1">
            {intl.formatMessage({ id: "verify-user" })}:
          </Label>
          <div className="form-check">
            <Input
              checked={isChecked(0)}
              className="form-check-input"
              type="radio"
              name="unverified"
              id="unverified"
              value={userData.isVerified || ""}
              disabled
              onChange={(e) => {
                const { name, value } = e.target;
                handleOnchange(name, value);
              }}
            />
            <Label className="form-check-label" for="unverified">
              {intl.formatMessage({ id: "unverified" })}
            </Label>
          </div>
          <div className="form-check">
            <Input
              checked={isChecked(2)}
              className="form-check-input"
              type="radio"
              name="loading"
              id="loading"
              value={userData.isVerified || ""}
              onChange={(e) => {
                const { name, value } = e.target;
                handleOnchange(name, value);
              }}
              disabled
              onClick={onClickVerifyInfoUser}
            />
            <Label className="form-check-label" for="loading">
              {intl.formatMessage({ id: "loading" })}
            </Label>
          </div>
          <div className="form-check">
            <Input
              checked={isChecked(1)}
              className="form-check-input"
              type="radio"
              name="verified"
              id="verified"
              value={userData.isVerified || ""}
              onChange={(e) => {
                const { name, value } = e.target;
                handleOnchange(name, value);
              }}
              onClick={onClickVerifyInfoUser}
            />
            <Label className="form-check-label" for="verified">
              {intl.formatMessage({ id: "verified" })}
            </Label>
          </div>
          <div className="form-check">
            <Input
              checked={isChecked(3)}
              className="form-check-input"
              type="radio"
              name="reject"
              id="reject"
              value={userData.isVerified || ""}
              // onChange={(e) => {
              //   const { name, value } = e.target;
              //   handleOnchange(name, value);
              // }}
              onClick={(e) => openNote(e)}
            />
            <Label className="form-check-label" for="reject">
              {intl.formatMessage({ id: "reject" })}
            </Label>
          </div>
        </Col>
      </Card>

      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
        className={`modal-dialog-centered `}
      >
        <ModalHeader toggle={() => setModal(false)}>
          {intl.formatMessage({ id: "reset_password_user" })}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="password">
              {intl.formatMessage({ id: "reset_password" })}
            </Label>
            <Input
              id="password"
              name="password"
              innerRef={register({ required: true })}
              // invalid={errors.password && true}
              placeholder="123456789"
              value={password}
              onChange={passwordChangeHandler}
            />
          </FormGroup>
          <FormGroup className="d-flex mb-0">
            <Button.Ripple
              className="mr-1"
              color="primary"
              type="submit"
              onClick={(e) => {
                handleUpdatePassword(e);
              }}
            >
              Submit
            </Button.Ripple>
          </FormGroup>
        </ModalBody>
      </Modal>
      {rejectNote && (
        <NoteUser
          open={rejectNote}
          toggleSidebar={openNote}
          item={userData}
          changeReject={changeReject}
        />
      )}
    </Fragment>
  );
};

export default injectIntl(EditUser);
