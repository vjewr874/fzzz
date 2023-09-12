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
import BuyPackageHistory from "./buyPackage/index";
import BonusPackageHistory from "./bonusPackage/index";
import CancelPackage from "./cancelPackage";
import CompletePackage from "./completePackage";


function ManagerActivity({ intl }) {
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    setActiveTab(tab);
  };

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
                    <List size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "buy_package" })}
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
                      {intl.formatMessage({ id: "bonus_package" })}
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "3"}
                    onClick={() => toggle("3")}
                  >
                    <List size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "complete_package" })}
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "4"}
                    onClick={() => toggle("4")}
                  >
                    <List size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "cancel_package" })}
                    </span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <BuyPackageHistory active={activeTab === "1"}/>
                </TabPane>
                <TabPane tabId="2">
                  <BonusPackageHistory active={activeTab === "2"}/>
                </TabPane>
                <TabPane tabId="3">
                  <CompletePackage active={activeTab === "3"}/>
                </TabPane>
                <TabPane tabId="4">
                  <CancelPackage active={activeTab === "4"}/>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default injectIntl(ManagerActivity);
