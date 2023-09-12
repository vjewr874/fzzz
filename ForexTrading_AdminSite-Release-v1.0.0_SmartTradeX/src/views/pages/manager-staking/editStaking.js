import React, { useState, memo, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { injectIntl } from "react-intl";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "./style.scss";
import StakingService from "../../../services/stakingService";

const EditStaking = ({ intl, open, toggleSidebar, onReloadData, item }) => {

  const [stakingData, setStakingData] = useState(item || {});

  const { register, errors, handleSubmit } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (item && Object.keys(item).length > 0) {
      setStakingData(item);
    }
  }, [item]);

  const editStaking = (data) => {
    let params = {
      id: stakingData.stakingPackageId,
      data: {
      stakingPackageName: data.stakingPackageName,
      stakingPackageDescription: data.stakingPackageDescription,
      stakingPeriod: data.stakingPeriod,
      stakingInterestRate: data.stakingInterestRate,
      },
    };
    StakingService.updateById(params)
      .then((result) => {
        toast.success(intl.formatMessage({ id: "update_staking_success" }));
        onReloadData();
        toggleSidebar();
      })
      .catch((error) => {
        toast.error(intl.formatMessage({ id: "an_error_occurred" }));
      });
  };

  const handleOnchange = (name, value) => {
    setStakingData({
      ...stakingData,
      [name]: value,
    });
  };

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className={`modal-dialog modal-lg `}
    >
      <ModalHeader toggle={toggleSidebar}>{intl.formatMessage({ id: "edit_staking" })}</ModalHeader>
      <ModalBody>
        <div className="my-1">
          <Row>
            <Col sm="12" md="12" lg="12">
              <Form onSubmit={handleSubmit(editStaking)}>
                <Row>
                  <Col md="12">
                    <FormGroup className="mb-2">
                      <Label for="stakingPackageName">
                        {intl.formatMessage({ id: "stakingPackageName" })}
                      </Label>
                      <Input
                        id="stakingPackageName"
                        name="stakingPackageName"
                        innerRef={register({ required: true })}
                        invalid={errors.stakingPackageName && true}
                        value={stakingData.stakingPackageName || ""}
                        placeholder={intl.formatMessage({
                          id: "please-enter",
                        })}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          handleOnchange(name, value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup className="mb-2">
                      <Label for="stakingPeriod">
                        {intl.formatMessage({ id: "period" })}
                      </Label>
                      <Input
                        id="stakingPeriod"
                        name="stakingPeriod"
                        innerRef={register({ required: true })}
                        invalid={errors.stakingPeriod && true}
                        value={stakingData.stakingPeriod}
                        placeholder={intl.formatMessage({
                          id: "please-enter",
                        })}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          handleOnchange(name, value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup className="mb-2">
                      <Label for="stakingInterestRate">
                        {intl.formatMessage({ id: "stakingInterestRate" })}
                      </Label>
                      <Input
                        id="stakingInterestRate"
                        name="stakingInterestRate"
                        innerRef={register({ required: true })}
                        invalid={errors.stakingInterestRate && true}
                        placeholder={intl.formatMessage({
                          id: "please-enter",
                        })}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          handleOnchange(name, value);
                        }}
                        value={stakingData.stakingInterestRate}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup className="mb-2">
                      <Label for="stakingPackageDescription">
                        {intl.formatMessage({ id: "stakingPackageDescription" })}
                      </Label>
                      <Input
                        rows={5}
                        type="textarea"
                        id="stakingPackageDescription"
                        name="stakingPackageDescription"
                        innerRef={register({ required: true })}
                        invalid={errors.stakingPackageDescription && true}
                        value={stakingData.stakingPackageDescription}
                        placeholder={intl.formatMessage({
                          id: "please-enter",
                        })}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          handleOnchange(name, value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="mt-50">
                    <Button.Ripple
                      type="submit"
                      color="primary"
                      className="mr-1"
                    >
                      {intl.formatMessage({ id: "edit" })}
                    </Button.Ripple>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default injectIntl(memo(EditStaking));
