import "babel-polyfill"
import { handleSubmit } from "../src/client/js/formHandler"
import { postData } from "../src/client/js/formHandler"

describe("Testing handleSubmit definition", () => {
    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();
    })
});

test('tests post request in handleSubmit', () => {

    let info = {
        destination: 'Amman',
        departure_date: '3020-12-26',
        return_date: '3020-12-30'
    }

    postData('http://localhost:8081/api', info)
        .then(function (data) {
            expect(data.destination).toEqual('Amman');

        })
});