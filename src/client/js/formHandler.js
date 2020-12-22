import axios from "axios";
import $ from "jquery";
let apiData;

// Fixing Cross Browser Compatibility for Input type–date
(function () {
    if ($('.dateText').type === 'text') {
        $('.dateText').datepicker({ dateFormat: 'yy-mm-dd' });
    }
})();

export const postData = async (url = '', data = {}) => {

    try {
        const response = await axios.post(url, data)
        // console.log(response);
        return response;
    }
    catch (error) {
        console.log("error", error);
    }
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
                // Error handel
                if (apiData === false) {
                    alert(`Destination Not Found. Make sure you write the correct spelling or specify the destination`);
                } else {
                    Client.appinfo(apiData);
                }
            })
    }
}
export { handleSubmit }