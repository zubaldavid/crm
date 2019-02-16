var express = require('express');
var DropDowns = require('../models/dropdowns');
var router = express.Router();

router.get('/', async function(req, res) { // request and response object
  DropDowns.retreiveAll(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result); //send users list or table
  });
});

router.post('/', function (req, res) {
  OpenBids.insert( function(err, result) { // insert into datbase
    if(err)
      return res.json(err); // response to front end
    return res.json(result);
  })
});


module.exports = router;
