var aes256 = require('aes256');
require('dotenv').config();

const SECRET = process.env.ENCRYPTION_KEY;

function code (text){
    const result = aes256.encrypt(SECRET, text);
    return result;
};

function decode (etext){
    const result = aes256.decrypt(SECRET, etext);
    return result;
};

module.exports = {code, decode};