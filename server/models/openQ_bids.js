const db = require('../database');

class OpenBids {
  static retreiveAll (page, callback) {
    let blue = 'Blue';
    let yellow = '';
    let itemsPerPage = 20;
    let offset = 25;
    let dataSet = ((page - 1) * itemsPerPage);
    db.query('SELECT * FROM quote_tracker WHERE (status = ($1) or status = ($2)) LIMIT ($3) OFFSET ($4) ',[blue, yellow, itemsPerPage, dataSet],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getSingleId (id,callback) {
    db.query('SELECT * FROM quote_tracker WHERE id=($1) ',[id],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (first, callback) {
    db.query('INSERT INTO quote_tracker VALUES ($1)', [first], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static edit (id, callback) {
    db.query('SELECT * FROM quote_tracker WHERE id=($1)', [id], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

}

module.exports = OpenBids;
