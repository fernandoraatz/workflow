/*
|--------------------------------------------------------------------------
| Environment Variables
|--------------------------------------------------------------------------
*/

var env = {
    'BROKER_USER':         process.env.BROKER_USER,
    'BROKER_PASS':         process.env.BROKER_PASS,
    'BROKER_HOST':         process.env.BROKER_HOST,
    'BROKER_VHOST':        process.env.BROKER_VHOST,
    'QUEUE_CONSUME':       process.env.QUEUE_CONSUME,
    'EXCHANGE_CONSUME':    process.env.EXCHANGE_CONSUME,
    'EXCHANGE_PUBLISH':    process.env.EXCHANGE_PUBLISH,
    'LIMIT_RETRY_PUBLISH': process.env.LIMIT_RETRY_PUBLISH,
    'TIME_RETRY_PUBLISH': process.env.TIME_RETRY_PUBLISH
};

module.exports = env;
