const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController.js')

router.get('/products', productController.showProducts)
router.get('/products/:productId', productController.showProductById)

router.get('/dashboard', productController.showProducts)
router.get('/dashboard/new', productController.showNewProduct)
router.get('/dashboard/:productId', productController.showProductById)
router.post('/dashboard', productController.createProduct)
router.get('/dashboard/:productId/edit', productController.showEditProduct)
router.put('/dashboard/:productId', productController.updateProduct)
router.delete('/dashboard/:productId', productController.deleteProduct)

module.exports = router