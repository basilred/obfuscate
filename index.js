'use strict';

const util = require('util');
const obfuscate = require('./obfuscate');
const fs = require('fs');
const data = require('./data');

const res = obfuscate(data);
console.log(`Length of data.json is ${ data.length } items.`);
console.log(`Returned object is ${ util.inspect(res) }`);
console.log(`There are ${ Object.keys(res).length } records in the object.`);
