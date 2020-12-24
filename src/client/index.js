import { checkForInput } from './js/inputChecker'
import { handleSubmit } from './js/formHandler'
import { enterApp } from './js/eventListener'
import { appInfo } from './js/addTrip'
import { deleteTrip } from './js/eventListener'
import { deleteAll } from './js/eventListener'
import './styles/main.scss'
import bg from './media/bg.jpg';
import $ from "jquery";
import logo from './media/logo.png';
import datepicker from '../../node_modules/jquery-ui/ui/widgets/datepicker';

// Set images src
let logoImg = document.getElementById('logo');
logoImg.src = logo;
let bgImg = document.getElementById('bg');
bgImg.src = bg;

// Event listener on entering app
$('#enter').on('click', enterApp)
// Event listener on submitting form
$('form').on('submit', handleSubmit);
// Event listener on delete all trips button
$('.delete-all-trips').on('click', deleteAll);

export {

    checkForInput,
    handleSubmit,
    enterApp,
    datepicker,
    appInfo,
    deleteTrip,
    deleteAll
}