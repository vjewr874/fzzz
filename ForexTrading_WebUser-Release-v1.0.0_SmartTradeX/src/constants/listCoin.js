/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import img_BTC from '../assets/stock-icons/ic-BTC.svg';
import img_ETH from '../assets/stock-icons/ic-ETH.svg';
import img_YFI from '../assets/stock-icons/ic-YFI.svg';
import img_BNB from '../assets/stock-icons/ic-BNB.svg';
import img_LTC from '../assets/stock-icons/ic-LTC.svg';
import img_DASH from '../assets/stock-icons/ic-DASH.svg';
import img_SOL from '../assets/stock-icons/ic-SOL.svg';
import img_AXS from '../assets/stock-icons/ic-AXS.svg';
import img_PAXG from '../assets/stock-icons/ic-PAXG.svg';
import img_XRP from '../assets/stock-icons/ic-XRP.svg';

export const COIN_LIST = [
  {
    label: 'Bitcoin',
    name: 'BTC',
    symbol: 'BTCUSDT',
    icon_url: img_BTC,
    type_coin: 'BTC-USD',
    paramBinance: 'btcusdt@ticker',
  },
  {
    label: 'Ethereum',
    name: 'ETH',
    symbol: 'ETHUSDT',
    icon_url: img_ETH,
    type_coin: 'ETH-USD',
    paramBinance: 'ethusdt@ticker',
  },
  {
    label: 'yearn.finance',
    name: 'YFI',
    symbol: 'YFIUSDT',
    icon_url: img_YFI,
    type_coin: 'YFI-USD',
    paramBinance: 'yfiusdt@ticker',
  },
  {
    label: 'BNB',
    name: 'BNB',
    symbol: 'BNBUSDT',
    icon_url: img_BNB,
    type_coin: 'BNB-USD',
    paramBinance: 'bnbusdt@ticker',
  },
  {
    label: 'Litecoin',
    name: 'LTC',
    symbol: 'LTCUSDT',
    icon_url: img_LTC,
    type_coin: 'LTC-USD',
    paramBinance: 'ltcusdt@ticker',
  },
  {
    label: 'Dash',
    name: 'DASH',
    symbol: 'DASHUSDT',
    icon_url: img_DASH,
    type_coin: 'DASH-USD',
    paramBinance: 'dashusdt@ticker',
  },
  {
    label: 'SOL',
    name: 'SOL',
    symbol: 'SOLUSDT',
    icon_url: img_SOL,
    type_coin: 'SOL-USD',
    paramBinance: 'solusdt@ticker',
  },
  {
    label: 'Axie Infinity',
    name: 'AXS',
    symbol: 'AXSUSDT',
    icon_url: img_AXS,
    type_coin: 'AXS-USD',
    paramBinance: 'axsusdt@ticker',
  },
  {
    label: 'PAXG Gold',
    name: 'PAXG',
    symbol: 'PAXGUSDT',
    icon_url: img_PAXG,
    type_coin: 'PAXG-USD',
    paramBinance: 'paxgusdt@ticker',
  },
  {
    label: 'XRP',
    name: 'XRP',
    symbol: 'XRPUSDT',
    icon_url: img_XRP,
    type_coin: 'XRP-USD',
    paramBinance: 'xrpusdt@ticker',
  },
];

export const BINANCE_PARAMS = [
  'btcusdt@ticker',
  'ethusdt@ticker',
  'yfiusdt@ticker',
  'bnbusdt@ticker',
  'ltcusdt@ticker',
  'dashusdt@ticker',
  'solusdt@ticker',
  'axsusdt@ticker',
  'paxgusdt@ticker',
  'xrpusdt@ticker',
];

export const COIN_CONSTANT = {
  BTCUSDT: 'BTCUSDT',
  ETHUSDT: 'ETHUSDT',
  YFIUSDT: 'YFIUSDT',
  BNBUSDT: 'BNBUSDT',
  LTCUSDT: 'LTCUSDT',
  DASHUSDT: 'DASHUSDT',
  SOLUSDT: 'SOLUSDT',
  AXSUSDT: 'AXSUSDT',
  PAXGUSDT: 'PAXGUSDT',
  XRPUSDT: 'XRPUSDT',
};
