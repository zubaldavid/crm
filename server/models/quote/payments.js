const db = require('../../database');


class Payments {
  static getPayments(invoice,callback) {
    db.query('SELECT * FROM quote_payments WHERE invoice=($1)',[invoice],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static postNewPayment(invoice, vendor, ordered, delivered,
    payment, status, subtotal, shipping, taxes, total, comments, callback) {
    db.query('INSERT INTO quote_payments (invoice, vendor, date_ordered, date_delivered, subtotal, shipping, taxes, total, payment_method, status, comment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
    [invoice, vendor, ordered, delivered, subtotal, shipping, taxes, total, payment, status, comments],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

}

module.exports = Payments;
