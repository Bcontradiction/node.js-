var log4js = require('log4js');
var appender = null;
 
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');
 
var connectLogLevel = 'auto';
var connectLogFormat = ':method :url';
 
module.exports = {
    logger: logger,
    connectLogLevel: connectLogLevel,
    connectLogFormat: connectLogFormat
};
 
module.exports.config = function (logRoute) {
    appender = {
        appenders: [
            {type: 'console'},
            {
                type: 'file',
                filename: logRoute,
                maxLogSize: 1024000,
                backups: 10,
                category: 'normal'
            }
        ],
        replaceConsole: true
    };
    return appender;
};
