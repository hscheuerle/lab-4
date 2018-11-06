const fs = require('fs')
const path = require('path')
const { parseDictionary } = require("./parse-dictionary");

const testpath = path.resolve(__dirname, '../../dictionary/en-it-omega.txt')
const testfile = fs.readFileSync(testpath);
const testtext = testfile.toString();

const res = parseDictionary(testtext)

console.log(res);
