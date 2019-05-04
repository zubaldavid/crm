const db = require('../database');
const saltRounds = 8;
const bcrypt = require('bcrypt');

class Users {
  static retreiveAll (page, callback) {
    let itemsPerPage = 15;
    let offset = itemsPerPage;
    let dataSet = ((page - 1) * itemsPerPage);
    db.query('SELECT * from users ORDER by id LIMIT ($1) OFFSET ($2) ',[itemsPerPage, dataSet], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getQuoters (callback) {
    var trueToken = 'true';
    db.query('SELECT first_name from users WHERE quoter=($1)', [trueToken], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getUser (id,callback) {
    db.query('SELECT * from users WHERE id=($1)', [id], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getCount (callback) {
    db.query('SELECT COUNT(*) FROM users',  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getAllEmails (callback) {
    db.query('SELECT email FROM users',  function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static UserReset (data, callback) {
  bcrypt.hash( data.password, saltRounds, function(err, hash) {
    db.query('UPDATE users SET password=($1) WHERE email=($2)', [hash, data.email], function (err,res) {
      if(err.error)
        return callback(err);
    });
    callback(res);
  })
}

  static getUserForAuth (email, callback) {
    db.query('SELECT id from users WHERE email=($1)', [email], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }


  static login (data, callback) {
    db.query('SELECT password from users WHERE email=($1)', [data.email], function (err,res) {
        if(err.error)
          return callback(err);
        callback(res);
    });
  }



  static insert (hash, data, callback) {
    console.log(data);
    db.query('INSERT INTO users (first_name, last_name, email, password, grainger_access, quoter, admin, active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [data.newFirst, data.newLast, data.newEmail, hash, data.grainger, data.quoter, data.admin, data.active], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    })
  }

  static remove (id, callback) {
    db.query('DELETE FROM users WHERE (id)=($1)', [id], function (err,res) {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Users;
