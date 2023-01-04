const winston = require('winston');

// HACKY FIX:
// AWS Lambda doesn't show request ID in cloudwatch
// https://github.com/winstonjs/winston/issues/1636
delete console._stderr;
delete console._stdout;

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            consoleWarnLevels: ['warning', 'notice'],
            stderrLevels: ['emerg', 'alert', 'crit', 'error'],
            debugStdout: true,
            showLevel: true
        })
    ]
});

module.exports = logger;
