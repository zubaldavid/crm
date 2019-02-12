var express = require('express');
var DashBoard = require('../models/dashboard');
var router = express.Router();

// Get all number of quotes from the the database by page.
router.get('/', async function(req, res) {
  DashBoard.retreiveAll(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
