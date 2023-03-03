const { Router } = require('express');
const {
  createCustomerController,
  getAllCustomerController,
  getCustomerByIdController,
  updateCustomerByIdController,
  deleteCustomerByIdController,
} = require('../../controllers/customerController');

const router = Router();

router.post('/', createCustomerController);
router.get('/', getAllCustomerController);
router.get('/:id', getCustomerByIdController);
router.patch('/:id', updateCustomerByIdController);
router.delete('/:id', deleteCustomerByIdController);

module.exports = router;
