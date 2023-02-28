const {Router} = require('express');
const { craeteProductController } = require('../../controllers/productController');

const router = Router();

router.post('/', craeteProductController);

module.exports = router;
