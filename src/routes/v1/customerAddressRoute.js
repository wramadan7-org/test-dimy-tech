const { Router } = require('express');
const {
  createCustomerAddressController,
  getAllCustomerAddressController,
  getCustomerAddressByIdController,
  updateCustomerAddressByIdController,
  deleteCustomerAddressByIdController,
} = require('../../controllers/customerAddressController');

const router = Router();

router.post('/', createCustomerAddressController);
router.get('/', getAllCustomerAddressController);
router.get('/:id', getCustomerAddressByIdController);
router.patch('/:id', updateCustomerAddressByIdController);
router.delete('/:id', deleteCustomerAddressByIdController);

module.exports = router;
