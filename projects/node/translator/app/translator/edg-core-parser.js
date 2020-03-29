/*
|--------------------------------------------------------------------------
| Translator Parser
|--------------------------------------------------------------------------
*/

const { Champollion } = require('@igeg/champollion');
const parsers = require('./parsers');

function strictParsing(isStrict) {
    let env = isStrict;
    if (typeof(env) === 'undefined')
        return false;
    return env === 'true';
}


module.exports = (isStrict) => {
    return new Champollion(parsers, { strict: strictParsing(isStrict) });
};