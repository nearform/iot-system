'use strict'

const Mqtt = require('mqtt')
const mqtt = Mqtt.connect('mqtt://localhost', {
  username: 'fakedevice',
  password: 'fakepassword'
})

setInterval(() => {
  mqtt.publish('sensor/lux/0', (Math.floor(Math.random() * 5000 * 100) / 100) + '')
}, 1000)
