const express = require('express');
const api = express.Router();
const imageCollector = require('./api/imageCollector.js');

api.get('/get_images', (req, res) => {
    imageCollector(req.query.id).then((images) => {
        res.send(JSON.stringify(images));
    });
});

module.exports = api;