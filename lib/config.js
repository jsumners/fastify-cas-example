'use strict'

const path = require('path')
const fastifyCaching = require('fastify-caching')

const port = 9000
const sessionAge = 600000 // 10 minutes
const cookieOptions = {
  domain: '.app.example.com',
  path: '/',
  expires: sessionAge,
  secure: false,
  sameSite: 'lax' // If not 'lax', Chrome won't work with localhost sites
}

const defaultConfig = {
  server: {
    address: '0.0.0.0',
    port
  },

  // For general usage within app-local routes.
  cookie: cookieOptions,

  caching: {
    privacy: fastifyCaching.privacy.NOCACHE
  },

  session: {
    sesionMaxAge: sessionAge,
    // The session module also needs to know how to set cookies.
    cookie: cookieOptions,
    secretKey: '12345678901234567890123456789012'
  },

  cas: {
    appBaseUrl: `http://app.example.com:${port}`,
    strictSSL: false,
    casServer: {
      baseUrl: 'http://cas.example.com:8080'
    }
  }
}

module.exports = require('nixconfig')({
  initialConfig: defaultConfig,
  parentName: 'cas-demo',
  parentPath: path.resolve(path.join(__dirname, '..'))
})
