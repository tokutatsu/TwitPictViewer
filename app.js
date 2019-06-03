const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', require('./routes/router.js'));
app.use('/public', express.static(__dirname + '/public'));

app.listen(3000, () => {
    console.log("Start Server " + new Date);
});