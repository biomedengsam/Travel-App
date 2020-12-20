import $ from "jquery";
// import { deleteTrip } from './js/eventListener'

// let data = info;
// const form = document.querySelector('form')
// const ul = document.querySelector('ul')
// const button = document.querySelector('button')
// const input = document.getElementById('item')
// let data= tripsArray;

const trip = (info) => {
    let tripsArray = JSON.parse(localStorage.getItem('trips'));
    let tripIndex = (tripsArray.length) - 1;
    console.log(tripIndex);
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
        ` <div class="card" >
                    <span id="infoTrip" style="display:none;">${tripIndex}</span>
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

    // Append trip as first child (latest trip)
    $('#myTrips').prepend(content);
    // let att = document.querySelectorAll('.delete');
    // att.forEach((x) => {
    //     x.setAttribute('data-tripIndex', data.indexOf(info) + 2)
    // })
    // console.log(att);
    // for (let x in att) {
    //     console.log(x.attributes);
    // }
    // console.log(att);
    // $(".delete").on("click", Client.deleteTrip)
    // Scroll to my trips smoothly
    let scrollTO = () => {
        console.log('scroll into');
        $('#myTrips')[0].scrollIntoView({ behavior: 'smooth' });

    }
    scrollTO();


}


function appinfo(apiData) {

    let tripsArray = JSON.parse(localStorage.getItem('trips'));
    console.log('trips array app before push');
    console.log(tripsArray);

    // localStorage.setItem('trips', JSON.stringify(tripsArray))
    // const data = JSON.parse(localStorage.getItem('trips'))
    // console.log('data appinfo');
    // console.log(data);
    tripsArray.push(apiData)
    console.log('trips array app after push');
    console.log(tripsArray);
    localStorage.setItem('trips', JSON.stringify(tripsArray))
    trip(apiData)
    apiData = ''
}
// To clear all trips
// button.addEventListener('click', function () {
//     localStorage.clear()
//     while (ul.firstChild) {
//         ul.removeChild(ul.firstChild)
//     }
// })
export {
    appinfo
}