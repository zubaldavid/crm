var express = require('express');
var AwardedBids = require('../../models/quote/awarded_bids');
var router = express.Router();

// Get all awarded quotes from the the database by page.
router.get('/', async function(req, res) {
  let page = req.query.page;
  AwardedBids.retreiveAll(page, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

// Get count of all awarded files for pagination
router.get('/count', async function(req, res) {
  AwardedBids.getCount(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
