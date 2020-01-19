const twitter = require('twitter');
const client = new twitter(require('../token.json'));
const Long = require('long');

const tweetPush = (images, tweets) => {
    let minId;
    for (let tweet of tweets) {
        if (tweet.extended_entities) {
            for (let media of tweet.extended_entities.media) {
                images.push(media.media_url);
            }
        }
        minId = tweet.id_str;
    }
    if (typeof minId === 'undefined') {
        return null;
    }
    return Long.fromString(minId).subtract(1).toString();
};

module.exports.collectImage = (id) => {
    return new Promise((resolve, reject) => {
        const loopNum = 16;
        let images = [];
        let count = 0;
        let beforeId;
        let params = {
            screen_name: id,
            count: 200,
            include_rts: false
        };

        // 1回目だけparam.max_idが'undefined'なので別処理
        client.get('statuses/user_timeline', params, (error, tweets, res) => {
            // console.log(res.statusCode);  // ステータスコードの確認
            if (res.statusCode != 200) {
                reject(res.statusCode);
            }
            if (!error) {
                params.max_id = tweetPush(images, tweets);
                count++;
                if (params.max_id === null) {
                    count = loopNum;
                }
            } else {
                // console.log(error);  // エラーハンドリング用の出力
                reject(error);
            }
        });

        let interval = setInterval(() => {
            if (count === loopNum) {
                resolve(images);
                clearInterval(interval);
            }
            if (params.max_id !== beforeId) {
                beforeId = params.max_id;
                client.get('statuses/user_timeline', params, (errors, tweets, res) => {
                    // console.log(res.statusCode);  // ステータスコードの確認
                    if (res.statusCode != 200) {
                        reject(res.statusCode);
                    }
                    if (!errors) {
                        params.max_id = tweetPush(images, tweets);
                        count++;
                        if (params.max_id === null) {
                            count = loopNum;
                        }
                    } else {
                        // console.log(error);  // エラーハンドリング用の出力
                        reject(errors[0].code);
                    }
                });
            }
        }, 1);
    });
};