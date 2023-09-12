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
  Col,
} from "reactstrap";
import { injectIntl } from "react-intl";
import BonusDecreaseService from "../../../../services/bonusDecreaseService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectThemeColors } from "../../../../utility/Utils";
import Select from "react-select";
import "../style.scss";

const Decrease = ({ intl, open, toggleSidebar, item }) => {
  const [decreaseData, setDecreaseData] = useState(item || {});
  const [decreaseType, setDecreaseType] = useState({
    value: "",
    label: intl.formatMessage({ id: "choice_one_wallet" }),
  });
  const [decreaseAmount, setDecreaseAmount] = useState("");

  const decreaseValue = (e) => {
    setDecreaseAmount(e.target.value);
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });

  const decreaseOption = [
    { value: "FACWallet", label: intl.formatMessage({ id: "decrease_FAC" }) },
    {
      value: "PointWallet",
      label: intl.formatMessage({ id: "decrease_point" }),
    },
    { value: "USDTWallet", label: intl.formatMessage({ id: "decrease_USDT" }) },
  ];

  useEffect(() => {
    if (item && Object.keys(item).length > 0) {
      setDecreaseData(item);
    }
  }, [item]);

  const onClickSave = () => {
    const decreasePackage = decreaseType.value;
    if (decreasePackage === "" || null) {
      toast.warn(intl.formatMessage({ id: "choice_one_wallet" }));
      return;
    }
    const [balances] = new Array(decreaseData.wallets);
    const balanceAmountFAC = balances.find(
      (item) => item.walletType === "FACWallet"
    );
    const balanceAmountUSDT = balances.find(
      (item) => item.walletType === "USDTWallet"
    );
    const balanceAmountPoint = balances.find(
      (item) => item.walletType === "PointWallet"
    );
    switch (decreasePackage) {
      case "" || null:
        return toast.warn(intl.formatMessage({ id: "choice_one_wallet" }));
      case "FACWallet":
        if (balanceAmountFAC.balance < parseFloat(decreaseAmount)) {
          return toast.warn(intl.formatMessage({ id: "cannot_decrease" }));
        }
        break;
      case "PointWallet":
        if (balanceAmountUSDT.balance < parseFloat(decreaseAmount)) {
          return toast.warn(intl.formatMessage({ id: "cannot_decrease" }));
        }
        break;
      case "USDTWallet":
        if (balanceAmountPoint.balance < parseFloat(decreaseAmount)) {
          return toast.warn(intl.formatMessage({ id: "cannot_decrease" }));
        }
        break;
      default:
        break;
    }
    const params = {
      appUserId: decreaseData.appUserId,
      paymentAmount: parseFloat(decreaseAmount),
      walletType: decreasePackage,
    };
    BonusDecreaseService.decreaseBalance(params)
      .then(() => {
        toast.success(intl.formatMessage({ id: "decrease_bonus_success" }));
        toggleSidebar();
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "decrease_bonus_failed" }));
      });
  };

  const changeUnit = () => {
    switch (decreaseType.value) {
      case "":
        return intl.formatMessage({ id: "unit" });
      case "FACWallet":
        return intl.formatMessage({ id: "FAC" });
      case "PointWallet":
        return intl.formatMessage({ id: "FAC" });
      case "USDTWallet":
        return intl.formatMessage({ id: "USDT" });
      default:
        break;
    }
  };

  const changeWallet = () => {
    switch (decreaseType.value) {
      case "":
        return intl.formatMessage({ id: "unit" });
      case "FACWallet":
        return intl.formatMessage({ id: "FAC" });
      case "PointWallet":
        return intl.formatMessage({ id: "point" });
      case "USDTWallet":
        return intl.formatMessage({ id: "USDT" });
      default:
        break;
    }
  };

  const changeBalance = () => {
    const [balances] = new Array(decreaseData.wallets);
    const balanceAmountFAC = balances.find(
      (item) => item.walletType === "FACWallet"
    );
    const balanceAmountUSDT = balances.find(
      (item) => item.walletType === "USDTWallet"
    );
    const balanceAmountPoint = balances.find(
      (item) => item.walletType === "PointWallet"
    );
    switch (decreaseType.value) {
      case "":
        return;
      case "FACWallet":
        return <span>{balanceAmountFAC.balance}</span>;
      case "PointWallet":
        return <span>{balanceAmountPoint.balance}</span>;
      case "USDTWallet":
        return <span>{balanceAmountUSDT.balance}</span>;
      default:
        break;
    }
  };

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className={`modal-dialog-centered `}
    >
      <ModalHeader toggle={toggleSidebar}>
        {intl.formatMessage({ id: "decrease_user" })} {decreaseData.firstName}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onClickSave)}>
          {decreaseType.value && (
            <FormGroup>
              <div className="d-flex align-items-baseline">
                <Label>
                  {intl.formatMessage({ id: "balance" })} {changeWallet()} :
                </Label>
                <Label className="ml-1">{changeBalance()}</Label>
                <Label className="ml-2">{changeUnit()}</Label>
              </div>
            </FormGroup>
          )}
          <FormGroup>
            <div className="d-flex align-items-baseline">
              <Col sm="7" lg="9" className="mx-0">
                <Input
                  id="decreaseAmount"
                  type="number"
                  pattern="[0-9]+([,\.][0-9]+)?"
                  name="decreaseAmount"
                  innerRef={register({ required: true })}
                  placeholder={intl.formatMessage({ id: "input_amount" })}
                  value={decreaseAmount}
                  onChange={(e) => decreaseValue(e)}
                />
              </Col>
              <Col sm="5" lg="3">
                <Label for="decreaseAmount" className="ml-2">
                  {changeUnit()}
                </Label>
              </Col>
            </div>
          </FormGroup>
          <FormGroup className="mb-2">
            <Label for="decreaseType">
              {intl.formatMessage({ id: "decrease_type" })}
            </Label>
            <Col>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={decreaseOption}
                value={decreaseType}
                onChange={(data) => {
                  setDecreaseType(data);
                }}
              />
            </Col>
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

export default injectIntl(Decrease);
