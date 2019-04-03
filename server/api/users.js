var express = require('express');
var Users = require('../models/users');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 8;

router.get('/', async function(req, res) { // request and response object
  Users.retreiveAll(function(err, users) {
    if(err)
      return res.json(err);
    return res.json(users); //send users list or table
  });
});

router.get('/quoters', async function(req, res) { // request and response object
  Users.getQuoters(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result); //send users list or table
  });
});

// --------------
router.get('/user', async function(req, res) { // request and response object
  let id = req.query.id;
  Users.getUser(id, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result); //send users list or table
  });
});

passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));
// --------------

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  // req.checkBody('email', 'First Name field cannot be empty.').notEmpty();
  // req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  // req.checkBody('password', 'Please enter in a password.').notEmpty();

router.post('/login', async function(req, res, next) { // request and response object

  if(validUser(req.body)) {
    // Check to see if in db
    Users.getUserLogin(email, function(err, result) {
      if(err)
      return res.json(err);
      return res.json(result); //send users list or table
    })
    .then(user => {
      console.log('user', user);
      res.json ({
        message: 'Logging in ...'
      });
    });

  } else {
    next(new Error('Invalid Login'));
  }
  var email = req.body.email;
  var password = req.body.password;

});

router.post('/', function (req, res) {
  req.checkBody('newFirst', 'First Name field cannot be empty.').notEmpty();
  req.checkBody('newLast', 'Last Name field cannot be empty.').notEmpty();
  req.checkBody('newEmail', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('newEmail', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  req.checkBody('password', 'Password must be between 8-30 characters long.').len(8, 30);
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").
  matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");

  if (errors) {
    res.render('AddNewUser', {
       errors: errors
    });
    throw new Error(errors);
  }

  var first  = req.body.newFirst; // from client
  var last =  req.body.newLast;
  var email =  req.body.newEmail;
  var password =  req.body.newPassword;
  var grainger = req.body.grainger;
  var quoter =  req.body.quoter;
  var admin = req.body.admin;
  var active = req.body.active;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    Users.insert(first, last, email, hash, grainger, quoter, admin, active, function(err, result) { // insert into datbase
      if(err)
        return res.json(err); // response to front end
      return res.json(result);
    })
  });
});

function validUser (user) {
  const validEmail = typeof  user.email == 'string' &&
                      user.email.trim()!= '';
  const validPassword = typeof user.password == 'string' &&
                        user.password.trim() != '';

  return validUser && validPassword;
}

module.exports = router;
