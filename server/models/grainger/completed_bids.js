const db = require('../../database');

class CompletedBids {
  static retreiveAll (page, callback) {
    let itemsPerPage = 20;
    let offset = itemsPerPage;
    let dataSet = ((page - 1) * itemsPerPage);
    let sql_string = "select grainger_tracker.agency, grainger_tracker.description, grainger_tracker.employee, grainger_billing.* "
     + "from grainger_billing "
     + "inner join grainger_tracker on grainger_tracker.invoice = grainger_billing.invoice "
     + "where date_billed is not null"
     + "order by grainger_billing.invoice ASC "
     + "limit ($1) "
     + "offset ($2) ";

    db.query(sql_string, [itemsPerPage, dataSet],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getCount (callback) {
    db.query('SELECT COUNT(*) FROM grainger_billing WHERE date_billed is not null and bill_balance is null', [], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getProfit (callback) {
    db.query('SELECT sum(profit) FROM grainger_billing WHERE date_billed is not null', [], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getAvgMargin (callback) {
    db.query('SELECT avg(profit_margin) FROM grainger_billing WHERE date_billed is not null and bill_balance = ($1)', ["0"], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = CompletedBids;
