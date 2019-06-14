const twitter = require('twitter');
const client = new twitter(require('../../token.json'));
const Long = require('long');

const tweetPush = (image, tweets) => {
    let minId;
    for (let tweet of tweets) {
        if (tweet.extended_entities) {
            for (let media of tweet.extended_entities.media) {
                image.push(media.media_url);
            }
        }
        minId = tweet.id_str;

    }
    if (typeof minId === 'undefined') {
        return null;
    }
    return Long.fromString(minId).subtract(1).toString();
};

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        const loopNum = 16;
        let image = [];
        let count = 0;
        let beforeId;
        let params = {
            screen_name: id,
            count: 200,
            include_rts: false
        };

        // 1回目だけparam.max_idが'undefined'なので別処理
        client.get('statuses/user_timeline', params, (err, tweets, res) => {
            if (!err) {
                params.max_id = tweetPush(image, tweets);
                count++;
                if (params.max_id === null) {
                    count = loopNum;
                }
            }
        });

        let interval = setInterval(() => {
            if (count === loopNum) {
                resolve(image);
                clearInterval(interval);
            }
            if (params.max_id !== beforeId) {
                beforeId = params.max_id;
                client.get('statuses/user_timeline', params, (err, tweets, res) => {
                    if (!err) {
                        params.max_id = tweetPush(image, tweets);
                        count++;
                        if (params.max_id === null) {
                            count = loopNum;
                        }
                    }
                });
            }
        }, 1);
    });
};