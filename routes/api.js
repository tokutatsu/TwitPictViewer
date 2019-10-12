const express = require('express');
const api = express.Router();
const imageCollector = require('./api/imageCollector.js');

api.get('/get_images', (req, res) => {
    let data = {
        images: null,
        error: null
    };
    imageCollector(req.query.id).then((images) => {
        data.images = images;
        res.send(JSON.stringify(data));
    }).catch((error) => {
        data.error = error[0];  // エラーが配列に入っているのでオブジェクトのみを取り出す
        res.send(JSON.stringify(data));
    });
});

module.exports = api;