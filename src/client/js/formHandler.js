import axios from "axios";

// Post function
export const postData = async (url = '', data = {}) => {

    try {
        const response = await axios.post(url, data)
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
        destination: document.getElementById('destination').value,
        departure_date: document.getElementById('departure').value,
        return_date: document.getElementById('return').value
    }

    // reset input fields
    document.getElementById('destination').value = "";
    document.getElementById('departure').value = "";
    document.getElementById('return').value = "";

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