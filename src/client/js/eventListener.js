import $ from "jquery";

// data.reverse()
function tripData() {

    let tripsArray = localStorage.getItem('trips')
        ? JSON.parse(localStorage.getItem('trips'))
        : []
    console.log('trips array');
    console.log(tripsArray);
    localStorage.setItem('trips', JSON.stringify(tripsArray))
    let data = JSON.parse(localStorage.getItem('trips'))


    // Title of my trips section.No trips stay hidden
    if (data.length !== 0) {
        $(".trips").css("visibility", "visible");
    }

    const trip = (text) => {
        // const card = document.createElement('p')
        // p.textContent = text.destination
        // $('#myTrips').append(`<section class='card' ><p>${text.destination}</p></section>`)
        $('#myTrips').append(text)
    }
    function ui() {
        if (data.length >= 1) {
            // Reverse the order of the data array to have the latest trip added at the top
            // data.reverse();
            data.forEach((info) => {
                //languages and currencies return an array with an objects
                console.log(data.indexOf(info));
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
                    ` <div class="card" id = 'card' >
                    <span id="infoTrip" style="display:none;">${data.indexOf(info)}</span>
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
                            <button  type="button" name="button" data-tripIndex="${data.indexOf(info)}"  class="btn btn-danger delete" onclick="Client.deleteTrip(${data.indexOf(info)})" >Delete Trip</button>
                        </div>
                    </div>
                    <a   target="_blank" href="https://en.wikivoyage.org/wiki/${info.country}" class="btn btn-primary" >For more info about ${info.country}</a>
                    </div >
                    <div class="col-sm-4" style="background-color: steelblue; text-align: center;">
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
                // trip(item);
                // console.log(Array.isArray(tripsArray));
                trip(content);

            })
        }

    }
    ui();
}

// Delete trip
const deleteTrip = (x) => {
    // console.log((e.currentTarget));
    console.log('delete trip');
    let tripsArray = JSON.parse(localStorage.getItem('trips'))
    console.log(tripsArray);
    console.log(tripsArray.length);
    // let x = $(e.currentTarget).getAttribute('data-tripIndex');


    console.log(x);
    console.log(Array.isArray(tripsArray));
    let j = tripsArray.splice(x, 1);
    console.log(j);
    console.log(tripsArray);
    $('.card').remove();
    // e.target.closest('#card').remove();
    // console.log($(this).closest('#card').text);
    // localStorage.removeItem('trips[x]');
    localStorage.setItem('trips', JSON.stringify(tripsArray))
    tripData();
    // data = JSON.parse(localStorage.getItem('trips'))
    // console.log('done');
    // console.log(data);


    // enterApp();


    // console.log(this);
    // let indexOfTrip = $("#infoTrip").text();
    // console.log(indexOfTrip);

    // $('#card').remove();

    // let trip = event.target()
    // console.log(trip);
    // trip.remove($('#card'));
    // $('#card').event.target(e).remove


}



// i have to do the below function it with event listener
function enterApp() {
    $("#landing").css("transform", "translate(-200vw)");
    $("#dimmed-bg").css("visibility", "visible");
    $("#dimmed-bg").css("transform", "translate(0)");
    // $("#above-fold").css("opacity", "1");
    $("#full-site").css("visibility", "visible");
    $("#full-site").css("overflow", "visible");
    $("#full-site").css("animation", "2s content");
    $("#full-site").css("max-height", "auto");
    tripData();
    // $(".delete").on("click", deleteTrip)



    // $("#register-side-bar").css("transform", "translate(0)");
}





export {
    enterApp,
    deleteTrip,
    tripData
}