import "babel-polyfill"
const app = require('../src/server/server')
const supertest = require('supertest')
const request = supertest(app)

it('Gets the test endpoint', async done => {
    // Sends GET Request to /test endpoint
    const res = await request.get('/test')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('pass!')
    done()
})