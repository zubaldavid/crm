var express = require('express');
var Logs = require('../models/logs');
var router = express.Router();

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
