/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

//Doi tien sang VND
// const currencyFormat = (value) => {
//     return new Intl.NumberFormat('en-US').format(value)
// }

const currencyFormat = value => {
  return value?.toLocaleString('en-US');
};

export const currencyFormatVND = value => {
  return new Intl.NumberFormat('en-US').format(Number(value)?.toFixed());
};

export const currencyFormatUSD = value => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
  }).format(Number(value)?.toFixed(2));
};

export const currencyFormatCrypto = value => {
  return value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
};

export const convertNumber = value => {
  while ((value + '').length < 4) value = '0' + value;
  return value?.toString()?.replace('', '#');
};

export default currencyFormat;
