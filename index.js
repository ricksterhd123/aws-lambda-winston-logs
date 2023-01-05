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
        const response = await fetch('https://webhook.site/750d3b19-4785-4b12-a946-60f83a8dafdsafa0ec');

        if (!response.ok) {
            const method = response.method;
            const url = response.url;
            const status = response.status;
            const headers = Array.from(response.headers);
            const body = await response.text();
            throw {method, url, status, headers, body};
        }
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    handler
};
