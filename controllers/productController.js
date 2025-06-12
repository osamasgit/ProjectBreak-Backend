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

    if (req.headers.accept.includes('application/json')) {
      return res.json(products)
    }

    const productsByCategoryArray = validCategories.map(category => {
        return products.filter(product => product.category === category)
    })
    let htmlByCategory = ''

        validCategories.forEach((category, index) => {
            const productsInCategory = productsByCategoryArray[index]

            htmlByCategory += `<section id="${category}"><h2>${category}</h2><ul>`

            productsInCategory.forEach(product => {
            htmlByCategory += `${getProductCard(req, product)}`
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
        
        if (req.headers.accept.includes('application/json')) {
            return res.json(product)
        }

        let body = getNavBar(validCategories, req) + getDetails(req, product)
        let html = baseHtml(body)

        res.send(html)

    } catch (error) {
        console.error(error)
        res.status(500).send('Error al cargar el producto')
    }
}

exports.showNewProduct = (req, res) => {
    let htmlForm = newProductForm(categoryOptions, sizeOptions)
    let html = baseHtml(htmlForm)
    res.send(html)
}

exports.createProduct = async (req, res) => {
    try {
        const { name, description, category, size, price } = req.body
        const image = req.file ? req.file.path : ''

        const newProduct = new Product({
            name,
            description,
            image,
            category,
            size,
            price
    })

    await newProduct.save()

    if (req.headers.accept.includes('application/json')) {
        return res.status(201).json(newProduct)
    }

    res.send('<p>Producto creado con éxito.</p><a href="/dashboard/new">Crear otro producto</a><a href="/dashboard">Volver al inicio</a>')
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

        if (req.headers.accept.includes('application/json')) {
            return res.json(product)
        }

        let htmlEdit = editProductForm(product, categoryOptions, sizeOptions)
        let html = baseHtml(htmlEdit)
        res.send(html)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al cargar el producto para editar')
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, image, category, size, price } = req.body

        const updateProduct = await Product.findByIdAndUpdate(req.params.productId, {
            name,
            description,
            image,
            category,
            size,
            price
        })

        if (req.headers.accept.includes('application/json')) {
            return res.json(updatedProduct)
        }

        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al actualizar el producto')
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.productId)

        if (req.headers.accept.includes('application/json')) {
            return res.json({ message: 'Producto eliminado correctamente', product: deletedProduct })
        }
        
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al eliminar el producto')
    }
}
