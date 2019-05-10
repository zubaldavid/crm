const db = require('../../database');

class AwardedBids {
  static retreiveAll (page, callback) {
    let awarded = 'Awarded';
    let itemsPerPage = 20;
    let offset = 20;
    let dataSet = ((page - 1) * itemsPerPage);
    db.query('SELECT * FROM grainger_tracker WHERE status = ($1) and date_billing is null ORDER BY invoice ASC LIMIT ($2) OFFSET ($3) ',[awarded, itemsPerPage, dataSet],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getCount (callback) {
    let awarded = 'Awarded';
    db.query('SELECT COUNT(*) FROM grainger_tracker WHERE status = ($1) and date_billing is null ', [awarded], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = AwardedBids;
