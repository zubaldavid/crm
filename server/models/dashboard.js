const db = require('../database');

class OpenBids {
  static getSubmittedQuotes (callback) {
    let submitted = 'Submitted';
    db.query('SELECT COUNT(*) FROM quote_tracker WHERE (status = ($1)) ',[submitted],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}
