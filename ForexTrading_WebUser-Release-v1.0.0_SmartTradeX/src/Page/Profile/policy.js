/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './index.scss';
import SystemConfiguration from '../../services/systemConfiguration';

function Policy(props) {
  const { history } = props;
  const [system, setsystem] = useState({});

  useEffect(() => {
    SystemConfiguration.systemConfigurationGetDetail().then(res => {
      const { data, isSuccess } = res;
      if (isSuccess) {
        setsystem(data);
      }
    });
  }, []);

  return (
    <div className="profile pb-3">
      <Header
        goBack={() => {
          history.goBack();
        }}
        title="Chính sách bảo mật"
      />
      <div className="mt-3 p-3" dangerouslySetInnerHTML={{ __html: system?.introPolicy }}></div>
    </div>
  );
}

export default Policy;
