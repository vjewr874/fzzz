import React, { Fragment, useState } from "react";
import {
  Badge,
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
import { Database, List, Star } from "react-feather";
import DepositTransaction from "./depositTransaction";
import WithdrawTransaction from "./withdrawTransaction";
import ExchangeFAC from "./exchangeFAC";
import ExchangePoint from "./exchangePoint";
import WithdrawBTC from "./withdrawBTC";
import RewardBTC from "./rewardBTC";
import { useEffect } from "react";
import RewardFAC from "./rewardFAC";
import RewardPoint from "./rewardPoint";
import StatisticalService from "../../../services/statisticalService";
import WithdrawBonus from "./withdrawBonus";


function ManagerTransaction({ intl }) {

  const [activeTab, setActiveTab] = React.useState("1");
  const [transactionPending, setTransactionPending] = useState({
    totalDepositRequest: 0, //<< tong so luong yeu cau nap tien NEW 
    totalWithdrawRequest: 0, //<< tong so luong yeu cau rut tien NEW 
    totalPaymentBonusRequest: 0, //<< tong so luong yeu cau tra tien hoa hong NEW 
  })

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  // useEffect(() => {
  //   StatisticalService.getPaymentPending()
  //     .then(res => {
  //       if (res) {
  //         setTransactionPending(res)
  //       }
  //     })
  // }, [])

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
                      {intl.formatMessage({ id: "deposit_history" })}&nbsp;
                      <Badge color="danger">
                        {transactionPending.totalDepositRequest}
                      </Badge>
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "2"}
                    onClick={() => toggle("2")}
                  >
                    <Database size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "withdraw_history" })}&nbsp;
                      <Badge color="danger">
                        {transactionPending.totalPaymentBonusRequest}
                      </Badge>
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "9"}
                    onClick={() => toggle("9")}
                  >
                    <Star size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "withdraw_history_bonus" })}&nbsp;
                      <Badge color="danger">
                        {transactionPending.totalWithdrawRequest}
                      </Badge>
                    </span>
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink
                    active={activeTab === "3"}
                    onClick={() => toggle("3")}
                  >
                    <Trello size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "exchange_history_fac" })}
                    </span>
                  </NavLink>
                </NavItem> */}
                {/* <NavItem>
                  <NavLink
                    active={activeTab === "4"}
                    onClick={() => toggle("4")}
                  >
                    <Sidebar size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "exchange_history_point" })}
                    </span>
                  </NavLink>
                </NavItem> */}
                {/* <NavItem>
                  <NavLink
                    active={activeTab === "5"}
                    onClick={() => toggle("5")}
                  >
                    <Smartphone size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "withdraw_history_btc" })}
                    </span>
                  </NavLink>
                </NavItem> */}
                {/* <NavItem>
                  <NavLink
                    active={activeTab === "6"}
                    onClick={() => toggle("6")}
                  >
                    <Star size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "reward_history_btc" })}
                    </span>
                  </NavLink>
                </NavItem> */}
                {/* <NavItem>
                  <NavLink
                    active={activeTab === "7"}
                    onClick={() => toggle("7")}
                  >
                    <Star size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "reward_history_fac" })}
                    </span>
                  </NavLink>
                </NavItem> */}
                {/* <NavItem>
                  <NavLink
                    active={activeTab === "8"}
                    onClick={() => toggle("8")}
                  >
                    <Star size={14} />
                    <span className="align-middle d-none d-sm-block">
                      {intl.formatMessage({ id: "reward_history_point" })}
                    </span>
                  </NavLink>
                </NavItem> */}
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <DepositTransaction active={activeTab === "1"} />
                </TabPane>
                <TabPane tabId="2">
                  <WithdrawTransaction active={activeTab === "2"} />
                </TabPane>
                <TabPane tabId="9">
                  <WithdrawBonus active={activeTab === "9"} />
                </TabPane>
                {/* <TabPane tabId="3">
                  <ExchangeFAC active={activeTab === "3"} />
                </TabPane>
                <TabPane tabId="4">
                  <ExchangePoint active={activeTab === "4"} />
                </TabPane>
                <TabPane tabId="5">
                  <WithdrawBTC active={activeTab === "5"} />
                </TabPane>
                <TabPane tabId="6">
                  <RewardBTC active={activeTab === "6"} />
                </TabPane>
                <TabPane tabId="7">
                  <RewardFAC active={activeTab === "7"} />
                </TabPane>*/}
                {/* <TabPane tabId="8">
                  <RewardPoint active={activeTab === "8"} />
                </TabPane> */}
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default injectIntl(ManagerTransaction);
