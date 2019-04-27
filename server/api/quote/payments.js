var express = require('express');
var router = express.Router();
var Payments = require('../../models/quote/payments');
const { check, validationResult } = require('express-validator/check');

router.get('/', function(req, res, next) {
  res.render('NewPaymentForm', {title: 'Form Validation', success: req.session.success, errors:req.session.errors});
  res.session.errors = null;
});

// Get all payments linked to invoice.
router.get('/inv', async function(req, res) {
  let invoice = req.query.invoice;
  Payments.getPayments(invoice, function(err, result) {
    if(err)
      return res.json(err);
    return res.json(result);
  });
});

// Get all payments linked to invoice.
router.get('/getTotal', async function(req, res) {
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
