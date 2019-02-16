const db = require('../../database');

class Payments {
  static getPayments(invoice,callback) {
    db.query('SELECT * FROM quote_payments WHERE invoice=($1)',[invoice],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Payments;
