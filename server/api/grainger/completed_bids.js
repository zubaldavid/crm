var express = require('express');
var CompletedBids = require('../../models/grainger/completed_bids');
var router = express.Router();

// Get all awarded graingers from the the database by page.
router.get('/', async function(req, res) {
  let page = req.query.page;
  CompletedBids.retreiveAll(page, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

// Get count of all awarded files for pagination
router.get('/count', async function(req, res) {
  CompletedBids.getCount(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/profit', async function(req, res) {
  CompletedBids.getProfit(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/margin', async function(req, res) {
  CompletedBids.getAvgMargin(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
