import axios from "axios";
import $ from "jquery";
export let data = "hello";

// Fixing Cross Browser Compatibility for Input type–date
(function () {
    if ($('.dateText').type === 'text') {
        $('.dateText').datepicker({ dateFormat: 'yy-mm-dd' });
    }
})();

// Post function
// const postData = async (url = '', data = {}) => {
//     const response = await fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         // Body data type must match "Content-Type" header
//         body: JSON.stringify(data),
//     });
//     try {
//         const res = await response.json();
//         // lat = res.data.geonames[0].lat;
//         // let lang = res.data.geonames[0].lng;

//         console.log(res);
//         return res;
//     }
//     catch (error) {
//         console.log("error", error);
//     }

// }

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
                console.log(res);
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