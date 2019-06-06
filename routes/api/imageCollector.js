const twitter = require('twitter');
const client = new twitter(require('../../token.json'));

const tweetPush = (image, tweets) => {
    for (let tweet of tweets) {
        if (tweet.extended_entities) {
            for (let media of tweet.extended_entities.media) {
                image.push(media.media_url);
            }
        }
    }
};

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        let image = [];
        let count = 0;
        let maxId;
        let params = {
            screen_name: id,
            count: 200,
            max_id: maxId,
            include_rts: false
        };

        let interval = setInterval(() => {
            client.get('statuses/user_timeline', params, (err, tweets, res) => {
                if (!err) {
                    tweetPush(image, tweets);
                    params.max_id = tweets[tweets.length - 1].id - 1;
                }
                count++;
            });
            setTimeout(() => {
                if (count == 16) {
                    resolve(image);
                    clearInterval(interval);
                }
            }, 1000);
        }, 1000);
    });
};