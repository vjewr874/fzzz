/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

'use strict';
require('dotenv').config();

const Logger = require('../../../utils/logging');
const { DB, timestamps } = require('../../../config/database');
const Common = require('../../Common/resourceAccess/CommonResourceAccess');
const { MESSAGE_STATUS, MESSAGE_CATEGORY, MESSAGE_TOPIC, MESSAGE_TYPE } = require('../CustomerMessageConstant');
const tableName = 'GroupCustomerMessage';
const primaryKeyField = 'groupCustomerMessageId';

async function createTable() {
  Logger.info('ResourceAccess', `createTable ${tableName}`);
  return new Promise(async (resolve, reject) => {
    DB.schema.dropTableIfExists(`${tableName}`).then(() => {
      DB.schema
        .createTable(`${tableName}`, function (table) {
          table.increments('groupCustomerMessageId').primary();
          table.string('groupCustomerMessageCategories').defaultTo(MESSAGE_CATEGORY.FIREBASE_PUSH);
          table.string('groupCustomerMessageTopic').defaultTo(MESSAGE_TOPIC.GENERAL);
          table.string('groupCustomerMessageStatus').defaultTo(MESSAGE_STATUS.NEW);
          table.string('groupCustomerMessageType').defaultTo(MESSAGE_TYPE.GENERAL);
          table.string('groupCustomerMessageContent', 2000);
          table.string('groupCustomerMessageTitle');
          table.string('groupCustomerMessageImage');
          table.integer('groupCustomerMessageTemplateId');
          table.integer('stationsId');
          table.integer('staffId');
          timestamps(table);
          table.index('groupCustomerMessageId');
          table.index('groupCustomerMessageCategories');
          table.index('groupCustomerMessageType');
          table.index('groupCustomerMessageStatus');
          table.index('stationsId');
          table.index('staffId');
        })
        .then(async () => {
          Logger.info(`${tableName}`, `${tableName} table created done`);
          seeding().then(result => {
            Logger.info(`${tableName}`, `init ${tableName}` + result);
            resolve();
          });
        });
    });
  });
}

async function initDB() {
  await createTable();
}

async function seeding() {
  return new Promise(async (resolve, reject) => {
    let initialStaff = [
      {
        groupCustomerMessageCategories: 'FIREBASE_PUSH',
        groupCustomerMessageContent: 'Thời gian giao dịch',
        groupCustomerMessageTitle: 'Thông báo mới nhất',
        groupCustomerMessageImage: 'string',
        groupCustomerMessageType: 'GENERAL',
      },
    ];
    DB(`${tableName}`)
      .insert(initialStaff)
      .then(result => {
        Logger.info(`${tableName}`, `seeding ${tableName}` + result);
        resolve();
      });
  });
}

async function insert(data) {
  return await Common.insert(tableName, data);
}

async function updateById(id, data) {
  let dataId = {};
  dataId[primaryKeyField] = id;
  return await Common.updateById(tableName, dataId, data);
}

async function findById(id) {
  return await Common.findById(tableName, primaryKeyField, id);
}

async function find(filter, skip, limit, order) {
  return await Common.find(tableName, filter, skip, limit, order);
}

async function count(filter, order) {
  return await Common.count(tableName, primaryKeyField, filter, order);
}

function _makeQueryBuilderByFilter(filter, skip, limit, startDate, endDate, searchText, order) {
  let queryBuilder = DB(tableName);
  let filterData = filter ? JSON.parse(JSON.stringify(filter)) : {};

  if (searchText) {
    queryBuilder.where(function () {
      this.orWhere('groupCustomerMessageContent', 'like', `%${searchText}%`).orWhere(
        'groupCustomerMessageTitle',
        'like',
        `%${searchText}%`,
      );
    });
  }

  if (startDate) {
    queryBuilder.where('createdAt', '>=', startDate);
  }

  if (endDate) {
    queryBuilder.where('createdAt', '<=', endDate);
  }

  queryBuilder.where(filterData);
  queryBuilder.where({ isDeleted: 0 });

  if (limit) {
    queryBuilder.limit(limit);
  }

  if (skip) {
    queryBuilder.offset(skip);
  }

  if (order && order.key !== '' && order.value !== '' && (order.value === 'desc' || order.value === 'asc')) {
    queryBuilder.orderBy(order.key, order.value);
  } else {
    queryBuilder.orderBy('createdAt', 'desc');
  }

  return queryBuilder;
}

async function customSearch(filter, skip, limit, startDate, endDate, searchText, order) {
  let query = _makeQueryBuilderByFilter(filter, skip, limit, startDate, endDate, searchText, order);
  return await query.select();
}

async function customCount(filter, skip, limit, startDate, endDate, searchText, order) {
  let query = _makeQueryBuilderByFilter(filter, undefined, undefined, startDate, endDate, searchText, order);
  return new Promise((resolve, reject) => {
    try {
      query.count(`${primaryKeyField} as count`).then(records => {
        resolve(records);
      });
    } catch (e) {
      Logger.error(
        'ResourceAccess',
        `DB COUNT ERROR: ${tableName} : ${JSON.stringify(filter)} - ${JSON.stringify(order)}`,
      );
      Logger.error('ResourceAccess', e);
      reject(undefined);
    }
  });
}

async function customCountDistinct(fieldDistinct, filter, startDate, endDate, searchText) {
  //override orderBy of default query
  let order = {
    key: `${fieldDistinct}`,
    value: 'asc',
  };
  let query = _makeQueryBuilderByFilter(filter, undefined, undefined, startDate, endDate, searchText, order);
  return new Promise((resolve, reject) => {
    try {
      query.count(`${primaryKeyField} as count`).select(`${fieldDistinct}`).groupBy(`${fieldDistinct}`);

      query.then(records => {
        resolve(records);
      });
    } catch (e) {
      Logger.error(
        'ResourceAccess',
        `DB COUNT ERROR: ${tableName} : ${JSON.stringify(filter)} - ${JSON.stringify(order)}`,
      );
      Logger.error('ResourceAccess', e);
      reject(undefined);
    }
  });
}

async function deleteById(id) {
  let dataId = {};
  dataId[primaryKeyField] = id;
  return await Common.deleteById(tableName, dataId);
}

module.exports = {
  insert,
  find,
  findById,
  count,
  updateById,
  initDB,
  modelName: tableName,
  customSearch,
  customCount,
  customCountDistinct,
  deleteById,
};
