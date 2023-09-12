/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import ListTableDealer from 'components/Promotion/ListTableDealer/ListTableDealer';
import MenuPromotion from 'components/Promotion/MenuPromotion/MenuPromotion';
import React from 'react';

export default function Tuturial(props) {
  const { history, intl } = props;
  return (
    <div className="promotion pb-4">
      <MenuPromotion history={history} intl={intl} />
      <ListTableDealer intl={intl} />
    </div>
  );
}
