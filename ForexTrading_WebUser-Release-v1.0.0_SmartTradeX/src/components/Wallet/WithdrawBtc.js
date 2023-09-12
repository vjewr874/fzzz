/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Form, Input, InputNumber } from 'antd';
import { IconShield } from 'assets/icons';
import { useModal } from 'context/ModalContext';
import { useUser } from 'context/UserContext';
import { useWallet } from 'context/WalletContext';
import { formatToBTCPrice } from 'helper/common';
import TransactionHistory from 'Page/TransactionHistory';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import Badge from './Badge';
import ModalWrapper from './ModalWrapper';

export default function WithdrawBtc() {
  const { user } = useUser();
  const intl = useIntl();
  const modal = useModal();
  const {
    wallet: { btcBalance, withdrawBtc },
  } = useWallet();
  console.log(btcBalance);
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const [form] = Form.useForm();
  function handleSubmit(values) {
    withdrawBtc(values, () => {
      form.resetFields();
    });
  }
  function handleHistoryBtnClick() {
    modal.show({
      title: t('history_modal'),
      content: <TransactionHistory defaultActiveKey="8" />,
    });
  }
  function handleBadgeClick() {
    form.setFieldsValue({
      paymentAmount: btcBalance || 0,
    });
  }
  return (
    <ModalWrapper>
      <Form size="large" requiredMark={false} className="px-4" layout="vertical" form={form} onFinish={handleSubmit}>
        <p className="text-dark fw-semibold">{`${t('wallet_address')} (BTC)`}</p>
        <p className="text-primary px-2 py-2 bg-gray mt-2">{user?.diachiviBTC}</p>
        <div className="divider my-3"></div>
        <Form.Item
          name="paymentAmount"
          label={t('withdraw_amount')}
          placeholder="0"
          className="mb-1"
          rules={[
            {
              required: true,
              message: t('withdraw_amount_required'),
            },
            {
              type: 'number',
              min: 0.0005,
              message: t('min_withdraw_btc'),
            },
          ]}
        >
          <InputNumber
            addonBefore="BTC"
            addonAfter={<Badge onClick={handleBadgeClick} />}
            formatter={value => formatToBTCPrice(value, false, false)}
          />
        </Form.Item>
        <span className="text-blue">{`${t('remaining_balance')} ${formatToBTCPrice(btcBalance)}`}</span>
        <Form.Item
          name="secondaryPassword"
          label={t('withdraw_password')}
          className="mt-3"
          rules={[
            {
              required: true,
              message: t('withdraw_password_required'),
            },
            {
              min: 6,
              message: t('invalidPass'),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="center-vertical mt-5">
          <IconShield />
          <p className="ms-2">{t('deposit_note')}</p>
        </div>
        <button type="submit" className="btn btn-primary w-100 py-2 mt-3">
          {t('confirm')}
        </button>
        <div className="center-horizontal">
          <button type="button" className="btn btn-link text-dark mt-2" onClick={handleHistoryBtnClick}>
            {t('withdraw_btc_history')}
          </button>
        </div>
      </Form>
    </ModalWrapper>
  );
}
