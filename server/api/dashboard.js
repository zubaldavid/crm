var express = require('express');
var DashBoard = require('../models/dashboard');
var router = express.Router();

router.get('/contracts', function(req, res) {
  var days = '70';
  DashBoard.openQuotes(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/grainger', function(req, res) {
  DashBoard.openGraingerQuotes(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
