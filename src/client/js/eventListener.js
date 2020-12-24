import $ from "jquery";

// Display trips data
const tripData = () => {
    //Check local storage for data
    let tripsArray = localStorage.getItem('trips')
        ? JSON.parse(localStorage.getItem('trips'))
        : []

    localStorage.setItem('trips', JSON.stringify(tripsArray))
    let data = JSON.parse(localStorage.getItem('trips'))

    // Check if there's no trips saved title,trips section stay hidden
    if (data.length !== 0) {
        $(".trips-title").css("visibility", "visible");
        $(".delete-all-trips").css("visibility", "visible");
    }

    const ui = () => {
        if (data.length >= 1) {
            data.forEach((info) => {
                //languages and currencies return an array with an objects
                let lang = [];
                let currency = [];
                info.languages.forEach((language) => {
                    lang.push(language.name);
                })

                info.currencies.forEach((coin) => {
                    currency.push(coin.name);
                })
                let currencies = currency.toString()
                let languages = lang.toString()

                let content =
                    ` <div class="card">
              <img src="${info.imageUrl}" class="card-img-top countryImg" alt="photo of ${info.country}">
              <div class="card-body">
                    <div class="row">
                    <div class="col-sm-8">
                    <img id="flag" src=" ${info.flagUrl}" alt="flag of ${info.country}>
                    <h2 class="card-title "><strong>${info.destination} /${info.country}</strong></h2><hr>
                    <div class="info">
                        <div>
                            <p>Destination:  ${info.destination}</p>
                            <p>Country:  ${info.country}</p>
                            <p>Region : ${info.region}</p>
                            <p>Capital : ${info.capital}</p>
                            <p>Population : ${info.population}</p>
                            <p>Languages : ${languages}</ >
                            <p>Currencies : ${currencies}</ >
                        </div>
                        <div>
                            <p>Departure Date:${info.departure}</p>
                            <p>Return Date:${info.return}</p>
                            <p> <strong>${info.remainingDays} Days left for your ${info.tripDuration} day(s) trip to ${info.destination}</strong></p>
                            <a target="_blank" href="https://en.wikivoyage.org/wiki/${info.country}" class="btn btn-primary" >For more info about ${info.country}</a>
                        </div>
                    </div>
                         <button  type="button" name="button" data-tripIndex="${data.indexOf(info)}"  class="btn btn-danger delete" onclick="Client.deleteTrip(this)" >Delete Trip</button>
                    </div >
                    <div class="col-sm-4 weather">
                    <h3>weather on trip date</h3>
                    <h6>Description</h6>
                    <p>${info.weather.weatherInfo.description}</p>
                    <img class="weather-icon"src="https://www.weatherbit.io/static/img/icons/${info.weather.weatherInfo.icon}.png ">
                    <h6>Temperature</h6>
                    <p>${info.weather.temp}<P>
                    </div>

                    </div >
                </div >
                </div > `

                $('#myTrips').append(content);
            })
        }
    }
    ui();
}

// Delete trip
const deleteTrip = (e) => {

    let tripsArray = JSON.parse(localStorage.getItem('trips'))
    let x = e.getAttribute('data-tripIndex');
    tripsArray.splice(x, 1);
    $('.card').remove();
    localStorage.setItem('trips', JSON.stringify(tripsArray))
    tripData();
}

function enterApp() {
    $("#landing").css("transform", "translate(-200vw)");
    $("#dimmed-bg").css("visibility", "visible");
    $("#dimmed-bg").css("transform", "translate(0)");
    $("#full-site").css("visibility", "visible");
    $("#full-site").css("overflow", "visible");
    $("#full-site").css("animation", "2s content");
    $("#full-site").css("max-height", "auto");
    tripData();
}

// To clear all trips
const deleteAll = () => {
    const del = () => {
        localStorage.clear();
        $('.card').remove();
        tripData();
        $(".trips-title").css("visibility", "hidden");
        $(".delete-all-trips").css("visibility", "hidden");
    }
    return confirm('Are you sure you want to delete all trips?') ? del() : '';

}

export {
    enterApp,
    deleteTrip,
    tripData,
    deleteAll
}