/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState, useEffect, useCallback } from 'react';
import { Button, InputNumber, Select, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import WalletBalanceUnitService from './../../services/walletBalanceUnit';
import { formatToUSDTPrice } from './../../helper/common';
import MaleIcon from '../../assets/icons/male.png';
import { useIntl } from 'react-intl';
const { Option } = Select;
const DEFAULT_FILTER = {
  filter: {},
  skip: 0,
  limit: 5,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};

function WelCome(props) {
  const [walletUserlist, setWalletUsetList] = useState({ data: [], total: 0 });
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isChange, setIsChange] = useState(false);

  // useIntl template
  const intl = useIntl();
  const t = useCallback(
    id => {
      return intl.formatMessage({ id });
    },
    [intl],
  );

  function WalletBalanceUnitList(filter) {
    WalletBalanceUnitService.getList(filter).then(result => {
      const { isSuccess, message, data } = result;
      if (!isSuccess || !data) {
        notification['error']({
          message: '',
          description: message || t('something_wrong'),
        });
        return;
      } else {
        setWalletUsetList(data);
      }
    });
  }

  useEffect(() => {
    WalletBalanceUnitList({
      ...DEFAULT_FILTER,
      limit: 100,
    });
  }, []);

  return (
    <>
      <div className="section home__demo">
        <div className="container">
          <div data-aos="fade-up">
            <div className="home__title home__title-upper">
              <span className="home__active">Kiểm tra</span> năng suất khai thác
            </div>
            <div className="home__sub home__sub-second">
              Kiểm tra Năng suất khai thác và giá trị đồng coin của bạn theo tỷ lệ thị trường mới nhất.
            </div>
            <div className="d-flex align-items-center justify-content-center py-5">
              <div className="home__demo__card">
                <div className="home__demo__content">
                  <div className="row">
                    <div style={{ marginTop: '10px' }} className="col-12 col-md-7">
                      <InputNumber
                        onChange={value => {
                          setIsChange(false);
                          setData({
                            ...data,
                            amount: value,
                          });
                        }}
                        size="large"
                        className="home__demo__input"
                        placeholder="Nhập số coin của bạn"
                      />
                    </div>
                    <div style={{ marginTop: '10px' }} className="col-12 col-md-3">
                      <Select
                        onChange={value => {
                          const coin = walletUserlist.data.find(item => item.walletBalanceUnitId === value);
                          setIsChange(false);
                          setData({
                            ...data,
                            coin,
                          });
                        }}
                        className="home__demo__input"
                        size="large"
                        placeholder="Loại ví"
                      >
                        {walletUserlist.data.map(item => (
                          <Option value={item.walletBalanceUnitId}>
                            <div style={{ height: '100%' }} className="d-flex align-items-center">
                              {item.walletBalanceUnitAvatar ? (
                                <img
                                  style={{ height: '20px', width: '20px' }}
                                  className="management__box__icon"
                                  src={item.walletBalanceUnitAvatar}
                                  alt="goi"
                                ></img>
                              ) : null}{' '}
                              <span className="">{item.walletBalanceUnitDisplayName}</span>
                            </div>
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div style={{ marginTop: '10px' }} className="col-12 col-md-2">
                      <Button
                        style={{ maxWidth: '300px' }}
                        className="login__button login__button-eleven blue_button d-flex align-items-center justify-content-center"
                        type="primary"
                        size="large"
                        onClick={() => {
                          setIsChange(true);
                        }}
                      >
                        Tính
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="home__demo__content home__demo__content-second">
                  <div className="home__demo__title">
                    <span class="home__active">DOANH THU DỰ KIẾN 24 GIỜ</span>
                  </div>
                  {data.coin && isChange ? (
                    <div className="home__demo__big">
                      <span style={{ color: '#000000' }} className="home__active">
                        {formatToUSDTPrice(data.coin.agencySellPrice * +data.amount)}
                      </span>
                    </div>
                  ) : null}

                  <div className="home__demo__title-sub">
                    Doanh thu sẽ thay đổi dựa trên độ khó khai thác và giá Thị trường.
                  </div>
                </div>
              </div>
              <div className="home__demo__card-2">
                <div className="home__demo__card-2__title">{t('weakly_organization')}</div>
                <div className="home__demo__card-2__container">
                  <div className="home__demo__card-2__user">
                    <div>01. </div>
                    <img className="home__demo__card-2__img" src={MaleIcon} alt="" />
                    <div>
                      <span className="home__demo__card-2__sub">Mr. Andy Vu</span>
                      <div>155.130 59 USDT</div>
                    </div>
                  </div>
                  <div className="home__demo__card-2__user">
                    <div>01. </div>
                    <img className="home__demo__card-2__img" src={MaleIcon} alt="" />
                    <div>
                      <span className="home__demo__card-2__sub">Mr. Andy Vu</span>
                      <div>155.130 59 USDT</div>
                    </div>
                  </div>
                  <div className="home__demo__card-2__user">
                    <div>01. </div>
                    <img className="home__demo__card-2__img" src={MaleIcon} alt="" />
                    <div>
                      <span className="home__demo__card-2__sub">Mr. Andy Vu</span>
                      <div>155.130 59 USDT</div>
                    </div>
                  </div>
                </div>
                <span>Xem thêm Giải thưởng -></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default WelCome;
