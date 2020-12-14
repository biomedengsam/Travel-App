import $ from "jquery";
// import { apiData } from './formHandler'
// let data = info;
// const form = document.querySelector('form')
// const ul = document.querySelector('ul')
// const button = document.querySelector('button')
// const input = document.getElementById('item')
let itemsArray = localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : []
console.log('items array');
console.log(itemsArray);
localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))
console.log('data');
console.log(data);

const trip = (text) => {
    const p = document.createElement('p')
    p.textContent = text.destination
    $('#myTrips').append(p)
}
// function ui() {
//     if (data.length > 1) {
//         data.forEach((item) => {
//             trip(item);
//         })
//     } else {
//         trip(data);

//     }
// }


// const liMaker = (text) => {
//     const li = document.createElement('li')
//     li.textContent = text
//     ul.appendChild(li)
// }


// form.addEventListener('submit', function (e) {
//     e.preventDefault()

//     itemsArray.push(apiData)
//     localStorage.setItem('items', JSON.stringify(itemsArray))
//     trip(apiData)
//     apiData = ''
// })


function appinfo(apiData) {
    itemsArray.push(apiData)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    trip(apiData)
    apiData = ''
}
// button.addEventListener('click', function () {
//     localStorage.clear()
//     while (ul.firstChild) {
//         ul.removeChild(ul.firstChild)
//     }
// })
export {
    appinfo
}