const ChampollionParser = require('@igeg/champollion').ChampollionParser;
const logger = require('../../utils/logger');

class SectionTitleParser extends ChampollionParser {
    constructor() {
        super();
    }
    dealsWith(node) {
        try {
            return node.attribs && node.attribs.class && node.children[0]
            && node.children[0].attribs && node.children[0].attribs.class &&
            /componente_materia/.test(node.attribs.class) &&
            /intertitulo/.test(node.children[0].attribs.class);
        } catch (err) {
            return false;
        }

    }
    parse(node) {
        try {
            return [{
                type: 'SECTION_TITLE',
                richText: this.richText(node.children[0])
            }];
        } catch (err) {
            logger.error(`[x] Failed to parser section-title-parser ${err} - element - ${node.name} - type - ${node.type}`);
            return [];
        }

    }
}

module.exports = SectionTitleParser;