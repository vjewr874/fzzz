/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../../../../App';
import { useUser } from '../../../../../../context/UserContext';
import { useSelector } from 'react-redux';
import currencyFormat from '../../../../../../ultils/CurrencyFormat';
import './styles/menu-list.scss';

//icon
import icBack from '../../../../../../assets/new-icons/ic-arow-left.svg';
import icEdit from '../../../../../../assets/new-icons/ic-edit.svg';
import icWallet from '../../../../../../assets/new-icons/ic-wallet.svg';
import icDiscount from '../../../../../../assets/new-icons/ic-discount.svg';
import icPrize from '../../../../../../assets/new-icons/ic-prize.svg';
import icPayment from '../../../../../../assets/new-icons/ic-payment.svg';
import icWithdrawal from '../../../../../../assets/new-icons/ic-withdrawal.svg';
import icNext from '../../../../../../assets/new-icons/ic-next.svg';
import icResult from '../../../../../../assets/new-icons/ic-result.svg';
import icTicket from '../../../../../../assets/new-icons/ic-ticket.svg';
import icCalendar from '../../../../../../assets/new-icons/ic-calendar.svg';
import icHistory from '../../../../../../assets/new-icons/ic-history.svg';
import icSwap from '../../../../../../assets/new-icons/ic-swap.svg';
import icUserGroup from '../../../../../../assets/new-icons/ic-user-group.svg';
import icRules from '../../../../../../assets/new-icons/ic-rules.svg';
import icChangePass from '../../../../../../assets/new-icons/ic-change-pass.svg';
import icContact from '../../../../../../assets/new-icons/ic-contact.svg';
import icBag from '../../../../../../assets/new-icons/ic-bag.svg';
//image
import imAvatar from '../../../../../../assets/new-images/im-avatar-ex.png';

const menuList = [
  {
    id: 1,
    label: 'Kết quả',
    url: '/result-lottery',
    ic_url: icResult,
  },
  {
    id: 2,
    label: 'Đặt vé',
    url: '/buy-lottery',
    ic_url: icTicket,
  },
  {
    id: 3,
    label: 'Lịch xổ số kế tiếp',
    url: '/lottery-calendar',
    ic_url: icCalendar,
  },
  {
    id: 4,
    label: 'Lịch sử đặt vé',
    url: 'booking-history',
    ic_url: icHistory,
  },

  {
    id: 5,
    label: 'Lịch sử giao dịch',
    url: 'transition-history',
    ic_url: icSwap,
  },
  {
    id: 6,
    label: 'Chuyển tiền qua Gimolott',
    url: 'money-transfer-gimolott',
    ic_url: icBag,
  },
  {
    id: 7,
    label: 'Giới thiệu bạn bè',
    url: 'refer-friends',
    ic_url: icUserGroup,
  },
  {
    id: 8,
    label: 'Thay đổi mật khẩu',
    url: '/change-password',
    ic_url: icChangePass,
  },
  {
    id: 9,
    label: 'Liên hệ - Góp ý',
    url: '/contact',
    ic_url: icContact,
  },
  {
    id: 10,
    label: 'Điều khoản sử dụng',
    url: '/terms-of-use',
    ic_url: icRules,
  },
];

function MenuList(props) {
  const history = useHistory();
  const { signOut } = useUser();
  const data = useSelector(state => (state.member ? state.member : null));
  return (
    <div id={'menu-list'} className={`container-menu-list ${props?.isOpen ? 'show' : ''}`}>
      <div className={'container-header'}>
        <div className={'container-item__left'}>
          <div
            className={'background-image icon-back'}
            style={{ backgroundImage: `url('${icBack}')` }}
            onClick={() => props?.closeMenu()}
          />
        </div>
        <div className={'container-item__center'}>Menu</div>
        <div className={'icon-back'} />
      </div>
      <div className={'menu'}>
        <div className={'container-profile'}>
          <div className={'container-info__user'}>
            <div className={'info-user'}>
              <div
                className={`container-avatar background-image`}
                style={{ backgroundImage: `url('${data?.userAvatar ? data?.userAvatar : imAvatar}')` }}
              />
              <div className={'info-detail'}>
                <p className={'name'}>{data?.firstName ? data?.firstName : 'Nguyễn Giang Anh'}</p>
                <p className={'phone-number'}>Điện thoại: {data?.username ? data?.username : '0385778899'}</p>
                <p className={'tag'}>
                  Cấp bậc: {data?.appUserMembershipTitle ? data?.appUserMembershipTitle : 'Thành viên mới'}
                </p>
              </div>
            </div>
            <div
              className={'background-image icon__edit'}
              style={{ backgroundImage: `url('${icEdit}')` }}
              onClick={() => history.push(routes.profile.path)}
            />
          </div>
          <div className={'container-info__wallets'}>
            <div className={'info-wallet'}>
              <div className={'info-wallet__name'}>
                <div className={'background-image icon__wallet'} style={{ backgroundImage: `url(${icWallet})` }} />
                <div className={'name'}>Ví Chính</div>
              </div>
              <div className={'info-wallet__amount'}>
                {data?.wallets?.find(wallet => wallet.walletType === 'PointWallet')?.balance || 0} đ
              </div>
            </div>
            <div className={'info-wallet'}>
              <div className={'info-wallet__name'}>
                <div className={'background-image icon__wallet'} style={{ backgroundImage: `url(${icPrize})` }} />
                <div className={'name'}>Ví Thưởng</div>
              </div>
              <div className={'info-wallet__amount'}>
                {data?.wallets?.find(wallet => wallet.walletType === 'WinWallet')?.balance || 0} đ
              </div>
            </div>
            <div className={'info-wallet'}>
              <div className={'info-wallet__name'}>
                <div className={'background-image icon__wallet'} style={{ backgroundImage: `url(${icDiscount})` }} />
                <div className={'name'}>Ví Khuyến Mãi</div>
              </div>
              <div className={'info-wallet__amount'}>
                {data?.wallets?.find(wallet => wallet.walletType === 'RewardWallet')?.balance || 0} đ
              </div>
            </div>
          </div>
          <div className={'container-btn-action'}>
            <button className={'btn btn__yellow'} onClick={() => history.push(routes.withdraw.path)}>
              <div className={'background-image icon__button'} style={{ backgroundImage: `url('${icWithdrawal}')` }} />{' '}
              Rút
            </button>
            <button className={'btn btn__red'} onClick={() => history.push(routes.recharge.path)}>
              <div className={'background-image icon__button'} style={{ backgroundImage: `url('${icPayment}')` }} />
              Nạp
            </button>
          </div>
        </div>
        <div className={'container-urls'}>
          {menuList?.map((item, index) => {
            return (
              <div className={'menu-item'} key={index} onClick={() => history.push(item?.url)}>
                <div className={'menu-label'}>
                  <div className={'icon__menu'} style={{ backgroundImage: `url('${item?.ic_url}')` }} />
                  <div className={'label'}>{item?.label}</div>
                </div>
                <div className={'background-image icon__next'} style={{ backgroundImage: `url('${icNext}')` }} />
              </div>
            );
          })}
        </div>
        <div
          className={'btn-logout'}
          onClick={() => {
            signOut();
          }}
        >
          Đăng xuất
        </div>
        <div className={'version'}>App version 1.0.0</div>
      </div>
    </div>
  );
}
export default MenuList;
