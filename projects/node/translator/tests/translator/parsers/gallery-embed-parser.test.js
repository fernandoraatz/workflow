const { expect } = require('chai');

const { Champollion } = require('@igeg/champollion');

const GalleryEmbedParser = require('../../../app/translator/parsers/gallery-embed-parser');

let galleryhtml = {
    html:'<div class="galeria-embed"><h1>TITULO</h1><h2>SUBTITULO</h2><img src="http://fakeimg.pl/350x200/ff0000/000"/><div class="foto"><img alt="alt here" src="http://fakeimg.pl/350x200/ff0000/000" title="title here" /><label class="foto-legenda">label content goes in <b>here</b> </label><thumb src="http://fakeimg.pl/50x20/ff0000/000"></thumb></div></div>',
    json: [
        {
            'type': 'GALLERY',
            'title': 'TITULO',
            'description': 'SUBTITULO',
            'thumbnail': 'http://fakeimg.pl/350x200/ff0000/000',
            'images': [
                {
                    'meta': {
                        'alt': 'alt here',
                        'src': 'http://fakeimg.pl/350x200/ff0000/000',
                        'title': 'title here'
                    },
                    'caption': {
                        'richText': {
                            'clean': 'label content goes in here',
                            'entities': [
                                {
                                    'offset': 22,
                                    'length': 4,
                                    'type': 'STRONG',
                                    'meta': {}
                                }
                            ]
                        }
                    },
                    'thumbnail': 'http://fakeimg.pl/50x20/ff0000/000'
                }
            ]
        }
    ]
};

describe('GalleryEmbedParser', () => {
    describe('#parse', () => {
        it('Should parse a gallery node', () => {
            let egp = new GalleryEmbedParser(galleryhtml);
            let champollion = new Champollion(egp);
            let parsed = champollion.parseHTML(galleryhtml.html);
            expect(parsed).to.deep.equal(galleryhtml.json);
        });
    });
});
