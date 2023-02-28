const {Router} = require('express');
const { craeteProductController, getAllProductController, getProductByIdController, updateProductByIdController, deleteProductByIdController } = require('../../controllers/productController');

const router = Router();

router.post('/', craeteProductController);
router.get('/', getAllProductController);
router.get('/:id', getProductByIdController);
router.patch('/:id', updateProductByIdController);
router.delete('/:id', deleteProductByIdController)

module.exports = router;
