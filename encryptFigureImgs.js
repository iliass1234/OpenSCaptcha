const fs = require('fs');
const path = require('path');
const encryption = require('./encryption');



let before_encryption_imgs = fs.readdirSync(path.join(__dirname, 'captchaImgs_hidden'));


function copyFileByName(fileName, fileDir = 'captchaImgs_hidden', fileDestination = 'captchaImgsEnc'){

    if(!fileName) return;

    let encImgName = encryption.encrypt(fileName);

    let buffer = fs.readFileSync(path.join(__dirname, fileDir, fileName));
    fs.writeFileSync(path.join(__dirname, fileDestination, encImgName.encryptedText+'.jpg'), buffer, 'base64');
}





module.exports = {copyFileByName: copyFileByName}