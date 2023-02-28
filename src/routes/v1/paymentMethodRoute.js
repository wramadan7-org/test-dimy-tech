const { Router } = require('express');
const {
  createPaymentMethodController, getAllPaymentMethodController, getPaymentMethodByIdController, updatePaymentMethodByIdController,
} = require('../../controllers/paymentMethodController');

const router = Router();

router.post('/', createPaymentMethodController);
router.get('/', getAllPaymentMethodController);
router.get('/:id', getPaymentMethodByIdController);
router.patch('/:id', updatePaymentMethodByIdController);

module.exports = router;
