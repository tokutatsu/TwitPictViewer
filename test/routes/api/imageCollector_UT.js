const assert = require('assert').strict;
const imageCollector = require('../../../routes/api/imageCollector.js');

describe('imageCollectorのテスト', () => {
    const test = imageCollector('tokutatsu1010');

    it('配列がURLか空かどうか', (done) => {
        test.then((images) => {
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