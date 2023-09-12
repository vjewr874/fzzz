/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Button } from 'antd';
import { useUser } from 'context/UserContext';
import _ from 'lodash';
import moment from 'moment';
import { number_to_price, getBalanceByWalletType } from 'helper/common';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import {
  IconAbout,
  IconAudioRed,
  IconButtonRefresh,
  IconHistoryBet,
  IconHistoryTrans,
  IconNext,
  IconNextBlack,
  IconStar,
  IconWheel1,
} from './../../assets/icons/index';
import { routes } from './../../App';

function ProFile() {
  const {
    firstName,
    lastName,
    diachiviUSDT,
    diachiviBTC,
    birthDay,
    phoneNumber,
    appUserId,
    memberLevelName,
    email,
    companyName,
    identityNumber,
    userAvatar,
    memberReferIdF1,
    wallets,
  } = useSelector(state => state.member || {});
  const history = useHistory();

  const isVerified = useSelector(state => state.member?.isVerified);

  const intl = useIntl();
  const { _, refresh, signOut } = useUser();

  const t = useCallback(id => intl.formatMessage({ id }), [intl]);

  const initialValues = {
    fullName: [firstName, lastName].join(' '),
    diachiviUSDT,
    identityNumber,
    diachiviBTC,
    birthDay: birthDay ? moment(birthDay) : null,
    phoneNumber,
    email,
    companyName,
  };

  return (
    <div className="profile ">
      <div className="header">
        <div className="sub_header">
          <div className="sub_header__name">
            <div className="title">Tôi</div>
          </div>
          <div className="sub_header__icon">
            <img
              alt="test"
              className="pointer icon_audio"
              onClick={() => {
                history.push(routes.managementProfileCustomer.path);
              }}
              src="/assets/images/audio.png"
            />
          </div>
        </div>
        <div className="userInfor">
          <img
            alt="test"
            className="icon_avatar"
            src={userAvatar && userAvatar !== '' ? userAvatar : '/assets/images/avatar.png'}
          />
          <div className="userInfor__name">
            <div className="styleName">{`${memberLevelName || ''} ${lastName || ''} ${firstName || ''}`}</div>
            <div className="styleName">{`ID ${appUserId || ''}`}</div>
            <div className="styleName">{`Điện thoại ${phoneNumber || ''}`}</div>
          </div>
          <div className="userInfor__iconNext pointer">
            <img
              alt="test"
              onClick={() => {
                history.push(routes.managementInfoProfile.path);
              }}
              className="icon_audio"
              src="/assets/images/button_next.png"
            />
          </div>
        </div>
        <div className="currentAmount">
          <div className="walletMoney">
            <img alt="test" className="icon_audio" src="/assets/images/Wallet.png" />
            <div className="styleMoney ms-2"> Số Tiền </div>
          </div>
          <div className="amountMonney">
            <div className="styleAmount">
              {number_to_price(wallets ? getBalanceByWalletType(wallets, 'PointWallet') : 0)} đ{' '}
            </div>
            <div className="icon_refresh">
              <IconButtonRefresh
                onClick={() => {
                  refresh();
                  swal('Làm mới thành công', {
                    icon: 'success',
                  });
                }}
                className="icon_refresh__Icon pointer"
              />
            </div>
          </div>
          <div className="button_payment">
            <button
              onClick={() => {
                history.push(routes.managementDeposit.path);
              }}
              className="button_withdraw "
            >
              Rút tiền
            </button>
            <button
              onClick={() => {
                history.push(routes.recharge.path);
              }}
              className="button_deposit"
            >
              Nạp tiền
            </button>
          </div>
        </div>
      </div>
      {memberReferIdF1 === 1 ? (
        <div className="titlePromo">
          <IconWheel1 className="iconWheel" />
          <div className="namePromo ms-auto">QUẢNG BÁ ĐẠI LÝ</div>
          <IconNext
            className="pointer iconNext"
            onClick={() => {
              history.push(routes.managementPacket.path);
            }}
          />
        </div>
      ) : (
        <div className="titlePromoHidden"></div>
      )}
      <div className="historyView mt-3 mb-3">
        <div
          onClick={() => {
            history.push(routes.managementBetRecordsHistory.path);
          }}
          className="sub_history pointer"
        >
          <IconHistoryBet className="iconHistory" />
          <div className="textHistory ">LỊCH SỬ MUA</div>
        </div>
        <div
          onClick={() => {
            history.push(routes.managementRechargeHistory.path);
          }}
          className="sub_history pointer"
        >
          <IconHistoryTrans className="iconHistory" />
          <div className="textHistory">LỊCH SỬ GIAO DỊCH</div>
        </div>
      </div>
      <div className="footView">
        <div
          onClick={() => {
            history.push(routes.managementProfileGuideUser.path);
          }}
          className="subItems pointer"
        >
          <IconStar className="iconOne" />
          <div className="nameOpt">Hướng dẫn cho người mới</div>
          <IconNextBlack className="iconNextTwo" />
        </div>
        <div className="lineGray"></div>
        <div
          onClick={() => {
            history.push(routes.managementProfileAboutUs.path);
          }}
          className="subItems pointer"
        >
          <IconAbout className="iconOne" />
          <div className="nameOpt ">Giới thiệu về chúng tôi</div>
          <IconNextBlack className="iconNextTwo" />
        </div>
        <div className="lineGray"></div>
        <div
          onClick={() => {
            history.push(routes.managementProfileCustomer.path);
          }}
          className="subItems pointer"
        >
          <IconAudioRed className="iconOne" />
          <div className="nameOpt">CSKH Trực tuyến 24/7</div>
          <IconNextBlack className="iconNextTwo" />
        </div>
        <div className="lineGray"></div>

        <div className="text-center mb-3 mt-3">
          <Button
            onClick={() => {
              signOut();
            }}
          >
            ĐĂNG XUẤT
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ProFile;
