const assert = require('assert').strict;
const imageCollector = require('../../../routes/api/imageCollector.js');

describe('imageCollectorのテスト', () => {
    const test = imageCollector('id');

    it('配列がURLか空かどうか', (done) => {
        test.then((image) => {
            if (image.length == 0) {
                assert.ok(true);
            } else {
                let okCount = 0;
                for (const list of image) {
                    if (RegExp('http://').test(list)) {
                        okCount++;
                    }
                }
                assert.equal(okCount, image.length);
            }
            done();
        }).catch((err) => {
            done(err);
        });
    });
});