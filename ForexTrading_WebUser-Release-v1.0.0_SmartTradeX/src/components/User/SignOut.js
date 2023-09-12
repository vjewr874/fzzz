/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { LogoutOutlined } from '@ant-design/icons';
import { ModalWrapper } from 'components/Wallet';
import { useUser } from 'context/UserContext';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import Status from './Status';

export default function SignOut() {
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const { signOut } = useUser();
  return (
    <ModalWrapper dark isTop>
      <div className="d-flex align-items-center flex-column p-3">
        <Status />
        <div className="divider mt-4 w-100"></div>
        <button className="btn bg-primary text-light mt-3 py-2 px-5 center" onClick={signOut}>
          <LogoutOutlined />
          <span className="ms-2">{t('sign_out')}</span>
        </button>
        <p className="text-gray text-center mt-3">FAC GAMING - v1.0.0</p>
      </div>
    </ModalWrapper>
  );
}
