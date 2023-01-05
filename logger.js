const winston = require('winston');

// HACKY FIX:
// AWS Lambda doesn't show request ID in cloudwatch
// https://github.com/winstonjs/winston/issues/1636
if (!!process.env.LAMBDA_TASK_ROOT) {
    delete console._stderr;
    delete console._stdout;
}

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
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
