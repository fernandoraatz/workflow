const winston = require('winston');
const DEFAULT_LOGGING_LEVEL = 'warn';
const AVAILABLE_LEVELS = ['debug', 'info', 'warn', 'error'];

let level = (process.env.LOG_LEVEL || DEFAULT_LOGGING_LEVEL).toLowerCase();

if (!AVAILABLE_LEVELS.includes(level)) {
    winston.log('warn', '\'%s\' is not a valid logging level. Valid levels are: %s. Logging level will default to \'%s\'', level, AVAILABLE_LEVELS.join(', '), DEFAULT_LOGGING_LEVEL);
    level = DEFAULT_LOGGING_LEVEL;
}

let winstonLogger = new winston.Logger({
    level: level,
    transports: [
        new (winston.transports.Console)({
            colorize: true
        })
    ]
});

let logger = {
    level: winstonLogger.level
};

/*
* hides the implementation of the winstonLogger and
* exposes only the methods suited for this app
*
* this lamba uses Rest Parameters and the Spread Operator
* see:
* https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/rest_parameters
* https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Spread_operator
*/
AVAILABLE_LEVELS
    .forEach(level => logger[level] = (...args) => winstonLogger[level](...args));

module.exports = logger;