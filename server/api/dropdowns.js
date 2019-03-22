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

router.post('/postAgency', function (req, res) {
  let agency = req.body.newAgency; // from client
  console.log("Api Agnecy:", agency);
  console.log("We made it to the api!");
  DropDowns.insertAgency(agency, function(err, result) { // insert into datbase
    if(err)
      return res.json(err); // response to front end
    return res.json(result);
  })
});

router.post('/postPOC', function (req, res) {
  var poc  = req.body.newPOC; // from client
  DropDowns.insertPOC(poc, function(err, result) { // insert into datbase
    if(err)
      return res.json(err); // response to front end
    return res.json(result);
  })
});

module.exports = router;
