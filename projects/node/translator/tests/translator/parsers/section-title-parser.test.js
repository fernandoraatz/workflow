const { expect } = require('chai');

const { Champollion } = require('@igeg/champollion');

const SectionTitleParser = require('../../../app/translator/parsers/section-title-parser');

let relatedContent = {
    html: `
        <div class="componente_materia">
            <div class="intertitulo">
                Confira todos os preços do Mitsubishi ASX
            </div>
        </div>
    `,
    json: [
        {
            'type': 'SECTION_TITLE',
            'richText': {
                'clean': 'Confira todos os preços do Mitsubishi ASX'
            }
        }
    ]
};

function assertEquality(config) {
    let champollion = new Champollion(new SectionTitleParser());
    let parsed = champollion.parseHTML(config.html, config.id);
    expect(parsed).to.deep.equal(config.json);
}

describe('SectionTitleParser', () => {

    describe('#parse(node)', () => {
        it('should parse div."saibamais componente_materia" to RELATED_CONTENT', () => {
            assertEquality(relatedContent);
        });
    });

});