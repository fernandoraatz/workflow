const ChampollionParser = require('@igeg/champollion').ChampollionParser;
const logger = require('../../utils/logger');

class YtEmbedParser extends ChampollionParser {
    getObject(node) {
        return node.children &&
            node.children.filter(n => n.name === 'object').pop();
    }
    getMovie(object) {
        return object.children &&
            object.children.filter(
                n => n.attribs && n.attribs.name === 'movie'
            ).pop();
    }
    getIframe(node) {
        return node.children &&
            node.children.filter(n => n.name === 'iframe').pop();
    }
    getMeta(node) {
        let meta = {
            src: node.attribs.src || this.getMovie(node).attribs.value
        };

        if (node.attribs.width) {
            meta.width = parseInt(node.attribs.width);
        }
        if (node.attribs.height) {
            meta.height = parseInt(node.attribs.height);
        }

        return meta;
    }
    dealsWith(node) {
        try {
            return node.attribs.class &&
                /youtube componente_materia/.test(node.attribs.class);
        } catch (err) {
            return false;
        }

    }
    shouldDeal(object, iframe) {
        if (!object && !iframe) return false;

        if (object) {
            let movie = this.getMovie(object);
            return (undefined !== movie)
                && /http.*youtube/.test(movie.attribs.value);
        }

        if (iframe && !iframe.attribs.src) return false;

        return true;
    }
    parse(node) {
        try {
            let object = this.getObject(node);
            let iframe = this.getIframe(node);

            if (!this.shouldDeal(object, iframe)) {
                return [];
            }

            let meta = this.getMeta(object || iframe);
            return [{
                type: 'IFRAME',
                meta
            }];
        } catch (err) {
            logger.error(`[x] Failed to parser yt-embed-parser ${err} - element - ${node.name} - type - ${node.type}`);
            return [];
        }


    }
}

module.exports = YtEmbedParser;