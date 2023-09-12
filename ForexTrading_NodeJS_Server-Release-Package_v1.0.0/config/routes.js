/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';
// User Modules
const AppUsers = require('../API/AppUsers/route');
const Wallet = require('../API/Wallet/route');
const WalletBalanceUnit = require('../API/WalletBalanceUnit/route');
const AppUserMembership = require('../API/AppUserMembership/route/index');

//Staff modules
const Staff = require('../API/Staff/route');
const Role = require('../API/Role/route/RoleRoute');
const Permission = require('../API/Permission/route/PermissionRoute');

//System & Utilites modules
const Maintain = require('../API/Maintain/route/MaintainRoute');
const Upload = require('../API/Upload/route/UploadRoute');
const SystemConfigurations = require('../API/SystemConfigurations/route');

//Customer Message modules
const CustomerMessage = require('../API/CustomerMessage/route');

//Payment modules
const PaymentMethod = require('../API/PaymentMethod/route');
const PaymentDepositTransaction = require('../API/PaymentDepositTransaction/route');
const PaymentWithdrawTransaction = require('../API/PaymentWithdrawTransaction/route');

// Receive History
const WalletRecord = require('../API/WalletRecord/route');

var APIs = [
  //Upload APIs
  { method: 'POST', path: '/Upload/uploadMediaFile', config: Upload.uploadMediaFile },
  {
    method: 'GET',
    path: '/{path*}',
    handler: function (request, h) {
      return h.file(`${request.params.path}`);
    },
  },
  { method: 'POST', path: '/Upload/uploadUserAvatar', config: Upload.uploadUserAvatar },

  {
    method: 'GET', //This API use to load QRCode of user
    path: '/images/{filename}',
    handler: function (request, h) {
      return h.file(`images/${request.params.filename}`);
    },
  },
  //download Excel
  {
    method: 'GET',
    path: '/uploads/exportExcel/{filename}',
    handler: function (request, h) {
      return h.file(`uploads/exportExcel/${request.params.filename}`);
    },
  },
  //Role APIs
  { method: 'POST', path: '/Role/insert', config: Role.insert },
  { method: 'POST', path: '/Role/getList', config: Role.find },
  // { method: 'POST', path: '/Role/getDetailById', config: Role.findById }, //currently disable - no need
  { method: 'POST', path: '/Role/updateById', config: Role.updateById },

  //Permission APIs
  // { method: 'POST', path: '/Permission/insert', config: Permission.insert },//currently disable - no need
  { method: 'POST', path: '/Permission/getList', config: Permission.find },
  // { method: 'POST', path: '/Permission/getDetailById', config: Permission.findById },//currently disable - no need
  // { method: 'POST', path: '/Permission/updateById', config: Permission.updateById },//currently disable - no need

  /******************System & Utilites modules */

  //Maintain APIs
  { method: 'POST', path: '/Maintain/maintainAll', config: Maintain.maintainAll },
  { method: 'POST', path: '/Maintain/maintainSignup', config: Maintain.maintainSignup },
  { method: 'POST', path: '/Maintain/getSystemStatus', config: Maintain.getSystemStatus },

  /****************PAYMENT MODULES ****************/
];

APIs = APIs.concat(AppUsers);

const OTPMessage = require('../API/OTPMessage/router');
APIs = APIs.concat(OTPMessage);

APIs = APIs.concat(WalletBalanceUnit);
APIs = APIs.concat(Wallet);

APIs = APIs.concat(PaymentMethod);
APIs = APIs.concat(PaymentWithdrawTransaction);
APIs = APIs.concat(PaymentDepositTransaction);

//Customer Message modules
APIs = APIs.concat(CustomerMessage);

//Dashboard modules
const Statistical = require('../API/Statistical/route');
APIs = APIs.concat(Statistical);

APIs = APIs.concat(SystemConfigurations);

APIs = APIs.concat(WalletRecord);

APIs = APIs.concat(AppUserMembership);

APIs = APIs.concat(Staff);

const PaymentBonusTransaction = require('../API/PaymentBonusTransaction/route');
APIs = APIs.concat(PaymentBonusTransaction);

const BetRecords = require('../API/BetRecords/route');
APIs = APIs.concat(BetRecords);

const GameRecords = require('../API/GameRecord/route');
APIs = APIs.concat(GameRecords);

module.exports = APIs;
