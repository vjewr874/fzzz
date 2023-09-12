/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Page from '../../components/Page/Page';
import './styles/group.scss';
//icon
import { currencyFormatUSD } from 'ultils/CurrencyFormat';
import Statistical from '../../services/statistical';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { convertDate } from 'ultils/convertDate';
import icCalendar from '../../assets/stock-icons/ic-calendar-green.svg';

const Group = () => {
  const { formatMessage: f } = useIntl();
  const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userStore = useSelector(state => state?.member);
  const today = new Date();
  // useEffect(() => {
  //   if (userStore?.appUserMembershipId > 3) {
  //     setIsLoading(true)
  //     Statistical.userSummaryReferUser().then((result) => {
  //       const {isSuccess, data} = result
  //       if (isSuccess) {
  //         setGroup(data)
  //       }
  //       setIsLoading(false)
  //     })
  //   } else {
  //     window.location.href = '/'
  //   }
  // }, [])

  useEffect(() => {
    setIsLoading(true);
    Statistical.userSummaryReferUser().then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setGroup(data);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <Page isShowSchedule={false} headerTitle={f({ id: 'Group' })}>
      <div id="Group">
        {isLoading ? <Loader /> : null}
        {
          <div className="group-container">
            <div className="group-container-info">
              <div className="group-container-info-line">
                <div className="left" style={{ fontWeight: '700', fontSize: '16px', color: '#FFFFFF' }}>
                  {f({ id: 'Branch' })}
                </div>
                <div
                  className="d-flex right"
                  style={{
                    padding: '0 10px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '14px',
                  }}
                >
                  <img src={icCalendar} />
                  <div style={{ fontWeight: '400', fontSize: '13px', color: '#FFFFFF', marginLeft: '5px' }}>
                    {convertDate(today)}
                  </div>
                </div>
              </div>

              <div
                className="group-container-info-line justify-content-center align-items-baseline"
                style={{
                  marginTop: '12px',
                  marginBottom: '28px',
                }}
              >
                <span>{group?.total}</span> {group?.total < 2 ? f({ id: 'person' }) : f({ id: 'people' })}
              </div>
              <div
                className="group-container-info-line"
                style={{
                  paddingBottom: '16px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="left">{f({ id: 'TotalTransaction' })}</div>
                {/* <div className="right">{group?.totalBuy || 0}</div> */}
                <div className="right">{currencyFormatUSD(group?.totalBuy || 0)}</div>
              </div>
              <div
                className="group-container-info-line"
                style={{
                  marginTop: '16px',
                }}
              >
                <div className="left">{f({ id: 'TotalCommision' })}</div>
                <div className="right">{currencyFormatUSD(group?.totalBonus || 0)}</div>
                {/* <div className="right">{group?.totalBonus || 0}</div> */}
              </div>
            </div>
          </div>
        }

        <div className="introduction">
          <div className="introduction-container">
            <table style={{ width: '100%' }}>
              <thead>
                <tr className="introduction-container-tr">
                  <th>{f({ id: 'Account' })}</th>
                  <th>{f({ id: 'Deposit' })}</th>
                  <th>{f({ id: 'Withdraw' })}</th>
                  <th>{f({ id: 'Buy' })}</th>
                  <th>{f({ id: 'Commission' })}</th>
                </tr>
              </thead>
              <tbody>
                {group?.data?.map((value, index) => {
                  return (
                    <tr key={index} className="introduction-container-tr1">
                      {/* <td>{(value.username).slice(0,10) + "..."}</td> */}
                      <td>{value.username}</td>
                      <td>{currencyFormatUSD(value.totalDeposit || 0)}</td>
                      <td>{currencyFormatUSD(value.totalWithdraw || 0)}</td>
                      <td>{currencyFormatUSD(value.totalBuy || 0)}</td>
                      <td>{currencyFormatUSD(value.totalBonus || 0)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Page>
  );
};
export default Group;
