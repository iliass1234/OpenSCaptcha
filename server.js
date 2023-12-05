const express = require('express');
const crypto = require('crypto');
const path = require('path');
const captcha_settings_json = require('./captcha_settings.json');
const functions = require('./apiFunctions.js');



let app = express();

const expressPort = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.render('./index.html')
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

app.post('/check_captcha', (req, res)=>{
    let data = req.body;
    if(functions.checkCaptchaValidation(data.firstImg, data.secondImg)){
        console.log('true check');
        res.json({success: true});
    }else{
        console.log('false check');
        res.json({success: false});
    }
});


app.post('/next_challenge', (req, res) => {

})



const captchaImgsEnc = require('./encryptFigureImgs');
// captchaImgsEnc.encryptAllCaptchaImgs();
// captchaImgsEnc.deletePublicCaptchaImgs();

const scheduler = require('./scheduler.js');

// captchaImgsEnc.ENCRYPT_EVERYTHING();



// function clg1(){
//     console.log('working scheduler');
// }



scheduler({encryptall: captchaImgsEnc.ENCRYPT_EVERYTHING});