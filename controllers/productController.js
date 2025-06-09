const { Product, validCategories, validSizes} = require('../models/Product.js')
const { 
    allProductsTemplate, 
    productByIdTemplate, 
    allProductsDashboard, 
    productByIdDashboard,
    newProductTemplate,
    editProductTemplate } = require('../helpers/controllerTemplates.js');

const categoryOptions = validCategories.map(category => `<option value="${category}">${category}</option>`).join('')
const sizeOptions = validSizes.map(size => `<option value="${size}">${size}</option>`).join('')

exports.showProducts = async (req, res) => {
    try {
        const products = await Product.find().lean()
        
        const productsByCategory = {}
        products.forEach(product => {
            if (!productsByCategory[product.category]) {
                productsByCategory[product.category] = []
            }
            productsByCategory[product.category].push(product)
        })
        if(req.path === '/dashboard') {
            let html = allProductsDashboard(productsByCategory)
            res.send(html)
        } else {
            let html = allProductsTemplate(productsByCategory)
            res.send(html)
        }
    } catch (error) {
    console.error(error)
    res.status(500).send('Error al cargar productos')
  }
}

exports.showProductById = async (req, res) => {
    try {
        const productId = req.params.productId
        const product = await Product.findById(productId).lean()
        if (!product) {
            return res.status(404).send('Producto no encontrado')
        }
        if(req.path === '/dashboard/' + productId) {
            let html = productByIdDashboard(product)
            res.send(html)
        } else {
            let html = productByIdTemplate(product)
            res.send(html)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al cargar el producto')
    }
}

exports.showNewProduct = (req, res) => {
    const html = newProductTemplate(categoryOptions, sizeOptions);
    res.send(html);
}

exports.createProduct = async (req, res) => {
    try {
        const { name, description, image, category, size, price } = req.body

        const newProduct = new Product({
            name,
            description,
            image,
            category,
            size,
            price
    })

    await newProduct.save()

    res.send('<p>Producto creado con éxito.</p><p><a href="/dashboard/new">Crear otro producto</a></p><p><a href="/dashboard">← Volver al inicio</a></p>')
    } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar el producto.')
    }
}

exports.showEditProduct = async (req, res) => {
    try {
        const productId = req.params.productId
        const product = await Product.findById(productId).lean()
        if (!product) {
            return res.status(404).send('Producto no encontrado')
        }
        const html = editProductTemplate(product, categoryOptions, sizeOptions)
        res.send(html)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al cargar el producto para editar')
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, image, category, size, price } = req.body

        await Product.findByIdAndUpdate(req.params.productId, {
            name,
            description,
            image,
            category,
            size,
            price
        })

        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al actualizar el producto')
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId)
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al eliminar el producto')
    }
}
