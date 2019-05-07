var express = require('express');
var BilledBids = require('../../models/quote/billed_bids');
var router = express.Router();

// Get all awarded quotes from the the database by page.
router.get('/', async function(req, res) {
  let page = req.query.page;
  BilledBids.retreiveAll(page, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

// Get count of all awarded files for pagination
router.get('/count', async function(req, res) {
  BilledBids.getCount(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

// Get sing bill of all awarded files for pagination
router.get('/invoice', async function(req, res) {
  let invoice = req.query.invoice;
  BilledBids.getSingleBill(invoice, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
