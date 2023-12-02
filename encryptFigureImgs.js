const fs = require('fs');
const path = require('path');
const encryption = require('./encryption');

function copyFileByName(fileName, fileDir = 'captchaImgs_hidden'){

    
    console.log('from encryptImgs file: ');
    let eh = encryption.encrypt('hello this from the file');
    let data = encryption.decrypt(eh);
    console.log(data);

    // fs.writeFileSync(path.join(__dirname, 'captchaImgsEnc', fileName),)
}


module.exports = {copyFileByName: (fileName)=>{ copyFileByName(fileName)}}