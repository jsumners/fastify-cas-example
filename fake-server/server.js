'use strict'

const fs = require('fs')

const handlebars = require('handlebars')
const indexTmpl = handlebars.compile(fs.readFileSync('./login.html.hbs').toString())
const v3response = fs.readFileSync('./response.xml').toString()

const fastify = require('fastify')({
  logger: {
    level: 'trace',
    prettyPrint: true
  }
})

fastify.register(require('fastify-formbody'))

fastify.get('/login', (req, reply) => {
  reply.type('text/html').send(indexTmpl({service: req.query.service}))
})

fastify.post('/login', (req, reply) => {
  const url = req.body.service + '?ticket=ST-123456'
  req.log.info('redirecting to `%s`', url)
  reply.code(303).redirect(url)
})

fastify.get('/p3/serviceValidate', (req, reply) => {
  const ticket = req.query.ticket
  if (!ticket || ticket !== 'ST-123456') {
    return reply.send(Error('nope, do not recognize that ticket'))
  }
  reply.type('text/xml').send(v3response)
})

fastify.listen(8080, '0.0.0.0', (err) => {
  if (err) throw err
})
