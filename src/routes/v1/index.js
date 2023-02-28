const { Router } = require('express');
const productRoute = require('./productRoute');
const paymentMethodRoute = require('./paymentMethodRoute');
const customerRoute = require('./customerRoute');

const router = Router();

const defaultRoute = [
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/paymentmethod',
    route: paymentMethodRoute,
  },
  {
    path: '/customer',
    route: customerRoute,
  },
];

defaultRoute.forEach((routeParam) => {
  router.use(routeParam.path, routeParam.route);
});

module.exports = router;
