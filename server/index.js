//const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
// var bcrypt = require('bcryptjs');
// var saltRounds = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", saltRounds);

var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

// Register created API's
app.use('/api/quote/open_bids', require('./api/quote/open_bids'));
app.use('/api/quote/awarded_bids', require('./api/quote/awarded_bids'));

app.use('/api/users', require('./api/users'));
app.use('/api/dashBoard', require('./api/dashboard'));

// Expres will listen to the port and handle the request
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
