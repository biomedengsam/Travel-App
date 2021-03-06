// Display trips data
const tripData = () => {
    //Check local storage for data
    let data = localStorage.getItem('trips')
        ? JSON.parse(localStorage.getItem('trips'))
        : []

    // Check if there's no trips saved (title,trips section) stay hidden
    if (data.length !== 0) {
        document.querySelector(".trips-title").style.visibility = "visible";
        document.getElementById("delete-all-trips").style.visibility = "visible";
    }
    else {
        document.querySelector(".trips-title").style.visibility = "hidden";
        document.getElementById("delete-all-trips").style.visibility = "hidden";
    }

    const ui = () => {
        if (data.length >= 1) {
            data.forEach((info) => {
                //languages and currencies return an array of objects.Get data and store it in an array
                let lang = [];
                let currency = [];
                info.languages.forEach((language) => {
                    lang.push(language.name);
                })

                info.currencies.forEach((coin) => {
                    currency.push(coin.name);
                })
                // Convert array data to string to display on UI
                let currencies = currency.toString()
                let languages = lang.toString()

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
                                    <p> <strong>${info.remainingDays} Days left for your ${info.tripDuration} day(s) trip to ${info.destination}</strong></p>
                                    <a target="_blank" href="https://en.wikivoyage.org/wiki/${info.country}" id="more-info" class="btn btn-primary" >For more info about ${info.country}</a>
                                </div>
                            </div>
                                <button  type="button" name="button" data-tripIndex="${data.indexOf(info)}"  class="btn btn-danger delete" onclick="Client.deleteTrip(this)">Delete Trip</button>
                            </div >
                            <div class="col-sm-4 weather">
                            <h3 id="weather-title">weather on trip date</h3>
                            <h6 class="weather-info">Description</h6>
                            <p>${info.weather.weatherInfo.description}</p>
                            <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${info.weather.weatherInfo.icon}.png" alt="weather icon ">
                            <h6 class="weather-info">Temperature</h6>
                            <p>${info.weather.temp}<P>
                            </div>
                            </div >
                    </div >`

                let trip = document.createElement('div');
                trip.setAttribute('class', 'card');
                trip.innerHTML = content;
                document.getElementById('myTrips').appendChild(trip);
            })
        }
    }
    ui();
}

// Delete trip function
const deleteTrip = (e) => {
    // Get data stored in local storage
    let tripsArray = JSON.parse(localStorage.getItem('trips'))

    // Get the index of the data we want to delete
    let x = e.getAttribute('data-tripIndex');

    // Delete data form local storage at the required index
    tripsArray.splice(x, 1);

    // Update Ui after delete
    Client.tripsDelete();
    localStorage.setItem('trips', JSON.stringify(tripsArray));
    tripData();
}

// Enter app function
const enterApp = () => {
    document.getElementById("landing").style.transform = "translate(-200vw)";
    document.getElementById("dimmed-bg").style.visibility = "visible";
    document.getElementById("dimmed-bg").style.transform = "translate(0)";
    document.getElementById("full-site").style.visibility = "visible";
    document.getElementById("full-site").style.overflow = "visible";
    document.getElementById("full-site").style.animation = "2s content";
    document.getElementById("full-site").style.maxHeight = "auto";
    tripData();
}

// Clear all trips from local storage function
const deleteAll = () => {
    const del = () => {
        // Delete all data stored in local storage
        localStorage.clear();
        // Update user interface
        Client.tripsDelete();
        tripData();
    }
    // Confirm deletion process before delete
    return confirm('Are you sure you want to delete all trips?') ? del() : '';
}

export {
    enterApp,
    deleteTrip,
    tripData,
    deleteAll
}