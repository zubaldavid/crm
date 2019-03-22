const db = require('../database');

class Logs {

  static insert (action, date, name, callback) {
   console.log(first + "-" + last);
    db.query('INSERT INTO a (user, action, actionDate) VALUES ($1, $2, $3)', [name, action, date], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    })
  }

}

module.exports = Logs;
