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
        const searchId = id;
        const loopNum = 16;
        let image = [];
        let count = 0;
        let maxId;
        let params = {
            screen_name: searchId,
            count: 200,
            max_id: maxId,
            include_rts: false
        };

        let interval = setInterval(() => {
            client.get('statuses/user_timeline', params, (err, tweets, res) => {
                if (!err) {
                    params.max_id = tweetPush(image, tweets);
                    count++;
                    if (params.max_id === null) {
                        count = loopNum;
                    }
                }
            });
            if (count === loopNum) {
                resolve(image);
                clearInterval(interval);
            }
        }, 1000);
    });
};