// @ts-nocheck
import { useContext, useState, useEffect } from 'react'
import { kFormatter } from '@utils'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Row, Col, Card, CardBody } from 'reactstrap'
import { toast } from 'react-toastify';
import { CreditCard, Users, DollarSign, User, Zap, ShoppingBag } from 'react-feather'
import SubscribersGained from '@src/views/ui-elements/cards/statistics/SubscribersGained'
import Flatpickr from 'react-flatpickr'
import moment from "moment"
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import "./index.scss"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/charts/apex-charts.scss'
import StatisticalService from '../../../services/statisticalService'
import { injectIntl } from "react-intl";


const AnalyticsDashboard = ({ intl }) => {

  const [endDate, setEndPicker] = useState(moment().endOf('month').toDate())
  const [startDate, setStartPicker] = useState(moment().startOf('month').toDate())
  const context = useContext(ThemeColors)
  const [items, setItems] = useState({})

  function getData(params) {
    const newParams = {
      ...params,
    };
    StatisticalService.getStatistical(newParams)
      .then((result) => {
        setItems(result);
      })
      .catch(() => {
        toast.warn(intl.formatMessage({ id: "an_error_occurred" }))
      })

  }

  useEffect(() => {
    if (endDate < startDate) {
      return toast.warn(intl.formatMessage({ id: "range_date_wrong" }))
    }
    getData({ endDate, startDate })
  }, [endDate, startDate])

  // function handleRenderMoney(money){
  //   if(money > 1000000){
  //     return `${ formatToPrice(+(money/1000000).toFixed())} tr`
  //   }else{
  //     return `${ formatToPrice(+(money/1000).toFixed())} k`
  //   }
  // }


  return (
    <div id='dashboard-analytics'>


      <Row className='match-height dashboard'>
        <Col lg='4' sm='12'>
          <Card>
            <CardBody
              // className={"pb-10"}
              className="dashboard__card"
            >
              <Row className='match-height'>


                <Col style={{ marginBottom: "12px" }} md='12' sm='12'>
                  {/* <div className="dashboard__welcom">
                  Xin chào, {userData.firstName || ""} {userData.lastName || ""}
                 </div> */}
                  <div className="dashboard__welcom-sub mb-2">
                    {intl.formatMessage({ id: "analytic_intro" })}
                  </div>
                </Col>
                <Col style={{ marginBottom: "12px" }} md='12' sm='12'>

                  <Flatpickr
                    value={startDate}
                    className='form-control'
                    placeholder="Từ: YY-MM-DD"

                    onChange={date => {

                      setStartPicker(date[0])
                      getData({ startDate: date[0], endDate })
                    }}
                  />
                </Col>
                <Col md='12' sm='12'>

                  <Flatpickr
                    value={endDate}
                    placeholder="Tới: YY-MM-DD"
                    className='form-control'
                    onChange={date => {
                      setEndPicker(date[0])
                      getData({ endDate: date[0], startDate })
                    }}
                  />
                </Col>
              </Row>

            </CardBody>

          </Card>

        </Col>
        <Col lg='8' sm='12'>
          <Card>
            <CardBody
              className={"pb-10"}

            >
              <div className="dashboard__statistical">{intl.formatMessage({ id: "analytic" })}</div>
              <Row>
                <Col xl='3' md='3' sm='6'>
                  <StatsHorizontal icon={<CreditCard size={21} />} color='success' stats={`${items.totalUserPaymentDepositAmount ? parseFloat(Number(items.totalUserPaymentDepositAmount).toFixed(6)).toLocaleString() : 0}`} statTitle={intl.formatMessage({ id: "sum_deposit" })} />
                </Col>
                <Col xl='3' md='3' sm='6'>
                  <StatsHorizontal icon={<CreditCard size={21} />} color='secondary' stats={`${items.totalUserPaymentWithdrawAmount ? parseFloat(Number(items.totalUserPaymentWithdrawAmount).toFixed(6)).toLocaleString() : 0} `} statTitle={intl.formatMessage({ id: "sum_withdraw" })} />
                </Col>
                <Col xl='3' md='3' sm='6'>
                  <StatsHorizontal icon={<DollarSign size={21} />} color='info' stats={`${items.totalUserPaymentServiceAmount ? (items.totalUserPaymentServiceAmount).toLocaleString() : 0} `} statTitle={intl.formatMessage({ id: "reward" })} />
                </Col>
                <Col xl='3' md='3' sm='6'>
                  <StatsHorizontal icon={<DollarSign size={21} />} color='danger' stats={`${items.totalUserPaymentExchangeAmount ? parseFloat(Number(items.totalUserPaymentExchangeAmount).toFixed(6)).toLocaleString() : 0} `} statTitle={intl.formatMessage({ id: "sum_sell" })} />
                </Col>
              </Row>
            </CardBody>
          </Card >
        </Col>
        <Col lg='3' sm='6'>
          <SubscribersGained data={items.totalUsers || 0} title={intl.formatMessage({ id: "sum_user" })} icon={<Users size={21} />} kFormatter={kFormatter} warning={context.colors.primary.main} />
        </Col>
        <Col lg='3' sm='6'>
          <SubscribersGained data={items.totalNewUsers || 0} color={"success"} title={intl.formatMessage({ id: "sum_new_user" })} icon={<User size={21} />} kFormatter={kFormatter} warning={context.colors.success.main} />
        </Col>

        <Col lg='3' sm='6'>
          <SubscribersGained data={items.totalUserServicePackage || 0} color={"warning"} title={intl.formatMessage({ id: "num_ticket_sold" })} warning={context.colors.warning.main} icon={<Zap size={21} />} kFormatter={kFormatter} />
        </Col>
        <Col lg='3' sm='6'>
          <SubscribersGained data={items.totalUserCompletedServicePackage || 0} color={"light"} title={intl.formatMessage({ id: "num_ticket_win" })} icon={<ShoppingBag size={21} />} kFormatter={kFormatter} warning={context.colors.dark.main} />
        </Col>

      </Row>

      {/* <Row className='match-height'>
        <Col xs='12'>
          <div className='invoice-list-dataTable'>
            <InvoiceList item={items.summaryUserPaymentServicePackage || []} />
          </div>
        </Col>
        <Col xs='12'>
          <div className='invoice-list-dataTable'>
            <BetRecord item={items.summaryWalletBalanceUnit || []} />
          </div>
        </Col>
      </Row> */}

    </div>
  )
}

export default injectIntl(AnalyticsDashboard)
