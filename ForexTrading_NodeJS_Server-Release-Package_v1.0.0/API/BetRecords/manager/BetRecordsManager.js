/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';
const BetRecordsResourceAccess = require('../resourceAccess/BetRecordsResourceAccess');
const UserBetRecordsView = require('../resourceAccess/UserBetRecordsView');
const BetRecordsFunction = require('../BetRecordsFunctions');
const MQTTFunction = require('../../../ThirdParty/MQTTBroker/MQTTBroker');
const BetRecordsAutobot = require('../cronjob/BetRecordsBotJob');
const BetRecodsModel = require('../model/BetRecordsModel');

async function insert(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let appUserId = req.currentUser.appUserId;
      let betRecordAmountIn = req.payload.betRecordAmountIn;
      let betRecordType = req.payload.betRecordType;
      let betRecordUnit = req.payload.betRecordUnit;
      let result = await BetRecordsFunction.placeUserBet(
        appUserId,
        betRecordAmountIn,
        betRecordType,
        betRecordUnit,
        req.currentUser.referUserId,
      );
      let winRate = 90 / 100; //90% bet money

      if (result) {
        let winPoint = betRecordAmountIn + betRecordAmountIn * winRate;
        result = {
          createdAt: new Date().toISOString(),
          betRecordAmountOut: winPoint,
          betRecordAmountIn: betRecordAmountIn,
          betRecordType: betRecordType,
          betRecordUnit: betRecordUnit,
          ID: result[0],
        };
        resolve(result);
        // khong can push moi nua
        // MQTTFunction.publishJson("LIVE_RECORD", result);
      } else {
        reject('failed');
      }
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

async function find(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = req.payload.filter;
      let skip = req.payload.skip;
      let limit = req.payload.limit;
      let order = req.payload.order;
      let startDate = req.payload.startDate;
      let endDate = req.payload.endDate;

      //if agent call this method to get list
      //then we only response list referred user of this agent
      if (req.currentUser.userAgentId && req.currentUser.userAgentId > 0) {
        filter.referUserId = req.currentUser.userAgentId;
        delete filter.referUser;
      }

      let betRecordList = await UserBetRecordsView.customSearch(filter, skip, limit, startDate, endDate, order);

      if (betRecordList && betRecordList.length > 0) {
        let betRecordCount = await UserBetRecordsView.customCount(filter, startDate, endDate);
        let betRecordSum = await UserBetRecordsView.sum('betRecordAmountIn', filter, order);

        for (let i = 0; i < betRecordList.length; i++) {
          betRecordList[i] = BetRecodsModel.fromData(betRecordList[i]);
        }
        resolve({ data: betRecordList, total: betRecordCount[0].count, totalSum: betRecordSum[0].sumResult });
      } else {
        resolve({ data: [], total: 0, totalSum: 0 });
      }
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

async function staffFind(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = req.payload.filter;
      let skip = req.payload.skip;
      let limit = req.payload.limit;
      let order = req.payload.order;
      let startDate = req.payload.startDate;
      let endDate = req.payload.endDate;

      if (!filter) {
        filter = {};
      }

      //if agent call this method to get list
      //then we only response list referred user of this agent
      if (req.currentUser.userAgentId && req.currentUser.userAgentId > 0) {
        filter.referUserId = req.currentUser.userAgentId;
        delete filter.referUser;
      }

      let betRecordList = await UserBetRecordsView.customSearch(filter, skip, limit, startDate, endDate, order);

      if (betRecordList && betRecordList.length > 0) {
        let betRecordCount = await UserBetRecordsView.customCount(filter, startDate, endDate);
        let betRecordSum = await UserBetRecordsView.sum('betRecordAmountIn', filter, order);

        for (let i = 0; i < betRecordList.length; i++) {
          betRecordList[i] = BetRecodsModel.fromData(betRecordList[i]);
        }
        resolve({ data: betRecordList, total: betRecordCount[0].count, totalSum: betRecordSum[0].sumResult });
      } else {
        resolve({ data: [], total: 0, totalSum: 0 });
      }
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

async function findLive(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = req.payload.filter;
      let limit = req.payload.limit;

      let betRecordList = await UserBetRecordsView.find(filter, 0, limit);
      let betRecordCount = betRecordList.length;
      if (betRecordList && betRecordCount) {
        for (let i = 0; i < betRecordList.length; i++) {
          betRecordList[i] = BetRecodsModel.fromData(betRecordList[i]);
        }
        resolve({ data: betRecordList, total: betRecordCount });
      } else {
        resolve({ data: [], total: 0 });
      }
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

async function updateById(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let updateResult = await BetRecordsResourceAccess.updateById(req.payload.id, req.payload.data);
      if (updateResult) {
        resolve(updateResult);
      } else {
        resolve({});
      }
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

async function findById(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let betRecordList = await UserBetRecordsView.find({ betRecordId: req.payload.id });
      if (betRecordList) {
        for (let i = 0; i < betRecordList.length; i++) {
          betRecordList[i] = BetRecodsModel.fromData(betRecordList[i]);
        }
        resolve(betRecordList[0]);
      } else {
        resolve({});
      }
      resolve('success');
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

async function summaryUser(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let startDate = req.payload.startDate;
      let endDate = req.payload.endDate;
      let filter = req.payload.filter;
      filter.appUserId = req.currentUser.appUserId;

      let result = await BetRecordsResourceAccess.sumaryPointAmount(startDate, endDate, filter);
      if (result) {
        resolve(result[0]);
      } else {
        reject('failed');
      }
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

async function summaryAll(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let startDate = req.payload.startDate;
      let endDate = req.payload.endDate;
      let filter = req.payload.filter;

      let result = await BetRecordsResourceAccess.sumaryPointAmount(startDate, endDate, filter);
      if (result) {
        resolve(result[0]);
      } else {
        reject('failed');
      }
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

async function userPlaceBetRecord(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let appUserId = req.currentUser.appUserId;
      let betRecordAmountIn = req.payload.betRecordAmountIn;
      let betRecordType = req.payload.betRecordType;
      let betRecordUnit = req.payload.betRecordUnit;
      let result = await BetRecordsFunction.placeUserBet(
        appUserId,
        betRecordAmountIn,
        betRecordType,
        betRecordUnit,
        req.currentUser.referUserId,
      );

      if (result) {
        result = {
          createdAt: new Date().toISOString(),
          betRecordAmountIn: betRecordAmountIn,
          betRecordType: betRecordType,
          betRecordUnit: betRecordUnit,
          ID: result[0],
        };
        resolve(result);
        // khong can push moi nua
        // MQTTFunction.publishJson("LIVE_RECORD", result);
      } else {
        reject('failed');
      }
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

async function userGetList(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = req.payload.filter;
      let skip = req.payload.skip;
      let limit = req.payload.limit;
      let order = req.payload.order;
      let startDate = req.payload.startDate;
      let endDate = req.payload.endDate;
      //if agent call this method to get list
      //then we only response list referred user of this agent
      if (req.currentUser.userAgentId && req.currentUser.userAgentId > 0) {
        filter.referUserId = req.currentUser.userAgentId;
        delete filter.referUser;
      }

      let betRecordList = await UserBetRecordsView.customSearch(filter, skip, limit, startDate, endDate, order);

      if (betRecordList && betRecordList.length > 0) {
        let betRecordCount = await UserBetRecordsView.customCount(filter, startDate, endDate);
        let betRecordSum = await UserBetRecordsView.sum('betRecordAmountIn', filter, order);

        for (let i = 0; i < betRecordList.length; i++) {
          betRecordList[i] = BetRecodsModel.fromData(betRecordList[i]);
        }
        resolve({ data: betRecordList, total: betRecordCount[0].count, totalSum: betRecordSum[0].sumResult });
      } else {
        resolve({ data: [], total: 0, totalSum: 0 });
      }
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}
module.exports = {
  insert,
  find,
  updateById,
  findById,
  summaryAll,
  summaryUser,
  findLive,
  staffFind,
  userPlaceBetRecord,
  userGetList,
};
