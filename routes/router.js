const express = require('express');
const router = express.Router();
const imageCollector = require('./api/imageCollector.js');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/viewer', (req, res) => {
    imageCollector(req.query.id).then((images) => {
        res.render('viewer', {
            id: req.query.id,
            images: images
        });
    });
});

module.exports = router;