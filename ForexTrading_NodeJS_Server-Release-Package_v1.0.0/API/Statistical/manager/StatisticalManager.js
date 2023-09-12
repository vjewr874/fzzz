/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

const Logger = require('../../../utils/logging');
const AppUsersResourceAccess = require('../../AppUsers/resourceAccess/AppUsersResourceAccess');
const StatisticalFunctions = require('../StatisticalFunctions');
const { USER_VERIFY_INFO_STATUS } = require('../../AppUsers/AppUserConstant');
const WithdrawTransactionUserView = require('../../PaymentWithdrawTransaction/resourceAccess/WithdrawTransactionUserView');
const { WALLET_TYPE } = require('../../Wallet/WalletConstant');
const moment = require('moment');
const { DEPOSIT_TRX_STATUS } = require('../../PaymentDepositTransaction/PaymentDepositTransactionConstant');
const { WITHDRAW_TRX_STATUS } = require('../../PaymentWithdrawTransaction/PaymentWithdrawTransactionConstant');
async function generalReport(req) {
  let endDate = req.payload.endDate;
  let startDate = req.payload.startDate;

  return new Promise(async (resolve, reject) => {
    let reportData = {
      totalUsers: 0, //<< tong so luong user
      totalNewUsers: 0, //<< tong so luong new user
      totalUserPaymentDepositAmount: 0, //<< tong so tien nap cua user
      totalUserPaymentWithdrawAmount: 0, //<< tong so tien rut cua user
      totalBetRecordAmountIn: 0, //<< tổng chơi
      totalBetRecordAmountWin: 0, //<< tổng thắng
      totalBetRecordAmountLose: 0, //<< tổng thua
    };
    try {
      let promiseList = [];
      let promisetotalUsers = StatisticalFunctions.countTotalUser();
      promiseList.push(promisetotalUsers);

      let promisetotalNewUsers = StatisticalFunctions.countTotalNewUsers(startDate, endDate);
      promiseList.push(promisetotalNewUsers);

      let promisetotalUserPaymentDepositAmount = StatisticalFunctions.sumTotalUserPaymentDeposit(
        {},
        startDate,
        endDate,
      );
      promiseList.push(promisetotalUserPaymentDepositAmount);

      let promisetotalUserPaymentWithdrawAmount = StatisticalFunctions.sumTotalUserPaymentWithdraw(
        {},
        startDate,
        endDate,
      );
      promiseList.push(promisetotalUserPaymentWithdrawAmount);

      let promisetotalBetRecordAmountIn = StatisticalFunctions.sumTotalBetRecordAmountIn({}, startDate, endDate);
      promiseList.push(promisetotalBetRecordAmountIn);

      let promisetotalBetRecordAmountWin = StatisticalFunctions.sumTotalBetRecordAmountWin({}, startDate, endDate);
      promiseList.push(promisetotalBetRecordAmountWin);

      let promisetotalBetRecordAmountLose = StatisticalFunctions.sumTotalBetRecordAmountLose({}, startDate, endDate);
      promiseList.push(promisetotalBetRecordAmountLose);

      Promise.all(promiseList).then(values => {
        reportData.totalUsers = values[0];
        reportData.totalNewUsers = values[1];
        reportData.totalUserPaymentDepositAmount = values[2];
        reportData.totalUserPaymentWithdrawAmount = values[3];
        reportData.totalBetRecordAmountIn = values[4];
        reportData.totalBetRecordAmountWin = values[5];
        reportData.totalBetRecordAmountLose = values[6];
        resolve(reportData);
      });
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function getUserDetailReport(req) {
  let endDate = req.payload.endDate;
  let startDate = req.payload.startDate;
  const appUserId = req.payload.filter.appUserId;

  return new Promise(async (resolve, reject) => {
    let reportData = {
      totalUserPaymentDepositAmount: 0, //<< tong so tien nap cua user
      totalUserPaymentWithdrawAmount: 0, //<< tong so tien rut cua user
      totalUserSumaryWin: 0,
      totalUserPointAmount: 0,
      totalUserPlaceOrder: 0, // tong mua
      totalUserRewardAmount: 0, // tong thuong
    };
    try {
      let promiseList = [];

      let promisetotalUserPaymentDepositAmount = StatisticalFunctions.sumTotalUserPaymentDeposit(
        { appUserId: appUserId, paymentStatus: DEPOSIT_TRX_STATUS.COMPLETED },
        startDate,
        endDate,
      );
      promiseList.push(promisetotalUserPaymentDepositAmount);

      let promisetotalUserPaymentWithdrawAmount = StatisticalFunctions.sumTotalUserPaymentWithdraw(
        { appUserId: appUserId, paymentStatus: WITHDRAW_TRX_STATUS.COMPLETED },
        startDate,
        endDate,
      );

      promiseList.push(promisetotalUserPaymentWithdrawAmount);

      let promisesumTotalUserSumaryWin = StatisticalFunctions.sumaryWinLoseAmount(
        { appUserId: appUserId },
        startDate,
        endDate,
      );
      promiseList.push(promisesumTotalUserSumaryWin);

      let promisesumSumaryPointAmount = StatisticalFunctions.sumaryPointAmount(
        { appUserId: appUserId },
        startDate,
        endDate,
      );
      promiseList.push(promisesumSumaryPointAmount);

      let promisetotalUserPlaceOrder = StatisticalFunctions.sumTotalUserPlaceOrder(
        { appUserId: appUserId, orderStatus: 'Completed' },
        startDate,
        endDate,
      );
      promiseList.push(promisetotalUserPlaceOrder);

      let promisetotalUserRewardAmount = StatisticalFunctions.totalRewardBalanceByUserId(appUserId);
      promiseList.push(promisetotalUserRewardAmount);

      Promise.all(promiseList).then(values => {
        reportData.totalUserPaymentDepositAmount = values[0];
        reportData.totalUserPaymentWithdrawAmount = values[1];
        reportData.totalUserSumaryWin = values[2] || 0;
        reportData.totalUserPointAmount = values[3] || 0;
        reportData.totalUserPlaceOrder = values[4] || 0;
        reportData.totalUserRewardAmount = values[5];
        resolve(reportData);
      });
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function summaryUserPayment(req) {
  let endDate = req.payload.endDate;
  let startDate = req.payload.startDate;
  let appUserId = req.payload.appUserId;

  return new Promise(async (resolve, reject) => {
    try {
      let summaryUserPaymentResult = StatisticalFunctions.summaryUserPayment(appUserId, startDate, endDate);
      if (summaryUserPaymentResult) {
        resolve(summaryUserPaymentResult);
      } else {
        resolve({});
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function userSummaryReferUser(req) {
  return new Promise(async (resolve, reject) => {
    try {
      // let referData = {
      //   totalWithdraw: 100,
      //   totalDeposit: 200,
      //   totalBuy: 300,
      //   totalSell: 400,
      // };

      // let data = [];
      // referData.appUserId = 1;
      // referData.username = "username1";
      // data.push(referData);
      // referData.appUserId = 2;
      // referData.username = "username2";
      // data.push(referData);
      // referData.appUserId = 3;
      // referData.username = "username3";
      // data.push(referData);
      // referData.appUserId = 4;
      // referData.username = "username4";
      // data.push(referData);

      let skip = req.payload.skip;
      let limit = req.payload.limit;

      let data = await StatisticalFunctions.summaryReferUser(req.currentUser.appUserId, skip, limit);

      if (data) {
        resolve({
          data: data.summaryData,
          total: data.summaryCountTotal,
          //  totalDeposit: data.summaryTotalDeposit,
          //  totalWithdraw: data.summaryTotalWithdraw,
          totalBuy: data.summaryTotalBuy,
          //  totalSell: data.summaryTotalSell,
          totalBonus: data.summaryTotalBonus,
          //   totalMember: data.totalMember,
        });
      } else {
        resolve({ data: [], total: 0 });
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}
async function summaryCountUserFAC(req) {
  let endDate = req.payload.endDate;
  let startDate = req.payload.startDate;
  return new Promise(async (resolve, reject) => {
    try {
      let summaryFACResult = await StatisticalFunctions.sumTotal('profitActual', 'profitClaimed', startDate, endDate);
      let countFACResult = await StatisticalFunctions.countTotalMiningUser(startDate, endDate, 'appUserId');
      resolve({
        summary: summaryFACResult,
        countUser: countFACResult,
      });
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

function _checkCount(countResult) {
  if (countResult && countResult.length > 0) {
    /**
     * example
     * res: [{ count:  0 }]
     * @return res[0].count
     */
    return countResult[0][Object.keys(countResult[0])[0]];
  }
  return 0;
}

async function _countAllUser(startDate, endDate) {
  let countAllUser = await AppUsersResourceAccess.customCount({
    startDate: startDate,
    endDate: endDate,
  });
  return _checkCount(countAllUser);
}

async function _countAllUserKYC(startDate, endDate) {
  let countAllUserKYC = await AppUsersResourceAccess.customCount({
    isVerified: USER_VERIFY_INFO_STATUS.IS_VERIFIED,
    startDate: startDate,
    endDate: endDate,
  });
  return _checkCount(countAllUserKYC);
}

async function _countUserBuyPackage(startDate, endDate) {
  let countUserBuyPackage = await PaymentServicePackageUserResourceAccess.customCountDistinct(
    {
      packageType: 'A100FAC',
      startDate: startDate,
      endDate,
      endDate,
    },
    'appUserId',
  );
  return _checkCount(countUserBuyPackage);
}

async function _countUserActivePackage(startDate, endDate) {
  let countUserActivePackage = await PaymentServicePackageUserResourceAccess.customCountDistinct(
    {
      packageActivityStatus: 1,
      startDate: startDate,
      endDate: endDate,
    },
    'appUserId',
  );
  return _checkCount(countUserActivePackage);
}

async function _sumWithdrawUSDT(startDate, endDate) {
  let sumWithDrawUSDT = await WithdrawTransactionUserView.customSum(
    'paymentAmount',
    {
      walletType: WALLET_TYPE.USDT,
    },
    startDate,
    endDate,
  );
  return _checkCount(sumWithDrawUSDT);
}

async function _sumWithdrawBTC(startDate, endDate) {
  let sumWithDrawUSDT = await WithdrawTransactionUserView.customSum(
    'paymentAmount',
    {
      walletType: WALLET_TYPE.BTC,
    },
    startDate,
    endDate,
  );
  return _checkCount(sumWithDrawUSDT);
}

async function _sumExchangeFACtoUSDT(startDate, endDate) {
  let sumExchangeFACtoUSDT = await PaymentExchangeTransactionResourceAccess.customSum(undefined, {
    walletTypeBefore: WALLET_TYPE.FAC,
    walletTypeAfter: WALLET_TYPE.USDT,
    startDate: startDate,
    endDate: endDate,
  });
  _checkCount(sumExchangeFACtoUSDT);
}

async function _countAllPackage(startDate, endDate) {
  let countAllPackage = await ServicePackageWalletViews.customCount(
    undefined,
    undefined,
    undefined,
    startDate,
    endDate,
  );
  return _checkCount(countAllPackage);
}

async function _sumExchangePointtoFAC(startDate, endDate) {
  let sumExchangePointtoFAC = await PaymentExchangeTransactionResourceAccess.customSum(undefined, {
    walletTypeBefore: WALLET_TYPE.POINT,
    walletTypeAfter: WALLET_TYPE.FAC,
    startDate: startDate,
    endDate: endDate,
  });
  return _checkCount(sumExchangePointtoFAC);
}

async function _sumFACMint(startDate, endDate) {
  let sumAllFACMint = await PaymentServicePackageUserResourceAccess.customSum(
    undefined,
    'profitClaimed',
    undefined,
    undefined,
    startDate,
    endDate,
  );
  return _checkCount(sumAllFACMint);
}
async function summaryUserReport(req) {
  return new Promise(async (resolve, reject) => {
    let reportData = {
      totalNewUsersByDate: 0, //<< tong so luong new user theo ngày
      totalNewUsersByWeek: 0, //<< tong so luong new user theo tuần
      totalNewUsersByMonth: 0, //<< tong so luong new user theo tháng
      totalNewUsersByYear: 0, //<< tong so luong new user theo năm
      totalUsers: 0, //<< tong so lượng user
      countAllUserKYC: 0, //<< tong so lượng user KYC
      totalUserPaymentService: 0, //<< tong so lượng user đã mua
      countUserMember: 0, //<< tong so lượng tổ chức
    };
    try {
      let promiseList = [];
      const startDate = moment(new Date()).startOf('day').format();
      const endDate = moment(new Date()).endOf('day').format();
      let promiseTotalNewUsersByDate = StatisticalFunctions.countTotalNewUsers(startDate, endDate);
      promiseList.push(promiseTotalNewUsersByDate);

      // new User trong tuần
      const startDateOfWeek = moment(new Date()).add(-1, 'week').startOf('week').endOf('day').format();
      const endDateOfWeek = moment(new Date()).startOf('week').endOf('day').format();
      let promiseTotalNewUsersByWeek = StatisticalFunctions.countTotalNewUsers(startDateOfWeek, endDateOfWeek);
      promiseList.push(promiseTotalNewUsersByWeek);
      // new User trong tháng
      const startOfMonth = moment(new Date()).startOf('month').format();
      const endOfMonth = moment(new Date()).endOf('month').format();
      let promiseTotalNewUsersByMonth = StatisticalFunctions.countTotalNewUsers(startOfMonth, endOfMonth);
      promiseList.push(promiseTotalNewUsersByMonth);
      // new User trong năm
      const startOfYear = moment(new Date()).startOf('year').format();
      const endOfYear = moment(new Date()).endOf('year').format();
      let promiseTotalNewUsersByYear = StatisticalFunctions.countTotalNewUsers(startOfYear, endOfYear);
      promiseList.push(promiseTotalNewUsersByYear);
      // tổng số lượng user
      let promiseTotalUsers = StatisticalFunctions.countTotalUser();
      promiseList.push(promiseTotalUsers);
      // tổng số lượng User KYC
      let promiseCountAllUserKYC = await _countAllUserKYC();
      promiseList.push(promiseCountAllUserKYC);
      // số lượng user đã mua máy
      let promiseTotalUserPaymentService = StatisticalFunctions.countTotalMiningUser(undefined, undefined, 'appUserId');
      promiseList.push(promiseTotalUserPaymentService);
      // số lượng tổ chức
      let promiseCountUserMember = StatisticalFunctions.CountMemberShip();
      promiseList.push(promiseCountUserMember);
      Promise.all(promiseList).then(values => {
        reportData.totalNewUsersByDate = values[0];
        reportData.totalNewUsersByWeek = values[1];
        reportData.totalNewUsersByMonth = values[2];
        reportData.totalNewUsersByYear = values[3];
        reportData.totalUsers = values[4];
        reportData.countAllUserKYC = values[5];
        reportData.totalUserPaymentService = values[6];
        reportData.countUserMember = values[7];

        resolve(reportData);
      });
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}
async function summaryServicePackageReport(req) {
  return new Promise(async (resolve, reject) => {
    let reportData = {
      totalNewPaymentServicePackByDate: 0, //<< tong so luong  máy mới theo ngày
      totalNewPaymentServicePackByWeek: 0, //<< tong so luong máy mới theo tuần
      totalNewPaymentServicePackByMonth: 0, //<< tong so luong máy mới theo tháng
      totalNewPaymentServicePackByYear: 0, //<< tong so luong máy mới theo năm
      totalPaymentServicePack: 0, //<< tong so lượng máy
      totalPaymentServicePack100: 0, //<< tong so lượng máy 100
      totalPaymentServicePack500: 0, //<< tong so lượng máy 500
      totalPaymentServicePack1000: 0, //<< tong so lượng máy 1000
      totalProfitClaimed: 0, //<< tong so luong profit user da nhan
      totalProfitActual: 0, //<< tong so luong profit dang dao duoc
      totalProfitBonus: 0, //<< tong so luong profit da thuong cho user
      totalProfitEstimate: 0, //<<tong so luong profit du kien
    };
    try {
      let promiseList = [];
      const startDate = moment(new Date()).startOf('day').format();
      const endDate = moment(new Date()).endOf('day').format();
      let promiseTotalNewPaymentServicePackByDate = StatisticalFunctions.countTotalPaymentServicePackageUser(
        {
          packageCategory: PACKAGE_CATEGORY.NORMAL,
        },
        startDate,
        endDate,
      );
      promiseList.push(promiseTotalNewPaymentServicePackByDate);

      // máy mới trong tuần
      const startDateOfWeek = moment(new Date()).add(-1, 'week').startOf('week').endOf('day').format();
      const endDateOfWeek = moment(new Date()).startOf('week').endOf('day').format();
      let promiseTotalNewPaymentServicePackByWeek = StatisticalFunctions.countTotalPaymentServicePackageUser(
        {
          packageCategory: PACKAGE_CATEGORY.NORMAL,
        },
        startDateOfWeek,
        endDateOfWeek,
      );
      promiseList.push(promiseTotalNewPaymentServicePackByWeek);

      // máy mới trong tháng
      const startOfMonth = moment(new Date()).startOf('month').format();
      const endOfMonth = moment(new Date()).endOf('month').format();
      let promiseTotalNewPaymentServicePackByMonth = StatisticalFunctions.countTotalPaymentServicePackageUser(
        {
          packageCategory: PACKAGE_CATEGORY.NORMAL,
        },
        startOfMonth,
        endOfMonth,
      );
      promiseList.push(promiseTotalNewPaymentServicePackByMonth);

      // máy mới trong năm
      const startOfYear = moment(new Date()).startOf('year').format();
      const endOfYear = moment(new Date()).endOf('year').format();
      let promiseTotalNewPaymentServicePackByYear = StatisticalFunctions.countTotalPaymentServicePackageUser(
        {
          packageCategory: PACKAGE_CATEGORY.NORMAL,
        },
        startOfYear,
        endOfYear,
      );
      promiseList.push(promiseTotalNewPaymentServicePackByYear);

      // tổng số lượng máy
      let promiseTotalPaymentServicePack = StatisticalFunctions.countTotalPaymentServicePackageUser({
        packageCategory: PACKAGE_CATEGORY.NORMAL,
      });
      promiseList.push(promiseTotalPaymentServicePack);

      // tổng số máy 100
      let filterServicePack100 = {
        packageCategory: PACKAGE_CATEGORY.NORMAL,
      };
      filterServicePack100.packageType = PACKAGE_TYPE.A100FAC.type;

      let promiseTotalPaymentServicePack100 =
        StatisticalFunctions.countTotalPaymentServicePackageUserView(filterServicePack100);
      promiseList.push(promiseTotalPaymentServicePack100);

      // tổng số máy 500
      let filterServicePack500 = {
        packageCategory: PACKAGE_CATEGORY.NORMAL,
      };
      filterServicePack500.packageType = PACKAGE_TYPE.A500FAC.type;
      let promiseTotalPaymentServicePack500 =
        StatisticalFunctions.countTotalPaymentServicePackageUserView(filterServicePack500);
      promiseList.push(promiseTotalPaymentServicePack500);

      // tổng số máy 1000
      let filterServicePack1000 = {
        packageCategory: PACKAGE_CATEGORY.NORMAL,
      };
      filterServicePack1000.packageType = PACKAGE_TYPE.A1000FAC.type;
      let promiseTotalPaymentServicePack1000 =
        StatisticalFunctions.countTotalPaymentServicePackageUserView(filterServicePack1000);
      promiseList.push(promiseTotalPaymentServicePack1000);

      let promiseSumTotalProfit = StatisticalFunctions.sumTotalProfitServicePackageUser({});
      promiseList.push(promiseSumTotalProfit);

      Promise.all(promiseList).then(values => {
        reportData.totalNewPaymentServicePackByDate = values[0];
        reportData.totalNewPaymentServicePackByWeek = values[1];
        reportData.totalNewPaymentServicePackByMonth = values[2];
        reportData.totalNewPaymentServicePackByYear = values[3];
        reportData.totalPaymentServicePack = values[4];
        reportData.totalPaymentServicePack100 = values[5];
        reportData.totalPaymentServicePack500 = values[6];
        reportData.totalPaymentServicePack1000 = values[7];

        if (values[8]) {
          reportData.totalProfitClaimed = values[8].totalProfitClaimed;
          reportData.totalProfitActual = values[8].totalProfitActual;
          reportData.totalProfitBonus = values[8].totalProfitBonus;
          reportData.totalProfitEstimate = values[8].totalProfitEstimate;
        }

        resolve(reportData);
      });
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function getPaymentStatisticCount(req) {
  return new Promise(async (resolve, reject) => {
    let reportData = {
      totalDepositRequest: 0, //<< tong so luong yeu cau nap tien NEW
      totalWithdrawRequest: 0, //<< tong so luong yeu cau rut tien NEW
      totalPaymentBonusRequest: 0, //<< tong so luong yeu cau tra tien hoa hong NEW
    };
    try {
      let promiseList = [];

      let promisetotalDepositRequest = StatisticalFunctions.countTotalPaymentDeposit({
        paymentStatus: DEPOSIT_TRX_STATUS.NEW,
      });
      promiseList.push(promisetotalDepositRequest);

      let promisetotalWithdrawRequest = StatisticalFunctions.countTotalWithdrawDeposit({
        paymentStatus: WITHDRAW_TRX_STATUS.NEW,
      });
      promiseList.push(promisetotalWithdrawRequest);

      let promisetotalPaymentBonusRequest = StatisticalFunctions.countTotalPaymentBonus({
        paymentStatus: WITHDRAW_TRX_STATUS.NEW,
      });
      promiseList.push(promisetotalPaymentBonusRequest);

      Promise.all(promiseList).then(values => {
        reportData.totalDepositRequest = values[0] || 0;
        reportData.totalWithdrawRequest = values[1] || 0;
        reportData.totalPaymentBonusRequest = values[2] || 0;
        resolve(reportData);
      });
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function summaryToTalProductOrderByChannelReport(req) {
  let endDate = req.payload.endDate;
  let startDate = req.payload.startDate;
  let productChannel = req.payload.productChannel;
  return new Promise(async (resolve, reject) => {
    let reportData = {
      totalProductOrderAmount: 0, //<< doanh thu
    };
    try {
      reportData.totalProductOrderAmount = await StatisticalFunctions.summaryTotalProductOrderByChannel(
        productChannel,
        startDate,
        endDate,
      );
      resolve(reportData);
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

module.exports = {
  generalReport,
  summaryUserPayment,
  userSummaryReferUser,
  summaryCountUserFAC,
  summaryUserReport,
  summaryServicePackageReport,
  getUserDetailReport,
  getPaymentStatisticCount,
  summaryToTalProductOrderByChannelReport,
};
