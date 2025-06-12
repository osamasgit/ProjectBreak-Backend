function getProductCard (req, product) {
    const isDashboard = req.path.startsWith('/dashboard')
    const basePath = isDashboard ? '/dashboard' : '/products'   
    const productCard = `
        <img src="${product.image}" alt="${product.name}">
        <strong>${product.name}</strong>
        <br>Precio: €${product.price}`
                
    const edit = isDashboard ? 
        `<div class="btns"><a href="${basePath}/${product._id}">Ver detalles</a><a href="${basePath}/${product._id}/edit">Editar</a></div>` : 
        `<a href="${basePath}/${product._id}">Ver detalles</a>`

    return `<li class="productDetail">
                ${productCard}
                ${edit}
            </li>`
}

module.exports = getProductCard