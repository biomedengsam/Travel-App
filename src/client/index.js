import { checkForInput } from './js/inputChecker'
import { handleSubmit } from './js/formHandler'
import { resultImg } from './js/outputImgResult'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import boardP from './media/boardP.jpg';
import boardN from './media/boardN.jpg';
import boardNeg from './media/boardNeg.jpg';
import logo from './media/logo.png';
import datepicker from '../../node_modules/jquery-ui/ui/widgets/datepicker';
// import 'bootstrap';
let logoImg = document.getElementById('logo');
logoImg.src = logo;
console.log("CHANGE!!");

export {
    resultImg,
    checkForInput,
    handleSubmit,
    boardP,
    boardN,
    boardNeg,
    datepicker
}