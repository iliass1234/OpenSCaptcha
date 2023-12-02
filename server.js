let express = require('express');

let app = express();

const expressPort = 3000;

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