/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Page from '../../components/Page/Page';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import './styles/contact.scss';
import img from '../../assets/new-images/img-contact.png';
import icChat from '../../assets/new-icons/ic-hotline.svg';
import imgNext from '../../assets/new-icons/ic-next-2.svg';
import icZalo from '../../assets/new-icons/ic-zalo.svg';
import icFacebook from '../../assets/new-icons/ic-faceboook.svg';
import SystemConfiguration from '../../services/systemConfiguration';

function Contact(props) {
  const { intl } = props;
  const [system, setSystem] = useState(null);
  useEffect(() => {
    SystemConfiguration.systemConfigurationGetDetail().then(res => {
      const { data, isSuccess } = res;
      if (isSuccess) {
        setSystem(data);
      }
    });
  }, []);
  return (
    <Page isHideItemRight={true} headerTitle={intl.formatMessage({ id: 'contact' })}>
      <div id="contact">
        <div className={'banner'}>
          <div className={'background-image image'} style={{ backgroundImage: `url(${img})` }} />
        </div>
        <div className={'container'}>
          <a style={{ color: '#222222', textDecoration: 'none' }} href={`tel:${system?.hotlineNumber}`}>
            <div className={'button'}>
              <div className={'left'}>
                <div className={'icon'} style={{ backgroundImage: `url('${icChat}')` }} />
                <span className={'text'}>CSKH trực tuyến</span>
              </div>
              <div className={'right'}>
                <div className={'arrow'} style={{ backgroundImage: `url(${imgNext})` }} />
              </div>
            </div>
          </a>
          <div className={'button'} onClick={() => window.open(`${system?.zaloUrl}`)}>
            <div className={'left'}>
              <div className={'icon'} style={{ backgroundImage: `url('${icZalo}')` }} />
              <span className={'text'}>Zalo</span>
            </div>
            <div className={'right'}>
              <div className={'arrow'} style={{ backgroundImage: `url(${imgNext})` }} />
            </div>
          </div>
          <div className={'button'} onClick={() => window.open(system?.facebookUrl)}>
            <div className={'left'}>
              <div className={'icon'} style={{ backgroundImage: `url('${icFacebook}')` }} />
              <span className={'text'}>Facebook</span>
            </div>
            <div className={'right'}>
              <div className={'arrow'} style={{ backgroundImage: `url(${imgNext})` }} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
export default injectIntl(Contact);
