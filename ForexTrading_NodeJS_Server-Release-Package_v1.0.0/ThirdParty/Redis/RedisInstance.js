/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

const redis = require('redis');
require('dotenv').config();

const RedisClient =
  process.env.REDIS_ENABLE * 1 === 1
    ? redis.createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASS,
      })
    : undefined;

const PROJECT_NAME = process.env.PROJECT_NAME || 'PROJECTNAME';
const NODE_ENV = process.env.NODE_ENV || 'dev';

if (RedisClient) {
  RedisClient.on('connect', function () {
    console.log(
      `Redis connected on ${process.env.REDIS_HOST}:${process.env.REDIS_PORT} for project ${PROJECT_NAME} with ${NODE_ENV} environment`,
    );
  });
}

async function initRedis() {
  return RedisClient.connected;
}

async function setWithExpire(key, value, durationSeconds) {
  if (process.env.REDIS_ENABLE * 1 !== 1) {
    return;
  }
  return new Promise((resolve, reject) => {
    if (!RedisClient.connected) {
      resolve(null);
    }

    let redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    RedisClient.set(redisKey, value, 'EX', durationSeconds, (err, reply) => {
      if (err) {
        console.log(err.toString());
        reject(err);
      } else {
        console.log(`[Redis] set "${redisKey}": ${value} ` + reply);
        resolve(reply);
      }
    });
  });
}

async function setNoExpire(key, value) {
  if (process.env.REDIS_ENABLE * 1 !== 1) {
    return;
  }
  return new Promise((resolve, reject) => {
    if (!RedisClient.connected) {
      resolve(null);
    }
    let redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    RedisClient.set(redisKey, value, (err, reply) => {
      if (err) {
        console.log(err.toString());
        reject(err);
      } else {
        console.log(`[Redis] set "${redisKey}": ${value} ` + reply);
        resolve(reply);
      }
    });
  });
}

async function increment(key) {
  if (process.env.REDIS_ENABLE * 1 !== 1) {
    return;
  }
  return new Promise((resolve, reject) => {
    if (!RedisClient.connected) {
      resolve(null);
    }
    let redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    RedisClient.incr(redisKey, (err, reply) => {
      if (err) {
        console.log(err.toString());
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}

async function get(key) {
  if (process.env.REDIS_ENABLE * 1 !== 1) {
    return;
  }
  return new Promise((resolve, reject) => {
    if (!RedisClient.connected) {
      resolve(null);
    }
    let redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    RedisClient.get(redisKey, (err, reply) => {
      if (err) {
        console.log(err.toString());
        reject('');
      } else {
        resolve(reply);
      }
    });
  });
}

async function getJson(key) {
  let value = await get(key);
  if (value === '') {
    return undefined;
  } else {
    return JSON.parse(value);
  }
}

async function deleteAllKeys() {
  if (process.env.REDIS_ENABLE * 1 !== 1) {
    return;
  }
  if (process.env.NODE_ENV !== 'dev') {
    console.log('Delete all redis key');
    RedisClient.keys('*', function (err, rows) {
      rows.forEach(row => {
        RedisClient.del(row);
      });
    });
  }
}
deleteAllKeys();
module.exports = {
  initRedis,
  getJson,
  get,
  increment,
  setNoExpire,
  setWithExpire,
  deleteAllKeys,
};
