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
import { List } from "react-feather";
import PackageOwnerUser from "./packageOwnerUser";
import FactoryReport from "./factoryReport";


function ReportFactory({ intl }) {
  
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Fragment>
      <Row>
        <Col sm="12">
            <div className="p-1">
              <Nav tabs>
              <NavItem>
                  <NavLink
                    active={activeTab === "1"}
                    onClick={() => toggle("1")}
                  >
                    <List size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "report-factory" })}
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "2"}
                    onClick={() => toggle("2")}
                  >
                    <List size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "package_user" })}
                    </span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                    <FactoryReport active={activeTab === "2"}/>
                  </TabPane>
                  <TabPane tabId="2">
                    <PackageOwnerUser active={activeTab === "1"}/>
                  </TabPane>
              </TabContent>
            </div>
        </Col>
      </Row>
    </Fragment>
  );
}

export default injectIntl(ReportFactory);
