// check the date of return (return date is valid) is after date of departure
const checkValidDate = (input) => {

    // $('.date').on('change', function () {
    // console.log(new Date(this.value));

    if (input.return_date < input.departure_date) {
        alert("Invalid return date");
        // console.log(false);
        return false;
    } else {
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