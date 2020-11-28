import $ from "jquery";


// Fixing Cross Browser Compatibility for Input type–date
(function () {
    if ($('.dateText').type === 'text') {
        $('.dateText').datepicker({ dateFormat: 'yy-mm-dd' });
    }
})();

// Post function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        // updateUi(newData);
        return newData;
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
    let formText = $('#text').val();
    console.log(formText);
    if (Client.checkForInput(formText)) {
        //  Post request
        postData('http://localhost:8081/api', { text: formText })
            .then(function (res) {
                // Error city not found
                if (res.data.totalResultsCount == 0) {
                    alert('City Not Found');
                }
                else {
                    updateUi(res);
                }
            })
    }
}
export { handleSubmit }