const crypto = require('crypto');
const captcha_settings_json = require('./captcha_settings.json');

function encrypt(textToEncrypt = 'first text') {
    const algorithm = 'aes-128-cbc';
    const key = Buffer.from(captcha_settings_json.captcha_great_secret, 'utf-8');
    const iv = Buffer.from(captcha_settings_json.cipher_iv, 'hex');
  
    let mykey = crypto.createCipheriv(algorithm, key, iv);
    let mystr = mykey.update(textToEncrypt, 'utf8', 'hex');
    mystr += mykey.final('hex');
  
    return {
      iv: iv,
      encryptedText: mystr
    }
  }
  
  function decrypt(encryptedData) {
    const algorithm = 'aes-128-cbc';
    const key = Buffer.from(captcha_settings_json.captcha_great_secret, 'utf-8');
    const iv = Buffer.from(encryptedData.iv, 'hex');
  
    let mykey = crypto.createDecipheriv(algorithm, key, iv);
    let mystr = mykey.update(encryptedData.encryptedText, 'hex', 'utf8');
    mystr += mykey.final('utf8');
  
    return mystr;
  }


  module.exports = {encrypt: (text) => encrypt(text), decrypt: (encryptedData) => decrypt(encryptedData)};