/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let ops
const fs = require('fs')
const path = require('path')
const stdio = require('stdio')

let conf = {}
let mediatorConf = {}

if (process.env.NODE_ENV !== 'test') {
  ops = stdio.getopt({
    conf: {
      key: 'c',
      args: 1,
      description: 'The backend configuration to use. See config/default.json for an example.'
    },
    mediatorConf: {
      key: 'm',
      args: 1,
      description: 'The mediator configuration to use. See config/mediator.json for an example.'
    }
  })
}

let confFile = null

// Update the conf map with updated values
// Keys that contain dashes will be split and nested in the map,
// e.g. if the updated config is { "server-host": "localhost" }
// then the conf map will end up as {"server":{ "host": "localhost"}}
//
// TODO the split should be on period, not dash. but mongo doesn't like these
// https://github.com/jembi/openhim-core-js/issues/566
const updateConf = config =>
  (() => {
    const result = []
    for (var param in config) {
      var _spl = param.split('-')
      var _confI = conf

      result.push((() => {
        const result1 = []
        for (let i = 0; i < _spl.length; i++) {
          const key = _spl[i]
          if (i === (_spl.length - 1)) {
            result1.push(_confI[key] = config[param])
          } else {
            if (!_confI[key]) { _confI[key] = {} }
            result1.push(_confI = _confI[key])
          }
        }
        return result1
      })())
    }
    return result
  })()

const load = function () {
  // conf
  let mediatorConfFile
  if ((ops != null ? ops.conf : undefined) != null) {
    confFile = ops.conf
  } else if (process.env.NODE_ENV === 'development') {
    confFile = path.resolve(`${global.appRoot}/config`, 'development.json')
  } else if (process.env.NODE_ENV === 'test') {
    confFile = path.resolve(`${global.appRoot}/config`, 'test.json')
  } else {
    confFile = path.resolve(`${global.appRoot}/config`, 'default.json')
  }

  conf = JSON.parse(fs.readFileSync(confFile))

  // mediator conf
  if ((ops != null ? ops.mediatorConf : undefined) != null) {
    mediatorConfFile = ops.mediatorConf
  } else {
    mediatorConfFile = path.resolve(`${global.appRoot}/config`, 'mediator.json')
  }

  mediatorConf = JSON.parse(fs.readFileSync(mediatorConfFile))
  if (mediatorConf.config != null) {
    return updateConf(mediatorConf.config)
  }
}

exports.getConf = () => conf
exports.getConfName = () => confFile
exports.getMediatorConf = () => mediatorConf
exports.load = load
exports.updateConf = updateConf
