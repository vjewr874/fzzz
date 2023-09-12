/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import ListTableDealer from 'components/Promotion/ListTableDealer/ListTableDealer';
import MenuPromotion from 'components/Promotion/MenuPromotion/MenuPromotion';
import QR from 'components/Promotion/QR/QR';
import React from 'react';
import { injectIntl } from 'react-intl';
import './index.scss';

function Promotion(props) {
  const { history, intl } = props;
  return (
    <div className="promotion pb-4">
      <MenuPromotion history={history} intl={intl} />
      <section className="promotion__content">
        <div className="promotion__content-title px-3 mb-2">{intl.formatMessage({ id: 'guide' })}</div>
        <div className="promotion__content-statistical px-3">
          <div className="item item1">
            <p>{intl.formatMessage({ id: 'point_yesterday' })}</p>
            <p>0</p>
            <p>{intl.formatMessage({ id: 'point_live' })}:0</p>
            <p>{intl.formatMessage({ id: 'point_team' })}:0</p>
          </div>
          <div className="item item2">
            <p>
              {intl.formatMessage({ id: 'level_live' })}:<span>0</span>
            </p>
            <p>
              {intl.formatMessage({ id: 'total_people' })}:<span>0</span>
            </p>
            <p>
              {intl.formatMessage({ id: 'F1_new' })}:<span>0</span>
            </p>
            <p>
              {intl.formatMessage({ id: 'F1_new_today' })}:<span>0</span>
            </p>
            <p>
              {intl.formatMessage({ id: 'point_total_week' })}:<span>0</span>
            </p>
            <p>
              {intl.formatMessage({ id: 'point_total' })}:<span>0</span>
            </p>
          </div>
        </div>
        <QR intl={intl} />
      </section>
      <ListTableDealer intl={intl} />
    </div>
  );
}

export default injectIntl(Promotion);
