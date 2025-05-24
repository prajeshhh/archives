async function routes(server, opts) {
  server.get("/api/health", function(req, res) {
    res.send({ message: "server online" })
  })

  server.post("/api/auth/register",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            "username": {
              type: "string",
              minLength: 3,
              maxLength: 20
            },
            "password": {
              type: "string",
              minLength: 1
            }
          },
          required: ["username", "password"]
        }
      },
      attachValidation: true
    },
    async function(req, res) {
      if (req.validationError) {
        server.log.error(req.validationError.message)
        return res.status(400).send({ error: true, data: null, message: "Bad Gateway" })
      }

      const { username, password } = req.body;

      server.log.info(`user registered: ${JSON.stringify(req.body)}`)
      res.send({ message: "user registered", data: { username, password } })
    }
  )
}

module.exports = routes
