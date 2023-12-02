const express = require('express');
const crypto = require('crypto');
const { buffer } = require('stream/consumers');
const captcha_settings_json = require('./captcha_settings.json');


let app = express();

const expressPort = 3000;

let iv = crypto.randomBytes(16);
let secretMessage = 'hello ilias';
let key = '12345678123456781234567812345678';



app.get('/', (req, res)=>{
    res.send('<h1>working express</h1>');
})

app.get('/figure_directions_list', (req, res) => {
    let directionsList = [];
    for(let i = 0; i<6; i++){
        directionsList.push(Math.round(Math.random()*5));
    }
    let resJson = {directionsList: directionsList};
    res.json(resJson);
})

app.listen(expressPort, ()=>{
    console.log('running on port', expressPort);
});





function encrypt(textToEncrypt = 'first text') {
    const algorithm = 'aes-128-cbc';
    const key = Buffer.from(captcha_settings_json.captcha_great_secret, 'utf-8'); // Convert the key to a buffer
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
    const key = Buffer.from('1234567812345678', 'utf-8');
    const iv = Buffer.from(encryptedData.iv, 'hex');
  
    let mykey = crypto.createDecipheriv(algorithm, key, iv);
    let mystr = mykey.update(encryptedData.encryptedText, 'hex', 'utf8');
    mystr += mykey.final('utf8');
  
    return mystr;
  }
  
  // Example usage
  const encryptedData = encrypt('hello ilias how are you today.');
  console.log('Encrypted:', encryptedData);
  
  const decryptedMessage = decrypt(encryptedData);
  console.log('Decrypted:', decryptedMessage);