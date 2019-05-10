const db = require('../database');

class DashBoard {

  static openQuotes (days, callback) {
    db.query('SELECT * FROM quote_tracker WHERE due_date between now() - interval $1 day and now()',[days],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static quotesYesterday (callback) {
    var array = [];
    // Takes care of intake
    db.query('SELECT count(*) FROM quote_tracker WHERE due_date = current_date-$1',['1'],  function (err,res) {
      if(err.error)
        return callback(err);
      array[0] = res;
    });
    // Takes care of submitted
    db.query('SELECT count(*) FROM quote_tracker WHERE due_date = current_date-$1 and status=$2',['1', 'Submitted'],  function (err,res) {
      if(err.error)
        return callback(err);
        console.log("Yesterday data submitted", res);
      array[1] = res;
    });
    // Takes care of awards
    db.query('SELECT count(*) FROM quote_tracker WHERE due_date = current_date-$1 and status=$2',['1', 'Awarded'],  function (err,res) {
      if(err.error)
        return callback(err);
        console.log("Yesterday data award", res);
      array[2] = res;
    });
    // Takes care of dead from yesterday
    db.query('SELECT count(*) FROM quote_tracker WHERE due_date = current_date-$1 and status=$2',['1', 'Dead'],  function (err,res) {
      if(err.error)
        return callback(err);
      console.log("Yesterday data daed", res);
      array[3] = res;
    });
    callback(array);
  }

  static quotesMonth(callback) {
    var array = [];
    db.query('SELECT count(*) FROM quote_tracker WHERE date_trunc($1,due_date) = date_trunc($1, current_date) and status=$2 ',['month', 'Submitted'],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

}
