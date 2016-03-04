'use strict'

const Seneca = require('seneca')
const Mosca = require('mosca')
const MoscaAuth = require('seneca-mosca-auth')
const dgram = require('dgram')

const seneca = Seneca()

const server = new Mosca.Server({
  logger: {
    level: 'info'
  }
})

// set up seneca-mosca-auth
seneca.use(MoscaAuth)
MoscaAuth.setup(seneca, server)

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

server.on('published', function (packet) {
  var name = packet.topic.replace(/\//g, '.')

  var metric = {
    name: name,
    time: Date.now(),
    values: {
      value: packet.payload.toString(),
    },
    tags: {
      msg_id: packet.messageId,
      topic: packet.topic
    }
  }

  console.log(metric)
})
