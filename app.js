const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', require('./routes/router.js'));

app.listen(3000, () => {
    console.log('listen port: 3000');
});