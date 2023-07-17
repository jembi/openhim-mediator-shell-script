require('source-map-support').install()

const path = require('path')
global.appRoot = path.join(path.resolve(__dirname), '..')

// Load configuration
const config = require('./config')
config.load()

const logger = require('winston')

var winstonLogFormat = logger.format.printf(function(info) {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

logger.remove(new logger.transports.Console());

logger.add(new logger.transports.Console({
  format: logger.format.combine(logger.format.timestamp(), logger.format.colorize(), winstonLogFormat),
  level: 'info'
}));


logger.info(`Initialized configuration from '${config.getConfName()}'`)

if (config.getConf().openhim.api.trustSelfSigned) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}
