function checkForInput(inputText) {
    // console.log("::: Running checkForName :::", inputText);
    // Checks if there's no input
    if (inputText === "") {
        alert("Please enter text to analyze")
        return false;
    }
    // Checks if input is only a numbers
    else if (!isNaN(inputText)) {
        alert("Please enter text to analyze")
    }
    else {
        return true;
    }
}
export { checkForInput }