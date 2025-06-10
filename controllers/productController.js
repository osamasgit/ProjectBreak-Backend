const { Product, validCategories, validSizes} = require('../models/Product.js')
const baseHtml = require('../helpers/baseHtml.js')
const getNavBar = require('../helpers/getNavBar')
const getProductCard = require('../helpers/productCard.js')
const getDetails = require('../helpers/getDetails.js')
const newProductForm = require('../helpers/newProduct.js')
const editProductForm = require('../helpers/editProduct.js')

const categoryOptions = validCategories.map(category => `<option value="${category}">${category}</option>`).join('')
const sizeOptions = validSizes.map(size => `<option value="${size}">${size}</option>`).join('')


exports.showProducts = async (req, res) => {
    try {
    const products = await Product.find().lean()
    const productsByCategoryArray = validCategories.map(category => {
        return products.filter(product => product.category === category)
    })
    let htmlByCategory = ''

        validCategories.forEach((category, index) => {
            const productsInCategory = productsByCategoryArray[index]

            htmlByCategory += `<h2>${category}</h2><section id="${category}"><ul>`

            productsInCategory.forEach(product => {
            htmlByCategory += `<li>${getProductCard(req, product)}</li>`
        })
        htmlByCategory += `</ul></section>`
        })
    let body = getNavBar(validCategories, req) + htmlByCategory
    let html = baseHtml(body)

    res.send(html)

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
        else {
            let body = getNavBar(validCategories, req) + getDetails(req, product)
            let html = baseHtml(body)

            res.send(html)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al cargar el producto')
    }
}

exports.showNewProduct = (req, res) => {
    const html = newProductForm(categoryOptions, sizeOptions);
    res.send(html);
}

exports.createProduct = async (req, res) => {
    try {
        const { name, description, category, size, price } = req.body
        const image = req.file ? req.file.path : '';

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
        const html = editProductForm(product, categoryOptions, sizeOptions)
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
