const { Router } = require('express');
const {
  createCustomerController,
} = require('../../controllers/customerController');

const router = Router();

router.post('/', createCustomerController);

module.exports = router;
