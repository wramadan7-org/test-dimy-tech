const { Router } = require('express');
const { createOrderController, getAllOrderController } = require('../../controllers/orderController');

const router = Router();

router.post('/:customer_address_id', createOrderController);
router.get('/', getAllOrderController);

module.exports = router;
