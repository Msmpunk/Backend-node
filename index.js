const express = require('express'),
    app = express(),
    port = process.env.PORT || 4040,
    mongoose = require('mongoose'),
    User = require('./api/models/users'),
    Login = require('./api/models/login'),
    bodyParser = require('body-parser')
    api_routes = require('./api/routes/routes'),
    session = require('express-session');

// mongoose instance connection url connection




mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/energru');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
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
