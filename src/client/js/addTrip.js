import $ from "jquery";

const trip = (info) => {
    let tripsArray = JSON.parse(localStorage.getItem('trips'));
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
    $(".trips-title").css("visibility", "visible");
    $(".delete-all-trips").css("visibility", "visible");

    let content =
        ` <div class="card" >
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
                            <p> ${info.remainingDays} Days left for your ${info.tripDuration} day trip to ${info.destination}</p>
                             <a target="_blank" href="https://en.wikivoyage.org/wiki/${info.country}" class="btn btn-primary">For more info about ${info.country}</a>
                        </div>
                    </div>
                    <button  type="button" name="button" data-tripIndex="${tripIndex}"  class="btn btn-danger delete" onclick="Client.deleteTrip(this)" >Delete Trip</button>
                  </div >
                    <div class="col-sm-4 weather">
                    <h3>weather for trip time</h3>
                    <h6>Description</h6>
                    <p>${info.weather.weatherInfo.description}</p>
                    <img class="weather-icon"src="https://www.weatherbit.io/static/img/icons/${info.weather.weatherInfo.icon}.png ">
                    <h6>Temperature</h6>
                    <p>${info.weather.temp}<P>
                    </div>
                    </div >
                </div >
                </div > `

    // Append trip as first child
    $('#myTrips').prepend(content);

    // Scroll to my trips smoothly
    let scrollTO = () => {
        $('#myTrips')[0].scrollIntoView({ behavior: 'smooth' });
    }
    scrollTO();
}

function appinfo(apiData) {

    let tripsArray = JSON.parse(localStorage.getItem('trips'));
    tripsArray.push(apiData);
    localStorage.setItem('trips', JSON.stringify(tripsArray));
    trip(apiData);
}

export {
    appinfo
}