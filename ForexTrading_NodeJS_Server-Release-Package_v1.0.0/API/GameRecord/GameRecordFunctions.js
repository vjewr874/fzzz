/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';
const GameRecordsResourceAccess = require('./resourceAccess/GameRecordsResourceAccess');
const { GAME_RECORD_STATUS } = require('./GameRecordConstant');
const moment = require('moment');
const { randomInt } = require('../ApiUtils/utilFunctions');
const { BET_UNIT } = require('../BetRecords/BetRecordsConstant');

let coinRecord = {
  BTCGameRecord: [],
  ETHGameRecord: [],
  YFIGameRecord: [],
  BNBGameRecord: [],
  LTCGameRecord: [],
  DASHGameRecord: [],
  SOLGameRecord: [],
  AXSGameRecord: [],
  PAXGGameRecord: [],
  XRPGameRecord: [],
};

async function addNewGameRecord(gameRecordSection, gameRecordPrice, gameRecordUnit, gameRecordType) {
  let existedRecord = await GameRecordsResourceAccess.find({
    gameRecordSection: gameRecordSection,
    gameRecordUnit: gameRecordUnit,
  });

  //if it was predefined by admin, then update status to display it
  if (existedRecord && existedRecord.length > 0) {
    existedRecord = existedRecord[0];
    let gameRecordId = existedRecord.gameRecordId;
    delete existedRecord.gameRecordId;
    existedRecord.gameRecordStatus = GAME_RECORD_STATUS.NEW;
    existedRecord.gameRecordNote = 'Admin tạo ' + moment().format('HH:mm:ss');
    await GameRecordsResourceAccess.updateById(gameRecordId, existedRecord);
    return existedRecord;
  } else {
    //else add new records
    let newRecordData = {
      gameRecordSection: gameRecordSection,
      gameRecordUnit: gameRecordUnit,
      gameRecordTypeUp: gameRecordType.gameRecordTypeUp,
      gameRecordTypeDown: gameRecordType.gameRecordTypeDown,
      gameRecordTypeOdd: gameRecordType.gameRecordTypeOdd,
      gameRecordTypeEven: gameRecordType.gameRecordTypeEven,
      gameRecordNote: 'Admin tạo ' + moment().format('HH:mm:ss'),
    };

    if (gameRecordPrice) {
      newRecordData.gameRecordPrice = gameRecordPrice;
    }

    let newRecord = await GameRecordsResourceAccess.insert(newRecordData);
    return newRecord;
  }
}

function checkGameRecordResult(price) {
  let priceString = price + '';
  let lastValue = priceString[priceString.length - 1];
  let betUp = 0;
  let betDown = 0;
  let betOdd = 0;
  let betEven = 0;
  if (lastValue * 1 < 5) {
    betDown = 1;
  } else {
    betUp = 1;
  }

  if (lastValue % 2 === 0) {
    betEven = 1;
  } else {
    betOdd = 1;
  }

  let result = {
    gameRecordTypeUp: betUp,
    gameRecordTypeDown: betDown,
    gameRecordTypeOdd: betOdd,
    gameRecordTypeEven: betEven,
  };
  return result;
}

function addChartRecord(crypto, record) {
  const maxRecords = 100; //90 secondss
  let newRecord = {
    gameRecordPrice: record.price,
    gameRecordSection: moment(record.when).toISOString(),
  };

  const gameList = Object.keys(BET_UNIT);

  if (!gameList.length) {
    return;
  }

  for (let i = 0; i < gameList.length; i++) {
    if (crypto !== `${gameList[i]}`) {
      continue;
    }

    newRecord.gameRecordUnit = BET_UNIT[`${gameList[i]}`];
    let currentRecord = coinRecord[`${gameList[i]}GameRecord`];
    currentRecord.push(newRecord);
    if (currentRecord.length > maxRecords) {
      currentRecord.splice(0, 1);
    }

    break;
  }
}

function getChartRecord(crypto) {
  let chartRecord = {};
  for (let i = 0; i < gameList.length; i++) {
    if (crypto !== `${gameList[i]}`) {
      continue;
    }
    chartRecord = { data: coinRecord.ETHGameRecord, total: coinRecord.ETHGameRecord.length };
    break;
  }
  return chartRecord;
}

function makeRecordData(gameRecordPrice, gameRecordType, chartData) {
  console.info(`makeRecordData: ${gameRecordPrice}`);

  if (gameRecordPrice < 0.0000001 && chartData && chartData.price > 0) {
    gameRecordPrice = chartData.price;
    console.log(`gameRecordPrice: ${gameRecordPrice} - ${chartData.price}`);
  }

  let newRecordData = {
    gameRecordPrice: gameRecordPrice,
  };

  let _highPercentage = randomInt(100) / 100000;
  let _lowPercentage = randomInt(100) / 100000;
  if (chartData) {
    newRecordData.open = chartData.open;
    newRecordData.high = chartData.high;
    newRecordData.low = chartData.low;
    newRecordData.close = chartData.close;
  } else {
    newRecordData.open = gameRecordPrice;
    newRecordData.high = gameRecordPrice * 1 + gameRecordPrice * _highPercentage * 1;
    newRecordData.low = gameRecordPrice * 1 - gameRecordPrice * _lowPercentage * 1;
    newRecordData.close = gameRecordPrice * 1 + ((gameRecordPrice * _lowPercentage) / 2) * 1;
  }

  if (gameRecordType.gameRecordTypeUp) {
    if (newRecordData.close < newRecordData.open) {
      newRecordData.close = newRecordData.open * 1 + ((newRecordData.open * _lowPercentage) / 2) * 1;
    }
  } else {
    if (newRecordData.close > newRecordData.open) {
      newRecordData.close = newRecordData.open * 1 - ((newRecordData.open * _highPercentage) / 2) * 1;
    }
  }

  newRecordData.volume = randomInt(1000000);
  return newRecordData;
}

module.exports = {
  addNewGameRecord,
  checkGameRecordResult,
  addChartRecord,
  getChartRecord,
  makeRecordData,
};
