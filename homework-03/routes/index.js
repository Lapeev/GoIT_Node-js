var express = require('express');
var router = express.Router();
const mainRoute = require('./main/main');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HomeWork3' });
});



// router.get('/products/\?category=*', getProductByCategory);


module.exports = router;
