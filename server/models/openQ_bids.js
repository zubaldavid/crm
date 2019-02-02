const db = require('../database');

class OpenBids {
  static retreiveAll (callback) {
    var name = 'DAVID';
    var month  = 'MM';
    db.query('SELECT * from quote_tracker WHERE employee = ($1)',[name],  function (err,res) {
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

module.exports = OpenBids;
