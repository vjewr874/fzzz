/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';

const BalanceUnitResource = require('./resourceAccess/WalletBalanceUnitResourceAccess');

async function insertNewBalanceUnit(data) {
  let existingUnit = await BalanceUnitResource.find({
    walletBalanceUnitCode: data.walletBalanceUnitCode.toUpperCase(),
  });
  if (existingUnit && existingUnit.length > 0) {
    return [existingUnit[0].walletBalanceUnitId]; // làm này cho giống response của insert
  } else {
    let createdResult = await BalanceUnitResource.insert(data);
    return createdResult;
  }
}

module.exports = {
  insertNewBalanceUnit,
};
