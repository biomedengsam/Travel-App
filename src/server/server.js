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
let allTrips = [];

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
                if (res.data.totalResultsCount === 0) {

                    return false
                }
                else {
                    return {
                        lat: res.data.geonames[0].lat,
                        lng: res.data.geonames[0].lng,
                        countryCode: res.data.geonames[0].countryCode
                    }
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
                console.log(res.data);
                return {
                    temp: res.data.data[0].temp
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
                return res.data.data
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
                // console.log(res.data);
                return res.data

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
                //Checks the number of hits for the searched location images
                if (res.data.totalHits > 0) {
                    // return the first matched image
                    console.log('found match');
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

const weather = async (geo_data, remainingDays, departureDate) => {
    if (remainingDays >= 7) {
        // use the forecast api
        const weather_data = await (getForecastWeatherApi(weatherApi, geo_data));
        console.log('forecast weather');
        // Find weather data for the departure date
        let weather = weather_data.find(date => date.datetime == departureDate);
        return {
            min: weather.low_temp,
            max: weather.max_temp
        }
    }
    else {
        // Use current weather api
        console.log('current weather');
        const weather_data = await (getDataFromWeatherApi(weatherApi, geo_data));
        return weather_data
    }
}

const api = async (input) => {
    let destination = input.destination;
    let departureDate = input.departure_date;
    let returnDate = input.return_date;
    console.log(destination);
    let today = new Date();
    let departure = new Date(departureDate);
    let returnDt = new Date(returnDate);
    let remainingDays = parseInt((departure - today) / (24 * 3600 * 1000));
    let tripDuration = parseInt((returnDt - departure) / (24 * 3600 * 1000));
    try {
        // Get lang and lat from geonames api
        const geo_data = await (getDataFromGeoNames(username, destination));
        if (geo_data === false) {
            console.log('false');
            return false
        }
        else {
            // Get info about the destination from the REST Countries API using country code from geonames
            const countryInfo = await (getCountryInfo(geo_data));
            // Get image for destination from Pixabay
            const destImage = await (getLocationImage(pixabayKey, destination, countryInfo.name));
            const weatherdata = await (weather(geo_data, remainingDays, departureDate));
            return {
                destination: destination,
                country: countryInfo.name,
                capital: countryInfo.capital,
                region: countryInfo.region,
                population: countryInfo.population,
                //languages and currencies return an array with an object inside with the data
                languages: countryInfo.languages,
                currencies: countryInfo.currencies,
                flagUrl: countryInfo.flag,
                departure: departureDate,
                return: returnDate,
                remainingDays: remainingDays,
                tripDuration: tripDuration,
                imageUrl: destImage,
                weather: weatherdata,
            }

        }

    } catch (error) {
        console.error(error);
    }

}

app.post('/api', async function (req, res) {
    try {
        const apiData = await api(req.body);
        console.log(apiData);
        // delete allTrips when doe just for debugging
        allTrips.push(apiData);
        console.log(allTrips);
        res.send(apiData)

    } catch (error) {
        console.error(error);
    }
})

