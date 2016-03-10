'use strict'

const Seneca = require('seneca')
const VidiMetrics = require('vidi-metrics')
const SenecaMetrics = require('vidi-seneca-metrics')
const MoscaAuth = require('seneca-mosca-auth')
const Mesh = require('seneca-mesh')
const seneca = Seneca()
  .use(MoscaAuth)
  .use(Mesh, {
    auto: true,
    bases: ['127.0.0.1:7799'],
    pin: 'role:mosca-auth'
  })
  .use(VidiMetrics, {emitter: {enabled: true}})
  .use(SenecaMetrics, {group: 'auth', pins: ['role:mosca-auth, cmd:*']})

seneca.act({
  role: 'mosca-auth',
  cmd: 'register',
  nick: 'fakedevice',
  email: 'matteo.collina@nearform.com',
  password: 'fakepassword',
  publishPatterns: ['sensor/lux/1']
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
