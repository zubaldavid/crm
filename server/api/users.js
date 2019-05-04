var express = require('express');
var Users = require('../models/users');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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

router.post('/reset', [
    check('email', 'Choose a user to reset.').not().isEmpty(),
    check('password', 'Password field cannot be empty.').not().isEmpty(),
    check('password', 'Password must be at least 8 characters long.').isLength({min:8})
    ], function (req, res) {

    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("If statemnet error:", errors.array()[0].msg);
      return res.json({ errors: errors.array() });
    }
    else {
      Users.UserReset(req.body, function(err, result) {
        if(err)
          return res.json(err);
        return res.json(result);
      });
    }
})

router.get('/emails', async function (req, res) {
  Users.getAllEmails(function(err, result) {
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


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
});


router.post('/login', [
      check('email', 'Email field cannot be empty.').not().isEmpty(),
      check('password', 'Password field cannot be empty.').not().isEmpty(),
    ], function (req, res) {

    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("If statemnet errir:", errors.array()[0].msg);
      return res.json({ errors: errors.array() });
    }
    else {
        Users.login(req.body, function(err, result) {
          if(err)
            return res.json(err);
          return res.json(result);
        })

        bcrypt.compare(req.body.password, result).then(function(res) {
            if(res == true) {
              Users.getUserForAuth(req.body, function(err, result) {
                if(err)
                  return res.json(err);
                //return res.json(result);

                console.log(result[0]);
                req.login(results[0], function(err) {
                    res.redirect('/home');
                });
              })
            }
        });
    }
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

module.exports = router;
