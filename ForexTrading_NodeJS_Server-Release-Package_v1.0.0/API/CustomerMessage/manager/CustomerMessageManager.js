/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';
const CustomerMessageResourceAccess = require('../resourceAccess/CustomerMessageResourceAccess');
// const MessageCustomerResourceAccess = require('../resourceAccess/MessageCustomerResourceAccess');
// const MessageCustomerView = require('../resourceAccess/MessageCustomerView');
const Logger = require('../../../utils/logging');
const AppUsersResourceAccess = require('../../AppUsers/resourceAccess/AppUsersResourceAccess');
const SystemAppLogFunctions = require('../../SystemAppChangedLog/SystemAppChangedLogFunctions');
const CustomerMessageFunctions = require('../CustomerMessageFunctions');
const {
  MESSAGE_TYPE,
  MESSAGE_CATEGORY,
  MESSAGE_RECEIVER,
  MESSAGE_ERROR,
  MESSAGE_TOPIC,
} = require('../CustomerMessageConstant');
const { ERROR } = require('../../Common/CommonConstant');
// admin send message => topic "GENERAL", type: "GENERAL"

async function _readMessage(messageId) {
  let result = await CustomerMessageResourceAccess.updateById(messageId, { isRead: 1 });

  if (result !== undefined) {
    return result;
  } else {
    return undefined;
  }
}

async function _deleteMessage(messageId) {
  let result = await CustomerMessageResourceAccess.updateById(messageId, { isDeleted: 1 });
  if (result !== undefined) {
    return result;
  } else {
    return undefined;
  }
}

async function _getListMessage(filter, skip, limit, startDate, endDate, searchText) {
  //only get data of current station
  let customerMessage = await CustomerMessageResourceAccess.customSearch(
    filter,
    skip,
    limit,
    startDate,
    endDate,
    searchText,
  );

  if (customerMessage && customerMessage.length > 0) {
    let customerMessageCount = await CustomerMessageResourceAccess.customCount(
      filter,
      skip,
      limit,
      startDate,
      endDate,
      searchText,
    );
    return { data: customerMessage, total: customerMessageCount[0].count };
  } else {
    return { data: [], total: 0 };
  }
}

async function _countUnreadMessage(filter, startDate, endDate, searchText) {
  let customerMessageCount = await CustomerMessageResourceAccess.customCount(
    filter,
    undefined,
    undefined,
    startDate,
    endDate,
    searchText,
  );

  if (customerMessageCount && customerMessageCount.length > 0) {
    return customerMessageCount[0].count;
  } else {
    return 0;
  }
}

