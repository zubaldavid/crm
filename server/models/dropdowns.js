const db = require('../database');

class DropDowns {
  static retreiveAll(callback) {
    let limit = 50;
    db.query('SELECT * from dropdowns limit ($1)',[limit], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}
module.exports = DropDowns;
