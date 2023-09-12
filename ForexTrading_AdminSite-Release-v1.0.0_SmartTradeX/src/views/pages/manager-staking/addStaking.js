import { memo } from "react";
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

const AddStaking = ({ intl, open, toggleSidebar, onReloadData }) => {
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {},
  });

  const addStaking = (data) => {
    let params = {
      stakingPackageName: data.stakingPackageName,
      stakingPackageDescription: data.stakingPackageDescription,
      stakingPackagePrice: data.stakingPackagePrice,
      stakingPeriod: data.stakingPeriod,
      stakingInterestRate: data.stakingInterestRate,
    };
    StakingService.insertStaking(params)
      .then((result) => {
        toast.success(intl.formatMessage({ id: "insert_staking_success" }));
        onReloadData();
        toggleSidebar();
      })
      .catch((error) => {
        toast.error(intl.formatMessage({ id: "an_error_occurred" }));
      });
  };

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className={`modal-dialog modal-lg `}
    >
      <ModalHeader toggle={toggleSidebar}>
        {intl.formatMessage({ id: "add_staking" })}
      </ModalHeader>
      <ModalBody>
        <div className="my-1">
          <Row>
            <Col sm="12" md="12" lg="12">
              <Form onSubmit={handleSubmit(addStaking)}>
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
                        placeholder={intl.formatMessage({
                          id: "please-enter",
                        })}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup className="mb-2">
                      <Label for="stakingPackagePrice">
                        {intl.formatMessage({ id: "packagePrice" })}
                      </Label>
                      <Input
                        id="stakingPackagePrice"
                        name="stakingPackagePrice"
                        innerRef={register({ required: true })}
                        invalid={errors.stakingPackagePrice && true}
                        placeholder={intl.formatMessage({
                          id: "please-enter",
                        })}
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
                        placeholder={intl.formatMessage({
                          id: "please-enter",
                        })}
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
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup className="mb-2">
                      <Label for="stakingPackageDescription">
                        {intl.formatMessage({
                          id: "stakingPackageDescription",
                        })}
                      </Label>
                      <Input
                        rows={5}
                        type="textarea"
                        id="stakingPackageDescription"
                        name="stakingPackageDescription"
                        innerRef={register({ required: true })}
                        invalid={errors.stakingPackageDescription && true}
                        placeholder={intl.formatMessage({
                          id: "please-enter",
                        })}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="mt-50">
                    <Button.Ripple
                      type="submit"
                      color="primary"
                      className="mr-1"
                    >
                      {intl.formatMessage({ id: "add" })}
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

export default injectIntl(memo(AddStaking));
