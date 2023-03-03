const { Router } = require('express');
const { createOrderController } = require('../../controllers/orderController');

const router = Router();

router.post('/:customer_address_id', createOrderController);

module.exports = router;
