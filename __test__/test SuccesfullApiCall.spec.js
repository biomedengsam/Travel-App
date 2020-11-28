import "babel-polyfill"
var fetch = require("node-fetch");
/* The test will only be successful when localhost server port 8081 is running*/
/* Just wanted to try an extra test for fun.I didn't want to add an extra js file in js folder with this function and import*/
let data = { text: 'test for a successful api call' };

test('test for a successful api call', async () => {
    const response = await fetch('http://localhost:8081/api', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
    expect(newData.status.code).toBe(0);
});