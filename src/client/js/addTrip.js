// Add new trip
const trip = (info) => {
    // Get data from local storage
    let tripsArray = JSON.parse(localStorage.getItem('trips'));
    // Get the index for the new trip
    let tripIndex = (tripsArray.length) - 1;
    let lang = [];
    let currency = [];

    //Get languages and currencies and store them in there corresponding arrays
    info.languages.forEach((language) => {
        lang.push(language.name);
    })

    info.currencies.forEach((coin) => {
        currency.push(coin.name);
    })

    // Convert lang,currency arrays to string
    let currencies = currency.toString()
    let languages = lang.toString()

    //Switch visibility on for the title of my trips section.And delete all trips button
    document.querySelector(".trips-title").style.visibility = "visible";
    document.getElementById("delete-all-trips").style.visibility = "visible";

    let content =
        `<img src="${info.imageUrl}" class="card-img-top countryImg" alt="photo of ${info.country}">
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
                        <p> ${info.remainingDays} Days left for your ${info.tripDuration} day trip to ${info.destination}</p>
                            <a target="_blank" href="https://en.wikivoyage.org/wiki/${info.country}" id="more-info" class="btn btn-primary">For more info about ${info.country}</a>
                    </div>
                </div>
                <button  type="button" name="button" data-tripIndex="${tripIndex}"  class="btn btn-danger delete" onclick="Client.deleteTrip(this)" >Delete Trip</button>
                </div >
                <div class="col-sm-4 weather">
                <h3 id="weather-title">weather on trip date</h3>
                <h6 class="weather-info">Description</h6>
                <p>${info.weather.weatherInfo.description}</p>
                <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${info.weather.weatherInfo.icon}.png" alt="weather icon">
                <h6 class="weather-info">Temperature</h6>
                <p>${info.weather.temp}<P>
                </div>
                </div >
            </div >`

    let trip = document.createElement('div');
    trip.setAttribute('class', 'card');
    trip.innerHTML = content;
    document.getElementById('myTrips').appendChild(trip);

    // Scroll to new trip smoothly
    let scrollTO = () => {
        document.getElementById('myTrips').lastChild.scrollIntoView({ behavior: 'smooth' });
    }
    scrollTO();
}

const appInfo = (apiData) => {
    let tripsArray = localStorage.getItem('trips')
        ? JSON.parse(localStorage.getItem('trips'))
        : []
    tripsArray.push(apiData);
    localStorage.setItem('trips', JSON.stringify(tripsArray));
    trip(apiData);
}

export {
    appInfo
}