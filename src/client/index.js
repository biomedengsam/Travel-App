import { checkForInput } from './js/inputChecker'
import { handleSubmit } from './js/formHandler'
import { enterApp } from './js/eventListener'
import { appinfo } from './js/app'
import { deleteTrip } from './js/eventListener'
import './styles/resets.scss'
import './styles/landing.scss'
import './styles/functions.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/trips.scss'
import bg from './media/bg.jpg';
import flight from './media/flight.jpg';
import flying from './media/flying.jpg';
import plane from './media/plane.jpg'
import $ from "jquery";
// import boardN from './media/boardN.jpg';
// import boardNeg from './media/boardNeg.jpg';
import logo from './media/logo.png';
import datepicker from '../../node_modules/jquery-ui/ui/widgets/datepicker';
// import 'bootstrap';
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
// $('#delete').on('click', deleteTrip);


export {

    checkForInput,
    handleSubmit,
    enterApp,
    datepicker,
    appinfo,
    deleteTrip
}