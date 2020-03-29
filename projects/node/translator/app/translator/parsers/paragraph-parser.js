const ChampollionParser = require('@igeg/champollion').ChampollionParser;
const logger = require('../../utils/logger');

class ParagraphParser extends ChampollionParser {
    dealsWith(node) {
        try {
            return 'p' === node.name;
        } catch (err) {
            return false;
        }
    }
    parse(node) {
        try {
            if(this.cleanText(node).trim() === '') return [];

            return [{
                type: 'UNSTYLED',
                richText: this.richText(node)
            }];
        } catch (err) {
            logger.error(`[x] Failed to parser paragraph-parser ${err} - element - ${node.name} - type - ${node.type}`);
            return [];
        }

    }
}

module.exports = ParagraphParser;