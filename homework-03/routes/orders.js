var express = require('express');
var router = express.Router();
const addOrder = require('./orders/add-order');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
router.post('/', addOrder);

module.exports = router;