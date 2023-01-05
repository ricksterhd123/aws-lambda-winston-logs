const winston = require('winston');

// HACKY FIX:
// AWS Lambda doesn't show request ID in cloudwatch
// https://github.com/winstonjs/winston/issues/1636
if (process.env.LAMBDA_TASK_ROOT) {
    delete console._stderr;
    delete console._stdout;
}

// Prettify the stack like AWS does for ReferenceErrors etc
const stackPrettifier = winston.format((info) => {
    if (info.stack) {
        info.stack = info.stack.split("\n");
    }
    return info;
});

// Set errorType if none set.
const defaultErrorTypifier = winston.format((info) => {
    // when .stack exists we assume it's an error
    if (info.stack) {
        info.errorType = info.errorType || info.stack[0];
    }
    return info;
});

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        stackPrettifier(),
        defaultErrorTypifier(),
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
