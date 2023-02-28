const { Router } = require('express');
const {
  createPaymentMethodController, getAllPaymentMethodController, getPaymentMethodByIdController,
} = require('../../controllers/paymentMethodController');

const router = Router();

router.post('/', createPaymentMethodController);
router.get('/', getAllPaymentMethodController);
router.get('/:id', getPaymentMethodByIdController);

module.exports = router;
