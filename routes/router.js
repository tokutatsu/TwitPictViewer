const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/viewer', (req, res) => {
    require('./api/imageCollector.js')(req.query.id).then((image) => {
        res.render('viewer', {
            id: req.query.id,
            image: image
        });
    });
});

module.exports = router;