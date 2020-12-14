// this file is not used
const axios = require('axios');
const getDataFromGeoNames = async (username, destination) => {
    const url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${username}`;
    try {
        return await axios.get(url)
            .then(res => {
                // console.log(res.data);
                if (res.data.totalResultsCount === 0) {
                    alert('Destination Not Found');
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
    console.log('begin get image');
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

const weather = async (geo_data, remainingDays, departureDate, weatherApi) => {
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