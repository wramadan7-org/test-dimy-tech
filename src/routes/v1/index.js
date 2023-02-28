const { Router } = require('express');
const productRoute = require('./productRoute');

const router = Router();

const defaultRoute = [
  {
    path: '/product',
    route: productRoute,
  },
];

defaultRoute.forEach((routeParam) => {
  router.use(routeParam.path, routeParam.route);
});

module.exports = router;
