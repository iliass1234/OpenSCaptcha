const fs = require('fs');
const path = require('path');
const encryption = require('./encryption');
const captchaSettingsJson = require('./captcha_settings.json');

function getImgsNamesListBeforeEnc(subDir = 'figures'){

    let before_encryption_imgs_names = fs.readdirSync(path.join(__dirname, captchaSettingsJson.rawCaptchaImgsDir, subDir));
    return before_encryption_imgs_names;

}


function copyFileByName(fileName, imgkind){

    if(!fileName) return;

    let encImgName = encryption.encrypt(fileName);
    let imgKindDir = imgkind == 'figures' ? captchaSettingsJson.rawCaptchaImgsDirFigures : imgkind == 'directions' ? captchaSettingsJson.rawCaptchaImgsDirDirections : null;
    let publicImgKindDir = imgkind == 'figures' ? captchaSettingsJson.publicCaptchaImgsDirFigures : imgkind == 'directions' ? captchaSettingsJson.publicCaptchaImgsDirDirections : null;



    if (imgKindDir === null || publicImgKindDir === null) return;

    let rawFileDir = path.join(__dirname, captchaSettingsJson.rawCaptchaImgsDir, imgKindDir);
    let encFileDestination = path.join(__dirname, captchaSettingsJson.publicCaptchaImgsDir, publicImgKindDir);

    let buffer = fs.readFileSync(path.join(rawFileDir, fileName));
    fs.writeFileSync(path.join(encFileDestination, encImgName.encryptedText+'.jpg'), buffer, 'base64');

}

function deletePublicCaptchaImgs () {
    let pDirectionsImgsPath = path.join(__dirname, captchaSettingsJson.publicCaptchaImgsDir, captchaSettingsJson.publicCaptchaImgsDirDirections);
    let pFiguresImgsPath = path.join(__dirname, captchaSettingsJson.publicCaptchaImgsDir, captchaSettingsJson.publicCaptchaImgsDirFigures)

    let directionsImgs = fs.readdirSync(pDirectionsImgsPath);
    let figuresImgs = fs.readdirSync(pFiguresImgsPath);

    directionsImgs.forEach(img => {
        fs.rmSync(path.join(pDirectionsImgsPath, img));
    })

    figuresImgs.forEach(img => {
        fs.rmSync(path.join(pFiguresImgsPath, img));
    })


    console.log(directionsImgs);
}



function copyAllWithEncreption(){
    const imgsNamesBeforeEncDirections = getImgsNamesListBeforeEnc('directions');   
    const imgNamesBeforeEncFigures = getImgsNamesListBeforeEnc('figures');
    
    imgsNamesBeforeEncDirections.forEach(imgName =>{
        copyFileByName(imgName, 'directions')
    });
    imgNamesBeforeEncFigures.forEach(imgName =>{
        copyFileByName(imgName, 'figures');
    });

    console.log('files copied');
}



module.exports = {encryptAllCaptchaImgs: copyAllWithEncreption, deletePublicCaptchaImgs: deletePublicCaptchaImgs};