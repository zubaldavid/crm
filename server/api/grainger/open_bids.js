var express = require('express');
var router = express.Router();
var OpenBids = require('../../models/grainger/open_bids');
const { check, validationResult } = require('express-validator/check');

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

router.get('/contracts', async function(req, res) {
  let page = '70';
  OpenBids.openQuotes(page, function(err, result) {
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

router.post('/create', [
    check('agency', 'An agency is required.').not().isEmpty(),
    check('poc', 'A point of contact is required.').not().isEmpty(),
    check('solicitation', 'Please enter a solicitation number.').not().isEmpty(),
    check('employee', 'Please choose an employee for this quote.').not().isEmpty(),
    check('description', 'Where is the description?').not().isEmpty(),
    check('received', 'Please enter a received date.').not().isEmpty(),
    check('dueDate', 'Enter a due date.').not().isEmpty(),
    check('dueTime', 'Enter a due time.').not().isEmpty(),
  ], function (req, res) {

  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  else {
    OpenBids.insert(req.body, function(err, result) {
      if(err)
        return res.json(err);
      return res.json(result);
    })
  }
});

router.put('/edit', function (req, res) {
  // Check for objects in body values
  for( var key in req.body) {
    if(typeof req.body[key] === 'object' && req.body[key] !== null) {
        var obj = req.body[key];
        req.body[key] = obj.value;
    }
  }

  OpenBids.editQuote(req.body, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
