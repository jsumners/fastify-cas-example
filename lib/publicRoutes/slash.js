'use strict'

// What is this? Our route file is a plugin?!? In Fastify, everything is a
// plugin 😀. This is what gives Fastify so much flexibility and power.
// By defining a plugin for our route, it benefits from encapsulation
// and allows us to define routes as separate modules.
module.exports = function slashPlugin (fastify, options, next) {
  fastify.get('/', (req, reply) => {
    req.log.debug('got request for path: /')
    reply
      .type('text/html')
      .send('<a href="/secret">view the secret stuff</a>')
  })
  next()
}
