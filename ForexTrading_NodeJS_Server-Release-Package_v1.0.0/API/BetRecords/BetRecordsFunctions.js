/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';

const BetRecordsResource = require('./resourceAccess/BetRecordsResourceAccess');
const { BET_STATUS } = require('./BetRecordsConstant');
const WalletResource = require('../Wallet/resourceAccess/WalletResourceAccess');
const MQTTFunction = require('../../ThirdParty/MQTTBroker/MQTTBroker');
const PaymentBonusTransactionFunctions = require('../PaymentBonusTransaction/PaymentBonusTransactionFunctions');
const { WALLET_TYPE } = require('../Wallet/WalletConstant');
const WalletRecordFunctions = require('../WalletRecord/WalletRecordFunction');
const { WALLET_RECORD_TYPE } = require('../WalletRecord/WalletRecordConstant');

function getCurrentBetSection() {
  // let currentTime = new Date();
  const moment = require('moment');
  let newSection = moment().add(1, 'minute').format('YYYYMMDDHHmm');
  // let currentMinutes = currentTime.getMinutes() * 1 + 1;
  // let currentHour = currentTime.getHours();
  // if (currentMinutes >= 60) {
  //   currentMinutes = 0;
  //   currentHour = currentHour + 1;
  //   if (currentHour >= 24) {
  //     currentHour = 0;
  //   }
  // }
  // return `${currentHour}:${currentMinutes}:00`;

  return newSection;
}

async function _placeNewBet(appUserId, betRecordAmountIn, betRecordType, betRecordUnit, referUserId) {
  let newBetData = {
    appUserId: appUserId,
    betRecordSection: getCurrentBetSection(),
    betRecordAmountIn: betRecordAmountIn,
    betRecordType: betRecordType,
    betRecordUnit: betRecordUnit,
  };
  if (referUserId && referUserId > 0) {
    newBetData.referId = referUserId;
  }
  let newBetResult = await BetRecordsResource.insert(newBetData);
  return newBetResult;
}

async function _updateCurrentBet(currentBetRecord, betRecordAmountIn, betRecordType, betRecordUnit) {
  let newBetData = {
    betRecordSection: currentBetRecord.betRecordSection,
    betRecordAmountIn: betRecordAmountIn,
    betRecordType: betRecordType,
  };

  let newBetResult = await BetRecordsResource.updateById(currentBetRecord.betRecordId, newBetData);
  return newBetResult;
}

async function placeUserBet(appUserId, betRecordAmountIn, betRecordType, betRecordUnit, referUserId) {
  if (!appUserId || appUserId < 1) {
    console.error('null userid can not place bet');
    return undefined;
  }

  let wallet = await WalletResource.find({ appUserId: appUserId, walletType: WALLET_TYPE.POINT });
  if (!wallet || wallet.length < 1) {
    console.error('null wallet can not place bet');
    return undefined;
  }

  wallet = wallet[0];

  if (wallet.balance >= betRecordAmountIn) {
    await WalletRecordFunctions.decreaseBalance(
      appUserId,
      wallet.walletType,
      WALLET_RECORD_TYPE.MAKE_PAYMENT,
      betRecordAmountIn,
    );
  }
  // let betRecord = await BetRecordsResource.find({
  //   appUserId: appUserId,
  //   betRecordSection: getCurrentBetSection(),
  //   betRecordUnit: betRecordUnit,
  //   betRecordType: betRecordType,
  // });

  // if(!betRecord || betRecord.length < 1) {
  return await _placeNewBet(appUserId, betRecordAmountIn, betRecordType, betRecordUnit, referUserId);
  // } else {
  //   betRecord = betRecord[0];
  //   return await _updateCurrentBet(betRecord, betRecordAmountIn, betRecordType);
  // }
}

async function loseBetRecord(betRecordType, betRecordUnit, betRecordSection, gameCurrentPrice) {
  console.log(`loseBetRecord ${betRecordType} ${betRecordUnit} ${betRecordSection} - ${gameCurrentPrice}`);
  let failResult = {
    betRecordResult: 'lose',
    betRecordStatus: BET_STATUS.COMPLETED,
  };
  let filter = {
    betRecordType: betRecordType,
    betRecordUnit: betRecordUnit,
    betRecordSection: betRecordSection,
    betRecordStatus: BET_STATUS.NEW,
  };

  let failRecords = await BetRecordsResource.findAllTodayNewBet(filter);
  console.log(`failRecords: ${failRecords.length}`);

  for (let i = 0; i < failRecords.length; i++) {
    const record = failRecords[i];

    MQTTFunction.publishJson(`USER_${record.appUserId}`, {
      when: new Date() - 1,
      amount: record.betRecordAmountIn,
      result: 'lose',
      value: gameCurrentPrice,
    });
  }
  await BetRecordsResource.updateAllBet(failResult, filter);
}

async function winBetRecord(betRecordType, betRecordUnit, betRecordSection, gameCurrentPrice) {
  console.log(`winBetRecord ${betRecordType} ${betRecordUnit} ${betRecordSection} - ${gameCurrentPrice}`);
  let winResult = {
    betRecordResult: 'win',
    betRecordStatus: BET_STATUS.COMPLETED,
  };

  let filter = {
    betRecordType: betRecordType,
    betRecordUnit: betRecordUnit,
    betRecordSection: betRecordSection,
    betRecordStatus: BET_STATUS.NEW,
  };

  let winRate = 90 / 100; //90% bet money

  let betRecords = await BetRecordsResource.findAllTodayNewBet(filter);
  console.log(`betRecords: ${betRecords.length}`);
  if (betRecords && betRecords.length > 0) {
    for (let i = 0; i < betRecords.length; i++) {
      const betRecord = betRecords[i];
      let winPoint = betRecord.betRecordAmountIn + betRecord.betRecordAmountIn * winRate;

      let newRecordDate = {
        ...winResult,
        betRecordWin: winPoint,
      };

      await PaymentBonusTransactionFunctions.PaySystemBonusForUserByMemberReferIdF(
        betRecord.appUserId,
        betRecord.betRecordAmountIn * winRate,
      );
      //Update bet record result to WIN
      await BetRecordsResource.updateById(betRecord.betRecordId, newRecordDate);

      //Pay win money for user
      let wallet = await WalletResource.find({ appUserId: betRecord.appUserId, walletType: WALLET_TYPE.POINT });
      if (!wallet || wallet.length < 1) {
        console.error('null wallet can not place bet');
        return undefined;
      }

      wallet = wallet[0];
      await WalletResource.incrementBalance(wallet.walletId, winPoint);
      MQTTFunction.publishJson(`USER_${betRecord.appUserId}`, {
        when: new Date() - 1,
        amount: winPoint,
        result: 'win',
        value: gameCurrentPrice,
      });
    }
  }
}

module.exports = {
  placeUserBet,
  getCurrentBetSection,
  winBetRecord,
  loseBetRecord,
};
