const { expect } = require('chai');

const { Champollion } = require('@igeg/champollion');

const YtEmbedParser =
    require('../../../app/translator/parsers/yt-embed-parser');

let ytVideo = {
    html: `
    <div class="youtube componente_materia">
        <object height="240" width="320">
            <param name="movie" value="http://www.youtube.com/v/BPz5jxUopqQ" />
            <param name="allowFullScreen" value="true" />
            <param name="allowscriptaccess" value="always" />
            <embed allowfullscreen="true" allowscriptaccess="always"
            height="240" src="http://www.youtube.com/v/BPz5jxUopqQ"
            type="application/x-shockwave-flash" width="320"></embed>
        </object>
    </div>
    `,
    json: [
        {
            'type': 'IFRAME',
            'meta': {
                'src': 'http://www.youtube.com/v/BPz5jxUopqQ',
                'height': 240,
                'width': 320
            }
        }
    ]
};

let randomObject = {
    html: `
    <div class="youtube componente_materia">
        <object height="240" width="320">
            <param name="movie" value="http://www.randomObject.com/v/BPz5jxUopqQ" />
            <param name="allowFullScreen" value="true" />
            <param name="allowscriptaccess" value="always" />
            <embed allowfullscreen="true" allowscriptaccess="always"
            height="240" src="http://www.randomObject.com/v/BPz5jxUopqQ"
            type="application/x-shockwave-flash" width="320"></embed>
        </object>
    </div>
    `,
    json: []
};

let iframeEmbed = {
    html: `
    <div class="youtube componente_materia">
        <iframe allowfullscreen="true" allowtransparency="true"
        frameborder="0" height="308" scrolling="no" src="http://fakesite.com"
            style="border:none;overflow:hidden" width="560">
        </iframe>
    </div>
    `,
    json: [
        {
            'type': 'IFRAME',
            'meta': {
                'src': 'http://fakesite.com',
                'height': 308,
                'width': 560
            }
        }
    ]
};

let iframeNoSrc = {
    html: `
    <div class="youtube componente_materia">
        <iframe allowfullscreen="true" allowtransparency="true"
        frameborder="0" height="308" scrolling="no" style="border:none;overflow:hidden" width="560">
        </iframe>
    </div>
    `,
    json: []
};

let iframeNoSrc2 = {
    html: `
    <div class="youtube componente_materia">
        <iframe allowfullscreen="true" allowtransparency="true"
        frameborder="0" height="308" scrolling="no" style="border:none;overflow:hidden" src="" width="560">
        </iframe>
    </div>
    `,
    json: []
};


let ytEmbedVideoNode = {
    name: 'div',
    type: 'tag',
    attribs: {
        class: 'youtube componente_materia'
    },
    children: [{
        name: 'object',
        type: 'tag',
        attribs: {
            height: '240',
            width: '320'
        },
        children: [{
            name: 'param',
            type: 'tag',
            attribs: {
                name: 'movie',
                value: 'http://www.youtube.com/v/BPz5jxUopqQ'
            }
        }]
    }]
};

let ytEmbedIframeNode = {
    name: 'div',
    type: 'tag',
    attribs: {
        class: 'youtube componente_materia'
    },
    children: [{
        name: 'iframe',
        type: 'tag',
        attribs: {
            src: 'http://fakesite.com',
            style: 'border:none;overflow:hidden',
            width: '560',
            height: '308'
        }
    }]
};

// error
// see https://infoglobo.atlassian.net/browse/NPD1-2186
let ytEmbedInstagram = {
    html: `
    <div class="youtube componente_materia">
        <blockquote class="instagram-media" data-instgrm-captioned="" data-instgrm-permalink="https://www.instagram.com/p/BezcvpzAgYI/"
            data-instgrm-version="8" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
            <div style="padding:8px;">
                <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;">
                    <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;">&nbsp;</div>
                </div>
                <p style=" margin:8px 0 0 0; padding:0 4px;">
                    <a href="https://www.instagram.com/p/BezcvpzAgYI/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;"
                        target="_blank">Starman in Red Roadster</a>
                </p>
                <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">Uma publica&ccedil;&atilde;o compartilhada por
                    <a href="https://www.instagram.com/elonmusk/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;"
                        target="_blank"> Elon Musk</a> (@elonmusk) em</p>
                <time datetime="2018-02-05T05:50:31+00:00" style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;">4 de Fev, 2018 &agrave;s 9:50 PST</time>
            </div>
        </blockquote>
        <script async defer src="//www.instagram.com/embed.js"></script>
    </div>
    `,
    json: []
};

const copy = o => JSON.parse(JSON.stringify(o));

