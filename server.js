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


const encryption = require('./encryption');

console.log(encryption);

const test = require('./encryptFigureImgs');
test.copyFileByName('d1.jpg');