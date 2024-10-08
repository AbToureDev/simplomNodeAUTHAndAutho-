const express = require('express');
const {createProduct, getAllProducts, getProductById,updateProduct,deleteProduct } = require('../controllers/ProductController');
const router = express.Router();
router.post('/creat_product', createProduct);
router.get('/All_products', getAllProducts);
router.get('/products_by_id/:id', getProductById);
router.patch('/update_product/:id', updateProduct);
router.delete('/delete_product/:id', deleteProduct);
module.exports = router;