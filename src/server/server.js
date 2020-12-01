var path = require('path')
const express = require('express')
const dotenv = require('dotenv');
const fetch = require("node-fetch");
const axios = require('axios');
const CircularJSON = require("circular-json");
dotenv.config();

const app = express()
const username = process.env.user_name;
const weatherApi = process.env.weatherApi;
console.log(`your userName: ${username}`);
console.log(`your weatherApi: ${weatherApi}`);

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

const getDataFromGeoNames = async (username, city) => {

    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
    try {
        return await axios.get(url)
            .then(res => {
                // console.log(res.data.geonames[0].lat);
                return {
                    lat: res.data.geonames[0].lat,
                    lng: res.data.geonames[0].lng
                }
            });
    } catch (e) {
        console.log(e);
    }
}

// weather data
const getDataFromWeatherApi = async (weatherApi, geo_data) => {

    const url = `http://api.weatherbit.io/v2.0/current?key=${weatherApi}&lat=${geo_data.lat}&lon=${geo_data.lng}`;
    try {
        return await axios.get(url)
            .then(res => {
                // console.log(res.data);
                // console.log(res.data.geonames[0].lat);
                return {

                    weather: res.data

                }
            });
    } catch (e) {
        console.log(e);
    }
}

app.post('/api', async function (req, res) {
    // console.log(req.body.text)
    // Get lang and lat from geonames api
    let city = req.body.city;
    console.log(city);

    // let url = `http://api.geonames.org/searchJSON?q=${req.body.text}&username=${username}&maxRows=1`
    // let x = `${url}${req.body.text}&maxRows=1&username=${userName}`
    // console.log(x);

    try {
        // console.log(getDataFromGeoNames(username, city));

        const geo_data = await (getDataFromGeoNames(username, city));
        console.log(geo_data);
        const weather_data = await (getDataFromWeatherApi(weatherApi, geo_data));
        console.log(weather_data.weather.data);


        // console.log(geo_data[0].lat);
        // const response = await axios.get(url);
        // resData = CircularJSON.stringify(response)
        // console.log(JSON.parse(resData));
        // res = JSON.parse(resData);
        // let lat = res.data.geonames[0].lat;
        // let lang = res.data.geonames[0].lng;
        // let weatherUrl = ``
        // const weather = await axios.get()
        res.send(weather_data);
    } catch (error) {
        console.error(error);
    }
})
    // console.log(response)
    // data = await response.json()
    // console.log(data);


