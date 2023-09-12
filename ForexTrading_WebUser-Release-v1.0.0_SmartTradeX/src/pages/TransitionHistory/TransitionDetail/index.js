/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Page from '../../../components/Page/Page';
import React from 'react';
import { injectIntl } from 'react-intl';
import './styles/transition-detail.scss';
import icWin from '../../../assets/new-icons/ic-win-1.svg';
import icSuccess from '../../../assets/new-icons/ic-success.svg';

function TransitionDetails(props) {
  const { intl } = props;
  const data = {
    img: icWin,
    id: '240119373',
    type: 'Trúng thưởng xổ số',
    time: '19:02 - 21/05/2022',
    money: '+9,000,000,000 đ',
    source: 'Hệ thống trả thưởng',
    status: icSuccess,
    detail: [
      {
        name: 'Mã giao dịch',
        value: '2411193753',
      },
      {
        name: 'Thời gian thanh toán',
        value: '19:00-04/07/2022',
      },
      {
        name: 'Nguồn tiền',
        value: 'Hệ thống trả thưởng',
      },
    ],
  };
  return (
    <Page isHideItemRight={true} headerTitle={intl.formatMessage({ id: 'transition_detail' })}>
      <div id="TransitionDetail">
        <div className={'transition-detail'}>
          <div className={'transition-detail-container'}>
            <div className={'transition-detail-row'}>
              <div className={'transition-detail-img'} style={{ backgroundImage: `url(${data.img})` }} />
              <div className={'transition-detail-text'}>
                <div className={'transition-detail-text-type'}>{data.type}</div>
                <div className={'transition-detail-text-money'}>{data.money}</div>
                <div className={'transition-detail-text-image'} style={{ backgroundImage: `url(${data.status})` }} />
              </div>
            </div>
            <div className={'transition-detail-row1'}>
              {data.detail.map(dt => {
                return (
                  <div className={'transition-detail-line'}>
                    <div className={'transition-detail-line-left'}>{dt.name}</div>
                    <div className={'transition-detail-line-right'}>{dt.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={'transition-detail-button'}>Xem lịch sử vé trúng thưởng</div>
        </div>
      </div>
    </Page>
  );
}
export default injectIntl(TransitionDetails);
