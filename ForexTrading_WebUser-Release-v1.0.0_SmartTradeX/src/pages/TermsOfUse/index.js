/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import Page from '../../components/Page/Page';
import './styles/terms-of-use.scss';
import { Collapse } from 'antd';

import icArrowDown from '../../assets/stock-icons/ic-arrow-down.svg';
import { useIntl } from 'react-intl';
const { Panel } = Collapse;

function TermsOfUse() {
  const { formatMessage: f } = useIntl();
  const dataGuide = [
    // {
    //     header: f({id:"Account Creation Guide"}),
    //     content:
    //         <div>
    //             <p>{f({id:"(1) Enter your account name"})}</p>
    //             <p>{f({id:"(2) Enter the verification code sent to the phone number or email received"})}</p>
    //             <p>{f({id:"(3) Set up your password"})} </p>
    //             <p>{f({id:"(4) Enter referral code"})}</p><br/>
    //         </div>
    // },
    // {
    //     header: 'Hướng dẫn nạp tiền',
    //     content: ''
    // },
    {
      header: f({ id: 'Withdrawal Guide' }),
      content: (
        <div>
          <p>{f({ id: '(1) Enter your full name' })}</p>
          <p>{f({ id: '(2) Fill in the bank account' })}</p>
          <p>{f({ id: '(3) Enter the name of the bank' })}</p>
          <p>{f({ id: '(4) Enter phone number' })}</p>
          <br />
          <p>
            {f({
              id: 'A BMSC account can only sell crypto assets if it is successfully linked with real banking information',
            })}
          </p>
        </div>
      ),
    },
    {
      header: f({ id: 'Trading Guide' }),
      content: (
        <div>
          <div className="d-flex">
            <div style={{ marginRight: '5px' }}>1.</div>
            <p>{f({ id: 'TradingGuide_1' })}</p>
          </div>
          <div className="d-flex">
            <div style={{ marginRight: '5px' }}>2.</div>
            <p>{f({ id: 'TradingGuide_2' })}</p>
          </div>
          <div className="d-flex">
            <div style={{ marginRight: '5px' }}>3.</div>
            <p>{f({ id: 'TradingGuide_3' })}</p>
          </div>
          <div className="d-flex">
            <div style={{ marginRight: '5px' }}>4.</div>
            <p>{f({ id: 'TradingGuide_4' })}</p>
          </div>
          <div className="d-flex">
            <div style={{ marginRight: '5px' }}>5.</div>
            <p>{f({ id: 'TradingGuide_5' })}</p>
          </div>
          <div className="d-flex">
            <div style={{ marginRight: '5px' }}>6.</div>
            <p>{f({ id: 'TradingGuide_6' })}</p>
          </div>
        </div>
      ),
    },
    // {
    //     header: 'Hoa hồng là gì? Cách lấy mã giới thiệu',
    //     content: ''
    // },
    // {
    //     header: 'Giới thiệu bạn bè tạo tài khoản và nhập mã',
    //     content: ''
    // },
    // {
    //     header: 'Hệ thống giới thiệu nhiều cấp và các ưu đãi giới thiệu',
    //     content: ''
    // }
  ];
  return (
    <Page headerTitle={f({ id: 'Guide' })} isHideItemRigth={true}>
      <div id="TermsOfUse">
        <div className="termsOfUse">
          <Collapse
            bordered={false}
            accordion
            expandIcon={({ isActive }) => <img src={icArrowDown} className={isActive ? 'active' : null} />}
            expandIconPosition="end"
          >
            {dataGuide.map((item, index) => {
              return (
                <Panel header={item.header} key={index}>
                  <div>{item.content}</div>
                </Panel>
              );
            })}
          </Collapse>
        </div>
      </div>
    </Page>
  );
}
export default TermsOfUse;
