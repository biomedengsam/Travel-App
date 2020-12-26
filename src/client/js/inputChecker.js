// Checks input dates validity
const checkValidDate = (input) => {
    let today = new Date();
    let dep = new Date(input.departure_date);

    // Get today's date format as (year/month/day)

    /* Had to do it this way due to problems encountered when departure and today dates are the same.
    The time differences caused unwanted behaviour */
    let m = today.getMonth() + 1;
    let d = today.getDate();
    let y = today.getFullYear();
    let today_date = y + '/' + m + '/' + d;

    // Get departure date format as (year/month/day)
    let mo = dep.getMonth() + 1;
    let da = dep.getDate();
    let ye = dep.getFullYear();
    let departureD = ye + '/' + mo + '/' + da;

    // Calculate number of days left before departure return false
    let daysToTravel = parseInt((dep - today) / (24 * 3600 * 1000));

    // Return day before departure
    if (input.return_date < input.departure_date) {
        alert("Invalid return date");
        return false;
    }
    // Departure day before today return false
    else if (departureD < today_date) {
        alert("Invalid departure date");
        return false;
    }
    // Requesting forecast for more than 16 days in the future return false
    else if (daysToTravel > 16) {
        alert('Forecast available only for 16 days in the future');
        return false;
    }
    else {
        return true;
    }
}

const checkForInput = (input) => {
    // Checks for no input
    for (let key in input) {
        let value = input[key];
        if (value === "") {
            alert(`Please enter ${key} value`)
            return false;
        }
    }
    return checkValidDate(input);
}

export { checkForInput }