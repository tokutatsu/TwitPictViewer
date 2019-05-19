const twitter = require('twitter');
const client = new twitter(require('./token.json'));

module.exports = (id) => {
    let image = [];
    let maxId;
    let params = {
        screen_name: id,
        count: 200,
        max_id: maxId,
        include_rts: false
    };

    for (let i = 0; i < 16; i++) {
        client.get('statuses/user_timeline', params, (err, tweets, res) => {
            if (!err) {
                for (let tweet of tweets) {
                    if (tweet.extended_entities) {
                        for (let media of tweet.extended_entities.media) {
                            image.push(media.media_url);
                        }
                    }
                }
                params.max_id = tweets[tweets.length - 1].id;
            } else {
                return false;
            }
        });
    }

    return image;
};