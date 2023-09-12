/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import Page from '../../components/Page/Page';
import './styles/profile.scss';
import AppUsers from '../../services/apppUsers';
import { handleUpdateDetail } from '../../actions';
import { Input, notification, Select } from 'antd';
import { useHistory } from 'react-router-dom';
//icon
import icCoppy from '../../assets/stock-icons/ic-coppy.svg';
import Upload from '../../services/upload';
import icCamera from '../../assets/stock-icons/ic-camera.svg';
import imgDefault from '../../assets/stock-images/im-defaultAvatar.png';
import ic_User from '../../assets/stock-icons/ic-profile.svg';
import ic_Work from '../../assets/stock-icons/ic-work.svg';
import ic_Wallet from '../../assets/stock-icons/ic-wallet-transf.svg';
import ic_card from '../../assets/stock-icons/ic-card.svg';
import { convertFileToBase64 } from '../../helper/common';
import Loader from '../../components/Loader';
import swal from 'sweetalert';
const listbanks = [
  {
    value: 'Agribank',
    label: 'Agribank',
  },
  {
    value: 'CB',
    label: 'CB',
  },
  {
    value: 'Oceanbank',
    label: 'Oceanbank',
  },
  {
    value: 'GPBank',
    label: 'GPBank',
  },
  {
    value: 'BIDV',
    label: 'BIDV',
  },
  {
    value: 'VietinBank',
    label: 'VietinBank',
  },
  {
    value: 'Vietcombank',
    label: 'Vietcombank',
  },
  {
    value: 'VPBank',
    label: 'VPBank',
  },
  {
    value: 'MB',
    label: 'MB',
  },
  {
    value: 'Techcombank',
    label: 'Techcombank',
  },
  {
    value: 'ACB',
    label: 'ACB',
  },
  {
    value: 'SHB',
    label: 'SHB',
  },
  {
    value: 'HDBank',
    label: 'HDBank',
  },
  {
    value: 'SCB',
    label: 'SCB',
  },
  {
    value: 'Sacombank',
    label: 'Sacombank',
  },
  {
    value: 'TPBank',
    label: 'TPBank',
  },
  {
    value: 'VIB',
    label: 'VIB',
  },
  {
    value: 'MSB',
    label: 'MSB',
  },
  {
    value: 'SeABank',
    label: 'SeABank',
  },
  {
    value: 'OCB',
    label: 'OCB',
  },
  {
    value: 'Eximbank',
    label: 'Eximbank',
  },
  {
    value: 'LienVietPostBank',
    label: 'LienVietPostBank',
  },
  {
    value: 'PVcombank',
    label: 'PVcombank',
  },
  {
    value: 'Bac A Bank',
    label: 'Bac A Bank',
  },
  {
    value: 'Đông Á Bank',
    label: 'Đông Á Bank',
  },
  {
    value: 'BaoViet Bank',
    label: 'BaoViet Bank',
  },
  {
    value: 'ABBANK',
    label: 'ABBANK',
  },
  {
    value: 'Nam A Bank',
    label: 'Nam A Bank',
  },
  {
    value: 'VietBank',
    label: 'VietBank',
  },
  {
    value: 'Viet A Bank',
    label: 'Viet A Bank',
  },
  {
    value: 'NCB',
    label: 'NCB',
  },
  {
    value: 'BanVietBank',
    label: 'BanVietBank',
  },
  {
    value: 'Kienlongbank',
    label: 'Kienlongbank',
  },
  {
    value: 'Saigonbank',
    label: 'Saigonbank',
  },
  {
    value: 'PG Bank',
    label: 'PG Bank',
  },
  {
    value: 'Shinhan Bank',
    label: 'Shinhan Bank',
  },
  {
    value: 'HSBC',
    label: 'HSBC',
  },
  {
    value: 'Woori Bank',
    label: 'Woori Bank',
  },
  {
    value: 'CIMB Bank',
    label: 'CIMB Bank',
  },
  {
    value: 'Public Bank',
    label: 'Public Bank',
  },
  {
    value: 'Hong Leong Bank',
    label: 'Hong Leong Bank',
  },
  {
    value: 'UOB',
    label: 'UOB',
  },
  {
    value: 'ANZ',
    label: 'ANZ',
  },
];
function Profile({ intl }) {
  const dispatch = useDispatch();
  const [info, setInfo] = useState('');
  const data = useSelector(state => (state.member ? state.member : null));
  const inputRef = useRef(null);
  // const regExp = new RegExp('^[0-9]+$');
  const regExp1 = new RegExp(
    '^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ ]+$',
  );
  const [dataToUpdate, setDataToUpdate] = useState({
    firstName: undefined,
    email: undefined,
    tentaikhoan: undefined,
    sotaikhoan: undefined,
    tennganhang: undefined,
    cryptoWalletAddress: undefined,
    cryptoNetwork: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setIsLoading(true);
    getDetailUserById(data);
  }, []);

  useEffect(() => {
    dataToUpdate.firstName = info?.firstName;
    dataToUpdate.email = info?.email;
    dataToUpdate.tentaikhoan = info?.tentaikhoan;
    dataToUpdate.sotaikhoan = info?.sotaikhoan;
    dataToUpdate.tennganhang = info?.tennganhang;
    dataToUpdate.cryptoWalletAddress = info?.cryptoWalletAddress;
    dataToUpdate.cryptoNetwork = info?.cryptoNetwork;
    setDataToUpdate({ ...dataToUpdate });
  }, [info]);

  const openNotification = (placement, types, info) => {
    notification[types]({
      message: `${info}`,
      description: '',
      placement,
    });
  };
  const handleFileChange = event => {
    setIsLoading(true);
    const fileObj = event.target.files && event.target.files[0];
    const file = event.target.files[0];
    if (!fileObj) {
    } else {
      convertFileToBase64(file).then(dataUrl => {
        const newData = dataUrl.replace(/,/gi, '').split('base64');
        if (newData[1]) {
          if (
            file?.type.replace('image/', '') !== 'png' &&
            file?.type.replace('image/', '') !== 'jpeg' &&
            file?.type.replace('image/', '') !== 'jpg'
          ) {
            openNotification('top', 'error', intl.formatMessage({ id: 'Incorrect file format!!!' }));
          } else {
            uploadUserAvatar(newData[1], file?.type.replace('image/', ''));
          }
        }
      });
    }
  };

  function getDetailUserById() {
    AppUsers.getDetailUserById({
      id: data?.appUserId,
    }).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        dispatch(handleUpdateDetail(data));
        setInfo(data);
      }
      setIsLoading(false);
    });
  }
  function handleCopyUrl(value) {
    let textField = document.createElement('textarea');
    textField.innerText = value;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    openNotification('top', 'success', intl.formatMessage({ id: 'Copy Success' }));
  }
  const validateEmail = email => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!email?.match(regexEmail);
  };
  function updateInfoUser(object) {
    if (object?.email === undefined || validateEmail(object?.email) === false) {
      openNotification('top', 'error', intl.formatMessage({ id: 'inValidEmail' }));
      return;
    }
    if (object?.firstName?.length < 3 || object?.firstName?.length > 50 || object.firstName == null) {
      openNotification('top', 'error', intl.formatMessage({ id: 'Username 3-50 characters' }));
      return;
    }
    if (!regExp1.test(object?.firstName)) {
      openNotification('top', 'error', intl.formatMessage({ id: 'Username is only allowed to enter text' }));
      return;
    }
    if (!object?.tennganhang) {
      openNotification('top', 'error', intl.formatMessage({ id: 'Please select bank name' }));
      return;
    }
    if (!object?.sotaikhoan) {
      openNotification('top', 'error', intl.formatMessage({ id: 'Please enter bank account number' }));
      return;
    }
    if (!object?.tentaikhoan) {
      openNotification('top', 'error', intl.formatMessage({ id: 'Please enter bank account name' }));
      return;
    }

    // if (!object?.cryptoWalletAddress) {
    //     openNotification("top", "error", intl.formatMessage({ id: "Please enter wallet address" }))
    //     return
    // }
    setIsLoading(true);
    const param = {
      firstName: object.firstName,
      email: object.email,
      tentaikhoan: object.tentaikhoan,
      sotaikhoan: object.sotaikhoan,
      tennganhang: object.tennganhang,
      cryptoWalletAddress: object.cryptoWalletAddress,
      cryptoNetwork: 'TRC20',
      cryptoUnit: 'USDT',
    };
    AppUsers.updateInfoUser({
      id: data?.appUserId,
      data: param,
    }).then(result => {
      const { isSuccess, error } = result;
      if (isSuccess) {
        openNotification('top', 'success', intl.formatMessage({ id: 'Success' }));
        getDetailUserById();
      } else {
        handledErrorUser(error);
      }
      setIsLoading(false);
    });
  }
  function handledErrorUser(error) {
    if (error === 'DUPLICATED_USER') {
      swal(intl.formatMessage({ id: 'DUPLICATED_USER' }), {
        icon: 'warning',
      });
    } else if (error === 'DUPLICATED_USER_EMAIL') {
      swal(intl.formatMessage({ id: 'DUPLICATED_USER_EMAIL' }), {
        icon: 'warning',
      });
    } else if (error === 'DUPLICATED_USER_PHONE') {
      swal(intl.formatMessage({ id: 'DUPLICATED_USER_PHONE' }), {
        icon: 'warning',
      });
    } else if (error === 'INVALID_REFER_USER') {
      swal(intl.formatMessage({ id: 'INVALID_REFER_USER' }), {
        icon: 'warning',
      });
    } else if (error === 'NOT_AUTHORIZED') {
      swal(intl.formatMessage({ id: 'NOT_AUTHORIZED' }), {
        icon: 'warning',
      });
    } else if (error === 'USER_LOCKED') {
      swal(intl.formatMessage({ id: 'USER_LOCKED' }), {
        icon: 'warning',
      });
    } else if (error === 'NOT_VERIFIED_EMAIL') {
      swal(intl.formatMessage({ id: 'NOT_VERIFIED_EMAIL' }), {
        icon: 'warning',
      });
    } else if (error === 'NOT_VERIFIED_PHONE') {
      swal(intl.formatMessage({ id: 'NOT_VERIFIED_PHONE' }), {
        icon: 'warning',
      });
    } else if (error === 'REFER_USER_NOT_FOUND') {
      swal(intl.formatMessage({ id: 'REFER_USER_NOT_FOUND' }), {
        icon: 'warning',
      });
    } else if (error === 'OTP_NOT_FOUND') {
      swal(intl.formatMessage({ id: 'OTP_NOT_FOUND' }), {
        icon: 'warning',
      });
    } else {
      swal(intl.formatMessage({ id: 'error' }), {
        icon: 'warning',
      });
    }
  }

  function uploadUserAvatar(urlAvatar, type) {
    Upload.uploadUserAvatar({
      id: data?.appUserId,
      imageData: urlAvatar,
      imageFormat: type,
    }).then(result => {
      const { isSuccess } = result;
      if (isSuccess) {
        openNotification('top', 'success', intl.formatMessage({ id: 'Update successful' }));
        getDetailUserById();
      } else {
        openNotification('top', 'error', intl.formatMessage({ id: 'Update Error' }));
      }
      setIsLoading(true);
    });
  }

  function handleEditProfile(name, value) {
    switch (name) {
      case 'firstName':
        dataToUpdate.firstName = value;
        setDataToUpdate({ ...dataToUpdate });
        break;
      case 'email':
        dataToUpdate.email = value;
        setDataToUpdate({ ...dataToUpdate });
        break;
      case 'tentaikhoan':
        dataToUpdate.tentaikhoan = value;
        setDataToUpdate({ ...dataToUpdate });
        break;
      case 'sotaikhoan':
        dataToUpdate.sotaikhoan = value;
        setDataToUpdate({ ...dataToUpdate });
        break;
      case 'tennganhang':
        dataToUpdate.tennganhang = value;
        setDataToUpdate({ ...dataToUpdate });
        break;
      case 'cryptoWalletAddress':
        dataToUpdate.cryptoWalletAddress = value;
        setDataToUpdate({ ...dataToUpdate });
        break;
      case 'cryptoNetwork':
        dataToUpdate.cryptoNetwork = value;
        setDataToUpdate({ ...dataToUpdate });
        break;
      default:
        break;
    }
  }

  return (
    <Page isHideItemRight={true} headerTitle={intl.formatMessage({ id: 'profile.detail_account' })}>
      {isLoading ? <Loader /> : null}
      <div className="profileUser">
        <div className="profileUser-avatar">
          <div className={'profileUser-avatar-content'}>
            <div
              className={'background-image my-profile__avatar mr-px-4'}
              style={{ backgroundImage: `url('${info.userAvatar ? info.userAvatar : imgDefault}')` }}
            >
              <div
                className={'background-image my-profile__icon'}
                style={{ backgroundImage: `url('${icCamera}')` }}
                onClick={() => inputRef.current.click()}
              />
            </div>
            <input
              style={{ display: 'none' }}
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
          </div>
          <div className={'profileUser-avatar-title'}>{intl.formatMessage({ id: 'personal.avatar' })}</div>
        </div>

        <div className="profileUser-header">
          <img src={ic_User} alt="" />
          <span>{intl.formatMessage({ id: 'Account information' })}</span>
        </div>

        <div className="profileUser-BankWallet">
          <p className="profileUser-BankWallet-title">{intl.formatMessage({ id: 'Full name' })}</p>
          <Input
            className="profileUser-BankWallet-input"
            value={dataToUpdate?.firstName || ''}
            onChange={e => handleEditProfile('firstName', e.target.value)}
            placeholder={intl.formatMessage({ id: 'Enter full name' })}
            disabled={info?.firstName}
          />
        </div>
        <div className="profileUser-BankWallet">
          <p className="profileUser-BankWallet-title">{intl.formatMessage({ id: 'Email' })}</p>
          <Input
            className="profileUser-BankWallet-input"
            value={dataToUpdate?.email || ''}
            onChange={e => handleEditProfile('email', e.target.value)}
            placeholder={intl.formatMessage({ id: 'Enter email' })}
            disabled={info?.email}
          />
        </div>
        <div className="profileUser-BankWallet">
          <p className="profileUser-BankWallet-title">{intl.formatMessage({ id: 'Account' })}</p>
          <Input
            className="profileUser-BankWallet-input"
            value={info?.username || ''}
            onChange={e => handleEditProfile('username', e.target.value)}
            disabled={true}
          />
        </div>
        <div className="profileUser-BankWallet">
          <p className="profileUser-BankWallet-title">{intl.formatMessage({ id: 'personal.refer_code' })}</p>
          <div
            style={{
              position: 'relative',
            }}
          >
            <Input className="profileUser-BankWallet-input" value={info?.referCode || ''} disabled={true} />
            <img
              className="img background-image"
              onClick={() => {
                handleCopyUrl(info?.referCode);
              }}
              src={icCoppy}
              alt=""
              style={{
                position: 'absolute',
                right: '8px',
                top: '6px',
              }}
            />
          </div>
        </div>
        <div className="profileUser-header">
          <img src={ic_card} alt="" />
          <span>{intl.formatMessage({ id: 'Bank information' })}</span>
        </div>
        <div className="profileUser-BankWallet">
          <p className="profileUser-BankWallet-title">{intl.formatMessage({ id: 'Bank' })}</p>
          <Select
            className="profileUser-BankWallet-select"
            showSearch={true}
            placeholder={intl.formatMessage({ id: 'Select bank name' })}
            value={dataToUpdate?.tennganhang}
            style={{
              width: 120,
            }}
            disabled={info?.tennganhang}
            options={listbanks}
            onChange={e => handleEditProfile('tennganhang', e)}
          />
          <p className="profileUser-BankWallet-title">{intl.formatMessage({ id: 'Bank account number' })}</p>
          <Input
            className="profileUser-BankWallet-input"
            value={dataToUpdate?.sotaikhoan || ''}
            onChange={e => handleEditProfile('sotaikhoan', e.target.value)}
            placeholder={intl.formatMessage({ id: 'Enter bank account name' })}
            disabled={info?.sotaikhoan}
          />
          <p className="profileUser-BankWallet-title">{intl.formatMessage({ id: 'Account holder' })}</p>
          <Input
            className="profileUser-BankWallet-input"
            value={dataToUpdate?.tentaikhoan || ''}
            onChange={e => handleEditProfile('tentaikhoan', e.target.value)}
            placeholder={intl.formatMessage({ id: 'Enter account holder' })}
            disabled={info?.tentaikhoan}
          />
        </div>
        <div
          style={{
            height: '1px',
            width: 'calc(100% + 40px)',
            margin: '32px 0 0 -20px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
          }}
        />
        <div className="profileUser-header">
          <img src={ic_Wallet} alt="" />
          <span>{intl.formatMessage({ id: 'E-wallet information' })}</span>
        </div>
        <div className="profileUser-BankWallet">
          <p className="profileUser-BankWallet-title">{intl.formatMessage({ id: 'E-wallet account' })}</p>
          <Input
            className="profileUser-BankWallet-input"
            value={dataToUpdate?.cryptoWalletAddress || ''}
            onChange={e => handleEditProfile('cryptoWalletAddress', e.target.value)}
            placeholder={intl.formatMessage({ id: 'Enter wallet address' })}
            disabled={info?.cryptoWalletAddress}
          />
          <p className="profileUser-BankWallet-title">{intl.formatMessage({ id: 'Network' })}</p>
          <Select
            className="profileUser-BankWallet-select"
            defaultValue="TRC20"
            style={{
              width: 120,
            }}
            options={[
              {
                value: 'TRC20',
                label: 'TRC20',
              },
            ]}
            disabled={info?.cryptoNetwork}
            onChange={e => handleEditProfile('cryptoNetwork', e)}
          />
        </div>
        {(!info?.email ||
          !info?.firstName ||
          !info?.tennganhang ||
          !info?.tentaikhoan ||
          !info?.sotaikhoan ||
          !info?.cryptoWalletAddress ||
          !info?.cryptoNetwork) && (
          <div className="profileUser-btnSave" onClick={() => updateInfoUser(dataToUpdate)}>
            {intl.formatMessage({ id: 'personal.submit' })}
          </div>
        )}
        {info?.email &&
          info?.firstName &&
          !info?.tennganhang &&
          !info?.tentaikhoan &&
          !info?.sotaikhoan &&
          !info?.cryptoWalletAddress &&
          !info?.cryptoNetwork && (
            <div className="profileUser-btnSave" style={{ cursor: 'auto' }}>
              {intl.formatMessage({ id: 'personal.submit' })}
            </div>
          )}
      </div>
    </Page>
  );
}
export default injectIntl(Profile);
