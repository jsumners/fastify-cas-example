'use strict'

const config = require('../config')

// Here we make use of Fastify's encapsulation feature to "protect" a set
// routes by requiring authentication via `fastify-cas`. Every route that
// gets registered within the `secret` function will be secured by
// `fastify-cas`.
module.exports = module.exports = function secret (fastify, opts, next) {
  fastify.register(require('fastify-cas'), config.get('cas'))

  // We could do as we did with `../publicRoutes` here, but we only need a
  // single route for this demonstration project. So we are simply directly
  // registering the route with Fastify's shortcut `.get()` method.
  fastify.get('/secret', (req, reply) => {
    reply.send(req.session)
  })

  next()
}
