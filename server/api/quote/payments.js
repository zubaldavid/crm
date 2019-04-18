var express = require('express');
var Payments = require('../../models/quote/payments');
var router = express.Router();

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

router.post('/create', function(req, res) {
  var invoice = req.body.invoice,
      vendor = req.body.vendor,
      ordered = req.body.ordered,
      delivered = req.body.delivered,
      payment = req.body.payment,
      status = req.body.status,
      subtotal = req.body.subtotal,
      shipping = req.body.shipping,
      taxes = req.body.taxes,
      total = req.body.total,
      comments = req.body.comments;

  // req.check('invoice', 'Please enter an invoice number.').isEmpty();
  // req.check('vendor', 'Please choose a vendor').isEmpty();
  // req.check('payment', 'What is your payment method?').isEmpty();
  // var errors = req.validationErrors();

  Payments.postNewPayment(invoice, vendor, ordered, delivered,
    payment, status, subtotal, shipping, taxes, total, comments, function(err, result) {
      if(err)
        return res.json(err);
      return res.json(result);
  })
})

module.exports = router;
