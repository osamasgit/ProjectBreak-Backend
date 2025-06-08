// gestionamos las rutas

const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController.js')

router.get('/dashboard', productController.dashboardList)
router.get('/dashboard/new', productController.showNewProduct)
router.post('/dashboard', productController.createProduct);
router.get('/dashboard/:productId', productController.showProductById);
//router.get('/dashboard/:productId/edit', productController.showEditProduct);
//router.put('/dashboard/:productId', productController.updateProduct);
//router.delete('/dashboard/:productId/delete', productController.deleteProduct);


module.exports = router