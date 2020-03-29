const { expect } = require('chai');

const { Champollion } = require('@igeg/champollion');

const GloboVideoParser =
    require('../../../app/translator/parsers/globo-video-parser');

const thumbUrl = 'http://s02.video.glbimg.com/320x200/3489217.jpg';
const id = '3489217';
const width = 320;
const height = 240;

let globoVideo = {
    html: `<div class="video componente_materia" height="${height}" id="${id}" style='background: url("${thumbUrl}") center top / ${width}px ${height}px no-repeat; height: ${height}px !important;' width="${width}"></div>`,
    json: [
        {
            'type': 'VIDEO_GCOM',
            'id': id,
            'thumb': thumbUrl,
            'width': width,
            'height': height,
        }
    ]
};

let globoVideoParserNode = {
    name: 'div',
    type: 'tag',
    attribs: {
        class: 'video componente_materia',
        id: id,
        style: `background: url(${thumbUrl}) no-repeat top center;`
    }
};

let globoVideoRGBA = {
    html: `<div class="video componente_materia" height="${height}" id="${id}" style='background: rgba(0, 0, 0, 0) url("${thumbUrl}") no-repeat scroll center top / 640px 360px; height: ${height}px !important;' width="${width}"></div>`,
    json: [
        {
            'type': 'VIDEO_GCOM',
            'id': id,
            'thumb': thumbUrl,
            'width': width,
            'height': height,
        }
    ]
};

function checkProperty(property) {
    let broken = JSON.parse(JSON.stringify(globoVideoParserNode));
    delete broken.attribs[property];

    return broken;
}

function assertEquality(config) {
    let champollion = new Champollion(new GloboVideoParser());
    let parsed = champollion.parseHTML(config.html, config.id);
    expect(parsed).to.deep.equal(config.json);
}

describe('VideoGloboParser', () => {

    let globoVideoParser = new GloboVideoParser();

    describe('getThumbUrl', () => {
        it('Should return video thumb url', () => {
            expect(globoVideoParser.getThumbUrl(globoVideoParserNode)).to.be.equal(thumbUrl);
        });

        it('Should return undefined if video thumb is not defined', () => {
            let broken = checkProperty('style');
            expect(globoVideoParser.getThumbUrl(broken)).to.be.undefined;
        });
    });

    describe('getVideoId', () => {
        it('Should return video id', () => {
            expect(globoVideoParser.getVideoId(globoVideoParserNode)).to.be.equal(id);
        });

        it('Should return undefined if id is not defined', () => {
            let broken = checkProperty('id');
            expect(globoVideoParser.getVideoId(broken)).to.be.undefined;
        });
    });

    describe('#dealsWith(node)', () => {
        it('should deal with globo video', () => {
            expect(globoVideoParser.dealsWith(globoVideoParserNode)).to.be.true;
        });

        it('should not deal with no thumb url propertie', () => {
            let broken = Object.assign({}, globoVideoParserNode);
            delete broken.attribs.style;
            expect(globoVideoParser.dealsWith(broken)).to.be.false;
        });

        it('should not deal with malformed thumb url propertie', () => {
            let broken = Object.assign({}, globoVideoParserNode);
            broken.attribs.style = 'background: url() no-repeat top center;';
            expect(globoVideoParser.dealsWith(broken)).to.be.false;
        });

        it('should not deal with no id propertie', () => {
            let broken = Object.assign({}, globoVideoParserNode);
            delete broken.attribs.id;
            expect(globoVideoParser.dealsWith(broken)).to.be.false;
        });

        it('should not deal with empty id propertie', () => {
            let broken = Object.assign({}, globoVideoParserNode);
            broken.attribs.id = '';
            expect(globoVideoParser.dealsWith(broken)).to.be.false;
        });

    });

    describe('#parse(node)', () => {
        it('should parse globo video markup', () => {
            assertEquality(globoVideo);
        });
        it('should parse correctly with rgba background', () => {
            assertEquality(globoVideoRGBA);
        });
    });

});