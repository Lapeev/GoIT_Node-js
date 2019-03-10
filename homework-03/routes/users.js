var express = require('express');
var router = express.Router();
const signUpRoute = require('./users/sign-up-route');
// const bodyParser = require('body-parser');

/* GET users listing. */

// router.use(bodyParser.json());

router.post('/', signUpRoute);

module.exports = router;
