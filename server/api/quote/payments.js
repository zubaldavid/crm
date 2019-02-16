var express = require('express');
var Payments = require('../../models/quote/payments');
var router = express.Router();

// Get all payments linked to invoice.
router.get('/', async function(req, res) {
  let invoice = req.query.invoice;
  Payments.getPayments(invoice, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
