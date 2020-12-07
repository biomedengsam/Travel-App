var path = require('path')
const express = require('express')
const dotenv = require('dotenv');
const fetch = require("node-fetch");
const axios = require('axios');
const CircularJSON = require("circular-json");
dotenv.config();

const app = express();
const username = process.env.user_name;
const weatherApi = process.env.weatherApi;
const pixabayKey = process.env.pixabayKey;
let allData = {};
let allTrips = [];
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

const getDataFromGeoNames = async (username, destination) => {

    const url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${username}`;
    try {
        return await axios.get(url)
            .then(res => {
                // console.log(res.data);
                return {
                    lat: res.data.geonames[0].lat,
                    lng: res.data.geonames[0].lng,
                    countryCode: res.data.geonames[0].countryCode
                }
            });
    } catch (e) {
        console.log(e);
    }
}

//Get current weather data
const getDataFromWeatherApi = async (weatherApi, geo_data) => {

    const url = `http://api.weatherbit.io/v2.0/current?key=${weatherApi}&lat=${geo_data.lat}&lon=${geo_data.lng}`;
    try {
        return await axios.get(url)
            .then(res => {
                // console.log(res.data);
                return {
                    weather: res.data
                }
            });
    } catch (e) {
        console.log(e);
    }
}

// Get forecast weather data
const getForecastWeatherApi = async (weatherApi, geo_data) => {

    const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherApi}&lat=${geo_data.lat}&lon=${geo_data.lng}`;
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

// Get info about the destination from the REST Countries API
const getCountryInfo = async (geo_data) => {

    const url = `https://restcountries.eu/rest/v2/alpha/${geo_data.countryCode}`;
    try {
        return await axios.get(url)
            .then(res => {
                return {
                    info: res.data
                }
            });
    } catch (e) {
        console.log(e);
    }
}

//Get image from Pixabay
const getLocationImage = async (pixabayKey, location, country) => {
    //Check for whitespace and replace the spaces with + sign
    // location = location.replace(/\s/g, '+');
    const url = `https://pixabay.com/api/?q=${encodeURIComponent(location)}&key=${pixabayKey}&image_type=photo`;
    try {
        return await axios.get(url)
            .then(res => {
                // console.log(res.data);
                //Checks the number of hits for the searched location images
                if (res.data.totalHits > 0) {
                    // return the first matched image
                    console.log('found match');
                    // console.log(res.data.hits[0].webformatURL);
                    return res.data.hits[0].webformatURL
                }
                // No images found in pixabay for location,get an image for the country of the location
                else {
                    console.log('No match');
                    return getLocationImage(pixabayKey, country);
                }
            });
    } catch (e) {
        console.log(e);
    }
}

app.post('/api', async function (req, res) {
    // console.log(req.body.text)
    // Get lang and lat from geonames api
    let destination = req.body.destination;
    let departureDate = req.body.departure_date;
    let returnDate = req.body.return_date;

    console.log(destination);
    // console.log(typeof (departureDate));

    // function GetDays() {
    let today = new Date();
    let departure = new Date(departureDate);
    let returnDt = new Date(returnDate);
    let remainingDays = parseInt((departure - today) / (24 * 3600 * 1000));
    let tripDuration = parseInt((returnDt - departure) / (24 * 3600 * 1000));
    // console.log(remainingDays);

    // return parseInt((retdt - depdt) / (24 * 3600 * 1000));
    // }

    try {
        // console.log(getDataFromGeoNames(username, city));

        const geo_data = await (getDataFromGeoNames(username, destination));
        // console.log(geo_data);
        // if (remainingDays >= 7) {
        // use the forecast api
        const weather_data = await (getForecastWeatherApi(weatherApi, geo_data));
        console.log('forecast weather');
        // console.log(weather_data.weather.data);
        let data = weather_data.weather.data;
        // console.log(data[0].datetime);
        // console.log(typeof (data[0].datetime));
        // Find weather data for the departure date
        let weather = data.find(date => date.datetime == departureDate);
        // Add weather info to allData object
        allData.temperature = { max: weather.max_temp, min: weather.low_temp };
        allData.weather = weather.weather;
        // console.log(weather);
        // res.send(weather_data);
        // }
        // else {
        //     // Use current weather api
        //     const weather_data = await (getDataFromWeatherApi(weatherApi, geo_data));
        //     // console.log(weather_data.wea);
        //     allData.temperature = weather_data.weather.data[0].temp;
        //     allData.weather = weather_data.weather.data[0].weather;
        //     console.log('current weather');
        //     // console.log(weather_data.weather.data[0].weather);
        //     // res.send(weather_data);
        // }
        // Get info about the destination from the REST Countries API using country code from geonames
        const countryInfo = await (getCountryInfo(geo_data));
        // Add the required data to allData object
        console.log(countryInfo.info.name);
        // Get image for destination from Pixabay
        const destImage = await (getLocationImage(pixabayKey, destination, countryInfo.info.name));
        // add data to allData object
        allData.destination = destination;
        allData.departure = departureDate;
        allData.return = returnDate;
        allData.remainingDays = remainingDays;
        allData.tripDuration = tripDuration;
        allData.imageUrl = destImage;
        allData.info = {
            name: countryInfo.info.name,
            capital: countryInfo.info.capital,
            region: countryInfo.info.region,
            population: countryInfo.info.population,
            //languages and currencies return an array with an object inside with the data
            languages: countryInfo.info.languages,
            currencies: countryInfo.info.currencies,
            flag: countryInfo.info.flag
        }
        // function add() {

        // }
        // console.log(allData);
        // console.log(geo_data[0].lat);
        // const response = await axios.get(url);
        // resData = CircularJSON.stringify(response)
        // console.log(JSON.parse(resData));
        // res = JSON.parse(resData);
        // let lat = res.data.geonames[0].lat;
        // let lang = res.data.geonames[0].lng;
        // let weatherUrl = ``
        // const weather = await axios.get()

    } catch (error) {
        console.error(error);
    }
    // allTrips.push(allData);
    // console.log(allTrips);
})
