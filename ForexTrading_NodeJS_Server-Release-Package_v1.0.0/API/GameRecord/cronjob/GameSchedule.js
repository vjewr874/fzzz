/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

const { CronInstance, executeJob } = require('../../../ThirdParty/Cronjob/CronInstance');
const Logger = require('../../../utils/logging');
const { BET_UNIT } = require('../../BetRecords/BetRecordsConstant');
const SystemStatus = require('../../Maintain/MaintainFunctions').systemStatus;
const GamePlay = require('./addGameResult');
const { resetDailyGame } = require('./resetGameResult');

async function _startCronSchedule() {
  Logger.info('startSchedule ', new Date());

  //do not run schedule on DEV environments
  if (process.env.ENV === 'dev') {
    return;
  }

  // every 5 minutes
  CronInstance.schedule('* * * * *', async function () {
    const gameList = Object.keys(BET_UNIT);

    if (!gameList.length) {
      return;
    }

    for (let i = 0; i < gameList.length; i++) {
      await GamePlay.addNewGameResult(`${gameList[i]}`);
    }
  });

  // daily task
  CronInstance.schedule('1 0 * * *', async function () {
    resetDailyGame();
  });
}

async function fetchETHPrice() {
  if (SystemStatus.liveGame) {
    if (process.env.AUTO_FETCH_PRICE * 1 === 0) {
      return;
    }
    const fetchPriceJob = require('./fetchPriceJob');
    let fetchJobs = [];

    const gameList = Object.keys(BET_UNIT);

    if (!gameList.length) {
      return;
    }

    for (let i = 0; i < gameList.length; i++) {
      await fetchPriceJob.fetchPrice(`${gameList[i]}`);
    }

    Promise.all(fetchJobs).then(() => {
      console.log(`done fetchETHPrice`);
    });
  }
}

async function fetchBetPrice() {
  if (SystemStatus.liveGame) {
    if (process.env.AUTO_FETCH_PRICE * 1 === 0) {
      return;
    }

    const gameList = Object.keys(BET_UNIT);

    if (!gameList.length) {
      return;
    }
    const fetchPriceJob = require('./fetchPriceJob');
    let fetchJobs = [];
    for (let i = 0; i < gameList.length; i++) {
      await fetchPriceJob.fetchPrice(`${gameList[i]}`);
    }
    Promise.all(fetchJobs).then(() => {
      console.log(`done fetchETHPrice`);
    });
  }
}

async function startSchedule() {
  console.log('start GameSchedule');

  _startCronSchedule();
  fetchETHPrice();
  fetchBetPrice();
}

setInterval(() => {
  fetchBetPrice();
}, 1000);

setInterval(() => {
  fetchETHPrice();
}, 10000);
module.exports = {
  startSchedule,
};
