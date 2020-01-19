const express = require('express');
const api = express.Router();
const imageCollector = require('../services/imageCollector.js');

api.get('/get_images', (req, res) => {
    let data = {
        images: null,
        code: null
    };

    imageCollector.collectImage(req.query.id).then((images) => {
        data.images = images;
        data.code = 200;
        res.send(JSON.stringify(data));
    }).catch((errorCode) => {
        data.code = errorCode  // エラーコードを代入する
        res.send(JSON.stringify(data));
    });
});

module.exports = api;