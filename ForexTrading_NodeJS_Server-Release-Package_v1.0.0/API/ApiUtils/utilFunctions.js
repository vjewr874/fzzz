/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';
const moment = require('moment');
function nonAccentVietnamese(str) {
  if (!str) {
    return str;
  }
  str = str.toLowerCase();
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function removeSpecialChars(str) {
  let outString = str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  return outString;
}

function convertToURLFormat(str) {
  let outString = removeSpecialChars(str);
  return '/' + encodeURI(replaceAll(outString, ' ', '-'));
}

async function chunkArray(arrData, chunkSize) {
  var arrayResult = [];
  for (var i = 0; i < arrData.length; i += chunkSize) {
    arrayResult.push(arrData.slice(i, i + chunkSize));
  }
  return arrayResult;
}
function FormatDate(date, resultFormat) {
  var newDate = moment(date, 'YYYY-MM-DD');
  var newDateFormat = newDate.format(`${resultFormat}`);
  return newDateFormat;
}

function padLeadingZeros(num, size, char = '0') {
  var s = num + '';
  while (s.length < size) s = char + s;
  return s;
}

async function executeAllPromise(promiseList) {
  if (promiseList && promiseList.length > 0) {
    return new Promise((resolve, reject) => {
      Promise.all(promiseList).then(values => {
        resolve(values);
      });
    });
  } else {
    return undefined;
  }
}

function randomInt(max) {
  let value = max;
  for (let i = 0; i < 100; i++) {
    value = Math.floor(Math.random() * max);
  }
  return value;
}

function randomIntByMinMax(min, max) {
  // min and max included
  let value = max;
  for (let i = 0; i < 100; i++) {
    value = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return value;
}

//The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

module.exports = {
  nonAccentVietnamese,
  replaceAll,
  convertToURLFormat,
  randomInt,
  randomIntByMinMax,
  chunkArray,
  FormatDate,
  padLeadingZeros,
  executeAllPromise,
  shuffleArray,
};
