const mongoose = require('mongoose')

const validCategories = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios']
const validSizes = ['XS','S', 'M', 'L', 'XL']

const productSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    description:{ type: String, required: true },
    image:      { type: String, required: true },
    category:   { type: String, required: true, enum: validCategories },
    size:       { type: String, required: true, enum: validSizes },
    price:      { type: Number, required: true, min: 0 }
})

const Product = mongoose.model('Product', productSchema)

module.exports = {
    Product,
    validCategories,
    validSizes
}