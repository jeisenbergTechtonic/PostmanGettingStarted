const express = require('express')
const app = express()
const port = 3005
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use (function (error, req, res, next){
    res.status(400).send("Error with request: " + error);
});

app.get('/numberRange/', (req, res) => {
    let str = "";

    if(req.query.min === undefined || req.query.min === undefined || isNaN(req.query.min) || isNaN(req.query.min)){
        return res.status(400).send("Enter min and max query parameters");
    }
    else if(req.query.min >= req.query.max){
        return res.status(400).send("min must be less than max");
    }

    for(let i = req.query.min; i <= req.query.max; i++){
        str += i
    }

    res.send("Your numbers are: " + str)
})

app.get('/:text/', (req, res) => {
    res.send("You're path parameter was: " + req.params.text)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/echo', (req, res) => {
    try{
        res.status(200).send(req.body);
    }
    catch{
        res.status(400).send("Invalid JSON");
    }
})

app.delete('/delete', (req, res) => {
    res.status(200).send("You deleted: " + req.query.toDelete);
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))