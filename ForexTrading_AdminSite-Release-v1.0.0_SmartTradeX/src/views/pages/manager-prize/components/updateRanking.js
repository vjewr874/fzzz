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
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "../../manager-user/style.scss";
import PrizeService from "../../../../services/prizeService";

const UpdateRanking = ({ intl, open, toggleSidebar, item, onReloadData }) => {
  const [updateRankingData, setUpdateRankingData] = useState(item || {});

  const { handleSubmit } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (item && Object.keys(item).length > 0) {
      setUpdateRankingData(item);
    }
  }, [item]);

  const onClickSave = () => {
    const params = {
      appUserId: updateRankingData.appUserId,
      ranking: updateRankingData.ranking,
      totalScore: updateRankingData.totalScore
    };
    PrizeService.updateRanking(params)
      .then((result) => {
        toast.success(intl.formatMessage({ id: "updateRanking_success" }));
        toggleSidebar();
        onReloadData()
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "updateRanking_failed" }));
      });
  };

  const handleOnchange = (name, value) => {
    setUpdateRankingData({
      ...updateRankingData,
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
        {intl.formatMessage({ id: "updateRanking_user" })}{" "}
        {updateRankingData.firstName}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onClickSave)}>
          <FormGroup>
            <Label for="ranking">{intl.formatMessage({ id: "ranking" })}</Label>
            <Col sm="7" lg="9" className="mx-0">
              <Input
                id="ranking"
                type="number"
                name="ranking"
                value={updateRankingData.ranking || ""}
                onChange={(e) => {
                  const { name, value } = e.target;
                  handleOnchange(name, value);
                }}
                placeholder={intl.formatMessage({ id: "ranking" })}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="totalScore">{intl.formatMessage({ id: "totalScore" })}</Label>
            <Col sm="7" lg="9" className="mx-0">
              <Input
                id="totalScore"
                type="number"
                name="totalScore"
                value={updateRankingData.totalScore || ""}
                onChange={(e) => {
                  const { name, value } = e.target;
                  handleOnchange(name, value);
                }}
                placeholder={intl.formatMessage({ id: "totalScore" })}
              />
            </Col>
          </FormGroup>
          <FormGroup className="d-flex mb-0">
            <Button.Ripple className="mr-1" color="primary" onClick={e => onClickSave()}>
              {intl.formatMessage({ id: "submit" })}
            </Button.Ripple>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default injectIntl(UpdateRanking);
