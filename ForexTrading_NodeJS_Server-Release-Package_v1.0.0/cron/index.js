/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';

const Logger = require('../utils/logging');

async function startSchedule() {
  Logger.info('startSchedule ', new Date());

  //do not run schedule on DEV environments
  if (process.env.NODE_ENV === 'dev') {
    return;
  }

  //every 30 seconds
  const SystemMessageAutoSend = require('../API/CustomerMessage/cronjob/SystemMessageAutoSend');
  setInterval(SystemMessageAutoSend.systemAutoGenerateMessage, 30 * 1000);

  const GameSchedule = require('../API/GameRecord/cronjob/GameSchedule');
  GameSchedule.startSchedule();

  //every hour
  // const SystemConfigurationsJob = require('../API/SystemConfigurations/cronjob/SystemConfigurationsJob')
  // setInterval(SystemConfigurationsJob.statisticalFAC, 3600 * 1000)

  // every day - at the end of day
  // CronInstance.schedule('* * * * *', async function () {
  //   executeJob('./API/BetRecords/cronjob/MineCoinJob.js');
  // });
}

module.exports = {
  startSchedule,
};
