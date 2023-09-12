/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import moment from 'moment';

export const convertDate = value => {
  return moment(value?.toString()).format('DD/MM/YYYY');
};
export const convertDateDefault = value => {
  return moment(value?.toString()).format('YYYY/MM/DD');
};
export const convertMonth = value => {
  return moment(value?.toString()).format('MM-YYYY');
};

export const convertTimeDate = value => {
  return moment(value).format('YYYY-MM-DD HH:mm:ss');
};
export const convertTime = value => {
  return moment(value).format('HH:mm');
};
export const convertDayDate = value => {
  return moment(value?.toString()).format(`T${value.getDay() + 1}: DD-MM-YYYY`);
};
export const convertDayDate1 = value => {
  return moment(value?.toString()).format(`T${value.getDay() + 1} DD-MM-YYYY`);
};
export const convertDay = value => {
  return moment(value?.toString()).format(`T${value.getDay() + 1}`);
};

export const convertDateTime = time => {
  let strDate, strMonth;
  let date = new Date(time).getDate();
  let month = new Date(time).getMonth() + 1;
  const year = new Date(time).getFullYear();

  strDate = date.toString();
  switch (month) {
    case 1:
      strMonth = 'January';
      break;
    case 2:
      strMonth = 'February';
      break;
    case 3:
      strMonth = 'March';
      break;
    case 4:
      strMonth = 'April';
      break;
    case 5:
      strMonth = 'May';
      break;
    case 6:
      strMonth = 'June';
      break;
    case 7:
      strMonth = 'July';
      break;
    case 8:
      strMonth = 'August';
      break;
    case 9:
      strMonth = 'September';
      break;
    case 10:
      strMonth = 'October';
      break;
    case 11:
      strMonth = 'November';
      break;
    case 12:
      strMonth = 'December';
      break;
    default:
      strMonth = '';
      break;
  }

  if (date < 10) {
    strDate = `0${date}`;
  }

  return `${strMonth} ${strDate}, ${year}`;
};
