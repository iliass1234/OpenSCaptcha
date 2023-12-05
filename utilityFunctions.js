const fs = require('fs');
const path = require('path');
function setCaptcha_settings_json_file(fullJson){
    fs.writeFileSync(path.join(__dirname, 'captcha_settings.json'), JSON.stringify(fullJson), 'utf-8');
}


module.exports = {setCaptcha_settings_json_file};