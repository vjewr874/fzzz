/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { ArrowDownOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Form, Input, InputNumber } from 'antd';
import { routes } from 'App';
import { useModal } from 'context/ModalContext';
import { useSystem } from 'context/SystemContext';
import { useWallet } from 'context/WalletContext';
import { formatToUSDTPrice } from 'helper/common';
import { formatToFACPrice, formatToPrice } from 'helper/common';
import TransactionHistory from 'Page/TransactionHistory';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import swal from 'sweetalert';
import Badge from './Badge';
import ModalWrapper from './ModalWrapper';

export default function ExchangeFac({ history }) {
  const intl = useIntl();
  const modal = useModal();
  const { facPrice } = useSystem();
  const {
    wallet: { facBalance, exchangeFac },
  } = useWallet();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const [form] = Form.useForm();
  function handleSubmit(values) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
    <div class="packet__approve__content">
      <p>${t('confirm_exchange_fac_content')}</p>
    </div>
    `;
    swal({
      html: true,
      className: 'packet__approve',
      title: t('confirm_withDraw'),
      content: wrapper,
      icon: 'warning',
      dangerMode: false,
      buttons: [t('cancel'), t('confirm')],
      confirmButtonText: t('confirm'),
      cancelButtonText: t('cancel'),
      showCloseButton: true,
      showCancelButton: true,
      type: 'info',
    }).then(willDelete => {
      if (willDelete) {
        exchangeFac(values, () => {
          form.resetFields();
        });
      }
    });
  }
  function handleExchangeHistoryClick() {
    modal.show({
      title: t('history_modal'),
      content: <TransactionHistory defaultActiveKey="4" />,
    });
  }
  function handleBadgeClick() {
    form.setFieldsValue({
      paymentAmount: facBalance,
      paymentToAmount: facBalance * facPrice,
    });
  }
  function handleFieldChange(type, value) {
    switch (type) {
      case 'fac':
        form.setFieldsValue({
          paymentToAmount: formatToUSDTPrice(value * facPrice, false, false),
        });
        break;
      case 'usdt':
        form.setFieldsValue({
          paymentAmount: formatToPrice(value, false, false),
        });
        break;
      default:
        break;
    }
  }
  function handleBtnOutlinedClick(e) {
    history.push(routes.managementPackageBonus.path);
    modal.hide();
  }
  return (
    <ModalWrapper>
      <Form size="large" requiredMark={true} className="px-4" layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="paymentAmount"
          label={t('exchange_fac_amount')}
          className="mb-1"
          rules={[
            {
              required: true,
              message: t('exchange_fac_amount_required'),
            },
            {
              validator(_, value) {
                if (isNaN(value)) return Promise.reject();
                if (parseFloat(value) <= facBalance) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Số lượng vượt quá mức hiện tại'));
              },
            },
          ]}
        >
          <InputNumber
            addonBefore="FAC"
            addonAfter={<Badge onClick={handleBadgeClick} />}
            placeholder="0"
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={value => handleFieldChange('fac', value)}
            formatter={value => formatToFACPrice(value, false, false)}
          />
        </Form.Item>
        <span className="text-blue">{`${t('remaining_balance')} ${formatToPrice(facBalance)}`}</span>
        <div className="center-vertical my-3">
          <div className="center w-100">
            <div className="divider border-top-blue pe-2 w-50"></div>
            <button className="btn btn-outline-blue p-2 rounded-circle center">
              <ArrowDownOutlined className="text-blue fs-6" />
            </button>
            <div className="divider border-top-blue ps-2 w-50"></div>
          </div>
        </div>
        <Form.Item name="paymentToAmount" className="mb-1" label={t('receive_usdt_amount')}>
          <InputNumber
            addonBefore="USDT"
            placeholder="0"
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={handleFieldChange}
            formatter={value => formatToUSDTPrice(value, false, false)}
          />
        </Form.Item>
        <span className="text-blue">{`${t('current_fac_price')}: 1 FAC = ${formatToUSDTPrice(facPrice)}`}</span>
        <div className="center-vertical bg-orange-200 text-orange py-2 px-3 mt-3">
          <ExclamationCircleFilled />
          <p className="ms-2">{t('fac_note')}</p>
        </div>
        <button type="submit" className="btn btn-primary w-100 py-2 mt-3">
          {t('confirm')}
        </button>
        <button type="button" className="btn btn-outline-primary w-100 py-2 mt-3" onClick={handleBtnOutlinedClick}>
          {t('fac_increase_performance')}
        </button>
        <div className="center-horizontal">
          <button type="button" className="btn btn-link text-dark mt-2" onClick={handleExchangeHistoryClick}>
            {t('exchange_history')}
          </button>
        </div>
      </Form>
    </ModalWrapper>
  );
}
