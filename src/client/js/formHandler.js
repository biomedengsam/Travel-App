import axios from "axios";
import $ from "jquery";

// Fixing Cross Browser Compatibility for Input type–date
(function () {
    if ($('.dateText').type === 'text') {
        $('.dateText').datepicker({ dateFormat: 'yy-mm-dd' });
    }
})();

// Post function
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
const handleSubmit = (event) => {
    event.preventDefault()
    // Get input from user
    let info = {
        destination: $('#destination').val(),
        departure_date: $('#departure').val(),
        return_date: $('#return').val()
    }

    // reset input fields
    $('#destination').val("");
    $('#departure').val("");
    $('#return').val("");

    // Check input for errors then get data from server
    if (Client.checkForInput(info)) {
        //  Post request
        postData('http://localhost:8081/api', info)
            .then((res) => {
                let apiData = res.data;
                // Error handel
                if (apiData === false) {
                    alert(`Destination Not Found. Make sure you write the correct spelling or specify the destination`);
                }
                // Send data to update user interface
                else {
                    Client.appInfo(apiData);
                }
            })
    }
}
export { handleSubmit }