/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';
const CryptoFunction = require('../../CryptoCurrency/CryptoCurrencyFunctions');
const MQTTFunction = require('../../../ThirdParty/MQTTBroker/MQTTBroker');
const GameRecordFunctions = require('../GameRecordFunctions');
const { randomInt } = require('../../ApiUtils/utilFunctions');

//make random price with variant 0.1%
function makeRandomPrice(currentPrice) {
  let price = currentPrice * 10000;
  let onePercent = (price * 0.1) / 100;
  let newPrice = ((price + randomInt(onePercent)) / 10000).toFixed(4);
  return newPrice;
}

let previousPrice = {};

async function fetchPrice(currencyCode) {
  let priceToUSD = await CryptoFunction.getPriceByName(currencyCode);

  //xu ly lay tam gia tri truoc do (neu co) trong truong hop khong fetch duoc gia
  if (priceToUSD === -1) {
    if (previousPrice[currencyCode]) {
      priceToUSD = previousPrice[currencyCode];
    } else {
      priceToUSD = 0;
    }
  }

  priceToUSD = makeRandomPrice(priceToUSD);

  let percentageChange = 0;
  console.log(`previousPrice[${currencyCode}]: ${previousPrice[currencyCode]}`);
  if (previousPrice[currencyCode] && previousPrice[currencyCode] !== 0) {
    percentageChange = (((priceToUSD - previousPrice[currencyCode]) / previousPrice[currencyCode]) * 100).toFixed(4);
    console.log(`percentageChange: ${percentageChange}`);
    if (Math.abs(percentageChange > 30)) {
      let tryCounter = 0;
      const MAX_TRY_COUNTER = 10;
      while (Math.abs(percentageChange > 20) && tryCounter < MAX_TRY_COUNTER) {
        priceToUSD = await CryptoFunction.getPriceByName(currencyCode);

        percentageChange = (((priceToUSD - previousPrice[currencyCode]) / previousPrice[currencyCode]) * 100).toFixed(
          4,
        );
        tryCounter++;
        previousPrice[currencyCode] = priceToUSD;
      }
    }
  }
  console.log(`priceToUSD ${currencyCode} ${new Date().toISOString()} - ${priceToUSD}`);

  previousPrice[currencyCode] = priceToUSD;
  MQTTFunction.publishJson(currencyCode, {
    when: new Date() - 1,
    price: priceToUSD,
    percentage: percentageChange,
  });
  GameRecordFunctions.addChartRecord(currencyCode, {
    when: new Date() - 1,
    price: priceToUSD,
    percentage: percentageChange,
  });
}

module.exports = {
  fetchPrice,
};
