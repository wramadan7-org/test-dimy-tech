const {Router} = require('express');
const { craeteProductController, getAllProductController, getProductByIdController } = require('../../controllers/productController');

const router = Router();

router.post('/', craeteProductController);
router.get('/', getAllProductController);
router.get('/:id', getProductByIdController);

module.exports = router;
