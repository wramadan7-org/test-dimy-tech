const { Router } = require('express');
const {
  createCustomerController,
  getAllCustomerController,
  getCustomerByIdController,
} = require('../../controllers/customerController');

const router = Router();

router.post('/', createCustomerController);
router.get('/', getAllCustomerController);
router.get('/:id', getCustomerByIdController);

module.exports = router;
