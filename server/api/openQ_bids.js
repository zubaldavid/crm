var express = require('express');
var OpenBids = require('../models/openQ_bids');
var router = express.Router();

router.get('/', function(req, res) { // request and response object

  OpenBids.retreiveAll(function(err, quotes) {
    if(err)
      return res.json(err);
    return res.json(quotes); //send users list or table
  });
});

router.post('/', function (req, res) {
  var first  = req.body.newFirst; // from client
  var last =  req.body.newLast;
  var email =  req.body.newEmail;
  var password =  req.body.newPassword;

  OpenBids.insert(first, last, email, password, function(err, result) { // insert into datbase
    if(err)
      return res.json(err); // response to front end
    return res.json(result);
  })
});

router.delete('/', function (req, res) {
  var id = req.body.id;
  Users.remove(id, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
