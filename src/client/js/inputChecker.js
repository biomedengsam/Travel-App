// import { data } from "./formHandler";
// console.log(data);
// check the date of return (return date is valid) is after date of departure
const checkValidDate = (input) => {
    //  todays date minus the departure date 
    console.log(input.departure_date);
    let today = new Date();
    let dep = new Date(input.departure_date)
    // To compare departure day with the current date
    // (had to do it this way due to problems encountered when departure and today dates are the same.The time differences cased unwanted behaviour)
    let m = today.getMonth() + 1;
    let d = today.getDate();
    let y = today.getFullYear();

    let today_date = y + '/' + m + '/' + d;
    console.log(today_date);
    let mo = dep.getMonth() + 1;
    let da = dep.getDate();
    let ye = dep.getFullYear();
    var departureD = ye + '/' + mo + '/' + da;
    console.log(departureD);

    // let dep = new Date(input.departure_date).toDateString();
    console.log(dep);

    console.log(today);
    console.log(typeof (dep));

    let daysToTravel = parseInt((dep - today) / (24 * 3600 * 1000));
    console.log(daysToTravel);
    // $('.date').on('change', function () {
    // console.log(new Date(this.value));

    if (input.return_date < input.departure_date) {
        alert("Invalid return date");
        // console.log(false);
        return false;
    }
    else if (departureD < today_date) {
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