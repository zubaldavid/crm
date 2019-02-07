var express = require('express');
var OpenBids = require('../models/openQ_bids');
var router = express.Router();

router.get('/', async function(req, res) { // request and response object
  let page = req.query.page;
  OpenBids.retreiveAll(page, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result); //send users list or table
  });
});

router.get('/id', async function(req, res) {
  let id = req.query.id;
  OpenBids.getSingleId(id, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/', function (req, res) {
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

router.put('/', function (req, res) {
  var id = req.body.id;
  Users.edit(id, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
