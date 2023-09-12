import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import Service from "../../services/request";
import { toast } from "react-toastify";
import "./styles/dashboard.scss";
import Chart from "react-apexcharts";
import ic_pay from "../../assets/images/new_icon/Group 10.png";
import { currencyFormatUSD } from "../../ultils/currentFormacy";
import "flatpickr/dist/themes/material_blue.css";

const donutColors = {
  series1: "#7AD682",
};
const options = {
  colors: [donutColors.series1],
  chart: {
    height: 280,
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      hollow: {
        // margin: 15,
        size: "30%",
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: "12px",
          show: true,
          offsetY: 5,
          color: "#fff",
        },
      },
    },
  },
  stroke: {
    lineCap: "round",
  },
};
const DashBoard = (props) => {
  const [infoGeneralReport, setInfoGeneralReport] = useState([]);
  const [allUser, setAllUer] = useState(1);

  useEffect(() => {
    getInfoGeneralReport();
  }, []);
  const getInfoGeneralReport = () => {
    Service.send({
      method: "POST",
      path: "/Statistical/generalReport",
      data: {},
      headers: {},
    }).then((res) => {
      if (res) {
        const { statusCode, data, message } = res;
        if (statusCode === 200) {
          setInfoGeneralReport(data);
          setAllUer(data.totalUsers);
        } else {
          toast.warn(message || "Đã có lỗi xảy ra!");
        }
      } else {
        setInfoGeneralReport([]);
      }
    });
  };
  function calculate(neww, old) {
    const value = parseFloat((neww / old) * 100).toFixed(0);
    return [+value || 0];
  }

  return (
    <Fragment>
      <div id={"dashboard"}>
        <div className="dashboard">
          <div className={"dashboard-header"}>
            <h1
              style={{
                marginBottom: "30px",
              }}
            >
              Chào mừng
            </h1>
            <Row>
              <Col lg={3} sm={6}>
                <Card className={"custom-card d-flex flex-row change"}>
                  <div
                    className={"dashboard-header-graph"}
                    style={{
                      maxWidth: "60px",
                      marginRight: "10px",
                      marginLeft: "-5px",
                    }}
                  >
                    <Chart
                      options={options}
                      series={calculate(
                        infoGeneralReport?.totalNewUsers,
                        allUser
                      )}
                      type="radialBar"
                      height={103}
                    />
                  </div>
                  <div
                    className={"dashboard-header-content"}
                    style={{ marginTop: "-18px" }}
                  >
                    <p>Số lượng người dùng</p>
                    <span className={"money"}>
                      {infoGeneralReport.totalUsers}
                    </span>
                  </div>
                </Card>
              </Col>
              <Col lg={3} sm={6}>
                <Card>
                  <div className={"custom-card"}>
                    <div
                      className={"dashboard-header-icon"}
                      style={{ backgroundImage: `url("${ic_pay}")` }}
                    />
                    <div className={"dashboard-header-content"}>
                      <p className={"title"}>Tổng tiền nạp</p>
                      <span className={"money"}>
                        {currencyFormatUSD(
                          infoGeneralReport?.totalUserPaymentDepositAmount || 0
                        )}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col lg={3} sm={6}>
                <Card>
                  <div className={"custom-card"}>
                    <div
                      className={"dashboard-header-icon"}
                      style={{ backgroundImage: `url("${ic_pay}")` }}
                    />
                    <div className={"dashboard-header-content"}>
                      <p className={"title"}>Tổng tiền rút</p>
                      <span className={"money"}>
                        {currencyFormatUSD(
                          infoGeneralReport?.totalUserPaymentWithdrawAmount || 0
                        )}{" "}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col lg={3} sm={6}>
                <Card>
                  <div className={"custom-card"}>
                    <div
                      className={"dashboard-header-icon"}
                      style={{ backgroundImage: `url("${ic_pay}")` }}
                    />
                    <div className={"dashboard-header-content"}>
                      <p className={"title"}>Tổng chơi</p>
                      <span className={"money"}>
                        {currencyFormatUSD(
                          infoGeneralReport?.totalBetRecordAmountIn || 0
                        )}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col lg={3} sm={6}>
                <Card>
                  <div className={"custom-card"}>
                    <div
                      className={"dashboard-header-icon"}
                      style={{ backgroundImage: `url("${ic_pay}")` }}
                    />
                    <div className={"dashboard-header-content"}>
                      <p className={"title"}>Tổng thắng</p>
                      <span className={"money"}>
                        {currencyFormatUSD(
                          infoGeneralReport?.totalBetRecordAmountWin || 0
                        )}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col lg={3} sm={6}>
                <Card>
                  <div className={"custom-card"}>
                    <div
                      className={"dashboard-header-icon"}
                      style={{ backgroundImage: `url("${ic_pay}")` }}
                    />
                    <div className={"dashboard-header-content"}>
                      <p className={"title"}>Tổng thua</p>
                      <span className={"money"}>
                        {currencyFormatUSD(
                          infoGeneralReport?.totalBetRecordAmountLose || 0
                        )}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default DashBoard;
