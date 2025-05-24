const fastify = require("fastify")
const routes = require("./src/plugins/routes")

const port = 5000

const server = fastify({
  logger: true
})

server.register(routes)

server.listen({ port }, function(err) {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})
