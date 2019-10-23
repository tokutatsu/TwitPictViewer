const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/viewer', (req, res) => {
    let sanitizedId = req.body.id.replace(/</g, '&lt;').replace(/>/g, '&gt;');  // アカウントのIDをサニタイジング

    res.render('viewer', { id: sanitizedId });
});

module.exports = router;