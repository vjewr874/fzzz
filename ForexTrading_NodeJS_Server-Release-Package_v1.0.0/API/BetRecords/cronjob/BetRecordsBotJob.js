/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';
const BetRecordsFunction = require('../BetRecordsFunctions');
const { BET_TYPE, BET_UNIT } = require('../BetRecordsConstant');
const MQTTFunction = require('../../../ThirdParty/MQTTBroker/MQTTBroker');
const UtilFunctions = require('../../ApiUtils/utilFunctions');
const { getPriceByName, getCachedPriceByName } = require('../../CryptoCurrency/CryptoCurrencyFunctions');
const SystemStatus = require('../../Maintain/MaintainFunctions').systemStatus;

setInterval(botPlay, 500);

const BOT_ID = 1;
function botPlay() {
  if (SystemStatus.autobot === false) {
    return;
  }

  return new Promise(async (resolve, reject) => {
    try {
      let betRecordAmountIn = UtilFunctions.randomInt(20) * 100000;
      while (betRecordAmountIn < 100000) {
        betRecordAmountIn = UtilFunctions.randomInt(20) * 100000;
      }
      let randomType = UtilFunctions.randomInt(4);
      let randomUnit = UtilFunctions.randomInt(15);
      let betRecordType = BET_TYPE.UP;

      if (randomType === 1) {
        betRecordType = BET_TYPE.UP;
      } else if (randomType === 2) {
        betRecordType = BET_TYPE.DOWN;
      } else if (randomType === 3) {
        betRecordType = BET_TYPE.UP;
      } else {
        betRecordType = BET_TYPE.DOWN;
      }

      let betRecordUnit = BET_UNIT.BTC;
      if (randomUnit % 2 === 0) {
        betRecordUnit = BET_UNIT.BTC;
      }

      //BOT BET BTC - NO NEED TO RECORD BOT
      {
        // let result = await BetRecordsFunction.placeUserBet(appUserId, betRecordAmountIn, betRecordType, betRecordUnit);
        // if(result){
        let result = {
          createdAt: new Date().toISOString(),
          betRecordAmountIn: betRecordAmountIn,
          betRecordValue: getCachedPriceByName(betRecordUnit.split('-')[0]),
          betRecordType: betRecordType,
          betRecordUnit: betRecordUnit,
        };
        MQTTFunction.publishJson('LIVE_RECORD', result);
        // }
      }
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

module.exports = {
  botPlay,
};
