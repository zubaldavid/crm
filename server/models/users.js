const db = require('../database');

class Users {
  static retreiveAll (callback) {
    db.query('SELECT * from users', function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getQuoters (callback) {
    var trueToken = 'true';
    db.query('SELECT first_name from users WHERE quoter=($1)', [trueToken], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (first, last, email, password, callback) {
     //bcrypt.hash(password, saltRounds, function(err,hash) {
      db.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', [first, last, email, password], function (err,res) {
        if(err.error)
          return callback(err);
        callback(res);
      })
    //});
  }

  static remove (id, callback) {
    db.query('DELETE FROM users WHERE (id)=($1)', [id], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Users;
