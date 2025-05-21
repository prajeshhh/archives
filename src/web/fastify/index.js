const fastify = require('fastify')

const app = fastify({ logger: true })

// decorator - adding functionality to fastify
app.decorate('add', require("./decorators/add"))
app.decorateReply('meowify', require("./decorators/meowify"))
app.decorate('port', () => 8000)

// register - do something before starting server
app.register(require("./plugins/greet"), { message: app.add("sup", " wysa") })
app.register(require("./api/routes"))


app.listen({ port: app.port() }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
