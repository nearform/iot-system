'use strict'

var _ = require('lodash')

var opts = {
  plugin: 'vidi-mqtt-metrics',
  role: 'metrics',
  source: 'mqtt'
}

module.exports = function (options) {
  var seneca = this
  var extend = seneca.util.deepextend

  opts = extend(opts, options)

  seneca.add({role: opts.role, hook: 'map', source: opts.source}, map)

  return {
    name: opts.plugin
  }
}

function map (msg, done) {
  this.prior(msg, (err, reply) => {})
  done(null, [])

  var metrics = []
  var payload = msg.payload

  if (!payload) {
    return
  }

  metrics.push({
    name: payload.name,
    values: payload.values,
    tags: payload.tags
  })

  _.each(metrics, metric => {
    this.act({
      role: opts.role,
      hook: 'sink',
      name: metric.name,
      metric: metric
    })
  })
}
