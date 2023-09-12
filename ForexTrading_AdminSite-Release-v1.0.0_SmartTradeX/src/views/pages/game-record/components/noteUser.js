import React, { useState, useEffect } from "react";
import {
  Button,
  FormGroup,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
} from "reactstrap";
import { injectIntl } from "react-intl";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UserService from "../../../../services/userService";
import "./../style.scss"

const NoteUser = ({ intl, open, toggleSidebar, item, changeReject }) => {
  const [userData, setUserData] = useState(item || {});

  const SignupSchema = yup.object().shape({
    appUserNote: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" })),
  });

  const { register, errors, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });


  useEffect(() => {
    if (item && Object.keys(item).length > 0) {
      setUserData(item);
    }
  }, [item]);


  const onClickRejectInfoUser = (data) => {
    const params = {
      id: userData.appUserId,
      appUserNote: data.appUserNote,
    };
    UserService.rejectInfoUser(params)
      .then(() => {
        toggleSidebar();
        changeReject();
        toast.success(intl.formatMessage({ id: "reject_verify_user_success" }));
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "reject_verify_user_failed" }));
      });
  };

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className={`modal-dialog-centered `}
    >
      <ModalHeader toggle={toggleSidebar}>
        {intl.formatMessage({ id: "reason" })} {intl.formatMessage({ id: "reject" }).toLowerCase()} {intl.formatMessage({ id: "verify-user" }).toLowerCase()}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onClickRejectInfoUser)}>
          <FormGroup>
            <Label for="appUserNote">
              {intl.formatMessage({ id: "reason" })}
            </Label>
            <Input
              id="appUserNote"
              type="textarea"
              rows={10}
              name="appUserNote"
              innerRef={register({ required: true })}
              invalid={errors.paymentAmount && true}
              placeholder={intl.formatMessage({ id: "please-enter" })}
            />
          </FormGroup>
          <FormGroup className="d-flex mb-0">
            <Button.Ripple className="mr-1" color="primary" type="submit">
              {intl.formatMessage({ id: "submit" })}
            </Button.Ripple>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default injectIntl(NoteUser);