async function insert(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let customerMessageData = req.payload;
      customerMessageData.staffId = req.currentUser.staffId;
      customerMessageData.isRead = 0;
      customerMessageData.customerMessageCategories = MESSAGE_CATEGORY.FIREBASE_PUSH;
      customerMessageData.customerMessageTopic = MESSAGE_TOPIC.USER;
      customerMessageData.receiverType = MESSAGE_RECEIVER.USER;

      let customer = await AppUsersResourceAccess.findById(customerMessageData.customerId);
      if (customer.email) {
        customerMessageData.customerMessageEmail = customer.email;
      }
      if (customer.phoneNumber) {
        customerMessageData.customerMessagePhone = customer.phoneNumber;
      }
      let result = await CustomerMessageResourceAccess.insert(customerMessageData);

      if (result) {
        resolve(result);
      }
      console.error(`error insert customer message ${ERROR}`);
      reject('failed');
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function find(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = req.payload.filter;
      let skip = req.payload.skip;
      let limit = req.payload.limit;
      let order = req.payload.order;
      let startDate = req.payload.startDate;
      let endDate = req.payload.endDate;
      let searchText = req.payload.searchText;

      let result = await _getListMessage(filter, skip, limit, startDate, endDate, searchText, order);

      if (result) {
        resolve(result);
      } else {
        console.error(`find customer message data [], total: 0 `);
        reject({ data: [], total: 0 });
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function findMessagesSent(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = req.payload.filter;
      let skip = req.payload.skip;
      let limit = req.payload.limit;
      let order = req.payload.order;
      let startDate = req.payload.startDate;
      let endDate = req.payload.endDate;
      let searchText = req.payload.searchText;

      let customerMessage = await MessageCustomerView.customSearch(
        filter,
        skip,
        limit,
        startDate,
        endDate,
        searchText,
        order,
      );
      let customerMessageCount = await MessageCustomerView.customCount(
        filter,
        skip,
        limit,
        startDate,
        endDate,
        searchText,
        order,
      );
      if (customerMessage && customerMessageCount) {
        resolve({ data: customerMessage, total: customerMessageCount[0].count });
      } else {
        console.error(`find messages sent data [], total: 0 `);
        resolve({ data: [], total: 0 });
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function getDetailById(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let messageCustomerId = req.payload.messageCustomerId;
      let result = await MessageCustomerView.find({ messageCustomerId: messageCustomerId });
      if (result) {
        resolve(result[0]);
      }
      console.error(`error getDetailById customer message: ${ERROR}`);
      reject('failed');
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function updateById(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let customerMessageId = req.payload.id;
      let customerMessageData = req.payload.data;
      let dataBefore = await CustomerMessageResourceAccess.findById(customerMessageId);
      let result = await CustomerMessageResourceAccess.updateById(customerMessageId, customerMessageData);

      if (result) {
        SystemAppLogFunctions.logCustomerRecordChanged(dataBefore, customerMessageData, req.currentUser);
        resolve(result);
      }
      console.error(`error updateById customer message: ${ERROR}`);
      reject('failed');
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function findById(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let customerMessageId = req.payload.id;
      let result = await CustomerMessageResourceAccess.findById(customerMessageId);
      if (result) {
        resolve(result);
      }
      console.error(`error findById customer message: ${ERROR}`);
      reject('failed');
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function sendMessageByFilter(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = req.payload.filter;
      let dataMessage = req.payload.data;
      //validate payload to prevent crash
      if (filter === undefined) {
        filter = {};
      }

      //retrieve info for customer list for this station only
      let customerList = await AppUsersResourceAccess.customSearch(
        {
          ...filter,
          searchText: undefined,
        },
        undefined,
        undefined,
        filter.searchText,
      );

      //Send message to many customer
      let result = await CustomerMessageFunctions.sendMessageToManyCustomer(
        customerList,
        dataMessage,
        req.currentUser.staffId,
      );
      if (result) {
        resolve(result);
      } else {
        console.error(`error sendMessageByFilter: ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function sendMessageByCustomerList(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let customerList = [];
      let customerRecordIdList = req.payload.customerRecordIdList;
      let dataMessage = req.payload.data;

      //retrieve info for customer list
      for (var i = 0; i < customerRecordIdList.length; i++) {
        let customer = await AppUsersResourceAccess.findById(customerRecordIdList[i]);
        if (customer) {
          customerList.push(customer);
        }
      }
      //Send message to many customer
      let result = await CustomerMessageFunctions.sendMessageToManyCustomer(
        customerList,
        dataMessage,
        req.currentUser.staffId,
      );
      if (result) {
        resolve('success');
      } else {
        console.error(`error sendMessageByCustomerList: ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function findTemplates(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let templates = await CustomerMessageFunctions.getTemplateMessages();
      if (templates) {
        resolve(templates);
      } else {
        console.error(`error findTemplates: do not have any templates`);
        reject('do not have any templates');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function findMessages(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let skip = req.payload.skip;
      let limit = req.payload.limit;
      let order = req.payload.order;
      let searchText = req.payload.searchText;
      let startDate = req.payload.startDate;
      let endDate = req.payload.endDate;
      let filter = req.payload.filter;

      let messages = await CustomerMessageResourceAccess.customSearch(
        filter,
        skip,
        limit,
        startDate,
        endDate,
        searchText,
        order,
      );
      let messagesCount = await CustomerMessageResourceAccess.customCount(
        filter,
        skip,
        limit,
        startDate,
        endDate,
        searchText,
        order,
      );
      if (messages) {
        resolve({ data: messages, total: messagesCount[0].count });
      } else {
        console.error(`findMessages data [] - total: 0 `);
        resolve({ data: [], total: 0 });
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function findDetailMessageById(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let message = await CustomerMessageResourceAccess.findById(req.payload.customerMessageId);
      if (message) {
        resolve(message);
      } else {
        console.error(`findDetailMessageById: do not have any message`);
        reject('do not have any message');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function updateMessageById(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = req.payload.data;
      const id = req.payload.customerMessageId;
      let message = await CustomerMessageResourceAccess.updateById(id, data);
      if (message) {
        resolve(message);
      } else {
        console.error(`error Customer message updateMessageById with customerMessageId ${id}: ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function deleteMessageById(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const id = req.payload.customerMessageId;
      let message = await CustomerMessageResourceAccess.updateById(id, { isDeleted: 1 });
      if (message) {
        resolve(message);
      } else {
        console.error(`error Customer message deleteMessageById with customerMessageId ${id}: ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function userDeleteNotificationMessage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const messageId = req.payload.id;
      let result = await _deleteMessage(messageId);
      if (result !== undefined) {
        resolve(result);
      } else {
        console.error(`error Customer message userDeleteNotificationMessage with messageId ${messageId}: ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function userDeleteAllNotificationMessage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let updatedFilter = {
        customerMessageCategories: MESSAGE_CATEGORY.FIREBASE_PUSH,
      };

      //get message for current user only
      if (!req.currentUser || !req.currentUser.appUserId) {
        console.error(`error Customer message userDeleteAllNotificationMessage: ${ERROR}`);
        reject('failed');
        return; //make sure it will response without running further
      }
      updatedFilter.customerId = req.currentUser.appUserId;
      updatedFilter.receiverType = MESSAGE_RECEIVER.USER;
      const updatedData = { isDeleted: 1 };

      let result = await CustomerMessageResourceAccess.updateAll(updatedData, updatedFilter);

      if (result !== undefined) {
        resolve(result);
      } else {
        console.error(`error Customer message userDeleteAllNotificationMessage: ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function userReadNotificationMessage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const messageId = req.payload.id;
      let result = await _readMessage(messageId);
      if (result !== undefined) {
        resolve(result);
      } else {
        console.error(`error Customer message userReadNotificationMessage with messageId ${messageId} : ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function userReadAllNotificationMessage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let updatedFilter = {
        customerMessageCategories: MESSAGE_CATEGORY.FIREBASE_PUSH,
      };

      //get message for current user only
      if (!req.currentUser || !req.currentUser.appUserId) {
        console.error(`error userReadAllNotificationMessage: ${ERROR}`);
        reject('failed');
        return; //make sure it will response without running further
      }
      updatedFilter.customerId = req.currentUser.appUserId;
      updatedFilter.receiverType = MESSAGE_RECEIVER.USER;
      const updatedData = { isRead: 1 };

      let result = await CustomerMessageResourceAccess.updateAll(updatedData, updatedFilter);
      if (result !== undefined) {
        resolve(result);
      } else {
        console.error(`error userReadAllNotificationMessage: ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function userGetListNotificationMessage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = req.payload.filter;
      let skip = req.payload.skip;
      let limit = req.payload.limit;
      let order = req.payload.order;
      let startDate = req.payload.startDate;
      let endDate = req.payload.endDate;
      let searchText = req.payload.searchText;

      //get message for current user only
      if (!req.currentUser || !req.currentUser.appUserId) {
        console.error(`error userGetListNotificationMessage: ${ERROR}`);
        reject('failed');
        return; //make sure it will response without running further
      }

      if (!filter) {
        filter = {};
      }
      filter.customerId = req.currentUser.appUserId;
      filter.receiverType = MESSAGE_RECEIVER.USER;

      let result = await _getListMessage(filter, skip, limit, startDate, endDate, searchText, order);
      if (result) {
        resolve(result);
      } else {
        resolve({ data: [], total: 0 });
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function userGetUnreadNotificationMessageCount(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = req.payload.filter;
      let startDate = req.payload.startDate;
      let endDate = req.payload.endDate;
      let searchText = req.payload.searchText;

      //get message for current user only
      if (!req.currentUser || !req.currentUser.appUserId) {
        console.error(`error userGetUnreadNotificationMessageCount: ${ERROR}`);
        reject('failed');
        return; //make sure it will response without running further
      }

      filter.customerId = req.currentUser.appUserId;
      filter.receiverType = MESSAGE_RECEIVER.USER;
      filter.isRead = 0; // chưa đọc
      let customerMessageCount = await _countUnreadMessage(filter, startDate, endDate, searchText);
      if (customerMessageCount) {
        resolve({ total: customerMessageCount });
      } else {
        resolve({ total: 0 });
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function userGetDetailMessage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let messageId = req.payload.id;

      //get message for current user only
      if (!req.currentUser || !req.currentUser.appUserId) {
        console.error(`error userGetDetailMessage: ${ERROR}`);
        reject('failed');
        return; //make sure it will response without running further
      }

      let result = await CustomerMessageResourceAccess.findById(messageId);

      if (result) {
        if (result.customerId !== req.currentUser.appUserId) {
          // chi doc duoc thong bao cua minh
          console.error(`error userGetDetailMessage: ${MESSAGE_ERROR.NO_PERMISSION}`);
          reject(MESSAGE_ERROR.NO_PERMISSION);
        } else {
          // danh dau message la da doc
          await _readMessage(messageId);
          resolve(result);
        }
      } else {
        console.error(`error userGetDetailMessage: ${MESSAGE_ERROR.MESSAGE_NOT_FOUND}`);
        reject(MESSAGE_ERROR.MESSAGE_NOT_FOUND);
      }
    } catch (e) {
      Logger.error(__filename, e);
      if (e === MESSAGE_ERROR.MESSAGE_NOT_FOUND) {
        console.error(`error userGetDetailMessage: ${MESSAGE_ERROR.MESSAGE_NOT_FOUND}`);
        reject(MESSAGE_ERROR.MESSAGE_NOT_FOUND);
      } else if (e === MESSAGE_ERROR.NO_PERMISSION) {
        console.error(`error userGetDetailMessage: ${MESSAGE_ERROR.NO_PERMISSION}`);
        reject(MESSAGE_ERROR.NO_PERMISSION);
      } else {
        console.error(`error userGetDetailMessage: ${ERROR}`);
        reject('failed');
      }
    }
  });
}

async function staffDeleteNotificationMessage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const messageId = req.payload.id;
      let result = await _deleteMessage(messageId);
      if (result !== undefined) {
        resolve(result);
      } else {
        console.error(`error Customer message staffDeleteNotificationMessage with messageId ${messageId} : ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function staffDeleteAllNotificationMessage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let updatedFilter = {
        customerMessageCategories: MESSAGE_CATEGORY.FIREBASE_PUSH,
      };

      //get message for current staff only
      if (!req.currentUser || !req.currentUser.staffId) {
        console.error(`error staffDeleteAllNotificationMessage: ${ERROR}`);
        reject('failed');
        return; //make sure it will response without running further
      }
      updatedFilter.customerId = req.currentUser.staffId;
      updatedFilter.receiverType = MESSAGE_RECEIVER.AGENCY;

      const updatedData = { isDeleted: 1 };

      let result = await CustomerMessageResourceAccess.updateAll(updatedData, updatedFilter);

      if (result !== undefined) {
        resolve(result);
      } else {
        console.error(`error Customer message staffDeleteAllNotificationMessage: ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function staffReadNotificationMessage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const messageId = req.payload.id;
      let result = await _readMessage(messageId);
      if (result !== undefined) {
        resolve(result);
      } else {
        console.error(`error staffReadNotificationMessage: ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function staffReadAllNotificationMessage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let updatedFilter = {
        customerMessageCategories: MESSAGE_CATEGORY.FIREBASE_PUSH,
      };

      //get message for current staff only
      if (!req.currentUser || !req.currentUser.staffId) {
        console.error(`error staffReadAllNotificationMessage: ${ERROR}`);
        reject('failed');
        return; //make sure it will response without running further
      }
      updatedFilter.customerId = req.currentUser.staffId;
      updatedFilter.receiverType = MESSAGE_RECEIVER.AGENCY;

      const updatedData = { isRead: 1 };

      let result = await CustomerMessageResourceAccess.updateAll(updatedData, updatedFilter);

      if (result !== undefined) {
        resolve(result);
      } else {
        console.error(`error staffReadAllNotificationMessage: ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function staffGetListNotificationMessage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = req.payload.filter;
      let skip = req.payload.skip;
      let limit = req.payload.limit;
      let order = req.payload.order;
      let startDate = req.payload.startDate;
      let endDate = req.payload.endDate;
      let searchText = req.payload.searchText;

      //get message for current staff only
      if (!req.currentUser || !req.currentUser.staffId) {
        console.error(`error staffGetListNotificationMessage: ${ERROR}`);
        reject('failed');
        return; //make sure it will response without running further
      }

      if (!filter) {
        filter = {};
      }
      filter.customerId = req.currentUser.staffId;
      filter.receiverType = MESSAGE_RECEIVER.AGENCY;

      let result = await _getListMessage(filter, skip, limit, startDate, endDate, searchText, order);

      if (result) {
        resolve(result);
      } else {
        reject({ data: [], total: 0 });
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function staffGetUnreadNotificationMessageCount(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = req.payload.filter;
      let startDate = req.payload.startDate;
      let endDate = req.payload.endDate;
      let searchText = req.payload.searchText;

      //get message for current staff only
      if (!req.currentUser || !req.currentUser.staffId) {
        console.error(`error staffGetUnreadNotificationMessageCount: ${ERROR}`);
        reject('failed');
        return; //make sure it will response without running further
      }

      filter.customerId = req.currentUser.staffId;
      filter.receiverType = MESSAGE_RECEIVER.AGENCY;

      let customerMessageCount = await _countUnreadMessage(filter, startDate, endDate, searchText);

      if (customerMessageCount) {
        resolve({ total: customerMessageCount });
      } else {
        resolve({ total: 0 });
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

async function staffGetDetailMessage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let messageId = req.payload.id;

      //get message for current staff only
      if (!req.currentUser || !req.currentUser.staffId) {
        console.error(`error staffGetDetailMessage: ${ERROR}`);
        reject('failed');
        return; //make sure it will response without running further
      }

      let result = await CustomerMessageResourceAccess.findById(messageId);

      if (result) {
        //danh dau message la da doc
        await _readMessage(messageId);

        resolve(result);
      } else {
        console.error(`error Customer message staffGetDetailMessage with messageId ${messageId}: ${ERROR}`);
        reject('failed');
      }
    } catch (e) {
      Logger.error(__filename, e);
      reject('failed');
    }
  });
}

module.exports = {
  insert,
  find,
  updateById,
  findById,
  sendMessageByFilter,
  sendMessageByCustomerList,
  findTemplates,
  findMessages,

  getDetailById,
  updateMessageById,
  findDetailMessageById,
  deleteMessageById,
  findMessagesSent,

  //User Message handler
  userGetListNotificationMessage,
  userGetUnreadNotificationMessageCount,
  userReadAllNotificationMessage,
  userReadNotificationMessage,
  userDeleteAllNotificationMessage,
  userDeleteNotificationMessage,
  userGetDetailMessage,

  //Staff Message handler
  staffGetListNotificationMessage,
  staffGetUnreadNotificationMessageCount,
  staffReadAllNotificationMessage,
  staffReadNotificationMessage,
  staffDeleteAllNotificationMessage,
  staffDeleteNotificationMessage,
  staffGetDetailMessage,
};
