const fastify = require('fastify')({});
const path = require('path');
const serve = require('@fastify/static');

fastify.register(serve, {
  root: path.join(__dirname, 'dist'),
  prefixAvoidTrailingSlash: true
});

fastify.setNotFoundHandler({
  preValidation: (req, reply, done) => { done() },
  preHandler: (req, reply, done) => { done() }
}, (request, reply) => {
    reply.redirect("/")
})

fastify.listen({ port: 3000 })
  .then((address) => console.log(`server listening on ${address}`))
  .catch(err => {
    console.log('Error starting server:', err)
    process.exit(1)
  })