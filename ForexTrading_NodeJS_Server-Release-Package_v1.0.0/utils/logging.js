/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

'use strict';

const Winston = require('winston');
const AppConfig = require('../config/app');
const { networkInterfaces } = require('os');
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

//them module de ghi loi theo doi khi can thiet
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN || '5665305274:AAFlhbcpNijafxo9sCNqO2CBuojoRNP5ZFc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: false });

const chatId = process.env.TELEGRAM_CHAT_ID || '@BuildNotify';

bot.sendMessage(chatId, `ForexTrading started on server`);
bot.sendMessage(chatId, `${JSON.stringify(results)}`);

const loggingTransports = [
  new Winston.transports.Console({
    level: AppConfig.logging.console.level,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    colorize: true,
  }),
];
Winston.Logger({
  transports: loggingTransports,
  exitOnError: false,
});


module.exports = Winston;
