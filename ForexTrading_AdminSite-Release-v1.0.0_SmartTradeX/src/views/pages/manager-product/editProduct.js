import React, { useState, memo, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  FormGroup,
  Button,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { injectIntl } from "react-intl";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import PaymentPackageService from "../../../services/payPackageService";
import { selectThemeColors } from "../../../utility/Utils";
import Select from "react-select";
import "./style.scss";

const EditProduct = ({ intl, open, toggleSidebar, onReloadData, item }) => {
  const typeOption = [
    { value: "A1000FAC", label: intl.formatMessage({ id: "A1000_machine" }) },
    { value: "A100FAC", label: intl.formatMessage({ id: "A100_machine" }) },
    { value: "A500FAC", label: intl.formatMessage({ id: "A500_machine" }) },
  ];

  const selectStatus = () => {
    const typeStatus = typeOption.find(
      (item) => item.value === productData.packageType
    );
    return <div>{typeStatus ? typeStatus.label : "N/A"}</div>;
  };

  const [productData, setProductData] = useState(item || {});
  const [typePackage, setTypePackage] = useState({
    value: productData.packageType,
    label: selectStatus(),
  });

  const { register, errors, handleSubmit } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (item && Object.keys(item).length > 0) {
      setProductData(item);
    }
  }, [item]);

  const addProduct = (data) => {
    const typeValuePackage = typePackage.value;
    if (typeValuePackage === "" || null) {
      toast.warn(intl.formatMessage({ id: "please_choice_one_type" }));
      return;
    }
    let params = {
      id: productData.paymentServicePackageId,
      data: {
        packageName: data.packageName,
        packageType: typeValuePackage,
        packagePrice: data.packagePrice,
        packagePerformance: data.packagePerformance,
        packageDuration: data.packageDuration,
      },
    };
    PaymentPackageService.updateById(params)
      .then((result) => {
        toast.success(intl.formatMessage({ id: "edit_product_success" }));
        onReloadData();
        toggleSidebar();
      })
      .catch((error) => {
        toast.error(intl.formatMessage({ id: "an_error_occurred" }));
      });
  };

  const handleOnchange = (name, value) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className={`modal-dialog modal-lg `}
    >
      <ModalHeader toggle={toggleSidebar}>{intl.formatMessage({ id: "edit_product" })}</ModalHeader>
      <ModalBody>
        <div className="my-1">
          <Row>
            <Col sm="12" md="12" lg="12">
              <Form onSubmit={handleSubmit(addProduct)}>
                <Row>
                  <Col md="12">
                    <FormGroup className="mb-2">
                      <Label for="packageName">
                        {intl.formatMessage({ id: "name_machine" })}
                      </Label>
                      <Input
                        id="packageName"
                        name="packageName"
                        innerRef={register({ required: true })}
                        invalid={errors.packageName && true}
                        value={productData.packageName || ""}
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
                      <Label for="packageType">
                        {intl.formatMessage({ id: "package_type" })}
                      </Label>
                      <Select
                        theme={selectThemeColors}
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        options={typeOption}
                        value={typePackage}
                        onChange={(data) => {
                          setTypePackage(data);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md="12">
                    <FormGroup className="mb-2">
                      <Label for="packageType">
                        {intl.formatMessage({ id: "package_type" })}
                      </Label>
                      <Input
                        id="packageType"
                        name="packageType"
                        innerRef={register({ required: true })}
                        invalid={errors.packageType && true}
                        value={productData.packageType}
                        placeholder={intl.formatMessage({
                          id: "please-enter",
                        })}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          handleOnchange(name, value);
                        }}
                      />
                      {errors && errors.packageType && (
                        <FormFeedback>
                          {errors.packageType.message}
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </Col> */}
                  <Col sm="12">
                    <FormGroup className="mb-2">
                      <Label for="packagePrice">
                        {intl.formatMessage({ id: "price_machine" })}
                      </Label>
                      <Input
                        id="packagePrice"
                        name="packagePrice"
                        innerRef={register({ required: true })}
                        invalid={errors.packagePrice && true}
                        value={productData.packagePrice}
                        placeholder={intl.formatMessage({
                          id: "please-enter",
                        })}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          handleOnchange(name, value);
                        }}
                      />
                      {errors && errors.packagePrice && (
                        <FormFeedback>
                          {errors.packagePrice.message}
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup className="mb-2">
                      <Label for="packagePerformance">
                        {intl.formatMessage({ id: "performance_machine" })}
                      </Label>
                      <Input
                        id="packagePerformance"
                        name="packagePerformance"
                        innerRef={register({ required: true })}
                        invalid={errors.packagePerformance && true}
                        placeholder={intl.formatMessage({
                          id: "please-enter",
                        })}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          handleOnchange(name, value);
                        }}
                        value={productData.packagePerformance}
                      />
                      {errors && errors.packagePerformance && (
                        <FormFeedback>
                          {errors.packagePerformance.message}
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup className="mb-2">
                      <Label for="packageDuration">
                        {intl.formatMessage({ id: "duration_machine" })}
                      </Label>
                      <Input
                        id="packageDuration"
                        name="packageDuration"
                        innerRef={register({ required: true })}
                        invalid={errors.packageDuration && true}
                        placeholder={intl.formatMessage({
                          id: "please-enter",
                        })}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          handleOnchange(name, value);
                        }}
                        value={productData.packageDuration}
                      />
                      {errors && errors.packageDuration && (
                        <FormFeedback>
                          {errors.packageDuration.message}
                        </FormFeedback>
                      )}
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

export default injectIntl(memo(EditProduct));
