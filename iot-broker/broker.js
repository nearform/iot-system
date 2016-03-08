'use strict'

const Seneca = require('seneca')
const Mosca = require('mosca')
const Mesh = require('seneca-mesh')
const MoscaAuth = require('seneca-mosca-auth')
const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

const seneca = Seneca()
  .use(Mesh, {
    auto: true,
    bases: ['127.0.0.1:7799']
  })

const server = new Mosca.Server({
  interfaces: [
    { type: "mqtt", port: 1883 },
    { type: "http", port: 3042 }
  ],
  logger: {
    level: 'info'
  }
})



// set up seneca-mosca-auth
MoscaAuth.setup(seneca, server)

server.on('published', function (packet) {

  if(!packet.topic.includes('sensor/lux'))
    return

  var topic = packet.topic.split('/')
  var sensor_id = topic[2]

  var metric = {
    source: 'mqtt',
    payload: {
      name: 'sensor.read',
      time: Date.now(),
      values: {
        value: packet.payload.toString(),
      },
      tags: {
        uom: 'lux',
        sensor_type: 'Light',
        sensor_id: sensor_id,
        broker_id: server.id,
        topic: `sensor/lux`
      }
    }
  }

  var payload = new Buffer(JSON.stringify(metric))
  var size = payload.length

  socket.send(payload, 0, size, '5001', 'localhost', (err) => {
    if (err) console.log(err)
  })
})