function assertEquality(config) {
    let champollion = new Champollion(new YtEmbedParser());
    let parsed = champollion.parseHTML(config.html, config.id);
    expect(parsed).to.deep.equal(config.json);
}

describe('YtEmbedParser', () => {

    let ytEmbedParser = new YtEmbedParser();

    describe('#getObject(node)', () => {
        it('should return an embed\'s "object" tag node', () => {
            expect(
                ytEmbedParser.getObject(ytEmbedVideoNode)
            ).to.be.deep.equal(ytEmbedVideoNode.children[0]);
        });
        it('should return undefined', () => {
            expect(
                ytEmbedParser.getObject(ytEmbedVideoNode.children[0])
            ).to.be.undefined;
        });
        it('should return undefined', () => {
            expect(
                ytEmbedParser.getObject({})
            ).to.be.undefined;
        });
    });

    describe('#getMovie(node)', () => {
        it('should return an embed\'s "object/param[name=movie]" tag node', () => {
            expect(
                ytEmbedParser.getMovie(ytEmbedVideoNode.children[0])
            ).to.be.deep.equal(ytEmbedVideoNode.children[0].children[0]);
        });
        it('should return undefined', () => {
            expect(
                ytEmbedParser.getMovie(ytEmbedVideoNode)
            ).to.be.undefined;
        });
        it('should return undefined', () => {
            expect(
                ytEmbedParser.getMovie({})
            ).to.be.undefined;
        });
    });

    describe('#getIframe(node)', () => {
        it('should return an embed\'s "iframe" tag node', () => {
            expect(
                ytEmbedParser.getIframe(ytEmbedIframeNode)
            ).to.be.deep.equal(ytEmbedIframeNode.children[0]);
        });
        it('should return undefined', () => {
            expect(
                ytEmbedParser.getIframe(ytEmbedIframeNode.children[0])
            ).to.be.undefined;
        });
        it('should return undefined', () => {
            expect(
                ytEmbedParser.getIframe({})
            ).to.be.undefined;
        });
    });

    describe('#dealsWith(node)', () => {
        it('should deal with youtube embed', () => {
            expect(ytEmbedParser.dealsWith(ytEmbedVideoNode)).to.be.true;
        });
        it('should deal with iframe embed', () => {
            expect(ytEmbedParser.dealsWith(ytEmbedIframeNode)).to.be.true;
        });
        it('should not deal with non-youtube markup', () => {
            let node = {
                name: 'div',
                type: 'tag',
                attribs: {
                    class: 'xpto componente_materia'
                }
            };
            expect(ytEmbedParser.dealsWith(node)).to.be.false;
        });
    });

    describe('#getMeta(node)', () => {
        it('should return src, width and height for youtube object', () => {
            let meta = {
                'src': 'http://www.youtube.com/v/BPz5jxUopqQ',
                'height': 240,
                'width': 320
            };
            expect(ytEmbedParser.getMeta(ytEmbedVideoNode.children[0]))
                .to.deep.equal(meta);
        });
        it('should return src, width for youtube object without height', () => {
            let meta = {
                'src': 'http://www.youtube.com/v/BPz5jxUopqQ',
                'width': 320
            };
            let broken = copy(ytEmbedVideoNode.children[0]);
            delete broken.attribs.height;

            expect(ytEmbedParser.getMeta(broken))
                .to.deep.equal(meta);
        });
        it('should return src, height for youtube object without width', () => {
            let meta = {
                'src': 'http://www.youtube.com/v/BPz5jxUopqQ',
                'height': 240,
            };
            let broken = copy(ytEmbedVideoNode.children[0]);
            delete broken.attribs.width;

            expect(ytEmbedParser.getMeta(broken))
                .to.deep.equal(meta);
        });
        it('should return src, width and height for iframe', () => {
            let meta = {
                src: 'http://fakesite.com',
                width: 560,
                height: 308
            };
            expect(ytEmbedParser.getMeta(ytEmbedIframeNode.children[0]))
                .to.deep.equal(meta);
        });
    });

    describe('#parse(node)', () => {
        it('should parse embeded youtube video', () => {
            assertEquality(ytVideo);
        });
        it('should parse embeded iframe', () => {
            assertEquality(iframeEmbed);
        });
        it('should return empty for iframe without src attribute', () => {
            assertEquality(iframeNoSrc);
            assertEquality(iframeNoSrc2);
        });
        it('should return empty array if not iframe or youtube video', () => {
            assertEquality(ytEmbedInstagram);
        });
        it('should return empty for non-youtube object', () => {
            assertEquality(randomObject);
        });
    });

});