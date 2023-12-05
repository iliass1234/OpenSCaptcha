const encryption = require('./encryption');
const captchaSettingsJson = require('./captcha_settings.json');
function checkCaptchaValidation(figureImg, directionImg){

    figureImg = figureImg || 'bfcc065031c8e2358b5d4910bca92651';
    directionImg = directionImg || 'bfcc065031c8e2358b5d4910bca92651';

    let paramIV = captchaSettingsJson.cipher_iv;
    let decFigureImg;
    let decdirectionImg;

    try {
        decFigureImg = encryption.decrypt({encryptedText: figureImg, iv: paramIV});
        decdirectionImg = encryption.decrypt({encryptedText: directionImg, iv: paramIV});
    } catch (err) {
        return false;
    }

    if(decFigureImg[decFigureImg.length - 1] === decdirectionImg[decdirectionImg.length - 1]) return true;
    else return false;

}

module.exports = {checkCaptchaValidation};