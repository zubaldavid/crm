const db = require('../database');

class DashBoard {

  static openQuotes (days, callback) {
    db.query('SELECT * FROM quote_tracker WHERE due_date between now() - interval $1 day and now()',[days],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

}
