import { checkForInput } from './js/inputChecker'
import { handleSubmit } from './js/formHandler'
import { enterApp } from './js/eventListener'
import { appinfo } from './js/app'
import { deleteTrip } from './js/eventListener'
import { deleteAll } from './js/eventListener'
// function importAll(r) {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
// }

// export const images = importAll(require.context('./../media/icons', false, /\.png$/));


// function importAll(r) {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
// }

// export const images = importAll(require.context('./../media/icons', false, /\.png$/));

// require.context("./media/icons", useSubdirectories = true, regExp = /\.png$/);
// function importAll(r) {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
// }

// const images = importAll(require.context('./media/icons', false, /\.png$/));


// console.log(images['c02n.png'].default);

// const cache = {};

// function importAll(r) {
//     r.keys().forEach(key => cache[key] = r(key));
// }

// importAll(require.context('../components/', true, /\.js$/));

// // another

// const pathToCats = require.context('./path/to/cats', true);
// // true here is for use subdirectories, you can also specify regex as third param

// const cats = [
//     'black-cat.png',
//     'white-cat.png',
//     'grumpy-cat.png',
//     'rainbow-cat.png'
// ];

// const getCats = () => cats.map(name => `<img src='${pathToCats(name, true)}' alt='${name}' />`);
// import './styles/resets.scss'
// import './styles/landing.scss'
// import './styles/functions.scss'
// import './styles/base.scss'
// import './styles/footer.scss'
// import './styles/form.scss'
// import './styles/header.scss'
// import './styles/trips.scss'
import './styles/main.scss'
import bg from './media/bg.jpg';
import flight from './media/flight.jpg';
import flying from './media/flying.jpg';
import plane from './media/plane.jpg'
import $ from "jquery";
import logo from './media/logo.png';
import datepicker from '../../node_modules/jquery-ui/ui/widgets/datepicker';

let logoImg = document.getElementById('logo');
logoImg.src = logo;
let bgImg = document.getElementById('bg');
bgImg.src = bg;
// let Img = document.getElementById('img');
// Img.src = plane;
console.log("CHANGE!!");
// event listener on entering app
$('#enter').on('click', enterApp)
// event listener on submitting form
$('form').on('submit', handleSubmit);
$('.all-trips').on('click', deleteAll);

export {

    checkForInput,
    handleSubmit,
    enterApp,
    datepicker,
    appinfo,
    deleteTrip,
    deleteAll
}