var express = require('express');
var OpenBids=require('../../models/quote/open_bids');
var router = express.Router();

// Get all quotes submitted quotes from the the database by page.
router.get('/', async function(req, res) {
  let page = req.query.page;
  OpenBids.retreiveAll(page, function(err, result) {
    if(err)
      return res.json(err);
    //send users list or table
    return res.json(result);
  });
});

// Gets a single bid by sending param id
router.get('/id', async function(req, res) {
  let id = req.query.id;
  OpenBids.getSingleId(id, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

// Get last quote to make a new quote number
router.get('/quote', async function(req, res) {
  OpenBids.getLastQuote(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

// Get count of all submitted files for pagination
router.get('/count', async function(req, res) {
  OpenBids.getCount(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/awards', async function(req, res) {
  OpenBids.getCount(function(err, result) {
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
