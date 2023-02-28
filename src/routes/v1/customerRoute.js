const { Router } = require('express');
const {
  createCustomerController,
  getAllCustomerController,
} = require('../../controllers/customerController');

const router = Router();

router.post('/', createCustomerController);
router.get('/', getAllCustomerController);

module.exports = router;
