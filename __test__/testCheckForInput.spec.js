import "babel-polyfill"
import { checkForInput } from "../src/client/js/inputChecker"

describe("Testing checkForInput definition", () => {
    test("Testing the checkForInput() function", () => {
        expect(checkForInput).toBeDefined();
    })
});

describe("Testing the input functionality", () => {
    let inputText = "";
    window.alert = jest.fn()
    test("Testing the checkForInput(inputText) function", () => {
        expect(checkForInput(inputText)).toEqual(false);
    })
});