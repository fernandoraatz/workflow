/*
|--------------------------------------------------------------------------
| Translate Route
|--------------------------------------------------------------------------
*/

const router = require('express').Router();
const edgat = require('../translator/edg-core-article-translator');
const logger = require('../utils/logger');
const {ReadingAugmenter} = require('@igeg/franklin');

const augmenter = new ReadingAugmenter();

router.post('/json', (req, res) => {
    let translator = new edgat();
    let jsonBody = req.body;

    try {
        let articleTranslated = translator.translate(jsonBody);
        augmenter.addWordCountAndReadingTime(articleTranslated);
        logger.info('[v] Successfully translated article');
        res.send(JSON.stringify(articleTranslated, null, 3));
    } catch (error) {
        logger.error(`[x] Erro translated article ${JSON.stringify(jsonBody)}`);
        res.send(error);
    }
});


module.exports = router;
