const { test } = require('tap')
const { Client } = require('undici')

const client = new Client(
  'http://localhost:5000', {
  keepAliveTimeout: 10,
  keepAliveMaxTimeout: 10
}
)

test('server health route "/api/health"', async t => {
  const { statusCode, body } = await client.request({
    method: 'GET',
    path: '/api/health'
  })

  t.equal(statusCode, 200, 'returns a status code of 200')
  t.matchOnly(await body.json(), { message: "server online" }, 'returns server online')
  t.end()
})

test('user registration route "/api/auth/register"', async t => {
  const { statusCode, body } = await client.request({
    method: 'POST',
    path: '/api/auth/register',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      username: "jo",
      password: "123456"
    })
  })

  t.equal(statusCode, 400, 'returns a status code of 200')
  t.end()
})

