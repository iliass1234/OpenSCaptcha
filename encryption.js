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
  
  function decrypt(data) {
    const algorithm = 'aes-128-cbc';
    const key = Buffer.from(captcha_settings_json.captcha_great_secret, 'utf-8');
    const iv = Buffer.from(data.iv, 'hex');
  
    let mykey = crypto.createDecipheriv(algorithm, key, iv);
    let mystr = mykey.update(data.encryptedText, 'hex', 'utf8');
    mystr += mykey.final('utf8');
  
    return mystr;
  }

  function decrypts(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
 }

  module.exports = {encrypt: encrypt, decrypt: decrypt};