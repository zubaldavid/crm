const db = require('../database');

class NewQuote {
  static retreiveAll (callback) {
    db.query('SELECT first_name from users', function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (first, callback) {
    db.query('INSERT INTO users (first_name) VALUES ($1)', [first], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = NewQuote;
