/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';
const GameRecordResource = require('../resourceAccess/GameRecordsResourceAccess');
const GameRecordFunctions = require('../GameRecordFunctions');
const UtilsFunction = require('../../ApiUtils/utilFunctions');
const { GAME_RECORD_STATUS } = require('../GameRecordConstant');

async function gameRecordList(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = {
        gameRecordStatus: GAME_RECORD_STATUS.COMPLETED,
        gameRecordUnit: req.payload.filter.gameRecordUnit,
      };
      let orderBy = {
        key: 'gameRecordSection',
        value: 'desc',
      };
      let gameRecords = await GameRecordResource.find(filter, 0, 100, orderBy);

      if (gameRecords && gameRecords.length > 0) {
        for (let i = 0; i < gameRecords.length; i++) {
          gameRecords[i] = {
            ...gameRecords[i],
            date: gameRecords[i].gameRecordSection, //YYYYMMDDHHmm
          };
          gameRecords[i].gameRecordNote = '';
        }

        let gameRecordsCount = await GameRecordResource.count(filter, orderBy);
        resolve({ data: gameRecords, total: gameRecordsCount[0].count });
      } else {
        resolve({ data: [], total: 0 });
      }
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}
async function gameSectionList(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let sectionList = [];
      let current = new Date();
      for (let i = 0; i < 60; i++) {
        current = current - 1 + 1000 * 60 + 1;
        current = new Date(current);
        let section = {
          label: `${current.getHours()}:${current.getMinutes()}:00`,
          value: `${current.getHours()}:${current.getMinutes()}:00`,
        };
        sectionList.push(section);
      }
      resolve({ data: sectionList, total: sectionList.count });
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

async function insert(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let gameData = req.payload;
      let newGameSection = gameData.gameRecordSection;
      let currentSection = new Date();
      currentSection.setHours(newGameSection.split(':')[0]);
      currentSection.setMinutes(newGameSection.split(':')[1]);

      const moment = require('moment');
      newGameSection = moment(currentSection).format('YYYYMMDDHHmm'); //`${currentSection.getHours()}:${currentSection.getMinutes()}:00`;

      let gameRecordType = {
        gameRecordTypeUp: gameData.gameRecordTypeUp,
        gameRecordTypeDown: gameData.gameRecordTypeDown,
        gameRecordTypeOdd: gameData.gameRecordTypeOdd,
        gameRecordTypeEven: gameData.gameRecordTypeEven,
      };

      let result = await GameRecordFunctions.addNewGameRecord(
        newGameSection,
        gameData.gameRecordPrice,
        gameData.gameRecordUnit,
        gameRecordType,
      );
      if (result) {
        resolve(result);
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

      let gameRecords = await GameRecordResource.find(filter, skip, limit, order);
      let gameRecordsCount = await GameRecordResource.count(filter, order);
      if (gameRecords && gameRecordsCount) {
        resolve({ data: gameRecords, total: gameRecordsCount[0].count });
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
      let gameRecordId = req.payload.id;
      let gameRecordData = req.payload.data;
      let result = await GameRecordResource.updateById(gameRecordId, gameRecordData);
      if (result) {
        resolve(result);
      } else {
        reject('failed');
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
      resolve('success');
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

async function insertMany(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let gameData = req.payload;
      let gameRecordCount = req.payload.gameRecordCount;

      let result = undefined;
      let newGameSection = gameData.gameRecordSection;

      let currentSection = new Date();
      currentSection.setHours(newGameSection.split(':')[0]);
      currentSection.setMinutes(newGameSection.split(':')[1]);

      let _countPerType = parseInt(gameRecordCount / 4) + 1;
      let _randomList = [];
      for (let i = 0; i < _countPerType; i++) {
        _randomList.push('1010');
        _randomList.push('1001');
        _randomList.push('0110');
        _randomList.push('0101');
        _randomList = UtilsFunction.shuffleArray(_randomList);
      }

      const moment = require('moment');
      for (let i = 0; i < gameRecordCount; i++) {
        currentSection = currentSection - 1 + 1000 * 60 + 1;
        currentSection = new Date(currentSection);
        let gameSection = moment(currentSection).format('YYYYMMDDHHmm'); //`${currentSection.getHours()}:${currentSection.getMinutes()}:00`;

        let _betValues = _randomList[i].split('');

        let gameRecordType = {
          gameRecordTypeUp: _betValues[0] * 1,
          gameRecordTypeDown: _betValues[1] * 1,
          gameRecordTypeOdd: _betValues[2] * 1,
          gameRecordTypeEven: _betValues[3] * 1,
        };

        result = await GameRecordFunctions.addNewGameRecord(gameSection, 0, gameData.gameRecordUnit, gameRecordType);
      }

      if (result) {
        resolve(result);
      } else {
        reject('failed');
      }
    } catch (e) {
      console.error(e);
      reject('failed');
    }
  });
}

async function gameChartRecordList(req) {
  return await GameRecordFunctions.getChartRecord(req.payload.cryptoCurrency);
}
module.exports = {
  insert,
  find,
  updateById,
  findById,
  gameRecordList,
  gameSectionList,
  insertMany,
  gameChartRecordList,
};
