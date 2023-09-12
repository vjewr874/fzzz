/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppConfig = require('../../config/app');
const Logger = require('../../utils/logging');

function createToken(user, tokenType = 'normalUser') {
  const userData = {
    appUserId: user.appUserId,
    staffId: user.staffId,
    email: user.email,
    tokenType,
  };

  return jwt.sign(userData, AppConfig.jwt.secret, {
    algorithm: 'HS256',
    expiresIn: AppConfig.jwt.expiresIn,
  });
}

function decodeToken(token) {
  token = token.replace('Bearer ', '');
  var decoded = undefined;
  try {
    decoded = jwt.verify(token, AppConfig.jwt.secret);
  } catch (err) {
    Logger.error('Token', err);
  }
  return decoded;
}

function hashPassword(password, cb) {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(password, salt, (err, hash) => {
        return cb(err, hash);
      });
    }
  });
}

module.exports = { createToken, decodeToken, hashPassword };
