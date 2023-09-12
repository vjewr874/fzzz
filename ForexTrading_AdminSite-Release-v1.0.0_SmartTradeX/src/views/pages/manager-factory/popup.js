import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  CardText,
  Row,
} from "reactstrap";
import { injectIntl } from "react-intl";
import { toast } from "react-toastify";
import PaymentPackageService from "../../../services/payPackageService";
import { Check, X } from "react-feather";

const Popup = ({ intl, open, toggleSidebar, item, onReloadData }) => {
  const [itemData, setItemData] = useState(item || {});

  useEffect(() => {
    if (item && Object.keys(item).length > 0) {
      setItemData(item);
    }
  }, [item]);

  const onClickSave = () => {
    const params = {
      id: itemData.paymentServicePackageUserId,
    };
    if (itemData.packageActivityStatus === 0) {
      toast.warning(intl.formatMessage({id:"package_completed"}))
      toggleSidebar();
      return;
    }
    PaymentPackageService.completePackageUser(params)
      .then((result) => {
        toast.success(intl.formatMessage({ id: "cancel_success" }));
        toggleSidebar();
        onReloadData();
      })
      .catch((err) => {
        toast.error(intl.formatMessage({ id: "an_error_occurred" }));
      });
  };

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className={`modal-dialog-centered `}
    >
      <ModalHeader toggle={toggleSidebar}>
        {intl.formatMessage({ id: "submit_cancel" })}
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <Row className="mt-2 mb-4 mx-0">
              <CardText>
                {intl.formatMessage({ id: "want_accept_cancel" })}
              </CardText>
            </Row>
            <Row className="my-2 mx-2 justify-content-between">
              <Button.Ripple onClick={e => onClickSave()} color="primary" outline>
                <span>
                  <Check className="mr-2" />
                </span>
                {intl.formatMessage({ id: "yes" })}
              </Button.Ripple>
              <Button.Ripple onClick={e => toggleSidebar()} color="primary" outline>
                <span>
                  <X className="mr-2" />
                </span>
                {intl.formatMessage({ id: "no" })}
              </Button.Ripple>
            </Row>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
};

export default injectIntl(Popup);
