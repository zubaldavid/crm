const db = require('../database');

class Users {
  static retreiveAll (callback) {
    db.query('SELECT first_name from users', function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (user, callback) {
    db.query('INSERT INTO users (first_name)', [user], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Users;
