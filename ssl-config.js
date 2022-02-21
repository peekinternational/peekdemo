var path = require('path');
var fs = require('fs');

exports.keyJcm = fs.readFileSync(path.join(__dirname, './private/peekchat/server.key'), 'utf8').toString();
exports.certJcm = fs.readFileSync(path.join(__dirname, './private/peekchat/server.crt'), 'utf8').toString();