import "babel-polyfill"
import { checkForInput } from "../src/client/js/inputChecker"

describe("Testing checkForInput definition", () => {
    test("Testing the checkForInput() function", () => {
        expect(checkForInput).toBeDefined();
    })
});

describe("Testing the input functionality", () => {
    let input = {
        destination: '',
        departure_date: '3020-12-26',
        return_date: '3020-12-30'
    }

    window.alert = jest.fn()
    test("Testing the checkForInput(inputText) function", () => {
        expect(checkForInput(input)).toEqual(false);
    })
});