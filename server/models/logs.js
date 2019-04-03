const db = require('../database');

class Logs {
  static retreiveAll (callback) {
    db.query('SELECT * from appLogs', function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (action, date, name, callback) {
    db.query('INSERT INTO appLogs (user, action, actionDate) VALUES ($1, $2, $3)', [name, action, date], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    })
  }

}

module.exports = Logs;
