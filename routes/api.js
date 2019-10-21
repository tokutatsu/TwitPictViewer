const express = require('express');
const api = express.Router();
const imageCollector = require('./api/imageCollector.js');

api.get('/get_images', (req, res) => {
    let data = {
        images: null,
        error: {
            code: null
        }
    };
    imageCollector(req.query.id).then((images) => {
        data.images = images;
        res.send(JSON.stringify(data));
    }).catch((error) => {
        if (typeof error[0] === 'undefined') {
            // HTTPステータスコードでエラーが出ているときの例外処理
            data.error.code = -1  // 現状エラーコードを-1にしているが可能であればHTTPステータスコードを代入するのが好ましい
        } else {
            // Twitter APIがエラーメッセージを返す時のエラー抽出
            data.error = error[0];  // エラーが配列に入っているのでオブジェクトのみを取り出す
        }
        res.send(JSON.stringify(data));
    });
});

module.exports = api;