import axios from "axios";
import $ from "jquery";
let apiData;
// import appinfo from './app'

// Fixing Cross Browser Compatibility for Input type–date
(function () {
    if ($('.dateText').type === 'text') {
        $('.dateText').datepicker({ dateFormat: 'yy-mm-dd' });
    }
})();


const postData = async (url = '', data = {}) => {

    try {
        const response = await axios.post(url, data)
        // console.log(response);
        return response;
    }
    catch (error) {
        console.log("error", error);
    }

}

// Update UI function
const updateUi = (res) => {
    $('#output').css('display', 'block');
    // console.log(res.data.geonames[0].lng);
    $('#lng').text(res.data.geonames[0].lng);
    $('#lat').text(res.data.geonames[0].lat);
    // document.getElementById('subjectivity').innerHTML = data.subjectivity.toLowerCase();
    // document.getElementById('confidence').innerHTML = data.confidence;
    // document.getElementById('irony').innerHTML = data.irony.toLowerCase();
    // Client.resultImg(data);
}

// Form handel submit function
function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let info = {
        destination: $('#destination').val(),
        departure_date: $('#departure').val(),
        return_date: $('#return').val()
    }

    if (Client.checkForInput(info)) {
        //  Post request
        postData('http://localhost:8081/api', info)
            .then(function (res) {
                // console.log(res.data);
                apiData = res.data;
                console.log(apiData);
                if (apiData === false) {
                    alert(`Destination Not Found. Make sure you write the correct spelling or specify the destination`);
                } else {
                    Client.appinfo(apiData);
                }


                // info.push(res.data)
                // // Error city not found
                // if (res.data.totalResultsCount == 0) {
                //     alert('City Not Found');
                // }
                // else {
                //     updateUi(res);
                // }
            })
    }
}
export { handleSubmit }