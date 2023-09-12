/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useCallback, useEffect, useState } from 'react';
import SystemConfiguration from '../../services/systemConfiguration';
import { IconTeleGram, IconVN, IconCN, IconEng } from '../../assets/icons';
import { ArrowLeftOutlined } from '@ant-design/icons';
import BackgroundTop from 'components/Layout/BackgroundTop';
import Loader from 'components/Loader';
import { Col, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

function Support() {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);

  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const history = useHistory();

  function systemConfigurationFind() {
    setIsVisible(true);
    SystemConfiguration.systemConfigurationFind().then(result => {
      const { isSuccess, message, data } = result;
      setIsVisible(false);
      if (!isSuccess || !data) {
        notification['error']({
          message: '',
          description: message || t('something_wrong'),
        });
        return;
      } else {
        setData(data);
      }
    });
  }

  useEffect(() => {
    // systemConfigurationFind();
  }, []);

  return (
    <section className="bg-white px-0">
      <div className="py-3 text-black wrapp-support-area">
        <p className="fw-500 py-4 px-3">{t('support_note')}</p>
        {/* <div className="support-area">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={data?.telegramGroupUrl || ""}
          >
            <div className="d-flex align-items-center py-4 px-3 wrapp-text">
              <IconTeleGram width={50} height={50} />
              <p className="mx-4 text-black">Telegram</p>
            </div>
          </a>
        </div> */}
        <div className="support-area">
          <a target="_blank" rel="noopener noreferrer" href={data?.supportChatUrlVI || ''}>
            <div className="d-flex align-items-center py-4 px-3 wrapp-text">
              <IconVN width={50} />
              <p className="mx-4 text-black">{t('vietnam_channel')}</p>
            </div>
          </a>
        </div>
        <div className="support-area">
          <a target="_blank" rel="noopener noreferrer" href={data?.supportChatUrlCN || ''}>
            <div className="d-flex align-items-center py-4 px-3 wrapp-text">
              <IconCN width={50} />
              <p className="mx-4 text-black">{t('china_channel')}</p>
            </div>
          </a>
        </div>
        <div className="support-area">
          <a target="_blank" rel="noopener noreferrer" href={data?.supportChatUrlEN || ''}>
            <div className="d-flex align-items-center py-4 px-3 wrapp-text">
              <IconEng width={50} height={59} />
              <p className="mx-4 text-black">{t('other_channel')}</p>
            </div>
          </a>
        </div>
        {/* </div> */}
      </div>
      {isVisible ? <Loader /> : null}
    </section>
  );
}
export default Support;
