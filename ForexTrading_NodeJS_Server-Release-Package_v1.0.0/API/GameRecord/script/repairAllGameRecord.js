/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';
const { getDataByName } = require('../../CryptoCurrency/CryptoCurrencyFunctions');
const { makeRecordData } = require('../GameRecordFunctions');
const GameRecordResource = require('../resourceAccess/GameRecordsResourceAccess');

async function repairAllGameRecord() {
  let counter = 0;
  while (true) {
    let _existingRecord = await GameRecordResource.find({}, counter, 1, {
      key: 'gameRecordSection',
      value: 'desc',
    });
    if (!_existingRecord || _existingRecord.length <= 0) {
      break;
    }
    _existingRecord = _existingRecord[0];
    console.log(`gameRecordSection ${counter}: ${_existingRecord.gameRecordSection}`);
    let _gameRecordType = {
      gameRecordTypeUp: _existingRecord.gameRecordTypeUp,
      gameRecordTypeDown: _existingRecord.gameRecordTypeDown,
      gameRecordTypeOdd: _existingRecord.gameRecordTypeOdd,
      gameRecordTypeEven: _existingRecord.gameRecordTypeEven,
    };

    let __volumeData = await getDataByName(_existingRecord.gameRecordUnit.split('-')[0]);
    let _newRecordData = makeRecordData(_existingRecord.gameRecordPrice, _gameRecordType, __volumeData);

    console.log(`gameRecordTypeUp: ${_gameRecordType.gameRecordTypeUp}`);
    console.log(`${_existingRecord.gameRecordPrice} - ${_newRecordData.gameRecordPrice}`);
    console.log(`${_existingRecord.open} - ${_newRecordData.open}`);
    console.log(`${_existingRecord.close} - ${_newRecordData.close}`);
    console.log(`${_existingRecord.high} - ${_newRecordData.high}`);
    console.log(`${_existingRecord.low} - ${_newRecordData.low}`);
    console.log(`${_existingRecord.open > _existingRecord.close}`);
    console.log(`${_newRecordData.open > _newRecordData.close}`);
    await GameRecordResource.updateById(_existingRecord.gameRecordId, {
      open: _existingRecord.open,
      high: _existingRecord.high,
      close: _existingRecord.close,
      low: _existingRecord.low,
      gameRecordPrice: _existingRecord.gameRecordPrice,
    });
    counter++;
  }
}

repairAllGameRecord();
