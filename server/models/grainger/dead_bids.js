const db = require('../../database');

class DeadBids {
  static retreiveAll (page, callback) {
    let dead = 'Dead';
    let itemsPerPage = 20;
    let offset = 20;
    let dataSet = ((page - 1) * itemsPerPage);
    db.query('SELECT * FROM grainger_tracker WHERE status = ($1) LIMIT ($2) OFFSET ($3) ',[dead, itemsPerPage, dataSet],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getCount (callback) {
    let dead = 'Dead';
    db.query('SELECT COUNT(*) FROM grainger_tracker WHERE status = ($1) ',[dead],  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = DeadBids;
