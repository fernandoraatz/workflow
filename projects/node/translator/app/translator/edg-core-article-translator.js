/*
|--------------------------------------------------------------------------
| Translator Article
|--------------------------------------------------------------------------
*/

const makeCoreParser = require('./edg-core-parser');

const NAME_TO_CONTENT_HUB = {
    'Casa e Jardim':'Casa e Jardim',
    'Crescer': 'Crescer',
    'Marie Claire': 'Marie Claire',
    'Revista Quem Acontece': 'Quem',
    'QUEM ACONTECE': 'Quem',
    'Monet': 'Monet',
    'Vogue':'Vogue',
    'GQ':'GQ',
    'Glamour':'Glamour',
    'Casa Vogue':'Casa Vogue',
    'Globo Rural':'Globo Rural',
    'Galileu':'Galileu',
    'Época':'Época',
    'Pequenas Empresas e Grandes Negócios':'Pequenas Empresas e Grandes Negócios',
    'Auto Esporte':'Auto Esporte',
    'Revista Época Negócios':'Época Negócios'
};

function isAlreadyContentHubName(name) {
    return Object.values(NAME_TO_CONTENT_HUB).some(v => v === name);
}

function isOriginalProductName(name) {
    return name in NAME_TO_CONTENT_HUB;
}

class EdgCoreArticleTranslator {

    constructor() {
        this.parser = makeCoreParser(process.env.EDG_CORE_STRICT_PARSING);
    }

    async load(url) {
        return url;
    }

    nameParser(globoCoreJson) {
        const {publications} = globoCoreJson;

        for (const publication of publications) {
            if (isOriginalProductName(publication.name)) {
                publication.name = NAME_TO_CONTENT_HUB[publication.name];
            } else if (!isAlreadyContentHubName(publication.name)) {
                return {};
            }
        }

        return globoCoreJson;
    }

    translate(jsonBody) {
        const tabulationRegex = /\\{1,2}n|\\{1,2}t|\\{1,2}r/g;
        const actualBody = jsonBody['body'].replace(tabulationRegex, '');
        jsonBody['body'] = this.parser.parseHTML(actualBody);
        return this.nameParser(jsonBody);
    }
}

module.exports = EdgCoreArticleTranslator;