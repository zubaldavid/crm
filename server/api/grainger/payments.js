var express = require('express');
var router = express.Router();
var Payments = require('../../models/quote/payments');
const { check, validationResult } = require('express-validator/check');


// Get all payments.
router.get('/all', async function(req, res) {
  let page = req.query.page;
  Payments.getAllPayments(page, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/search/', async function(req, res) {
  var page = req.query.page;
  var type = req.query.type;
  var value = req.query.value;
  console.log("What is page:", page);
  console.log("What is type:", type);
  console.log("What is value:", value);
  switch(type) {
    case 'invoice':
      Payments.searchInvoice(value, page, function(err, result) {
        if(err)
          return res.json(err);
        return res.json(result);
      });
      break;
    case 'vendor':
      Payments.searchVendor(value, page, function(err, result) {
        if(err)
          return res.json(err);
        return res.json(result);
      });
      break;
    default:
      break;
  }
  Payments.searchAllPayments(invoice, page, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
})

router.get('/count', async function(req, res) {
  let page = req.query.page;
  Payments.getCount(function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

// Get all payments based on invoice.
router.get('/inv', async function(req, res) {
  let invoice = req.query.invoice;
  Payments.getPaymentsByInvoice(invoice, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

// Get all payments linked to invoice.
router.get('/gettotal', async function(req, res) {
  let invoice = req.query.invoice;
  Payments.getPaymentsTotal(invoice, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/create', [
    check('invoice', 'Please enter an invoice number.').not().isEmpty(),
    check('vendor', 'Please choose a vendor').not().isEmpty(),
    check('payment', 'What is your payment method?').not().isEmpty(),
    check('ordered', 'Please enter date items ordered').not().isEmpty(),
    check('delivered', 'Please enter date delivered').not().isEmpty(),
    check('payment', 'Please enter payment type').not().isEmpty(),
    check('status', 'What is the status of the order?').not().isEmpty(),
    check('total', 'Fill out the total cost of payment').isFloat({gt:0.0}),
  ], function(req, res) {

  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("If statemnet errir:", errors.array()[0].msg);
    return res.status(400).json({ errors: errors.array() });
  }
  else {
    Payments.postNewPayment(req.body, function(err, result) {
        if(err)
          return res.json(err);
        return res.json(result);
    })
  }
})

module.exports = router;
