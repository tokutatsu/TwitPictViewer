const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes/router.js'));
app.use('/api', require('./routes/api.js'));
app.use('/public', express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let err = new Error('指定されたURLが見つかりませんでした。');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error', { error: err });
});

app.listen(PORT, () => {
    console.log("Start Server " + new Date);
    console.log("PORT " + PORT);
});
