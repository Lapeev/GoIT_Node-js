const mainRoute = require('./main/main');
const signUpRoute = require('./users/sign-up-route');
const getProducts = require('./products/get-products');

const router = {
  '/signup': signUpRoute,
  '/products': getProducts,
  "/": mainRoute,
  default: mainRoute
};

module.exports = router;
