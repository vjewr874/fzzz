// @ts-nocheck
import { useContext, useState, useEffect } from "react";
import { kFormatter } from "@utils";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Row, Col, Label, CardBody, Card } from "reactstrap";
import { toast } from "react-toastify";
import { ShoppingBag, Cpu, LifeBuoy } from "react-feather";
import SubscribersGained from "@src/views/ui-elements/cards/statistics/SubscribersGained";
import "./index.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/charts/apex-charts.scss";
import { injectIntl } from "react-intl";
import FactoryReportService from "../../../../services/factoryReportService";

const FactoryReport = ({ intl }) => {
  const DefaultFilter = {};
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const context = useContext(ThemeColors);
  const [items, setItems] = useState({});

  function getData(params) {
    const newParams = {
      ...params,
    };
    FactoryReportService.summaryServicePackageReport(newParams)
      .then((result) => {
        setItems(result);
      })
      .catch(() => {
        toast.warn(intl.formatMessage({ id: "an_error_occurred" }));
      });
  }

  useEffect(() => {
    getData(paramsFilter);
  }, []);

  return (
    <div id="dashboard-analytics" className="p-1">
    
      <Row className="match-height dashboard">
        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalNewPaymentServicePackByDate || 0}
            title={intl.formatMessage({ id: "sum_payment_daily" })}
            icon={<Cpu size={21} />}
            kFormatter={kFormatter}
            warning={context.colors.primary.main}
          />
        </Col>
        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalNewPaymentServicePackByWeek || 0}
            color={"success"}
            title={intl.formatMessage({ id: "sum_payment_week" })}
            icon={<Cpu size={21} />}
            kFormatter={kFormatter}
            warning={context.colors.success.main}
          />
        </Col>

        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalNewPaymentServicePackByMonth || 0}
            color={"warning"}
            title={intl.formatMessage({ id: "sum_payment_month" })}
            warning={context.colors.info.main}
            icon={<Cpu size={21} />}
            kFormatter={kFormatter}
          />
        </Col>
        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalNewPaymentServicePackByYear || 0}
            color={"light"}
            title={intl.formatMessage({ id: "sum_payment_year" })}
            icon={<Cpu size={21} />}
            kFormatter={kFormatter}
            warning={context.colors.dark.main}
          />
        </Col>
      </Row>

      <Row className="match-height dashboard">
        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalPaymentServicePack || 0}
            title={intl.formatMessage({ id: "sum_payment_all" })}
            icon={<ShoppingBag size={21} />}
            kFormatter={kFormatter}
            warning={context.colors.secondary.main}
          />
        </Col>
        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalPaymentServicePack100 || 0}
            color={"success"}
            title={intl.formatMessage({ id: "sum_payment_100" })}
            icon={<ShoppingBag size={21} />}
            kFormatter={kFormatter}
            warning={context.colors.info.main}
          />
        </Col>

        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalPaymentServicePack500 || 0}
            color={"warning"}
            title={intl.formatMessage({ id: "sum_payment_500" })}
            warning={context.colors.warning.main}
            icon={<ShoppingBag size={21} />}
            kFormatter={kFormatter}
          />
        </Col>
        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalPaymentServicePack1000 || 0}
            color={"light"}
            title={intl.formatMessage({ id: "sum_payment_1000" })}
            icon={<ShoppingBag size={21} />}
            kFormatter={kFormatter}
            warning={context.colors.primary.main}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="12" sm="12" className="d-flex">
          <Card>
            <CardBody>
            <span className="mr-2"> 
                <LifeBuoy size="25" className="text-warning"/>
            </span>
              <Label>{intl.formatMessage({ id: "sum_FAC_dig" })} :   </Label>
              <Label className="ml-2">
                {items.totalProfitClaimed + items.totalProfitActual}
              </Label>
              <Label className="ml-1">{intl.formatMessage({ id: "FAC" })}</Label>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default injectIntl(FactoryReport);
