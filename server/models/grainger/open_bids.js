const db = require('../../database');

class OpenBids {
  static retreiveAll (page, callback) {
    let submitted = 'Submitted';
    let yellow = '';
    let itemsPerPage = 20;
    let offset = 20;
    let dataSet = ((page - 1) * itemsPerPage);
    db.query('SELECT * FROM grainger_tracker WHERE (status = ($1) or status = ($2)) ORDER by id LIMIT ($3) OFFSET ($4) ',[submitted, yellow, itemsPerPage, dataSet],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getSingleId (id,callback) {
    db.query('SELECT * FROM grainger_tracker WHERE id=($1) ',[id],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getLastQuote (callback) {
    let limit = 1;
    db.query('SELECT quote FROM grainger_tracker ORDER by id DESC limit ($1)',[limit],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getCount (callback) {
    let submitted = 'Submitted';
    let yellow = '';
    db.query('SELECT COUNT(*) FROM grainger_tracker WHERE (status = ($1) or status = ($2)) ',[yellow, submitted],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (data, callback) {
    console.log("Data:", data);
    if (typeof data.employee.label !== "undefined") {
      var employee = null;
    } else {
      var employee = data.employee.label.toUpperCase();
    }
    db.query('INSERT INTO grainger_tracker (quote, agency, solicitation, revision, point_of_contact, employee, received_date, description, status, due_date, due_time, date_sent, date_po_received) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',
    [data.quote, data.agency.label, data.solicitation, data.revision.label, data.poc.label, employee, data.received, data.description, data.status.label, data.dueDate, data.dueTime, data.dateSent, data.datePO], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static openQuotes (days, callback) {
    db.query('SELECT * FROM grainger_tracker WHERE due_date >= current_date order by due_date',[],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static editQuote (data, callback) {
    db.query('UPDATE grainger_tracker SET invoice=$1, agency=$2, solicitation=$3, point_of_contact=$4, employee=$5 WHERE quote=($6)',
    [data.invoice, data.agency, data.solicitation, data.poc, data.employee, data.quote], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = OpenBids;
