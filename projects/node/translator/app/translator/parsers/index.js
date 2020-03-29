module.exports = [
    new (require('./gallery-embed-parser')),
    new (require('./paragraph-parser')),
    new (require('./image-parser')),
    new (require('./related-content-parser')),
    new (require('./section-title-parser')),
    new (require('./yt-embed-parser')),
    new (require('./globo-video-parser')),
    new (require('./quote-parser')),
];