'use strict'

const isdebug = require('isdebug')

const config = require('./lib/config')
const fastify = require('fastify')({
  logger: {
    level: (isdebug) ? 'debug' : 'info',
    prettyPrint: isdebug
  }
})

// All of these plugins are root plugins that our demonstration application
// requires to function. They will be available to all subsequently registered
// plugins.
fastify
  .register(require('fastify-cookie'), config.get('cookie'))
  .register(require('fastify-caching'), config.get('caching'))
  .register(require('fastify-server-session'), config.get('session'))

// Notice that at this point we have not registered the `fastify-cas` plugin.
// By not doing so, we can register these routes and they will _never_ be
// affected by `fastify-cas` due to Fastify's encapsulation feature. Nifty!
//
// Also notice that we are registering routes by requiring a project local
// "module". View the files `./lib/publicRoutes` for more details.
for (const route of require('./lib/publicRoutes')) {
  fastify.register(route)
}

// Take a look at `lib/privateRoutes/index.js` for details on this
// registration.
fastify.register(require('./lib/privateRoutes'))

const {address, port} = config.get('server')
fastify.listen(port, address, (err) => {
  if (err) {
    fastify.log.error('could not start server: %s', err.message)
    process.exit(1)
  }

  fastify.log.info('listening: http://%s:%s/', address, port)
})
