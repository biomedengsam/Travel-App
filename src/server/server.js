var path = require('path')
const express = require('express')
const dotenv = require('dotenv');
const fetch = require("node-fetch");
const axios = require('axios');
const CircularJSON = require("circular-json");
dotenv.config();

const app = express()
let userName = process.env.user_name;
console.log(`your userName: ${process.env.user_name}`);

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/api', async function (req, res) {
    // console.log(req.body.text)
    let url = `http://api.geonames.org/searchJSON?q=${req.body.text}&username=${userName}&maxRows=1`
    // let x = `${url}${req.body.text}&maxRows=1&username=${userName}`
    // console.log(x);

    try {
        const response = await axios.get(url);
        resData = CircularJSON.stringify(response)
        console.log(JSON.parse(resData));
        res.send(JSON.parse(resData));
    } catch (error) {
        console.error(error);
    }
})
    // console.log(response)
    // data = await response.json()
    // console.log(data);


