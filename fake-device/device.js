'use strict'

const Mqtt = require('mqtt')
const mqtt = Mqtt.connect('mqtt://localhost', {
  username: 'fakedevice',
  password: 'fakepassword'
})

const topic = 'sensor/lux/1'

setInterval(() => {
  const data = (Math.floor(Math.random() * 5000 * 100) / 100) + ''
  console.log('publishing', topic, data)
  mqtt.publish(topic, data)
}, 1000)

mqtt.on('connect', () => console.log('connected'))
