const ChampollionParser = require('@igeg/champollion').ChampollionParser;
const logger = require('../../utils/logger');

class RelatedContentParser extends ChampollionParser {
    constructor() {
        super();
    }
    dealsWith(node) {
        try {
            return /saibamais.*componente_materia/.test(node.attribs.class);    
        } catch (err) {
            return false;
        }   
    }
    parse(node) {
        try {
            let titleNode = node.children.filter(n => n.name === 'strong').pop() || null;
            if(titleNode) {
                titleNode = this.cleanText(titleNode);
            }
    
            let itemsNode = node.children.filter(n => n.name === 'ul').pop();
            if(!itemsNode) {
                return [];
            }
    
            let items = itemsNode.children.map(item => ({ richText: this.richText(item) }));
    
            let chunk = {
                type: 'RELATED_CONTENT',
                title: titleNode,
                items
            };
    
            return [chunk];
        } catch (err) {
            logger.error(`[x] Failed to parser related-content-parser ${err} - element - ${node.name} - type - ${node.type}`);
            return [];
        }

    }
}

module.exports = RelatedContentParser;