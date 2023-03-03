const { Router } = require('express');
const {
  createCustomerAddressController,
  getAllCustomerAddressController,
} = require('../../controllers/customerAddressController');

const router = Router();

router.post('/', createCustomerAddressController);
router.get('/', getAllCustomerAddressController);

module.exports = router;
