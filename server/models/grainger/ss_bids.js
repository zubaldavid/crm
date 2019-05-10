const db = require('../../database');

class SourcesSought {
  static retreiveAll (page, callback) {
    let sources = 'Purple';
    let itemsPerPage = 20;
    let offset = 20;
    let dataSet = ((page - 1) * itemsPerPage);
    db.query('SELECT * FROM grainger_tracker WHERE status = ($1)  ORDER BY invoice ASC LIMIT ($2) OFFSET ($3) ',[sources, itemsPerPage, dataSet],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getCount (callback) {
      let sources = 'Purple';
    db.query('SELECT COUNT(*) FROM grainger_tracker WHERE status = ($1) and date_billing is null ', [sources], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = SourcesSought;
