const { Product, validCategories, validSizes} = require('../models/Product.js')
const { newProductTemplate, dashboardTemplate, productByIdTemplate, editProductTemplate } = require('../templates/HtmlTemplates.js');

//controlador para las opciones de productos
exports.showNewProduct = (req, res) => {
    const html = newProductTemplate(validCategories, validSizes);
    res.send(html);
}

//controlador para listar los productos en el dashboard del administrador
exports.dashboardList = async (req, res) => {
    try {
        const products = await Product.find().lean()
        
        const productsByCategory = {}
        products.forEach(product => {
            if (!productsByCategory[product.category]) {
                productsByCategory[product.category] = []
            }
            productsByCategory[product.category].push(product)
        })
        let html = dashboardTemplate(productsByCategory)
        res.send(html)
    } catch (error) {
    console.error(error)
    res.status(500).send('Error al cargar productos')
  }
}

//controlador para ver un producto en concreto segun id
exports.showProductById = async (req, res) => {
    try {
        const productId = req.params.productId
        const product = await Product.findById(productId).lean()
        if (!product) {
            return res.status(404).send('Producto no encontrado')
        }
        const html = productByIdTemplate(product)
        res.send(html)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al cargar el producto')
    }
}

//controlador para crear el producto
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

    res.send('<p>Producto creado con éxito.</p><p><a href="/dashboard">Crear otro producto</a></p>')
    } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar el producto.')
    }
}

