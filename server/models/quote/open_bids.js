const db = require('../../database');

class OpenBids {
  static retreiveAll (page, callback) {
    let submitted = 'Submitted';
    let yellow = '';
    let itemsPerPage = 20;
    let offset = 20;
    let dataSet = ((page - 1) * itemsPerPage);
    db.query('SELECT * FROM quote_tracker WHERE (status = ($1) or status = ($2)) LIMIT ($3) OFFSET ($4) ',[submitted, yellow, itemsPerPage, dataSet],  function (err,res) {
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

  static getLastQuote (callback) {
    let limit = 1;
    db.query('SELECT quote FROM quote_tracker ORDER by id DESC limit ($1)',[limit],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getCount (callback) {
    let submitted = 'Submitted';
    let yellow = '';
    db.query('SELECT COUNT(*) FROM quote_tracker WHERE (status = ($1) or status = ($2)) ',[yellow, submitted],  function (err,res) {
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
