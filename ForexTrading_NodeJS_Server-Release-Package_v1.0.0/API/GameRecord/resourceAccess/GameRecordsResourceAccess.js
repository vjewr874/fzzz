/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

'use strict';
require('dotenv').config();
const { DB, timestamps } = require('../../../config/database');
const Common = require('../../Common/resourceAccess/CommonResourceAccess');
const { GAME_RECORD_STATUS } = require('../GameRecordConstant');

const tableName = 'GameRecords';
const primaryKeyField = 'gameRecordId';
async function createTable() {
  console.log(`createTable ${tableName}`);
  return new Promise(async (resolve, reject) => {
    DB.schema.dropTableIfExists(`${tableName}`).then(() => {
      DB.schema
        .createTable(`${tableName}`, function (table) {
          table.increments('gameRecordId').primary();
          table.string('gameRecordPrice').notNullable().defaultTo(0);
          table.integer('gameRecordTypeUp').notNullable().defaultTo(0);
          table.integer('gameRecordTypeDown').notNullable().defaultTo(0);
          table.integer('gameRecordTypeOdd').notNullable().defaultTo(0);
          table.integer('gameRecordTypeEven').notNullable().defaultTo(0);
          table.string('gameRecordUnit').notNullable();
          table.string('gameRecordSection').notNullable();
          table.string('gameRecordNote').defaultTo('');
          table.string('gameRecordStatus').defaultTo(GAME_RECORD_STATUS.NEW);
          table.float('open').defaultTo(0);
          table.float('close').defaultTo(0);
          table.float('high').defaultTo(0);
          table.float('low').defaultTo(0);
          table.float('volume', 24, 6).defaultTo(0);
          timestamps(table);
          table.index('gameRecordId');
          table.index('gameRecordPrice');
          table.index('gameRecordNote');
          table.index('gameRecordTypeUp');
          table.index('gameRecordTypeDown');
          table.index('gameRecordTypeOdd');
          table.index('gameRecordTypeEven');
          table.index('gameRecordUnit');
          table.index('gameRecordSection');
        })
        .then(async () => {
          console.info(`${tableName}`, `${tableName} table created done`);
          seeding().then(() => {
            resolve();
          });
        });
    });
  });
}

async function seeding() {
  let projectStatus = [
    {
      gameRecordPrice: 20000.3832,
      gameRecordTypeUp: 0,
      gameRecordTypeDown: 1,
      gameRecordTypeOdd: 0,
      gameRecordTypeEven: 1,
      gameRecordUnit: 'BTC-USDT',
      gameRecordSection: '20221122',
      gameRecordNote: 'Seeding tao',
      open: 20000.3002,
      close: 21000.3331,
      high: 22000.2222,
      low: 19000.2222,
      volume: 3000000,
    },
  ];
  return new Promise(async (resolve, reject) => {
    DB(`${tableName}`)
      .insert(projectStatus)
      .then(result => {
        console.info(`${tableName}`, `seeding ${tableName}` + result);
        resolve();
      });
  });
}

async function initDB() {
  await createTable();
}

async function insert(data) {
  return await Common.insert(tableName, data);
}

async function updateById(id, data) {
  let dataId = {};
  dataId[primaryKeyField] = id;
  return await Common.updateById(tableName, dataId, data);
}

async function find(filter, skip, limit, order) {
  return await Common.find(tableName, filter, skip, limit, order);
}

async function count(filter, order) {
  return await Common.count(tableName, primaryKeyField, filter, order);
}

async function sum(field, filter, order) {
  return await Common.sum(tableName, field, filter, order);
}

async function updateAll(filter, data) {
  return await Common.updateAll(tableName, data, filter);
}

module.exports = {
  insert,
  find,
  count,
  updateById,
  initDB,
  sum,
  updateAll,
};
