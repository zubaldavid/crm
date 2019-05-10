const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.set('client/src/components', path.join(__dirname, 'components'));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(expressValidator());
//app.use(session({ secret: 'acbcyu451sd', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Register created API's
app.use('/api/quote/awarded_bids', require('./api/quote/awarded_bids'));
app.use('/api/quote/billed_bids', require('./api/quote/billed_bids'));
app.use('/api/quote/completed_bids', require('./api/quote/completed_bids'));
app.use('/api/quote/dead_bids', require('./api/quote/dead_bids'));
app.use('/api/quote/open_bids', require('./api/quote/open_bids'));
app.use('/api/quote/payments', require('./api/quote/payments'));
app.use('/api/quote/ss_bids', require('./api/quote/ss_bids'));

app.use('/api/grainger/awarded_bids', require('./api/grainger/awarded_bids'));
app.use('/api/grainger/billed_bids', require('./api/grainger/billed_bids'));
app.use('/api/grainger/completed_bids', require('./api/grainger/completed_bids'));
app.use('/api/grainger/dead_bids', require('./api/grainger/dead_bids'));
app.use('/api/grainger/open_bids', require('./api/grainger/open_bids'));
app.use('/api/grainger/payments', require('./api/grainger/payments'));
app.use('/api/grainger/ss_bids', require('./api/grainger/ss_bids'));


app.use('/api/users', require('./api/users'));
app.use('/api/dashboard', require('./api/dashboard'));
app.use('/api/dropdowns', require('./api/dropdowns'));
//app.use('/api/logs', require('./api/logs'));

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
