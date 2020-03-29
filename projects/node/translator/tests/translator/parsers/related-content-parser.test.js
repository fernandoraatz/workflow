const { expect } = require('chai');

const { Champollion } = require('@igeg/champollion');

const RelatedContentParser = require('../../../app/translator/parsers/related-content-parser');

let relatedContent = {
    html: `
        <div class="saibamais componente_materia expandido">
            <strong>saiba mais</strong>
            <ul>
                <li>
                    <a href="#" target="_blank">
                        MITSUBISHI ANTECIPA POSSÍVEL SUCESSOR DO ASX
                    </a>
                </li>
                <li>
                    <a href="#"target="_blank">
                        FORD ECOSPORT 2018 TEM PREÇOS ENTRE R$ 73.990 E R$ 93.990
                    </a>
                </li>
            </ul>
        </div>
    `,
    json: [{
        'type': 'RELATED_CONTENT',
        'title': 'saiba mais',
        'items': [
            {
                'richText': {
                    'clean': 'MITSUBISHI ANTECIPA POSSÍVEL SUCESSOR DO ASX',
                    'entities': [
                        {
                            'type': 'LINK',
                            'offset': 0,
                            'length': 44,
                            'meta': {
                                'href': '#'
                            }
                        }
                    ]
                }
            },
            {
                'richText': {
                    'clean': 'FORD ECOSPORT 2018 TEM PREÇOS ENTRE R$ 73.990 E R$ 93.990',
                    'entities': [
                        {
                            'type': 'LINK',
                            'offset': 0,
                            'length': 57,
                            'meta': {
                                'href': '#'
                            }
                        }
                    ]
                }
            }
        ]
    }]
};

let malformedRelatedContent = {
    html: `
        <div class="saibamais componente_materia expandido">
            <strong>Leia tamb&eacute;m </strong>
            <p>
                <a href="http://revistacrescer.globo.com/Gravidez/Parto/noticia/2014/02/como-superar-o-medo-do-parto.html" target="_blank">Como superar o medo do parto</a>
            </p>
        </div>
    `,
    json: []
};

let relatedContentWithoutTitle = {
    html: `
        <div class="saibamais componente_materia expandido">
            <ul>
                <li>
                    <a href="#" target="_blank">
                        MITSUBISHI ANTECIPA POSSÍVEL SUCESSOR DO ASX
                    </a>
                </li>
                <li>
                    <a href="#"target="_blank">
                        FORD ECOSPORT 2018 TEM PREÇOS ENTRE R$ 73.990 E R$ 93.990
                    </a>
                </li>
            </ul>
        </div>
    `,
    json: [{
        'type': 'RELATED_CONTENT',
        'title': null,
        'items': [
            {
                'richText': {
                    'clean': 'MITSUBISHI ANTECIPA POSSÍVEL SUCESSOR DO ASX',
                    'entities': [
                        {
                            'type': 'LINK',
                            'offset': 0,
                            'length': 44,
                            'meta': {
                                'href': '#'
                            }
                        }
                    ]
                }
            },
            {
                'richText': {
                    'clean': 'FORD ECOSPORT 2018 TEM PREÇOS ENTRE R$ 73.990 E R$ 93.990',
                    'entities': [
                        {
                            'type': 'LINK',
                            'offset': 0,
                            'length': 57,
                            'meta': {
                                'href': '#'
                            }
                        }
                    ]
                }
            }
        ]
    }]
};

function assertEquality(config) {
    let champollion = new Champollion(new RelatedContentParser());
    let parsed = champollion.parseHTML(config.html, config.id);
    expect(parsed).to.deep.equal(config.json);
}

describe('RelatedContentParser', () => {

    describe('#parse(node)', () => {
        it('should parse div."saibamais componente_materia" to RELATED_CONTENT', () => {
            assertEquality(relatedContent);
        });

        it('should parse div."saibamais componente_materia" without title to RELATED_CONTENT', () => {
            assertEquality(relatedContentWithoutTitle);
        });

        it('should return empty array for malformed markup', ()=>{
            assertEquality(malformedRelatedContent);
        });
    });

});