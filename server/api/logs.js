var express = require('express');
var Logs = require('../models/logs');
var router = express.Router();

router.get('/', async function(req, res) { // request and response object
  Logs.retreiveAll(function(err, result) {
    if(err)
    return res.json(err);
    return res.json(result); 
  });
});

router.post('/', function (req, res) {
  var action =  req.body.action;
  var date =  req.body.date;
  var name  = req.body.name; // from client
  Logs.insert(action, date, name, function(err, result) { // insert into datbase
    if(err)
      return res.json(err); // response to front end
    return res.json(result);
  })
});
