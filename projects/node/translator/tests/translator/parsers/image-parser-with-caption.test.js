const { expect } = require('chai');

const { Champollion } = require('@igeg/champollion');

const ImageParser = require('../../../app/translator/parsers/image-parser');

// no width att
// no height att
// no style width
// no style height
let imageWithCaption = {
    html: `
        <div class="foto componente_materia midia-largura-620">
            <img alt="alt here" id="233262"
                src="#"
                title="title here" />
            <label class="foto-legenda">label content goes in <b>here</b></label>
        </div>
    `,
    json: [
        {
            'type': 'IMAGE',
            'meta': {
                'alt': 'alt here',
                'title': 'title here',
                'src': '#'
            },
            'caption': {
                'richText': {
                    'clean': 'label content goes in here',
                    'entities': [
                        {
                            'type': 'STRONG',
                            'offset': 22,
                            'length': 4,
                            'meta': {}
                        }
                    ]
                }
            }
        }
    ]
};

// width att
// height att
// no style width
// no style height
let image = {
    html: `
        <div class="foto componente_materia midia-largura-620">
            <img alt="alt here" height="300" id="233262"
                src="#"
                title="title here" width="620" />
        </div>
    `,
    json: [
        {
            'type': 'IMAGE',
            'meta': {
                'alt': 'alt here',
                'title': 'title here',
                'src': '#',
                'width': 620,
                'height': 300
            }
        }
    ]
};

// no width att
// no height att
// style width
// style height
let noAttAllStyle = {
    html: `
        <div class="foto componente_materia midia-largura-620">
            <img alt="alt here" id="233262"
                src="#"
                title="title here"
                style="width:620px; border:1px solid black; height:300px; color:#0000"
                />
            <label class="foto-legenda">label content goes in <b>here</b></label>
        </div>
    `,
    json: [
        {
            'type': 'IMAGE',
            'meta': {
                'alt': 'alt here',
                'title': 'title here',
                'src': '#',
                'width': 620,
                'height': 300
            },
            'caption': {
                'richText': {
                    'clean': 'label content goes in here',
                    'entities': [
                        {
                            'type': 'STRONG',
                            'offset': 22,
                            'length': 4,
                            'meta': {}
                        }
                    ]
                }
            }
        }
    ]
};

// no width att
// no height att
// style width
// no style height
let noAttWStyle = {
    html: `
        <div class="foto componente_materia midia-largura-620">
            <img alt="alt here" id="233262"
                src="#"
                title="title here"
                style="width:620px; border:1px solid black; color:#0000"
                />
            <label class="foto-legenda">label content goes in <b>here</b></label>
        </div>
    `,
    json: [
        {
            'type': 'IMAGE',
            'meta': {
                'alt': 'alt here',
                'title': 'title here',
                'src': '#'
            },
            'caption': {
                'richText': {
                    'clean': 'label content goes in here',
                    'entities': [
                        {
                            'type': 'STRONG',
                            'offset': 22,
                            'length': 4,
                            'meta': {}
                        }
                    ]
                }
            }
        }
    ]
};

// no width att
// no height att
// no width
// style height
let noAttHStyle = {
    html: `
        <div class="foto componente_materia midia-largura-620">
            <img alt="alt here" id="233262"
                src="#"
                title="title here"
                style="border:1px solid black; height:300px; color:#0000"
                />
            <label class="foto-legenda">label content goes in <b>here</b></label>
        </div>
    `,
    json: [
        {
            'type': 'IMAGE',
            'meta': {
                'alt': 'alt here',
                'title': 'title here',
                'src': '#'
            },
            'caption': {
                'richText': {
                    'clean': 'label content goes in here',
                    'entities': [
                        {
                            'type': 'STRONG',
                            'offset': 22,
                            'length': 4,
                            'meta': {}
                        }
                    ]
                }
            }
        }
    ]
};

// width att
// no height att
// no style width
// no style height
let wAttNoStyle = {
    html: `
        <div class="foto componente_materia midia-largura-620">
            <img alt="alt here" id="233262"
                src="#"
                title="title here"
                width="620"
                />
            <label class="foto-legenda">label content goes in <b>here</b></label>
        </div>
    `,
    json: [
        {
            'type': 'IMAGE',
            'meta': {
                'alt': 'alt here',
                'title': 'title here',
                'src': '#'
            },
            'caption': {
                'richText': {
                    'clean': 'label content goes in here',
                    'entities': [
                        {
                            'type': 'STRONG',
                            'offset': 22,
                            'length': 4,
                            'meta': {}
                        }
                    ]
                }
            }
        }
    ]
};

// no width att
// height att
// no style width
// no style height
let hAttNoStyle = {
    html: `
        <div class="foto componente_materia midia-largura-620">
            <img alt="alt here" id="233262"
                src="#"
                title="title here"
                height="300"
                />
            <label class="foto-legenda">label content goes in <b>here</b></label>
        </div>
    `,
    json: [
        {
            'type': 'IMAGE',
            'meta': {
                'alt': 'alt here',
                'title': 'title here',
                'src': '#'
            },
            'caption': {
                'richText': {
                    'clean': 'label content goes in here',
                    'entities': [
                        {
                            'type': 'STRONG',
                            'offset': 22,
                            'length': 4,
                            'meta': {}
                        }
                    ]
                }
            }
        }
    ]
};

let nestedImg = {
    html: `
    <div class="foto componente_materia midia-largura-620">
        <div class="foto componente_materia midia-largura-620">
            <img alt="Capa da Semana com Vladimir Brichta (Foto: Daryan Dornelles/Trip e Alisson Louback/Warner)" height="775" id="d85fc16b-be05-4337-8f98-48194243bc95"
    src="http://s2.glbimg.com/WmvwTS1cLnI3rdNl_zsg7qzQlug=/top/e.glbimg.com/og/ed/f/original/2017/08/17/vladimir-brichta-materia.gif"
    title="Capa da Semana com Vladimir Brichta (Foto: Daryan Dornelles/Trip e Alisson Louback/Warner)" width="620" />
            <label class="foto-legenda">Capa da Semana com Vladimir Brichta (Foto: Daryan Dornelles/Trip e Alisson Louback/Warner)</label>
        </div>
        <p>&nbsp;</p>
    </div>
    `,
    json: []
};

function assertEquality(config) {
    let champollion = new Champollion(new ImageParser());
    let parsed = champollion.parseHTML(config.html, config.id);
    expect(parsed).to.deep.equal(config.json);
}

describe('ImageParser', () => {

    describe('#parse(node)', () => {
        it('should parse (div."foto componente_materia" > img + label) to IMAGE', () => {
            assertEquality(imageWithCaption);
        });
        it('should parse (div."foto componente_materia" > img) to IMAGE', () => {
            assertEquality(image);
        });
        it('Should pick dimensions from style attribute', () => {
            assertEquality(noAttAllStyle);
        });
        it('Should only set dimensions when both width and height are present in style', () => {
            assertEquality(noAttWStyle);
            assertEquality(noAttHStyle);
            assertEquality(wAttNoStyle);
            assertEquality(hAttNoStyle);
        });
        it('Should return empty array em images are nested', () => {
            assertEquality(nestedImg);
        });
    });
});