import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { injectIntl } from "react-intl";
import { toast } from "react-toastify";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import PaymentPackageService from "../../../../services/payPackageService";

function ChangeComplete({ intl, item, toggleSidebar, open, onReloadData }) {
  const [completeData, setCompleteData] = useState(item || {});

  const { register, errors, handleSubmit } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (item && Object.keys(item).length > 0) {
      setCompleteData(item);
    }
  }, [item]);

  const handleUpdatePassword = (data) => {
    const params = {
      id: completeData.username,
      data: {
        packagePrice: data.packagePrice,
        percentCompleted: data.percentCompleted,
      },
    };
    PaymentPackageService.updateChangeComplete(params)
      .then((result) => {
        toast.success(intl.formatMessage({ id: "actionSuccess" }));
        toggleSidebar();
        onReloadData();
      })
      .catch((err) => {
        toast.error(intl.formatMessage({ id: "actionFailed" }));
      });
  };

  const handleOnchange = (name, value) => {
    setCompleteData({
      ...completeData,
      [name]: value,
    });
  };

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className={`modal-dialog-centered `}
    >
      <ModalHeader toggle={toggleSidebar}>
        {intl.formatMessage({ id: "resetPass" })}
      </ModalHeader>
      <ModalBody>
        <div>
          <Form onSubmit={handleSubmit(handleUpdatePassword)}>
            <FormGroup>
              <Label for="packagePrice">
                {intl.formatMessage({ id: "package_price" })}
              </Label>
              <Input
                id="packagePrice"
                name="packagePrice"
                innerRef={register({ required: true })}
                // invalid={errors.packagePrice && true}
                placeholder="123456789"
                value={completeData.packagePrice}
                onChange={(e) => {
                  const { name, value } = e.target;
                  handleOnchange(name, value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="percentCompleted">
                {intl.formatMessage({ id: "percentCompleted" })}
              </Label>
              <Input
                id="percentCompleted"
                name="percentCompleted"
                innerRef={register({ required: true })}
                // invalid={errors.percentCompleted && true}
                placeholder="123456789"
                value={completeData.percentCompleted}
                onChange={(e) => {
                  const { name, value } = e.target;
                  handleOnchange(name, value);
                }}
              />
            </FormGroup>
            <FormGroup className="d-flex mb-0">
              <Button.Ripple className="mr-1" color="primary" type="submit">
                {intl.formatMessage({ id: "submit" })}
              </Button.Ripple>
            </FormGroup>
          </Form>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default injectIntl(ChangeComplete);
