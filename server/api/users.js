var express = require('express');
var Users = require('../models/users');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 8;

router.get('/', async function(req, res) { // request and response object
  let page = req.query.page;
  Users.retreiveAll(page, function(err, users) {
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

// Get count of all submitted users for pagination
router.get('/count', async function(req, res) {
  Users.getCount(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
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

router.post('/create',  [
    check('newFirst', 'First Name field cannot be empty.').not().isEmpty(),
    check('newLast', 'Last Name field cannot be empty.').not().isEmpty(),
    check('newEmail', 'The email you entered is invalid, please try again.').isEmail(),
    check('newEmail', ' Please enter an Email address.').not().isEmpty(),
    check('newPassword', ' Please enter an password.').not().isEmpty(),
    check('newPassword', 'Password must be 8 or more characters long.').isLength({min:8})
  ], function (req, res) {

  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("If statemnet errir:", errors.array()[0].msg);
    return res.status(400).json({ errors: errors.array() });
  }
  else {
    bcrypt.hash( req.body.newPassword, saltRounds, function(err, hash) {
      Users.insert( hash, req.body, function(err, result) {
        if(err)
          return res.json(err);
        return res.json(result);
      })
    });
  }
});

function validUser (user) {
  const validEmail = typeof  user.email == 'string' &&
                      user.email.trim()!= '';
  const validPassword = typeof user.password == 'string' &&
                        user.password.trim() != '';

  return validUser && validPassword;
}

module.exports = router;
