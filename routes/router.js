const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/viewer', (req, res) => {
    res.render('viewer', {
        id: req.body.id
    });
});

module.exports = router;