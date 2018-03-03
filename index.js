const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/users_model'),
    Login = require('./api/models/login'),
    bodyParser = require('body-parser')
    api_routes = require('./api/routes/users_routes'),
    session = require('express-session');

// mongoose instance connection url connection

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/energru');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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

console.log('-------------- REST-full API server started on: ' + port + ' --------------' );
