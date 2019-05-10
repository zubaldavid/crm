const db = require('../../database');

class Payments {

  static getAllPayments (page, callback) {
    let itemsPerPage = 15;
    let offset = itemsPerPage;
    let dataSet = ((page - 1) * itemsPerPage);
    db.query('SELECT *, (SELECT COUNT(*) from grainger_payments) as count from grainger_payments ORDER by id LIMIT ($1) OFFSET ($2) ',[itemsPerPage, dataSet], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static searchValue (value, page, callback) {
    let itemsPerPage = 15;
    let offset = itemsPerPage;
    let dataSet = ((page - 1) * itemsPerPage);
    console.log("what is Value in model", value);
    let searchValue = '%' + value + '%';
    console.log("what is Value in model", searchValue);
    db.query(`SELECT *, (SELECT COUNT(id) from grainger_payments WHERE invoice like $1) as count from grainger_payments WHERE invoice like $1 ORDER by id LIMIT $2 OFFSET $3`,[searchValue,itemsPerPage, dataSet], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static searchAllPayments (inv, page, callback) {
    let itemsPerPage = 15;
    let offset = itemsPerPage;
    let dataSet = ((page - 1) * itemsPerPage);
    db.query('SELECT * from grainger_payments where invoice like `%inv%`) ORDER by id LIMIT $1 OFFSET $3 ',[itemsPerPage, dataSet], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getCount (callback) {
    db.query('SELECT COUNT(*) FROM grainger_payments',  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getPaymentsByInvoice (invoice,callback) {
    db.query('SELECT * FROM grainger_payments WHERE invoice=($1)',[invoice],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getPaymentsTotal(invoice,callback) {
    db.query('SELECT SUM(total) FROM grainger_payments WHERE invoice=($1)',[invoice],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static postNewPayment(data, callback) {
    console.log("Payment Data:", data);
    db.query('INSERT INTO grainger_payments (invoice, vendor, date_ordered, date_delivered, subtotal, shipping, taxes, total, payment_method, status, comment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
    [data.invoice, data.vendor, data.ordered, data.delivered, data.subtotal, data.shipping, data.taxes, data.total, data.payment, data.status, data.comments],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

}

module.exports = Payments;
