var FlumeReduce = require('flumeview-reduce')
var ref = require('ssb-ref')

exports.name = 'reports'
exports.version = "1.0.0"
exports.manifest = {
  stream: 'source',
  get: 'async'
}

exports.init = function (ssb, config) {
    return ssb._flumeUse('reports', FlumeReduce(1, reduce, map))
  }


  function map (msg) {
    if (msg.value.content && msg.value.content.type === 'report') {
      var author = msg.value.author
      var target = msg.value.content.about
      var values = {}
  
      for (var key in msg.value.content) {
        if (key !== 'about' && key !== 'type') {
          values[key] = {
            [author]: [msg.value.content[key], msg.value.timestamp]
          }
        }
      }
  
      return {
        [target]: values
      }
    }
  }