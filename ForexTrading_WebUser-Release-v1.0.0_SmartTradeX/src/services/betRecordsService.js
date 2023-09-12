/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import request from './request';

export default class BetRecordsService {
  static async getList(data) {
    return new Promise(resolve => {
      request
        .send({
          method: 'POST',
          path: 'BetRecords/user/getList',
          data,
        })
        .then((result = {}) => {
          const { statusCode, data, message, error } = result;

          if (statusCode === 200) {
            return resolve({ isSuccess: true, data });
          } else {
            return resolve({ isSuccess: false, message, error });
          }
        });
    });
  }
  static async getCurrent(data) {
    return new Promise(resolve => {
      request
        .send({
          method: 'POST',
          path: 'GameRecord/user/getCurrent',
          data,
        })
        .then((result = {}) => {
          const { statusCode, data, message, error } = result;
          if (statusCode === 200) {
            return resolve({ isSuccess: true, data });
          } else {
            return resolve({ isSuccess: false, message, error });
          }
        });
    });
  }
  static async placeRecord(data) {
    return new Promise(resolve => {
      request
        .send({
          method: 'POST',
          path: 'BetRecords/user/placeRecord',
          data,
        })
        .then((result = {}) => {
          const { statusCode, data, message, error } = result;

          if (statusCode === 200) {
            return resolve({ isSuccess: true, data });
          } else {
            return resolve({ isSuccess: false, message, error });
          }
        });
    });
  }
  static async getLast(data) {
    return new Promise(resolve => {
      request
        .send({
          method: 'POST',
          path: 'GameRecord/user/getLast',
          data,
        })
        .then((result = {}) => {
          const { statusCode, data, message, error } = result;

          if (statusCode === 200) {
            return resolve({ isSuccess: true, data });
          } else {
            return resolve({ isSuccess: false, message, error });
          }
        });
    });
  }
}
