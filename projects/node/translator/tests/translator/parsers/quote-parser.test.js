const { expect } = require('chai');

const { Champollion } = require('@igeg/champollion');

const QuoteParser = require('../../../app/translator/parsers/quote-parser');

const quote = 'Lorem ipsum dolor sit amet';
const author = 'Ed Motta';
const qclass = 'lorem_ipsum';

let quotation = {
    html: `
        <div class="frase-materia componente_materia">
            <div class="frase">${quote}</div>
            <div class="autor">${author}</div>
        </div>
    `,
    json: [
        {
            'type': 'QUOTE',
            'quote': quote,
            'author': author
        }
    ]
};

let quoteParserNode = {
    name: 'div',
    type: 'tag',
    attribs: {
        class: 'frase-materia componente_materia',
    },
    children: [{
        name: 'div',
        type: 'tag',
        attribs: {
            class: 'frase'
        },
        children: [{
            type: 'text',
            data: quote
        }]
    },
    {
        name: 'div',
        type: 'tag',
        attribs: {
            class: 'author'
        },
        children: [{
            type: 'text',
            data: author
        }]
    }]
};

function assertEquality(config) {
    let champollion = new Champollion(new QuoteParser());
    let parsed = champollion.parseHTML(config.html, config.id);
    expect(parsed).to.deep.equal(config.json);
}

let quoteParser = new QuoteParser;

const copy = o => JSON.parse(JSON.stringify(o));

describe('QuoteParser', () => {

    describe('#parse(node)', () => {
        it('should parse div."frase-materia componente_materia" to QUOTE', () => {
            assertEquality(quotation);
        });
    });

    describe('#dealsWith(node)', () => {
        it('should return true when receive the expected object.', () => {
            let obj = copy(quoteParserNode);
            expect(quoteParser.dealsWith(obj)).to.be.true;
        });

        it('should return true when receive the object with extended class.', () => {
            let obj = copy(quoteParserNode);
            obj.attribs.class = obj.attribs.class + ' expandido';
            expect(quoteParser.dealsWith(obj)).to.be.true;
        });

        it('should return false when receive the object.', () => {
            let obj = copy(quoteParserNode);
            obj.attribs.class = qclass;
            expect(quoteParser.dealsWith(obj)).to.be.false;
        });
    });

    describe('when author node is not present', () => {
        it('should parse div without author block', () => {
            let obj = copy(quoteParserNode);
            let exp = copy(quotation.json[0]);

            delete exp.author;
            delete obj.children[1];
            expect(quoteParser.parse(obj)).to.be.deep.equal([exp]);
        });
    });

    describe('when author value is empty', () => {
        it('should parse div without author block', () => {
            let obj = copy(quoteParserNode);
            let exp = copy(quotation.json[0]);

            delete exp.author;
            obj.children[1].children.data = '';

            expect(quoteParser.parse(obj)).to.be.deep.equal([exp]);
        });
    });

    describe('when quote node is not present', () => {
        it('should not parse div', () => {
            let obj = copy(quoteParserNode);

            delete obj.children.shift();
            expect(quoteParser.parse(obj)).to.be.empty;
        });
    });

    describe('when quote value is empty', () => {
        it('should not parse div', () => {
            let obj = copy(quoteParserNode);

            obj.children[0].children.data = '';
            expect(quoteParser.parse(obj)).to.be.empty;
        });
    });

});