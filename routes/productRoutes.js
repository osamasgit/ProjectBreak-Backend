const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController.js')
const upload = require('../middlewares/uploadCloudinaryMiddleware.js')


router.get('/products/category/:category', productController.showProducts)
router.get('/dashboard/category/:category', productController.showProducts)
router.get('/products', productController.showProducts)
router.get('/dashboard', productController.showProducts)

router.get('/dashboard/new', productController.showNewProduct)

router.post('/dashboard', upload.single('image'), productController.createProduct)

router.get('/products/:productId', productController.showProductById)
router.get('/dashboard/:productId', productController.showProductById)

router.get('/dashboard/:productId/edit', productController.showEditProduct)

router.put('/dashboard/:productId', productController.updateProduct)

router.delete('/dashboard/:productId', productController.deleteProduct)


module.exports = router