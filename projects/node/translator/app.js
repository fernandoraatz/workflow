/*
|--------------------------------------------------------------------------
| App - Server
|--------------------------------------------------------------------------
*/

const SERVER_PORT = process.env.PORT || 4000;

const express = require('express');
const morgan = require('morgan');
const translator = require('./app/routes/translate');
const healthcheck = require('./app/routes/healthcheck');
const logger = require('./app/utils/logger');
const Rabbitmq = require('./app/utils/rabbitmq');

var bodyParser =  require('body-parser');

const rabbit = new Rabbitmq();
rabbit.queueConnect();

let app = express();

morgan.token('uuid', req => req.headers['request-uuid']);
app.use(morgan([
    ':uuid',
    ':remote-addr',
    '-',
    ':remote-user',
    '[:date[clf]]',
    '":method :url HTTP/:http-version"',
    ':status',
    ':res[content-length]',
    '":referrer"',
    '":user-agent"',
    ':response-time ms'
].join(' ')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/translate', translator);
app.use('/', healthcheck);


app = app.listen(SERVER_PORT, function () {
    logger.info(`Listening on http://localhost:${SERVER_PORT}`);
});

module.exports = app;