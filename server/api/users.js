var express = require('express');
var Users = require('../models/users');

var router = express.Router();

router.get('/', function(req, res) {
  Users.retreiveAll(function(err, users) {
    if(err)
      return res.json(err);
    return res.json(users);
  });
});

router.post('/', function (req, res) {
  var first_name  = req.body.first_name; // change this based on user table

  Users.insert(first_name, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
