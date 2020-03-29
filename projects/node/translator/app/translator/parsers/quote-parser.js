const ChampollionParser = require('@igeg/champollion').ChampollionParser;
const logger = require('../../utils/logger');

class QuoteParser extends ChampollionParser {
    constructor() {
        super();
    }
    dealsWith(node) {
        try {
            return /frase-materia/.test(node.attribs.class);
        } catch (err) {
            return false;
        }
        
    }
    parse(node) {
        try {
            if (node.children[0].attribs.class != 'frase') {
                return [];
            } else {
                if (node.children[0].children.data == '') {
                    return [];
                }
            }
    
            let obj = {
                type: 'QUOTE',
                quote: this.cleanText(node.children[0])
            };
    
            if (node.children[1] && node.children[1].children.data != '') {
                obj.author = this.cleanText(node.children[1]);
            }
    
            return [obj];
        } catch (err) {
            logger.error(`[x] Failed to parser quote-parser ${err} - element - ${node.name} - type - ${node.type}`);
            return [];
        }


    }
}

module.exports = QuoteParser;