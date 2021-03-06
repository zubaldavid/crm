var express = require('express');
var SourcesSought =require('../../models/grainger/ss_bids');
var router = express.Router();

// Get all quotes dead quotes from the the database by page.
router.get('/', async function(req, res) {
  let page = req.query.page;
  SourcesSought.retreiveAll(page, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

// Get count of all dead files for pagination
router.get('/count', async function(req, res) {
  SourcesSought.getCount(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
