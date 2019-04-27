const db = require('../../database');


class Payments {
  static getPayments(invoice,callback) {
    db.query('SELECT * FROM quote_payments WHERE invoice=($1)',[invoice],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getPaymentsTotal(invoice,callback) {
    db.query('SELECT SUM(total) FROM quote_payments WHERE invoice=($1)',[invoice],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static postNewPayment(data, callback) {
    console.log("Payment Data:", data);
    db.query('INSERT INTO quote_payments (invoice, vendor, date_ordered, date_delivered, subtotal, shipping, taxes, total, payment_method, status, comment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
    [data.invoice, data.vendor, data.ordered, data.delivered, data.subtotal, data.shipping, data.taxes, data.total, data.payment, data.status, data.comments],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

}

module.exports = Payments;
