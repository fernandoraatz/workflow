const ChampollionParser = require('@igeg/champollion').ChampollionParser;
const logger = require('../../utils/logger');

class GalleryEmbedParser extends ChampollionParser {
    constructor() {
        super();
    }

    dealsWith(node) {
        try {
            return /galeria-embed/.test(node.attribs.class);
        } catch (err) {
            return false;
        }
    }

    getImage(n) {
        let img = n.children[0];
        return img;
    }

    getCaption(n) {
        let caption = n.children[1];
        return caption;
    }

    getAllImages(n) {
        let width =  n.children[0].attribs['width'];
        let height =  n.children[0].attribs['height'];

        let obj =  {
            meta: this.cleanAttr(this.getImage(n)),
            caption:{
                richText: this.richText(this.getCaption(n))
            },
            thumbnail: n.children.filter(n=> n.name === 'thumb').pop().attribs['src']
        };

        if (width) {
            obj.meta.width = parseInt(width);
        }
        if (height) {
            obj.meta.height = parseInt(height);
        }

        return obj;
    }

    parse(node) {
        try {
            let imgNode = node.children.filter(n => n.attribs.class === 'foto').map(n => this.getAllImages(n));

            let description = this.cleanText(node.children[1]);

            let chunk = {
                type: 'GALLERY',
                title: this.cleanText(node.children[0]),
                thumbnail: node.children.filter(n=> n.name === 'img').pop().attribs['src'],
                images: imgNode
            };

            if (description != '') {
                chunk['description'] = description;
            }
            return [chunk];
        } catch (error) {
            logger.error(`[x] Failed to parser embed-inline-gallery-parser ${error} - element - ${node.name} - type - ${node.type}`);
            return [];
        }
    }
}
module.exports = GalleryEmbedParser;