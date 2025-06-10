function getProductCard (req, product) {
    const isDashboard = req.path.startsWith('/dashboard')
    const basePath = isDashboard ? '/dashboard' : '/products'   
    const productCard = `
                <strong>${product.name}</strong>
                <img src="${product.image}" alt="${product.name}" style="width: 100px;">
                <br>Precio: €${product.price}
                <br><a href="${basePath}/${product._id}">Ver detalles</a>`
                
    const edit = isDashboard ? 
        `<br><a href="${basePath}/${product._id}/edit">Editar</a>` : ''

    return `<li>
                ${productCard}
                ${edit}
            </li>`
}

module.exports = getProductCard