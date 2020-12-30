import { checkForInput } from './js/inputChecker'
import { handleSubmit } from './js/formHandler'
import { enterApp } from './js/eventListener'
import { appInfo } from './js/addTrip'
import { deleteTrip } from './js/eventListener'
import { deleteAll } from './js/eventListener'
import { tripsDelete } from './js/helpers'
import './styles/main.scss'
import bg from './media/bg.jpg';
import logo from './media/logo.png';

// Set images src
let logoImg = document.getElementById('logo');
logoImg.src = logo;
let bgImg = document.getElementById('bg');
bgImg.src = bg;

// Event listener on entering app
document.getElementById('enter').addEventListener('click', enterApp);
// Event listener on submitting form
document.getElementById('submit').addEventListener('click', handleSubmit);
// Event listener on delete all trips button
document.getElementById('delete-all-trips').addEventListener('click', deleteAll);

export {

    checkForInput,
    handleSubmit,
    enterApp,
    appInfo,
    deleteTrip,
    deleteAll,
    tripsDelete
}