async function routes(app, opts) {
  // normal route
  app.get('/', async function handler(request, reply) {
    return { message: "server online" }
  })

  app.get('/error', async function handler(request, reply) {
    throw new Error("server error route")
  })

  // route with validation
  // if response validation fails, reply returns empty object
  app.route({
    method: "GET",
    url: "/api/query",
    schema: {
      querystring: {
        type: "object",
        properties: {
          name: { type: "string" }
        },
        required: ["name"]
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: {
              type: "string"
            }
          }
        }
      }
    },
    preHandler: (request, reply, done) => {
      console.log("running preHandler")
      done()
    },
    handler: async (request, reply) => {
      const q = request.query.name;
      return { message: `Hey ${q}` }
    }
  })

  app.post("/meow", async function(req, res) {
    res.meowify(req.body.message)
  })
}

module.exports = routes
