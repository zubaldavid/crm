var express = require('express');
var DropDowns = require('../models/dropdowns');
var router = express.Router();

router.get('/agencies', async function(req, res) { // request and response object
  DropDowns.retreiveAgencies(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result); //send users list or table
  });
});

router.get('/poc', async function(req, res) { // request and response object
  DropDowns.retreiveContacts(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result); //send users list or table
  });
});

router.get('/vendors', async function(req, res) { // request and response object
  DropDowns.retreiveVendors(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result); //send users list or table
  });
});

module.exports = router;
