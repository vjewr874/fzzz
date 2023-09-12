/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Page from '../../components/Page/Page';
import React, { useEffect } from 'react';
import { notification } from 'antd';
import { injectIntl, useIntl } from 'react-intl';
import './styles/refer-friends.scss';

import icCoppy from '../../assets/stock-icons/ic-coppy.svg';
import { useUser } from '../../context/UserContext';

import { useSelector } from 'react-redux';

function ReferFriends(props) {
  const { formatMessage: f } = useIntl();
  const { intl } = props;
  const { user } = useUser();
  const userStore = useSelector(state => state?.member);

  // useEffect(() => {
  //     if (!userStore?.appUserMembershipId || userStore?.appUserMembershipId <= 3) {
  //         window.location.href = '/'
  //     }
  // }, [])

  function handleCopyUrl(value) {
    let textField = document.createElement('textarea');
    textField.innerText = value;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    openNotification('top', 'success', f({ id: 'Copy Success' }));
  }

  const openNotification = (placement, types, info) => {
    notification[types]({
      message: `${info}`,
      description: '',
      placement,
    });
  };

  return (
    <Page isShowSchedule={false} headerTitle={intl.formatMessage({ id: 'Share Promotion' })}>
      <div id="ReferFriends">
        {/* {
                    isLoading &&
                    <Loading />
                } */}
        {
          <div className="overview-container">
            <div className="overview-container-info">
              <div className="overview-container-info-id">
                <div className="left">{f({ id: 'Referral code' })}</div>
                <div className="right">
                  <div className="right">{user?.referCode}</div>
                  <div
                    className="right-img background-image"
                    onClick={() => {
                      handleCopyUrl(user?.referCode);
                    }}
                    style={{ backgroundImage: `url(${icCoppy})` }}
                  />
                </div>
                <div className="left">{f({ id: 'Referral link' })}</div>
                <div className="right">
                  <div className="right" style={{ textAlign: 'center' }}>
                    {user?.referLink}
                  </div>
                  <div
                    className="right-img background-image"
                    onClick={() => {
                      handleCopyUrl(user?.referLink);
                    }}
                    style={{ backgroundImage: `url(${icCoppy})` }}
                  />
                </div>
              </div>
              <div
                className="overview-container-info-qr"
                style={{
                  backgroundImage: `url(https://api.qrserver.com/v1/create-qr-code/?size=136x136&data=${user?.referLink})`,
                }}
              />
              {/* <div className="overview-container-info-qr" styles={{backgroundImage: `url(${imQrCode})`}} /> */}
              <p className="overview-container-text">{f({ id: 'Copy the referral code,' })} </p>
              <p className="overview-container-text">{f({ id: 'refer as many friends to join' })}</p>
            </div>
          </div>
        }
      </div>
    </Page>
  );
}

export default injectIntl(ReferFriends);
