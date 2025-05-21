const fastify = require('fastify')({ logger: true })

const port = 5000;

fastify.get('/', function handler(request, reply) {
  reply.send({ message: "server online" })
})

fastify.listen({ port }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
