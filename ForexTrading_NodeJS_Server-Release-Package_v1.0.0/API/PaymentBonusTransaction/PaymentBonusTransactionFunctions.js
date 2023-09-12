/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';
const BonusTransactionResource = require('./resourceAccess/PaymentBonusTransactionResourceAccess');
const UserWallet = require('../Wallet/resourceAccess/WalletResourceAccess');
const BONUS_TRX_STATUS = require('./PaymentBonusTransactionConstant').BONUS_TRX_STATUS;
const WALLET_TYPE = require('../Wallet/WalletConstant').WALLET_TYPE;
const WalletResourceAccess = require('../Wallet/resourceAccess/WalletResourceAccess');
const StaffResourceAccess = require('../Staff/resourceAccess/StaffResourceAccess');
const { BONUS_TRX_CATEGORY } = require('./PaymentBonusTransactionConstant');

async function increaseBonusForUser(appUserId, amount, referUserId, totalReferAmount) {
  if (amount > 0) {
    await createBonusTransactionByUserId(appUserId, 0, referUserId, undefined);
    let existingBonus = await BonusTransactionResource.find(
      {
        appUserId: appUserId,
        paymentStatus: BONUS_TRX_STATUS.NEW,
        referUserId: referUserId,
      },
      0,
      1,
    );

    if (existingBonus && existingBonus.length > 0) {
      amount = parseFloat(amount).toFixed(2);
      await BonusTransactionResource.incrementPaymentAmount(existingBonus[0].paymentBonusTransactionId, amount);
      if (totalReferAmount) {
        await BonusTransactionResource.updateById(existingBonus[0].paymentBonusTransactionId, {
          totalReferAmount: totalReferAmount,
        });
      }
    }
    return existingBonus[0];
  }
  return undefined;
}

//appUserId: id cua user duoc nhan hoa hong
//referUserId: id cua user duoc tham chieu de tinh hoa hong
async function createBonusTransactionByUserId(appUserId, amount, referUserId, bankInfomation, staff) {
  if (!appUserId || appUserId === null || appUserId === '' || appUserId === 0) {
    console.error(`cancel createBonusTransactionByUserId invalid appUserId ${appUserId}`);
    return;
  }
  let _filter = {
    appUserId: appUserId,
    paymentStatus: BONUS_TRX_STATUS.NEW,
  };

  //neu co nguoi tham chieu thi luu tru them id nguoi tham chieu
  if (referUserId) {
    _filter.referUserId = referUserId;
  }

  let wallet = await UserWallet.find({
    appUserId: appUserId,
    walletType: WALLET_TYPE.BONUS,
  });

  if (!wallet || wallet.length < 1) {
    console.error('user wallet is invalid');
    return undefined;
  }
  wallet = wallet[0];

  let transactionData = {
    appUserId: appUserId,
    walletId: wallet.walletId,
    paymentAmount: amount,
    balanceBefore: wallet.balance,
    balanceAfter: wallet.balance + amount,
  };

  if (bankInfomation) {
    // rut tien truc tiep
    transactionData.paymentOwner = bankInfomation.paymentOwner;
    transactionData.paymentOriginSource = bankInfomation.paymentOriginSource;
    transactionData.paymentOriginName = bankInfomation.paymentOriginName;
  }
  if (staff) {
    transactionData.paymentStatus = BONUS_TRX_STATUS.COMPLETED;
    transactionData.paymentPICId = staff.staffId;
  }
  //neu co nguoi tham chieu thi luu tru them id nguoi tham chieu
  if (referUserId) {
    transactionData.referUserId = referUserId;
  }
  await WalletResourceAccess.incrementBalance(wallet.walletId, amount * 1);
  let result = await BonusTransactionResource.insert(transactionData);
  if (result) {
    const WalletRecordFunction = require('../WalletRecord/WalletRecordFunction');
    const adminRewardForUserResult = await WalletRecordFunction.addReferralBonus(
      appUserId,
      amount,
      WALLET_TYPE.BONUS,
      staff,
    );
    if (!adminRewardForUserResult) {
      console.error('admin Reward User error');
      return undefined;
    }
    return result;
  } else {
    console.error('insert bonus transaction error');
    return undefined;
  }
}

async function approveBonusTransaction(transactionId, staff, paymentNote, paymentRef) {
  //get info of transaction
  let transaction = await BonusTransactionResource.find({
    paymentBonusTransactionId: transactionId,
  });

  if (!transaction || transaction.length < 1) {
    console.error('transaction is invalid');
    return undefined;
  }
  transaction = transaction[0];

  if (
    !(
      transaction.status === BONUS_TRX_STATUS.NEW ||
      transaction.status === BONUS_TRX_STATUS.WAITING ||
      transaction.status !== BONUS_TRX_STATUS.PENDING
    )
  ) {
    console.error('bonus transaction was approved or canceled');
    return undefined;
  }

  //Change payment status and store info of PIC
  transaction.paymentStatus = BONUS_TRX_STATUS.COMPLETED;
  if (staff) {
    transaction.paymentPICId = staff.staffId;
  }

  if (paymentNote) {
    transaction.paymentNote = paymentNote;
  }

  if (paymentRef) {
    transaction.paymentRef = paymentRef;
  }

  transaction.paymentApproveDate = new Date();

  delete transaction.paymentBonusTransactionId;

  //Update payment in DB
  let updateTransactionResult = await BonusTransactionResource.updateById(transactionId, transaction);
  if (updateTransactionResult) {
    // //tra tien thuong vao vi hoa hong cho user
    // const WalletRecordFunction = require('../WalletRecord/WalletRecordFunction');
    // let paymentAmount = transaction.paymentAmount * -1;
    // let addBonusResult = await WalletRecordFunction.exchangeBonusToPointWalletBalance(transaction.appUserId,paymentAmount,WALLET_TYPE.BONUS);
    return updateTransactionResult;
  } else {
    console.error('approveBonusTransaction error');
    return undefined;
  }
}

