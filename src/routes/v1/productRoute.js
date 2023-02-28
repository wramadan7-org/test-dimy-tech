const {Router} = require('express');
const { craeteProductController, getAllProductController, getProductByIdController, updateProductByIdController } = require('../../controllers/productController');

const router = Router();

router.post('/', craeteProductController);
router.get('/', getAllProductController);
router.get('/:id', getProductByIdController);
router.patch('/:id', updateProductByIdController);

module.exports = router;
