const db = require('../database');

class DropDowns {
  static retreiveAgencies(callback) {
    db.query('SELECT * from agency_dropdown', function (err,res) {
      if(err.error)
      return callback(err);
      callback(res);
    });
  }

  static retreiveContacts(callback) {
    db.query('SELECT * from poc_dropdown', function (err,res) {
      if(err.error)
      return callback(err);
      callback(res);
    });
  }

  static retreiveVendors(callback) {
    db.query('SELECT * from vendor_dropdown', function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}
module.exports = DropDowns;
