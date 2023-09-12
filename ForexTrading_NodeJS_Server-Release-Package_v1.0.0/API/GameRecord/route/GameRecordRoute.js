/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';
const moduleName = 'GameRecord';
const Manager = require(`../manager/${moduleName}Manager`);
const Joi = require('joi');
const Response = require('../../Common/route/response').setup(Manager);
const CommonFunctions = require('../../Common/CommonFunctions');

const insertSchema = {
  gameRecordUnit: Joi.string().required().max(255),
  gameRecordSection: Joi.string().required().max(255),
  gameRecordValue: Joi.string().max(255),
  gameRecordPrice: Joi.string(),
  gameRecordTypeUp: Joi.number().max(1).min(0),
  gameRecordTypeDown: Joi.number().max(1).min(0),
  gameRecordTypeOdd: Joi.number().max(1).min(0),
  gameRecordTypeEven: Joi.number().max(1).min(0),
};

const insertManySchema = {
  gameRecordUnit: Joi.string().required().max(255),
  gameRecordSection: Joi.string().required().max(255),
  gameRecordValue: Joi.string().max(255),
  gameRecordCount: Joi.number().max(255),
};

const updateSchema = {
  gameRecordUnit: Joi.string().max(255),
  gameRecordSection: Joi.string().max(255),
  gameRecordValue: Joi.string().max(255),
  gameRecordNote: Joi.string().max(255),
  gameRecordStatus: Joi.string().max(255),
  gameRecordTypeUp: Joi.number().max(1).min(0),
  gameRecordTypeDown: Joi.number().max(1).min(0),
  gameRecordTypeOdd: Joi.number().max(1).min(0),
  gameRecordTypeEven: Joi.number().max(1).min(0),
};

const filterSchema = {
  gameRecordUnit: Joi.string().max(255),
  gameRecordSection: Joi.string().max(255),
};

module.exports = {
  insert: {
    tags: ['api', `${moduleName}`],
    description: `insert ${moduleName}`,
    pre: [{ method: CommonFunctions.verifyToken }, { method: CommonFunctions.verifyStaffToken }],
    auth: {
      strategy: 'jwt',
    },
    validate: {
      headers: Joi.object({
        authorization: Joi.string(),
      }).unknown(),
      payload: Joi.object(insertSchema),
    },
    handler: function (req, res) {
      Response(req, res, 'insert');
    },
  },
  insertMany: {
    tags: ['api', `${moduleName}`],
    description: `insertMany ${moduleName}`,
    pre: [{ method: CommonFunctions.verifyToken }, { method: CommonFunctions.verifyStaffToken }],
    auth: {
      strategy: 'jwt',
    },
    validate: {
      headers: Joi.object({
        authorization: Joi.string(),
      }).unknown(),
      payload: Joi.object(insertManySchema),
    },
    handler: function (req, res) {
      Response(req, res, 'insertMany');
    },
  },
  updateById: {
    tags: ['api', `${moduleName}`],
    description: `update ${moduleName}`,
    pre: [{ method: CommonFunctions.verifyToken }, { method: CommonFunctions.verifyStaffToken }],
    auth: {
      strategy: 'jwt',
    },
    validate: {
      headers: Joi.object({
        authorization: Joi.string(),
      }).unknown(),
      payload: Joi.object({
        id: Joi.number().min(0),
        data: Joi.object(updateSchema),
      }),
    },
    handler: function (req, res) {
      Response(req, res, 'updateById');
    },
  },
  find: {
    tags: ['api', `${moduleName}`],
    description: `update ${moduleName}`,
    pre: [{ method: CommonFunctions.verifyToken }, { method: CommonFunctions.verifyStaffToken }],
    auth: {
      strategy: 'jwt',
    },
    validate: {
      headers: Joi.object({
        authorization: Joi.string(),
      }).unknown(),
      payload: Joi.object({
        filter: Joi.object(filterSchema),
        skip: Joi.number().default(0).min(0),
        limit: Joi.number().default(20).max(100),
        searchText: Joi.string(),
        startDate: Joi.string(),
        endDate: Joi.string(),
        order: Joi.object({
          key: Joi.string().default('createdAt').allow(''),
          value: Joi.string().default('desc').allow(''),
        }),
      }),
    },
    handler: function (req, res) {
      Response(req, res, 'find');
    },
  },
  findById: {
    tags: ['api', `${moduleName}`],
    description: `find by id ${moduleName}`,
    pre: [{ method: CommonFunctions.verifyToken }, { method: CommonFunctions.verifyStaffToken }],
    auth: {
      strategy: 'jwt',
    },
    validate: {
      headers: Joi.object({
        authorization: Joi.string(),
      }).unknown(),
      payload: Joi.object({
        id: Joi.number().min(0),
      }),
    },
    handler: function (req, res) {
      Response(req, res, 'findById');
    },
  },
  deleteById: {
    tags: ['api', `${moduleName}`],
    description: `deleteById ${moduleName}`,
    pre: [{ method: CommonFunctions.verifyToken }, { method: CommonFunctions.verifyStaffToken }],
    auth: {
      strategy: 'jwt',
    },
    validate: {
      headers: Joi.object({
        authorization: Joi.string(),
      }).unknown(),
      payload: Joi.object({
        id: Joi.number().min(0),
      }),
    },
    handler: function (req, res) {
      Response(req, res, 'deleteById');
    },
  },
  getCurrentGameRecord: {
    tags: ['api', `${moduleName}`],
    description: `getCurrent ${moduleName}`,
    pre: [{ method: CommonFunctions.verifyToken }, { method: CommonFunctions.verifyStaffToken }],
    auth: {
      strategy: 'jwt',
    },
    validate: {
      headers: Joi.object({
        authorization: Joi.string(),
      }).unknown(),
      payload: Joi.object({
        gameRecordUnit: Joi.string().required(),
      }),
    },
    handler: function (req, res) {
      Response(req, res, 'getCurrentGameRecord');
    },
  },
};
