/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './index.scss';
function GuideUser(props) {
  const { history } = props;

  return (
    <div className=" pb-3">
      <Header
        goBack={() => {
          history.goBack();
        }}
        title="Hướng dẫn cho người mới"
      />
      <embed
        height="800px"
        src={`${require('../../assets/images/guideline.pdf')}#toolbar=0&navpanes=0&scrollbar=0`}
        className="profile__customer-banner w-100"
      />
    </div>
  );
}

export default GuideUser;
