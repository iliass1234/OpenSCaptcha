const express = require('express');
const crypto = require('crypto');
const { buffer } = require('stream/consumers');
const captcha_settings_json = require('./captcha_settings.json');


let app = express();

const expressPort = 3000;


app.get('/', (req, res)=>{
    res.send('<h1>Captcha system by ilias jabri <br> github.com/iliass1234</h1>');
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


const captchaImgsEnc = require('./encryptFigureImgs');
// captchaImgsEnc.encryptAllCaptchaImgs();
// captchaImgsEnc.deletePublicCaptchaImgs();

const scheduler = require('./scheduler.js');

captchaImgsEnc.reEncrypt_EVERYTHING();



// function clg1(){
//     console.log('working scheduler');
// }



// scheduler({clg1});