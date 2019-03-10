var express = require('express');
var router = express.Router();
const getProducts = require('./products/get-products');

/* GET users listing. */
// router.get('/?ids=*', getProductByIds);
router.get('/', getProducts);
router.get('/:d', getProducts);

module.exports = router;