const assert = require('assert').strict;
const imageCollector = require('../../services/imageCollector.js');

describe('imageCollectorのテスト', () => {
    it('配列がURLか空かどうか', (done) => {
        imageCollector.collectImage('twitter').then((images) => {
            if (images.length == 0) {
                assert.ok(true);
            } else {
                let okCount = 0;
                for (const image of images) {
                    if (RegExp('http://').test(image)) {
                        okCount++;
                    }
                }
                assert.equal(okCount, images.length);
            }
            done();
        }).catch((err) => {
            done(err);
        });
    });
});
