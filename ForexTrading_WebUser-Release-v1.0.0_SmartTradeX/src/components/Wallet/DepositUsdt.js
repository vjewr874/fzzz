/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Form, Input, InputNumber } from 'antd';
import { IconShield } from 'assets/icons';
import { useModal } from 'context/ModalContext';
import { useWallet } from 'context/WalletContext';
import { formatToUSDTPrice } from 'helper/common';
import TransactionHistory from 'Page/TransactionHistory';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import ModalWrapper from './ModalWrapper';

export default function DepositUsdtForm() {
  const [form] = Form.useForm();
  const modal = useModal();
  const {
    wallet: { depositUsdt },
  } = useWallet();
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  function handleSubmit(values) {
    depositUsdt(values, () => {
      form.resetFields();
    });
  }
  function handleHistoryBtnClick() {
    modal.show({
      title: t('history_modal'),
      content: <TransactionHistory />,
    });
  }
  const handleInputNumber = value => {
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(value) || value === '' || value === '-') {
      console.log('test đúng ', value);
      form.setFieldsValue({ paymentAmount: value });
    } else {
      console.log('test sai ', value);
    }
  };
  return (
    <ModalWrapper>
      <Form size="large" requiredMark={false} className="px-4" layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="paymentAmount"
          label={t('deposit_amount2')}
          rules={[
            {
              required: true,
              message: t('deposit_amount_required'),
            },
          ]}
        >
          <InputNumber
            addonBefore="USDT"
            placeholder="0"
            formatter={value => formatToUSDTPrice(value, false, false)}
            onChange={handleInputNumber}
          />
        </Form.Item>
        <Form.Item
          name="paymentRef"
          label={t('transaction_id')}
          rules={[
            {
              required: true,
              message: t('transaction_id_required'),
            },
          ]}
        >
          <Input placeholder={t('transaction_id')} />
        </Form.Item>
        <div className="center-vertical mt-4">
          <IconShield />
          <p className="ms-2">{t('deposit_note')}</p>
        </div>
        <button type="submit" className="btn btn-primary w-100 py-2 mt-3">
          {t('confirm')}
        </button>
        <div className="center-horizontal">
          <button type="button" className="btn btn-link text-dark mt-2" onClick={handleHistoryBtnClick}>
            {t('usdt_deposit_history')}
          </button>
        </div>
      </Form>
    </ModalWrapper>
  );
}
