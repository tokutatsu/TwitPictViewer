const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/viewer', (req, res) => {
    res.render('viewer', {
        id: req.query.id
    });
});

module.exports = router;