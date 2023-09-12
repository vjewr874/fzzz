/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

/**
 * Created by A on 7/18/17.
 */
'use strict';
const RedisFunction = require('../../ThirdParty/Redis/RedisInstance');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const CRYPTO_CURRENCY = {
  ETH: 'ethereum',
  ADA: 'binance-peg-cardano',
  BNB: 'oec-binance-coin',
  DOGE: 'binance-peg-dogecoin',
  DOT: 'binance-peg-polkadot',
  LTC: 'litecoin',
  XRP: 'ripple',
  BTC: 'bitcoin',
};

const CACHE_PRICE = {
  ETH: 0,
  BTC: 0,
};
const CACHE_VOLUME_DATA = {
  ETH: 0,
  BTC: 0,
};
async function getPriceByName(cryptoCurrency, forced = false) {
  return new Promise(async (resolve, reject) => {
    try {
      let cryptoPrice = await RedisFunction.get(`CryptoPrice_${cryptoCurrency}`);

      if (forced === false) {
        if (cryptoPrice > 0) {
          console.log(`Cached CryptoPrice_${cryptoCurrency}: ${cryptoPrice}`);
          resolve(cryptoPrice);
          return;
        }
      }

      let newPrice = 0;
      //if we plan to use API from coingecko.com
      if (process.env.USE_COINGECKO_API * 1 === 1) {
        console.log('USE_COINGECKO_API');
        newPrice = await _fetchCryptoPrices(cryptoCurrency);
      } else if (process.env.USE_CRYPTOCOMPARE_API * 1 === 1) {
        console.log('USE_CRYPTOCOMPARE_API');
        //if we plan to use API from https://min-api.cryptocompare.com/
        newPrice = await _fetchCryptoCompareAPI(cryptoCurrency);
      } else {
        newPrice = await _fetchBOTradingAPI(cryptoCurrency);
      }
      CACHE_PRICE[cryptoCurrency] = newPrice;
      resolve(newPrice);
    } catch (e) {
      console.error(e);
      resolve(0);
    }
  });
}

const CoinGeckoHost = 'https://api.coingecko.com';

async function _fetchCryptoPrices(cryptoCurrency) {
  const cryptoName = CRYPTO_CURRENCY[cryptoCurrency];
  if (!cryptoName) {
    return -1;
  }

  return new Promise(async (resolve, reject) => {
    try {
      chai
        .request(`${CoinGeckoHost}`)
        .get(`/api/v3/coins/markets?vs_currency=usd&ids=${cryptoName}`)
        .end((err, res) => {
          if (err) {
            console.log(err);
            resolve(-1);
          }
          let coinMarket = res.body[0];
          if (
            coinMarket &&
            (coinMarket.symbol.toLowerCase() === cryptoCurrency.toLowerCase() ||
              coinMarket.name.toLowerCase() === cryptoCurrency.toLowerCase() ||
              coinMarket.id.toLowerCase() === cryptoCurrency.toLowerCase())
          ) {
            console.info(`_fetch coingecko API: ${cryptoCurrency}: ${coinMarket.current_price} `);
            resolve(coinMarket.current_price);
            RedisFunction.setWithExpire(`CryptoPrice_${cryptoCurrency}`, coinMarket.current_price, 60 * 5); //cache for 5 seconds
          }
          resolve(-1);
        });
    } catch (e) {
      console.error(e);
      resolve(-1);
    }
  });
}

// https://min-api.cryptocompare.com/documentation?api_key=e7fd94f011db0fe5ddbabe7383efbcf810881790784653e084339e822315af7d
async function _fetchCryptoCompareAPI(cryptoCurrency) {
  const CRYPTO_COMPARE_API = 'https://min-api.cryptocompare.com';
  const CRYPTO_COMPARE_API_KEY =
    process.env.CRYPTO_COMPARE_API || 'e7fd94f011db0fe5ddbabe7383efbcf810881790784653e084339e822315af7d';
  return new Promise(async (resolve, reject) => {
    try {
      chai
        .request(`${CRYPTO_COMPARE_API}`)
        .get(`/data/price?fsym=${cryptoCurrency}&tsyms=USD&api_key=${CRYPTO_COMPARE_API_KEY}`)
        .end((err, res) => {
          if (err) {
            console.log(err);
            resolve(-1);
          }
          let _crytoPrice = 0;
          if (res && res.body && res.body.USD) {
            _crytoPrice = res.body.USD;
          }
          if (_crytoPrice) {
            console.info(`_fetchCryptoCompareAPI: ${cryptoCurrency}: ${_crytoPrice} `);
            resolve(_crytoPrice);
            RedisFunction.setWithExpire(`CryptoPrice_${cryptoCurrency}`, _crytoPrice, 60 * 15); //cache for 15 minutes
          } else {
            resolve(-1);
          }
        });
    } catch (e) {
      console.error(e);
      resolve(-1);
    }
  });
}

