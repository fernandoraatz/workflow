const ChampollionParser = require('@igeg/champollion').ChampollionParser;
const logger = require('../../utils/logger');

class GloboVideoParser extends ChampollionParser {
    getThumbUrl(node) {
        return node.attribs.style && node.attribs.style !== '' &&
            node.attribs.style.match(/background.*url\((.*)\)/)[1].replace(/('|")/g,'');
    }

    getVideoId(node) {
        return node.attribs.id !== '' && node.attribs.id;
    }

    isValid(el) {
        return el !== null && el !== undefined && el !== ''; 
    }

    getVideoDimensions(node) {
        let dim = {w: '', h: ''};

        dim.w = node.attribs.width && node.attribs.width != '' ? node.attribs.width : dim.w;
        dim.h = node.attribs.height && node.attribs.height != '' ? node.attribs.height : dim.h;
        return dim;
    }

    dealsWith(node) {
        try {
            let isGV = /video componente_materia/.test(node.attribs.class);

            if (!isGV) return false;
    
            let thumb = this.getThumbUrl(node);
            let id = this.getVideoId(node);
    
            return this.isValid(thumb) && this.isValid(id);
        } catch (err) {
            return [];
        }
    }

    parse(node) {
        try {
            let thumb = this.getThumbUrl(node);
            let id = this.getVideoId(node);
            let dim = this.getVideoDimensions(node);
    
            return [{
                type: 'VIDEO_GCOM',
                thumb,
                width: parseInt(dim.w),
                height: parseInt(dim.h),
                id
            }];
        } catch (err) {
            logger.error(`[x] Failed to parser globo-video-parser ${err} - element - ${node.name} - type - ${node.type}`);
            return [];
        }

    }
}

module.exports = GloboVideoParser;