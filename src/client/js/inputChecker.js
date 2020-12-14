// import { data } from "./formHandler";
// console.log(data);
// check the date of return (return date is valid) is after date of departure
const checkValidDate = (input) => {
    //  todays date minus the departure date 
    let dep = new Date(input.departure_date);
    console.log(dep);
    // let depd = new Date(dep);
    // console.log(depd.getDate());
    let today = new Date();
    console.log(today);
    let daysToTravel = parseInt((dep - today) / (24 * 3600 * 1000));
    console.log(daysToTravel);
    // $('.date').on('change', function () {
    // console.log(new Date(this.value));

    if (input.return_date < input.departure_date) {
        alert("Invalid return date");
        // console.log(false);
        return false;
    }
    else if (dep < (today)) {
        alert("Invalid departure date");
        // console.log(false);
        return false;
    }
    else if (daysToTravel > 16) {
        alert('Forecast available only for 16 days in the future');
        return false;
    }

    else {
        console.log(true);
        return true;
    }

    // });
}


function checkForInput(input) {
    // Checks for input fields for data
    for (let key in input) {
        let value = input[key];
        // console.log(value);
        if (value === "") {
            alert(`Please enter ${key} value`)
            return false;
        }
    }
    return checkValidDate(input);
}



export { checkForInput }