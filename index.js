const express = require('express'),
    app = express(),
    port = process.env.PORT || 4040,
    mongoose = require('mongoose'),
    User = require('./api/models/users'),
    bodyParser = require('body-parser')
    api_routes = require('./api/routes/routes'),
    session = require('express-session');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/energru');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

app.use('/api/v1',api_routes);



app.listen(port);

app.use((req, res) => {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
});

console.log('<-------------- REST-full API server started on: ' + port + ' -------------->' );
