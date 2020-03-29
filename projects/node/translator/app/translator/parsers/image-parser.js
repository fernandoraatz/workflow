const ChampollionParser = require('@igeg/champollion').ChampollionParser;
const logger = require('../../utils/logger');

const copy = o => JSON.parse(JSON.stringify(o));

const attRegex = /(width|height)\s*?:\s*?(\d+)/ig;

function areDimensionsValid(dimensionsArray) {
    return dimensionsArray && dimensionsArray.length === 2;
}

class ImageParser extends ChampollionParser {
    constructor() {
        super();
    }
    dealsWith(node) {
        try {
            return node.attribs &&
            node.attribs.class &&
            /foto.*componente_materia/.test(node.attribs.class);
        } catch (err) {
            return false;
        }
        
    }
    /**
     * Parses a string and extracts width and height attributes with their
     * respective values. 
     * 
     * @param {string} str string like inline css style attribute
     * @param {Array} arr array that registers the attributes width and height
     * 
     * @returns {Array} returns the arr param if it has length 2
     * @returns {Array} returns a new array if arr param has length 2 and 
     * arrRegex matches str param
     * @returns {Null} returns null if arrRegex does not match str param
     * 
     * @example
     * getDimensions('width:620px;height:300', ['width:120px;height:75'])
     * //returns ['width:620','height:300']
     * 
     * getDimensions('width:620px;height:300', [])
     * //returns ['width:620','height:300']
     * 
     * getDimensions('height:300', [])
     * //returns ['height:300']
     * 
     * getDimensions('chabalaba', [])
     * //returns null
     */
    getDimensions(str, arr) {
        if (!areDimensionsValid(arr)) {
            return str ? str.match(attRegex) : arr;
        }
        return arr;
    }

    getImageNode(n) {
        return n.children.filter(n => n.name === 'img').pop();
    }

    setDimensions(obj, att) {
        let dimensions = [];

        dimensions = this.getDimensions(att.style, dimensions);

        dimensions =
            this.getDimensions(
                `width:${att.width}px;height:${att.height}px`,
                dimensions
            );

        if (areDimensionsValid(dimensions)) {
            dimensions.forEach(d => {
                let [name, value] = d.split(':');
                obj[name.trim()] = parseInt(value.trim());
            });
        }
    }
    parse(node) {
        try {
            let imgNode = this.getImageNode(node);

            if (!imgNode) return [];
    
            let att = copy(imgNode.attribs);
    
            let chunk = {
                type: 'IMAGE',
                meta: this.cleanAttr(imgNode)
            };
    
            this.setDimensions(chunk.meta, att);
    
            let labelNode = node.children.filter(n => n.name === 'label').pop();
    
            if (labelNode) {
                chunk.caption = {
                    richText: this.richText(labelNode)
                };
            }
    
            return [chunk];
        } catch (err) {
            logger.error(`[x] Failed to parser image-parser ${err} - element - ${node.name} - type - ${node.type}`);
            return [];
        }

    }
}

module.exports = ImageParser;