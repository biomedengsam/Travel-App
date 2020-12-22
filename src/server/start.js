// designates what port the app will listen to for incoming requests
const app = require('./server.js')
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})