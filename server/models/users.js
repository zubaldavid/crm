const db = require('../database');

class Users {
  static retreiveAll (callback) {
    db.query('SELECT * from users', function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (first, last, email, password, callback) {
    db.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', [first, last, email, password], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Users;
