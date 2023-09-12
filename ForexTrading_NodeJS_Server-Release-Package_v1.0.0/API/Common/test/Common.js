/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

const chai = require('chai');
const expect = chai.expect;
const jsonComparer = require('deep-diff');
const { readFile } = require('fs');

function checkResponseStatus(res, expected) {
  expect(res).to.not.equal(undefined);
  if (res.body && res.body.statusCode !== expected) {
    console.info('========Request=======');
    console.info(res.request.url);
    console.info(res.request.method);
    console.info(res.request._header);
    console.info(JSON.stringify(res.request._data));
    console.info('========Response======');
    console.info(res.body);
  }
  expect(res).to.have.status(expected);
  expect(res.body.statusCode === expected);
}

var lhs = {
  name: 'my object',
  description: "it's an object!",
  details: {
    it: 'has',
    an: 'array',
    with: ['a', 'few', 'elements'],
  },
};

/* sample */
// var rhs = {
//   body: {
//     name: 'updated object',
//     description: 'it\'s an object!',
//     details: {
//       it: 'has',
//       an: 'array',
//       with: ['a', 'few', 'more', 'elements', { than: 'before' }]
//     }
//   }
// };
// checkResponseBody(rhs, './test/sample.json');

async function checkResponseBody(res, templatePath) {
  if (res.body === undefined) {
    console.info('========Request=======');
    console.info(res.request.url);
    console.info(res.request.method);
    console.info(res.request._header);
    console.info(res.request._data);
  }

  return new Promise((resolve, reject) => {
    readFile(templatePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`error`, err);
        reject(err);
      }
      let templateData = JSON.parse(data);

      let matchResult = jsonComparer(templateData, res.body);
      const TOTALLY_MATCHED = undefined;

      if (matchResult !== TOTALLY_MATCHED) {
        for (let i = 0; i < matchResult.length; i++) {
          const result = matchResult[i];
          if (result.kind === 'N' || result.kind === 'D') {
            console.info(result);
          }
          if (result.kind === 'E') {
            if (result.lhs && result.lhs !== null && result.lhs.it && result.lhs.an) {
              expect(result.lhs.an).to.not.equal('array');
            } else if (result.rhs && result.rhs !== null && result.rhs.it && result.rhs.an) {
              expect(result.rhs.an).to.not.equal('array');
            }
          }
          expect(result.kind).to.not.equal('N');
          expect(result.kind).to.not.equal('D');
        }
      }
      resolve(matchResult);
    });
  });
}

module.exports = {
  checkResponseStatus,
  checkResponseBody,
};
