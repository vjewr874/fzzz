// @ts-nocheck
import { useContext, useState, useEffect } from "react";
import { kFormatter } from "@utils";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import { Users, User, ShoppingBag, Octagon } from "react-feather";
import SubscribersGained from "@src/views/ui-elements/cards/statistics/SubscribersGained";
import "./index.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/charts/apex-charts.scss";
import StatisticalService from "../../../services/statisticalService";
import { injectIntl } from "react-intl";

const ReportUser = ({ intl }) => {
  const DefaultFilter = {};
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const context = useContext(ThemeColors);
  const [items, setItems] = useState({});

  function getData(params) {
    const newParams = {
      ...params,
    };
    StatisticalService.summaryUserReport(newParams)
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
    <h3 className="my-2 ml-2">{intl.formatMessage({id:"report-user"})}</h3>
      <Row className="match-height dashboard">
        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalNewUsersByDate || 0}
            title={intl.formatMessage({ id: "sum_user_daily" })}
            icon={<Users size={21} />}
            kFormatter={kFormatter}
            warning={context.colors.primary.main}
          />
        </Col>
        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalNewUsersByWeek || 0}
            color={"success"}
            title={intl.formatMessage({ id: "sum_user_week" })}
            icon={<Users size={21} />}
            kFormatter={kFormatter}
            warning={context.colors.success.main}
          />
        </Col>

        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalNewUsersByMonth || 0}
            color={"warning"}
            title={intl.formatMessage({ id: "sum_user_month" })}
            warning={context.colors.warning.main}
            icon={<Users size={21} />}
            kFormatter={kFormatter}
          />
        </Col>
        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalNewUsersByYear || 0}
            color={"light"}
            title={intl.formatMessage({ id: "sum_user_year" })}
            icon={<Users size={21} />}
            kFormatter={kFormatter}
            warning={context.colors.dark.main}
          />
        </Col>
      </Row>

      <Row className="match-height dashboard">
        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalUsers || 0}
            title={intl.formatMessage({ id: "sum_user_all" })}
            icon={<User size={21} />}
            kFormatter={kFormatter}
            warning={context.colors.secondary.main}
          />
        </Col>
        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.countAllUserKYC || 0}
            color={"success"}
            title={intl.formatMessage({ id: "sum_user_kyc" })}
            icon={<User size={21} />}
            kFormatter={kFormatter}
            warning={context.colors.info.main}
          />
        </Col>

        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.totalUserPaymentService || 0}
            color={"warning"}
            title={intl.formatMessage({ id: "sum_user_package" })}
            warning={context.colors.primary.main}
            icon={<ShoppingBag size={21} />}
            kFormatter={kFormatter}
          />
        </Col>
        <Col lg="3" sm="6">
          <SubscribersGained
            data={items.countUserMember || 0}
            color={"light"}
            title={intl.formatMessage({ id: "sum_organization" })}
            icon={<Octagon size={21} />}
            kFormatter={kFormatter}
            warning={context.colors.primary.main}
          />
        </Col>
      </Row>
    </div>
  );
};

export default injectIntl(ReportUser);
