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
  Col,
} from "reactstrap";
import { injectIntl } from "react-intl";
import BonusDecreaseService from "../../../../services/bonusDecreaseService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { selectThemeColors } from "../../../../utility/Utils";
import Select from "react-select";
import "../style.scss"

const Bonus = ({ intl, open, toggleSidebar, item }) => {
  const [bonusData, setBonusData] = useState(item || {});
  const [bonusType, setBonusType] = useState({
    value: "",
    label: intl.formatMessage({ id: "choice_one_wallet" }),
  });
  const [bonusAmount, setBonusAmount] = useState("");

  const bonusValue = (e) => {
    setBonusAmount(e.target.value);
  };

  const { register, handleSubmit } = useForm({
    defaultValues:{}
  });

  const increaseOption = [
    { value: "FACWallet", label: intl.formatMessage({ id: "bonus_FAC" }) },
    { value: "PointWallet", label: intl.formatMessage({ id: "bonus_point" }) },
    { value: "USDTWallet", label: intl.formatMessage({ id: "bonus_USDT" }) },
  ];

  useEffect(() => {
    if (item && Object.keys(item).length > 0) {
      setBonusData(item);
    }
  }, [item]);

  const onClickSave = () => {
    const bonusPackage = bonusType.value;
    if (bonusPackage === "" || null) {
      toast.warn(intl.formatMessage({ id: "choice_one_wallet" }));
      return;
    }
    const params = {
      appUserId: bonusData.appUserId,
      paymentAmount: parseFloat(bonusAmount),
      walletType: bonusPackage,
    };
    BonusDecreaseService.increaseBalance(params)
      .then(() => {
        toast.success(intl.formatMessage({ id: "add_bonus_success" }));
        toggleSidebar();
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "add_bonus_failed" }));
      });
  };

  const changeUnit = () => {
    switch (bonusType.value) {
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
    switch (bonusType.value) {
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
    const [balances] = new Array(bonusData.wallets);
    const balanceAmountFAC = balances.find(
      (item) => item.walletType === "FACWallet"
    );
    const balanceAmountUSDT = balances.find(
      (item) => item.walletType === "USDTWallet"
    );
    const balanceAmountPoint = balances.find(
      (item) => item.walletType === "PointWallet"
    );
    switch (bonusType.value) {
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
        {intl.formatMessage({ id: "bonus_user" })} {bonusData.firstName}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onClickSave)}>
        {bonusType.value && (
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
            <Label for="bonusAmount">
              {intl.formatMessage({ id: "payment_amount" })}
            </Label>
            <div className="d-flex align-items-baseline">
            <Col sm="7" lg="9" className="mx-0">
            <Input
              id="bonusAmount"
              type="number"
              pattern="[0-9]+([,\.][0-9]+)?"
              name="bonusAmount"
              innerRef={register({ required: true })}
              placeholder={intl.formatMessage({ id: "input_amount" })}
              value={bonusAmount}
              onChange={(e) => bonusValue(e)}
            />
            </Col>
            <Col sm="5" lg="3">
            <Label for="bonusAmount" className="ml-2">
                {changeUnit()}
              </Label>
              </Col>
            </div>
          </FormGroup>
          {/* <FormGroup className="mb-2">
            <Label for="increaseType">
              {intl.formatMessage({ id: "increase_type" })}
            </Label>
            <Col>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={increaseOption}
              value={bonusType}
              onChange={(data) => {
                setBonusType(data);
              }}
            />
            </Col>
          </FormGroup> */}
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

export default injectIntl(Bonus);
