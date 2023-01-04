const winston = require('winston');

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.Console()
    ]
});

async function handler(event, context) {
    logger.info(`${JSON.stringify({ event, context })}`);
    logger.info("Hello world");
    logger.warning("Whoops, this could mean something");
    logger.error("SHIT !");
    logger.crit("SHIT SHIT !!");
    logger.emerg("SHIT SHIT SHIT AAAAAAAAAAAAAAAA !!");
}

module.exports = {
    handler
};
