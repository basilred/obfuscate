'use strict';

const util = require('util');
const obfuscate = require('./obfuscate');
const fs = require('fs');
// const data = require('./data');
const data = ['aa', 'ab', 'abc', 'ac', 'abc', 'ad', 'aaa', 'abd', 'ae', 'af', 'ag', 'ah', 'ac', 'aa', 'ab', 'abc', 'ac', 'abc', 'aa', 'aaa', 'abc', 'ab', 'ac', 'ab', 'ac', 'ac'];

const res = obfuscate(data);
console.log(`Length of data.json is ${ res.input.length } items.`);
// console.log(`Returned object is ${ util.inspect(res.outputJson) }`);
console.log(`There are ${ Object.keys(res.outputJson).length } records in the object.`);

// fs.readFile('data.json', (err, data) => {
//     if (err) throw err;
//
//     const res = obfuscate(data);
//     console.log(`Length of data.json is ${ res.input.length } items.`);
//     console.log(`Returned object is ${ util.inspect(res.outputJson) }`);
//
//     return res;
// });
