import $ from "jquery";

// let data = info;
// const form = document.querySelector('form')
// const ul = document.querySelector('ul')
// const button = document.querySelector('button')
// const input = document.getElementById('item')
let tripsArray = localStorage.getItem('trips')
    ? JSON.parse(localStorage.getItem('trips'))
    : []
console.log('trips array');
console.log(tripsArray);
localStorage.setItem('trips', JSON.stringify(tripsArray))
const data = JSON.parse(localStorage.getItem('trips'))
console.log('data');
console.log(data);

const trip = (text) => {
    const p = document.createElement('p')
    p.textContent = text.destination
    $('#myTrips').append(p)
}


function appinfo(apiData) {
    tripsArray.push(apiData)
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