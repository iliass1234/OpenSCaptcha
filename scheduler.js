
function getDefaultSchedulerTime (){

    try{
        let rawJsonString = require('./captcha_settings.json').encryptionSchedulerTime;    
        
        let jsonStr = rawJsonString.replace(/\$/g, '"');
        let timeObj = JSON.parse(jsonStr);
        
        return timeObj;
    } catch(err){
        throw (err)
        throw('something wrong in encryption scheduler time in captcha_settings.json the nested time json should follow the pattern : {$days$: d, $hours$: h, $minutes$: m, $seconds$: s}');
    }

}

const defaultSchedulerTime = getDefaultSchedulerTime();

// very basic shceduler that takes object full of methods to be executed + scheduler time object.
function schedulerDo(objMethods, timeObj){

    timeObj = {days: defaultSchedulerTime.days, hours: defaultSchedulerTime.hours, minutes: defaultSchedulerTime.minutes, seconds: defaultSchedulerTime.seconds};

    let secondsInOneDay = 86164
    let scheduleTimeInMs= ( (timeObj.hours * 3600) + (timeObj.minutes * 60) + (timeObj.days * secondsInOneDay) + timeObj.seconds ) * 1000;

    setInterval(()=>{

        for(method in objMethods){
            objMethods[method]();
        }

    }, scheduleTimeInMs);

}



module.exports = schedulerDo;