/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { useUser } from 'context/UserContext';
import _, { set } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { IconAvatarUpload, IconEditUserName } from './../../assets/icons/index';
import Header from '../../components/Header';
import { routes } from './../../App';
import './index.scss';
import { useIntl } from 'react-intl';
import UploadService from 'services/upload';
import { convertFileToBase64 } from 'helper/common';
import { Input, Modal } from 'antd';
import { default as ApppUsers, default as AppUsers } from './../../services/apppUsers';
function InfoProfile(props) {
  const { history } = props;
  const { refresh } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const [fullName, setFullName] = useState('');
  const { appUserId, memberLevelName, userAvatar, phoneNumber, lastName, firstName } = useSelector(
    state => state.member || {},
  );

  useEffect(() => {
    setFullName(firstName);
  }, [firstName]);

  const handleClickAvatar = () => {
    const el = document.createElement('input');
    el.type = 'file';
    el.accept = 'image/*';
    el.onchange = handleUploadAvatar;
    el.click();
  };

  const handleUploadAvatar = event => {
    const file = event.target.files[0];
    if (file) {
      convertFileToBase64(file).then(dataUrl => {
        const newData = dataUrl.replace(/,/gi, '').split('base64');
        if (newData[1]) {
          const data = {
            id: appUserId,
            imageData: newData[1],
            imageFormat: 'png',
          };
          const service = UploadService.uploadUserAvatar;
          service(data).then(result => {
            const { isSuccess, message, data } = result;
            if (!isSuccess) {
              swal(message || t('upload_failed'), {
                icon: 'warning',
              });

              return;
            } else {
              swal(t('upload_success'), {
                icon: 'success',
              });
              refresh();
            }
          });
        }
      });
    }
  };

  function handleUpdateUserInfo(data) {
    ApppUsers.updateInfoUser({
      data,
      id: appUserId,
    }).then(async result => {
      const { isSuccess, message, data } = result;
      setIsModalVisible(false);
      if (!isSuccess) {
        swal(t('update_profile_failed'), {
          icon: 'warning',
        });

        return;
      } else {
        swal(t('update_success'), {
          icon: 'success',
        });
        refresh();
      }
    });
  }

  return (
    <div>
      <Header
        goBack={() => {
          history.goBack();
        }}
        title="Trang cá nhân"
      />
      <div className="profile__info">
        <div className="d-flex align-items-center ">
          <div> Hình đại diện</div>
          <div className="ms-auto profile__lable pointer">
            {userAvatar ? (
              <img height={26} width={26} src={userAvatar} onClick={handleClickAvatar} alt="userAvatar"></img>
            ) : (
              <IconAvatarUpload onClick={handleClickAvatar} />
            )}
          </div>
        </div>
        <div className="profile__line mt-3 mb-3"></div>
        <div className="d-flex align-items-center ">
          <div>ID</div>
          <div className="ms-auto profile__lable ">{appUserId}</div>
        </div>
        <div className="profile__line mt-3 mb-3"></div>
        <div className="d-flex align-items-center ">
          <div>Tên người dùng</div>
          <div className="ms-auto profile__lable ">
            {`${memberLevelName} ${lastName || ''} ${firstName || ''}`}{' '}
            <IconEditUserName
              onClick={() => {
                setIsModalVisible(true);
              }}
              height={20}
              width={20}
              className="pointer ms-2"
            />
          </div>
        </div>
        <div className="profile__line mt-3 mb-3"></div>
        <div className="d-flex align-items-center ">
          <div>Số điện thoại</div>
          <div className="ms-auto profile__lable ">{phoneNumber}</div>
        </div>
      </div>

      <Modal
        title={
          <div className="profile__popup__title">
            <img src={require('../../assets/images/maskGroup.png')} alt="test"></img>
          </div>
        }
        closable={false}
        centered
        footer={null}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        className="profile__popup"
      >
        <div className="profile__popup__parent">
          <div className="mb-2">Thay đổi tên người dùng</div>
          <Input
            onChange={e => {
              const { value } = e.target;
              setFullName(value);
            }}
            className="profile__popup__parent__input"
            placeholder="Tên người dùng"
            value={fullName}
          />
        </div>
        <div className="profile__line mt-3 mb-2"></div>
        <div className="row">
          <div
            onClick={() => {
              setFullName(firstName);
              setIsModalVisible(false);
            }}
            className="col-6 text-center profile__popup__no pointer"
          >
            Huỷ
          </div>
          <div
            onClick={() => {
              handleUpdateUserInfo({
                firstName: fullName,
              });
            }}
            className="col-6 text-center profile__popup__yes pointer"
          >
            Xác nhận
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default InfoProfile;
