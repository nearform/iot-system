'use strict'

var Influx = require('vidi-influx-sink')
var Metrics = require('vidi-metrics')
var Mqtt = require('../vidi-mqtt-metrics')
var Toolbag = require('vidi-toolbag-metrics')

var opts = {
  metrics: {
    collector: {
      enabled: true
    }
  },
  toolbag: {
    // opts here
  },
  mqtt: {
    // opts here
  },
  influx: {
    influx: {host: '192.168.99.100'}
  }
}

require('seneca')()
  .use(Metrics, opts.metrics)
  .use(Toolbag, opts.toolbag)
  .use(Mqtt, opts.mqtt)
  .use(Influx, opts.influx)
  .listen(8900)