async function denyBonusTransaction(transactionId, staff, paymentNote) {
  //get info of transaction
  let transaction = await BonusTransactionResource.find({
    paymentBonusTransactionId: transactionId,
  });

  if (!transaction || transaction.length < 1) {
    console.error('transaction is invalid');
    return undefined;
  }
  transaction = transaction[0];

  //Nếu không phải giao dịch "ĐANG CHỜ" (PENDING / WAITING) hoặc "MỚI TẠO" (NEW) thì không xử lý
  if (
    !(
      transaction.paymentStatus === BONUS_TRX_STATUS.NEW ||
      transaction.paymentStatus === BONUS_TRX_STATUS.WAITING ||
      transaction.paymentStatus !== BONUS_TRX_STATUS.PENDING
    )
  ) {
    console.error('bonus transaction was approved or canceled');
    return undefined;
  }

  //Change payment status and store info of PIC
  let updatedData = {
    paymentStatus: BONUS_TRX_STATUS.CANCELED,
    paymentApproveDate: new Date(),
  };

  //if transaction was performed by Staff, then store staff Id for later check
  if (staff) {
    updatedData.paymentPICId = staff.staffId;
  }

  if (paymentNote) {
    updatedData.paymentNote = paymentNote;
  }
  await WalletResourceAccess.incrementBalance(transaction.walletId, transaction.paymentAmount);
  let updateResult = await BonusTransactionResource.updateById(transactionId, updatedData);
  return updateResult;
}

async function addStaffNameInTransactionList(transactionList, storeStaffName = {}) {
  for (let transaction of transactionList) {
    if (transaction.paymentPICId) {
      let staffId = transaction.paymentPICId;
      let staffName = '';
      if (storeStaffName && storeStaffName.hasOwnProperty(staffId)) {
        staffName = storeStaffName[staffId]; // get staffName
        transaction.staffName = staffName;
      } else {
        let staff = await StaffResourceAccess.findById(staffId);
        staffName = `${staff.lastName} ${staff.firstName}`;
        storeStaffName[staffId] = staffName; // set stationName với key là stationId
        transaction.staffName = staffName;
      }
    }
  }
  return transactionList;
}

async function PaySystemBonusForUserByUserRate(appUserId, betAmount) {
  const AppUserView = require('../AppUsers/resourceAccess/AppUserView');
  const _user = await AppUserView.find(
    {
      appUserId: appUserId,
    },
    0,
    1,
  );

  let appUser;
  if (_user && _user.length) {
    appUser = _user[0];
  } else {
    return true;
  }

  let _totalBonusAmount = (betAmount * appUser.appUserMembershipBonusRate) / 100;
  let newBonusTransaction = await createBonusTransactionByUserId(
    appUserId,
    _totalBonusAmount,
    undefined,
    betAmount,
    BONUS_TRX_CATEGORY.REFERAL_BONUS,
  );
  if (newBonusTransaction) {
    await approveBonusTransaction(newBonusTransaction[0]);
  } else {
    console.error(
      `increaseBonusForUser failed for appUser ${appUserId} - amount ${betAmount} - referUser ${referUserId}`,
    );
  }
}

async function PaySystemBonusForUserByMemberReferIdF(appUserId, betAmount) {
  const AppUserView = require('../AppUsers/resourceAccess/AppUserView');
  const _user = await AppUserView.find(
    {
      appUserId: appUserId,
    },
    0,
    1,
  );

  let appUser;
  if (_user && _user.length) {
    appUser = _user[0];
  } else {
    return true;
  }

  if (appUser.referUserId && appUser.referUserId !== null) {
    for (let i = 1; i <= 3; i++) {
      if (
        appUser[`memberReferIdF${i}`] &&
        appUser[`memberReferIdF${i}`] !== null &&
        appUser[`memberReferIdF${i}`] !== ''
      ) {
        let _totalBonusAmount = 0;

        if (i === 1) {
          _totalBonusAmount = (betAmount * 3) / 100; // F1 = 3%
        }

        if (i === 2) {
          _totalBonusAmount = (betAmount * 2) / 100; // F2 = 2%
        }

        if (i === 3) {
          _totalBonusAmount = (betAmount * 1) / 100; // F3 = 1%
        }

        const a = appUser[`memberReferIdF${i}`];
        const newBonusTransaction = await createBonusTransactionByUserId(
          appUser[`memberReferIdF${i}`],
          _totalBonusAmount,
          undefined,
          betAmount,
          BONUS_TRX_CATEGORY.REFERAL_BONUS,
        );
        if (newBonusTransaction) {
          await approveBonusTransaction(newBonusTransaction[0]);
        } else {
          console.error(
            `increaseBonusForUser failed for appUser ${appUserId} - amount ${betAmount} - referUser ${referUserId}`,
          );
        }
      }
    }
  }
}

module.exports = {
  createBonusTransactionByUserId,
  approveBonusTransaction,
  denyBonusTransaction,
  increaseBonusForUser,
  addStaffNameInTransactionList,
  PaySystemBonusForUserByUserRate,
  PaySystemBonusForUserByMemberReferIdF,
};