// https://min-api.cryptocompare.com/documentation?api_key=e7fd94f011db0fe5ddbabe7383efbcf810881790784653e084339e822315af7d
async function _fetchBOTradingAPI(cryptoCurrency) {
  const BOCRYPTO_API = 'https://bocrypto.poolata.com';
  return new Promise(async (resolve, reject) => {
    try {
      chai
        .request(`${BOCRYPTO_API}`)
        .post(`/CryptoCurrency/getPriceByName`)
        .send({
          currencyCode: cryptoCurrency,
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
            resolve(-1);
          }
          let _crytoPrice = 0;

          if (res && res.body && res.body.statusCode === 200) {
            _crytoPrice = res.body.data ? res.body.data * 1 : -1;
          }
          if (_crytoPrice) {
            console.info(`_fetchBOTradingAPI: ${cryptoCurrency}: ${_crytoPrice} `);
            resolve(_crytoPrice);
          } else {
            console.error(`_fetchBOTradingAPI invalid _crytoPrice ${JSON.stringify(res.body)}`);
            resolve(-1);
          }
        });
    } catch (e) {
      console.error(e);
      resolve(-1);
    }
  });
}

// https://min-api.cryptocompare.com/documentation?api_key=e7fd94f011db0fe5ddbabe7383efbcf810881790784653e084339e822315af7d
async function _fetchDataByName(cryptoCurrency) {
  const BOCRYPTO_API = 'https://bocrypto.poolata.com';
  return new Promise(async (resolve, reject) => {
    try {
      chai
        .request(`${BOCRYPTO_API}`)
        .post(`/CryptoCurrency/getDataByName`)
        .send({
          currencyCode: cryptoCurrency,
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
            resolve(-1);
          }
          let _crytoPrice = 0;

          if (res && res.body && res.body.statusCode === 200) {
            _crytoPrice = res.body.data ? res.body.data : undefined;
          }
          if (_crytoPrice) {
            console.info(`getDataByName: ${cryptoCurrency}: ${JSON.stringify(_crytoPrice)} `);
            resolve(_crytoPrice);
          } else {
            console.error(`getDataByName invalid _crytoPrice ${JSON.stringify(res.body)}`);
            resolve(undefined);
          }
        });
    } catch (e) {
      console.error(e);
      resolve(undefined);
    }
  });
}

async function getDataByName(cryptoCurrency) {
  let priceData = await _fetchDataByName(cryptoCurrency);
  if (priceData) {
    await RedisFunction.setWithExpire(`CryptoPrice_${cryptoCurrency}_open`, priceData.open, 60 * 60); //cache for 15 minutes
    await RedisFunction.setWithExpire(`CryptoPrice_${cryptoCurrency}_close`, priceData.close, 60 * 60); //cache for 15 minutes
    await RedisFunction.setWithExpire(`CryptoPrice_${cryptoCurrency}_low`, priceData.low, 60 * 60); //cache for 15 minutes
    await RedisFunction.setWithExpire(`CryptoPrice_${cryptoCurrency}_high`, priceData.high, 60 * 60); //cache for 15 minutes
    CACHE_VOLUME_DATA[cryptoCurrency] = priceData;
    return priceData;
  } else {
    return undefined;
  }
}
async function getCachedPriceByName(cryptoCurrency) {
  return CACHE_PRICE[cryptoCurrency];
}
module.exports = {
  getPriceByName,
  getDataByName,
  getCachedPriceByName,
};
