/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Page from '../../components/Page/Page';
import './styles/buy-lottery.scss';
import { DatePicker, Select, Switch, Tabs } from 'antd';
import currencyFormat from '../../ultils/CurrencyFormat';
import LotteryList from './components/LotteryList/LotteryList';
import { useHistory, useLocation } from 'react-router-dom';
import { routes } from '../../App';
import ModalSearchInfo from '../../components/Modal/components/ModalSearchInfo/ModalSearchInfo';
import WalletAmount from '../../components/WalletAmount/WalletAmount';

//icon
import icSearch from '../../assets/new-icons/ic-search.svg';
import icBuy from '../../assets/new-icons/ic-buy.svg';
// import Pagination from "../../components/Pagination/Pagination"
import BuyLotteryAPI from '../../services/buyLottery';
import { PRODUCT_CHANNEL } from '../../constants/province';
import moment from 'moment';
import { useUser } from '../../context/UserContext';
// import {convertDateDefault} from "../../ultils/convertDate"

function BuyLottery() {
  const istypeViewLottery = window.localStorage.getItem('istypeViewLottery');
  const { TabPane } = Tabs;
  const history = useHistory();
  const location = useLocation();
  const { user } = useUser();
  const searchParams = new URLSearchParams(location.search);
  const [active, setActive] = useState('0');
  const [shopCartList, setShopCartList] = useState([]);
  const [typeLottery, setTypeLottery] = useState(searchParams?.get('type') ? searchParams?.get('type') : 'SINGLE');
  const [isOpen, setIsOpen] = useState(false);
  const [lotteryList, setLotteryList] = useState([]);
  const [dataOrder, setDataOrder] = useState({});
  const [provinceList, setProvinceList] = useState([]);
  const [productTitle, setProductTitle] = useState(
    searchParams?.get('productTitle') ? searchParams?.get('productTitle') : undefined,
  );
  const [productChannel, setProductChanel] = useState();
  const [expireDate, setExpireDate] = useState(
    searchParams?.get('expireDate')
      ? searchParams?.get('expireDate')
      : new Date().getHours() > 16
      ? moment(new Date(new Date().getTime() + 86400000)).format('YYYY-MM-DD 07:00:00.000')
      : new Date().getHours() < 16
      ? moment(new Date()).format('YYYY-MM-DD 07:00:00.000')
      : new Date().getMinutes() > 15
      ? moment(new Date(new Date().getTime() + 86400000)).format('YYYY-MM-DD 07:00:00.000')
      : moment(new Date()).format('YYYY-MM-DD 07:00:00.000'),
  );
  const [typeViewLottery, setTypeViewLottery] = useState(istypeViewLottery === 'true' ? true : false);
  const typeLotteries = [
    {
      id: 1,
      label: 'Vé thường',
      value: 'SINGLE',
    },
    {
      id: 2,
      label: 'Vé Cặp nguyên',
      value: 'BATCH',
    },
  ];
  useEffect(() => {
    getDay();
  }, [expireDate]);
  useEffect(() => {
    if (provinceList?.length > 0) {
      const data = {
        filter: {
          productType: typeLottery,
          productChannel: provinceList[0].value,
          expireDate: moment(expireDate).format('YYYY-MM-DD 07:00:00.000'),
        },
        searchText: productTitle || undefined,
      };
      setProductChanel(provinceList[0].value);
      getLotteryList(data);
      finShopCart();
    }
  }, [provinceList]);

  const checkParams = filterParams => {
    const params = {};
    if (filterParams?.type) {
      params.type = filterParams.type;
    }
    if (filterParams?.productTitle) {
      params.productTitle = filterParams.productTitle;
    }
    const urlSearchParams = new URLSearchParams(params);
    history.replace({ pathname: location.pathname, search: urlSearchParams.toString() });
  };
  function getLotteryList(data) {
    BuyLotteryAPI.getLotteryList(data).then(r => {
      const { isSuccess, data } = r;
      if (isSuccess) {
        setLotteryList(data?.data);
      } else {
        setLotteryList([]);
      }
    });
  }
  function finShopCart() {
    const data = JSON.parse(localStorage.getItem(`buyLottery${user.username}`));
    if (data) {
      setDataOrder(data);
      setShopCartList([...data?.productSingleList, ...data?.productSpecialList]);
    }
  }

  function handleChangeType(value) {
    setTypeLottery(value);
    const data = {
      filter: {
        productType: value,
        productChannel: productChannel,
        expireDate: moment(expireDate).format('YYYY-MM-DD 07:00:00.000'),
      },
      searchText: productTitle || undefined,
    };
    checkParams({ productTitle: productTitle, type: value });
    getLotteryList(data);
  }

  function handleAccept(data) {
    if (shopCartList?.length > 0) {
      shopCartList.push(data);
    } else {
      const checkData = shopCartList?.find(item => item?.productId === data?.productId);
      if (!checkData) {
        shopCartList.push(data);
      }
    }
    setShopCartList([...shopCartList]);
    getTotalProduct(shopCartList);
  }

  function removeArr(index) {
    shopCartList.splice(index, 1);
    setShopCartList([...shopCartList]);
    getTotalProduct(shopCartList);
  }

  function getTotalProduct(data) {
    dataOrder.totalPrice = 0;
    dataOrder.productSingleList = [];
    dataOrder.productSpecialList = [];
    if (data?.length > 0) {
      data.forEach(product => {
        if (product?.productType === 'SINGLE') {
          dataOrder.totalPrice = dataOrder?.totalPrice + parseInt(product?.totalSinglePrice);
          dataOrder.productSingleList.push(product);
        } else if (product?.productType === 'BATCH') {
          dataOrder.totalPrice = dataOrder?.totalPrice + parseInt(product?.totalBatchPrice);
          dataOrder.productSpecialList.push(product);
        }
      });
    }
    setDataOrder({ ...dataOrder });
    handleShopCart(dataOrder);
  }

  function handleShopCart(data) {
    localStorage.removeItem(`buyLottery${user.username}`);
    localStorage.setItem(`buyLottery${user.username}`, JSON.stringify(data || dataOrder));
  }
  function changePage() {
    history.push(routes.shopCart.path);
  }
  function handleChangeDate(value) {
    setExpireDate(moment(value).format('YYYY-MM-DD 07:00:00.000'));
    const data = {
      filter: {
        productType: typeLottery,
        productChannel: productChannel,
        expireDate: moment(value).format('YYYY-MM-DD 07:00:00.000'),
      },
    };
    setActive('0');
    checkParams({ productTitle: productTitle, type: typeLottery });
    getLotteryList(data);
  }
  function getDay() {
    const date = new Date(moment.utc(expireDate).format()).getDay();
    switch (date) {
      case 0:
        setProvinceList([
          {
            id: 1,
            label: 'TIỀN GIANG',
            value: PRODUCT_CHANNEL.TIEN_GIANG,
          },
          {
            id: 2,
            label: 'KIÊN GIANG',
            value: PRODUCT_CHANNEL.KIEN_GIANG,
          },
          {
            id: 3,
            label: 'ĐÀ LẠT',
            value: PRODUCT_CHANNEL.DA_LAT,
          },
        ]);
        break;
      case 1:
        setProvinceList([
          {
            id: 1,
            label: 'TP.HCM',
            value: PRODUCT_CHANNEL.TPHCM,
          },
          {
            id: 2,
            label: 'ĐỒNG THÁP',
            value: PRODUCT_CHANNEL.DONG_THAP,
          },
          {
            id: 3,
            label: 'CÀ MAU',
            value: PRODUCT_CHANNEL.CA_MAU,
          },
        ]);
        break;
      case 2:
        setProvinceList([
          {
            id: 1,
            label: 'BẾN TRE',
            value: PRODUCT_CHANNEL.BEN_TRE,
          },
          {
            id: 2,
            label: 'VŨNG TÀU',
            value: PRODUCT_CHANNEL.VUNG_TAU,
          },
          {
            id: 3,
            label: 'BẠC LIÊU',
            value: PRODUCT_CHANNEL.BAC_LIEU,
          },
        ]);
        break;
      case 3:
        setProvinceList([
          {
            id: 1,
            label: 'ĐỒNG NAI',
            value: PRODUCT_CHANNEL.DONG_NAI,
          },
          {
            id: 2,
            label: 'CẦN THƠ',
            value: PRODUCT_CHANNEL.CAN_THO,
          },
          {
            id: 3,
            label: 'SÓC TRĂNG',
            value: PRODUCT_CHANNEL.SOC_TRANG,
          },
        ]);
        break;
      case 4:
        setProvinceList([
          {
            id: 1,
            label: 'TÂY NINH',
            value: PRODUCT_CHANNEL.TAY_NINH,
          },
          {
            id: 2,
            label: 'AN GIANG',
            value: PRODUCT_CHANNEL.AN_GIANG,
          },
          {
            id: 3,
            label: 'BÌNH THUẬN',
            value: PRODUCT_CHANNEL.BINH_THUAN,
          },
        ]);
        break;
      case 5:
        setProvinceList([
          {
            id: 1,
            label: 'VĨNH LONG',
            value: PRODUCT_CHANNEL.VINH_LONG,
          },
          {
            id: 2,
            label: 'BÌNH DƯƠNG',
            value: PRODUCT_CHANNEL.BINH_DUONG,
          },
          {
            id: 3,
            label: 'TRÀ VINH',
            value: PRODUCT_CHANNEL.TRA_VINH,
          },
        ]);
        break;
      case 6:
        setProvinceList([
          {
            id: 1,
            label: 'TP.HCM',
            value: PRODUCT_CHANNEL.TPHCM,
          },
          {
            id: 2,
            label: 'LONG AN',
            value: PRODUCT_CHANNEL.LONG_AN,
          },
          {
            id: 3,
            label: 'HẬU GIANG',
            value: PRODUCT_CHANNEL.HAU_GIANG,
          },
          {
            id: 4,
            label: 'BÌNH PHƯỚC',
            value: PRODUCT_CHANNEL.BINH_PHUOC,
          },
        ]);
        break;
      default:
        break;
    }
  }
  function handleSearch(value) {
    setProductTitle(value);
    const data = {
      filter: {
        productType: typeLottery,
        productChannel: productChannel,
        expireDate: moment(expireDate).format('YYYY-MM-DD 07:00:00.000'),
      },
      searchText: value || undefined,
    };
    checkParams({ productTitle: value, type: typeLottery });
    getLotteryList(data);
    setIsOpen(false);
  }

  function handleChangeTab(activeKey) {
    const data = {
      filter: {
        productType: typeLottery,
        productChannel: provinceList[activeKey].value,
        expireDate: moment(expireDate).format('YYYY-MM-DD 07:00:00.000'),
      },
      searchText: productTitle || undefined,
    };
    setProductChanel(provinceList[activeKey].value);
    checkParams({ productTitle: productTitle, type: typeLottery });
    getLotteryList(data);
  }
  const handleChangeViewLottery = checked => {
    setTypeViewLottery(checked);
    if (istypeViewLottery !== null) {
      window.localStorage.removeItem('istypeViewLottery');
    }
    window.localStorage.setItem('istypeViewLottery', checked);
  };
  return (
    <Page headerTitle={'K.T Miền Nam'} isShowShopCart={true}>
      <div id={'buy-lottery'}>
        <div className={'container-wallet'}>
          <WalletAmount type={'PointWallet'} title={'Ví chính'} />
          <div className={'btn-wallet'} onClick={() => setIsOpen(true)}>
            <div className={'icon-search background-image'} style={{ backgroundImage: `url('${icSearch}')` }} />
            <p>Tìm số</p>
          </div>
        </div>
        {productTitle !== undefined && productTitle !== '' && (
          <div className={'filter'}>
            <p className={'title'}>
              Tìm số: <span className={'content'}>{productTitle}</span>
            </p>
          </div>
        )}
        <div className={'type-view-lottery'}>
          <p className={'title'}>Hiển thị có vé</p>
          <Switch onChange={handleChangeViewLottery} className={'type-view-lottery-switch'} checked={typeViewLottery} />
        </div>
        <div className={'container-lotteries'}>
          <div className={'container-select'}>
            <div className={'select'}>
              <DatePicker
                className={'date-time'}
                placeholder={'Chọn ngày'}
                defaultValue={moment(expireDate, 'YYYY-MM-DD')}
                format={'DD-MM-YYYY'}
                disabledDate={current => {
                  if (parseInt(moment(new Date()).format('HH')) > 16) return current && current < moment().endOf('day');
                  else if (parseInt(moment(new Date()).format('HH')) === 16) {
                    if (parseInt(moment(new Date()).format('mm')) >= 15)
                      return current && current < moment().endOf('day');
                    return current && current < moment().startOf('day');
                  } else return current && current < moment().startOf('day');
                }}
                onChange={handleChangeDate}
              />
            </div>
            <div className={'select'}>
              <Select placeholder="Chọn loại vé" defaultValue={typeLottery} onChange={handleChangeType}>
                {typeLotteries?.map((item, index) => {
                  return (
                    <Select.Option value={item?.value} key={index}>
                      {item?.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className={'container-tab'}>
            {provinceList?.length > 0 && (
              <Tabs onTabClick={k => setActive(k)} activeKey={active} onChange={handleChangeTab}>
                {provinceList?.map((province, index) => {
                  return (
                    <TabPane tab={province?.label} key={index}>
                      <LotteryList
                        lotteries={lotteryList}
                        typeLottery={typeLottery}
                        handleAccept={handleAccept}
                        shopCartList={shopCartList}
                        typeViewLottery={typeViewLottery}
                        removeArr={index => removeArr(index)}
                      />
                    </TabPane>
                  );
                })}
              </Tabs>
            )}
          </div>
          <div className={`container-order-lottery ${shopCartList?.length > 0 ? 'show' : ''}`}>
            <div className={'container-amount'}>
              <p className={'title'}>Giá vé tạm tính</p>
              <p className={'amount'}>{currencyFormat(dataOrder?.totalPrice)} đ</p>
            </div>
            <div
              className={'btn btn-main btn-buy w-100 ml-0'}
              onClick={() => {
                handleShopCart();
                changePage();
              }}
            >
              <div className={'background-image icon-shopping'} style={{ backgroundImage: `url('${icBuy}')` }} />
              <p>Đặt vé</p>
            </div>
          </div>
        </div>
      </div>
      <ModalSearchInfo
        status={isOpen}
        title={'Con số của vé'}
        placeholder={'Nhập số muốn tìm'}
        productTitle={productTitle}
        closeDrawer={() => setIsOpen(false)}
        handleSearch={handleSearch}
      />
    </Page>
  );
}
export default BuyLottery;
