const fetch = require('node-fetch');
const logger = require('./logger');

async function handler(event, context) {
    logger.debug({event, context});
    logger.info("Hello world");
    logger.notice("It's Monday");
    logger.warning("Whoops, this could mean something");
    logger.error("SHIT !");
    logger.crit("SHIT SHIT !!");
    logger.alert("SHIT SHIT SHIT !!");
    logger.emerg("SHIT SHIT SHIT AAAAAAAAAAAAAAAA !!");

    try {
        const response = fetch('https://webhook.site/750d3b19-4785-4b12-a946-60f83a8dafdsafa0ec');

        if (!response.ok) {
            throw new Error(response);
        }

        logger.info(response);
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    handler
};
