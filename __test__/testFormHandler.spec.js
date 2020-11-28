import "babel-polyfill"
import { handleSubmit } from "../src/client/js/formHandler"
var fetch = require("node-fetch");

describe("Testing handleSubmit definition", () => {
    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();
    })
});

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
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
}

test('tests post request in handleSubmit', () => {

    let formText = "love"
    postData('http://localhost:8081/api', { text: formText })
        .then(function (data) {
            expect(data.score_tag).toEqual('P+');

        })
});