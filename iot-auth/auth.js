'use strict'

const Seneca = require('seneca')
const MoscaAuth = require('seneca-mosca-auth')
const Mesh = require('seneca-mesh')
const seneca = Seneca()
  .use(MoscaAuth)
  .use(Mesh, {
    auto: true,
    bases: ['127.0.0.1:7799'],
    pin: 'role:mosca-auth'
  })

seneca.act({
  role: 'mosca-auth',
  cmd: 'register',
  nick: 'fakedevice',
  email: 'matteo.collina@nearform.com',
  password: 'fakepassword',
  publishPatterns: ['sensor/lux/0']
}, (err) => {
  if (err) {
    throw err
  }
})

seneca.act({
  role: 'mosca-auth',
  cmd: 'register',
  nick: 'admin',
  email: 'matteo.collina@nearform.com',
  password: 'admin',
  publishPatterns: ['#'],
  subscribePatterns: ['#']
}, (err) => {
  if (err) {
    throw err
  }
})
