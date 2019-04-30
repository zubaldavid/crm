//const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//const expressSession = require('express-session');
const passport = require('passport-local');

var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(expressValidator());
//app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));

// Register created API's
app.use('/api/quote/awarded_bids', require('./api/quote/awarded_bids'));
app.use('/api/quote/billed_bids', require('./api/quote/billed_bids'));
app.use('/api/quote/completed_bids', require('./api/quote/completed_bids'));
app.use('/api/quote/dead_bids', require('./api/quote/dead_bids'));
app.use('/api/quote/open_bids', require('./api/quote/open_bids'));
app.use('/api/quote/payments', require('./api/quote/payments'));
app.use('/api/quote/ss_bids', require('./api/quote/ss_bids'));

app.use('/api/users', require('./api/users'));
//app.use('/api/logs', require('./api/logs'));
app.use('/api/dashBoard', require('./api/dashboard'));
app.use('/api/dropdowns', require('./api/dropdowns'));

// Builds project when in production
// if (ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
//   app.use(req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   }
// }

// Express will listen to the port and handle the request
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// Confirms that database is connectd
db.query('SELECT NOW()', (err, res) => {
  if(err.error)
    return console.log(err.error);
  console.log(`PostgreSQL connected: ${res[0].now}`); // Timestamp when connected
});

module.exports = app;
