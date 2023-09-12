import React, { useState, useEffect } from "react";
import {
  Button,
  FormGroup,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
} from "reactstrap";
import { injectIntl } from "react-intl";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import PaymentPackageService from "../../../services/payPackageService";

const Reward = ({ intl, open, toggleSidebar, item, onReloadData }) => {
  const [rewardData, setRewardData] = useState(item || {});
  const [rewardBTC, setRewardBTC] = useState("0.000001");

  const { register, handleSubmit } = useForm({
    defaultValues:{}
  });

  const rewardBTCValue = (e) => {
    setRewardBTC(e.target.value);
  };

  useEffect(() => {
    if (item && Object.keys(item).length > 0) {
      setRewardData(item);
    }
  }, [item]);

  const onClickSave = () => {
    const params = {
      paymentServicePackageUserId: rewardData.paymentServicePackageUserId,
      profitBonus: parseFloat(rewardBTC),
    };
    PaymentPackageService.rewardProfit(params)
      .then(() => {
        toast.success(intl.formatMessage({ id: "add_reward_success" }));
        toggleSidebar();
        onReloadData()
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "add_reward_failed" }));
      });
  };

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className={`modal-dialog-centered `}
    >
      <ModalHeader toggle={toggleSidebar}>
        {intl.formatMessage({ id: "reward_BTC_machine" })}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onClickSave)}>
          <FormGroup>
            <Label for="paymentAmount">
              {intl.formatMessage({ id: "payment_amount" })}
            </Label>
            <div className="d-flex align-items-baseline">
              <Input
                id="paymentAmount"
                type="number"
                name="paymentAmount"
                pattern="[0-9]+([,\.][0-9]+)?"
                innerRef={register({ required: true })}
                placeholder={intl.formatMessage({ id: "input_amount" })}
                value={rewardBTC}
                onChange={(e) => rewardBTCValue(e)}
              />
              <Label for="paymentAmount" className="ml-2">
                {intl.formatMessage({ id: "BTC" })}
              </Label>
            </div>
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

export default injectIntl(Reward);
