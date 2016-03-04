
'use strict'

module.exports = {
  proxy: 'docker',
  runDocker: true,
  tail: false,
  restartOnError: false,
  exclude: [
    '**/node_modules',
    '**/data',
    '**/.git',
    '**/CURRENT',
    '**/LOG*',
    '**/MANIFEST*',
    '**/*.ldb',
    '**/*.log'
  ],

  overrides: {
    iot_broker: {
      run: 'node -r toolbag broker.js --seneca.options.debug.short_logs=true --seneca.log=type:act'
    },

    iot_metrics: {
      run: 'node -r toolbag metrics.js --seneca.options.debug.short_logs=true --seneca.log=type:act'
    },

    vidi_web: {
      run: 'node server/start.js "monolith:true" --seneca.options.debug.short_logs=true --seneca.log=type:act',
      build: 'npm install; npm run build;'
    }
  }
}
