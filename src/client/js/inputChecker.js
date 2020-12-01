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
    return true;
}
export { checkForInput }