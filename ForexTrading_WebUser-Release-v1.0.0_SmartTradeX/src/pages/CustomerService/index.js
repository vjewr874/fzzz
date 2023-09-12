/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';

import { injectIntl, useIntl } from 'react-intl';
import Page from '../../components/Page/Page';
import './styles/customer-service.scss';

import SystemConfiguration from '../../services/systemConfiguration';

//icon
import icTelegram from '../../assets/forex-icons/ic-telegram.svg';
import icVN from '../../assets/forex-icons/ic-VN-flag.svg';
import icChina from '../../assets/forex-icons/ic-China-flag.svg';
import icOrther from '../../assets/forex-icons/ic-Orther-flag.svg';
import icMessenger from '../../assets/forex-icons/ic-messenger.png';

//images
import Loader from '../../components/Loader';

function CustomerService() {
  const { formatMessage: f } = useIntl();
  const [system, setSystem] = useState(null);
  // const regExp = new RegExp('^[0-9]+$');
  // const regExp1 = new RegExp('^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ ]+$');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    SystemConfiguration.systemConfigurationGetDetail().then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setSystem(data);
      }
      setIsLoading(false);
    });
  }, []);

  const openUrl = typeLink => {
    if (typeLink === 'telegram') {
      window.location.href = system?.telegramGroupUrl;
    }
    if (typeLink === 'messenger') {
      window.location.href = system?.fbMessengerUrl;
    }
    if (typeLink === 'vi') {
      window.location.href = system?.supportChatUrlVI;
    }
    if (typeLink === 'cn') {
      window.location.href = system?.supportChatUrlCN;
    }
    if (typeLink === 'en') {
      window.location.href = system?.supportChatUrlEN;
    }
  };

  return (
    <Page isHideItemRight={true} headerTitle={f({ id: 'home.customer_service' })}>
      {isLoading ? <Loader /> : null}
      <div className="customerService">
        <div className="customerServiceText">
          {f({
            id: 'The support team is available from 08:00 to 20:00 (UTC+8) during the day. Any questions and support, dear. For investors, please contact the team through the following channels:',
          })}
        </div>
        <div className="customerServiceList">
          {system?.telegramGroupUrl && (
            <div className="customerServiceListItem" onClick={() => openUrl('telegram')}>
              <img src={icTelegram} />
              <div>Telegram</div>
            </div>
          )}
          {system?.fbMessengerUrl && (
            <div className="customerServiceListItem" onClick={() => openUrl('messenger')}>
              <img src={icMessenger} style={{ width: '40px', height: '40px' }} />
              <div>FB Messenger</div>
            </div>
          )}
          {system?.supportChatUrlVI && (
            <div className="customerServiceListItem" onClick={() => openUrl('vi')}>
              <img src={icVN} />
              <div>{f({ id: 'Support channel in Vietnam' })} </div>
            </div>
          )}
          {system?.supportChatUrlCN && (
            <div className="customerServiceListItem" onClick={() => openUrl('cn')}>
              <img src={icChina} />
              <div>{f({ id: 'Support channel in China' })}</div>
            </div>
          )}

          {system?.supportChatUrlEN && (
            <div className="customerServiceListItem" onClick={() => openUrl('en')}>
              <img src={icOrther} />
              <div>{f({ id: 'Support Channel in Other Country' })}</div>
            </div>
          )}
        </div>
      </div>
      {/* <ModalEditInfo status={isOpen} title={title} placeholder={placeholder} valueInnerHTML={valueInnerHTML} closeDrawer={() => setIsOpen(false)} updateInfoUser={(data) => updateData(data)} name={name}/> */}
    </Page>
  );
}

export default injectIntl(CustomerService);
