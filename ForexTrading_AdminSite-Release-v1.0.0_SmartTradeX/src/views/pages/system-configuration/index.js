import React, { Fragment } from "react";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { injectIntl } from "react-intl";
import SystemConfigurationService from "../../../services/systemService";
import { toast } from "react-toastify";
import SystemInformation from "./systemInformation";
import { Circle, HardDrive, Settings } from "react-feather";
import ChangeBanner from "./changeBanner";
import ExchangeCoin from "./exchangeCoin";
import Stage from "./stage";


function SystemConfiguration({ intl }) {
  const DefaultFilter = {};
  const [dataConfig, setDataConfig] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  const getData = () => {
    SystemConfigurationService.find(DefaultFilter)
      .then((result) => {
        const data = result.data.length > 0 ? result.data[0] : {};
       
        setDataConfig(data);
      })
      .catch(() => {
        toast.error(
          intl.formatMessage({ id: "an_error_occurred" }) +
            " " +
            intl.formatMessage({ id: "please_come_back_late" })
        );
      });
  };

  React.useEffect(() => {
    getData();
  }, [activeTab]);

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={activeTab === "1"}
                    onClick={() => toggle("1")}
                  >
                    <Settings size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "system_information" })}
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "2"}
                    onClick={() => toggle("2")}
                  >
                    <Circle size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "exchange_coin" })}
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "3"}
                    onClick={() => toggle("3")}
                  >
                    <HardDrive size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "introduce" })}
                    </span>
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink
                    active={activeTab === "4"}
                    onClick={() => toggle("4")}
                  >
                    <HardDrive size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "stage" })}
                    </span>
                  </NavLink>
                </NavItem> */}
              </Nav>
              <TabContent activeTab={activeTab}>
                {dataConfig && (
                  <TabPane tabId="1">
                    <SystemInformation dataConfig={dataConfig} />
                  </TabPane>
                )}
                {dataConfig && (
                  <TabPane tabId="2">
                    <ExchangeCoin dataConfig={dataConfig} />
                  </TabPane>
                )}
                {dataConfig && (
                  <TabPane tabId="3">
                    <ChangeBanner dataConfig={dataConfig} />
                  </TabPane>
                )}
                {dataConfig && (
                  <TabPane tabId="4">
                    <Stage dataConfig={dataConfig} />
                  </TabPane>
                )}
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default injectIntl(SystemConfiguration);
