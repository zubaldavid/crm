var express = require('express');
var DashBoard = require('../models/dashboard');
var router = express.Router();

router.get('/quotes/yesterday', function(req, res) {
  DashBoard.quotesYesterday(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});


router.get('/quotes/month', function(req, res) {
  DashBoard.quotes(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/quotes/year', function(req, res) {
  var array = [];
  DashBoard.quotes(function(err, result) {
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
